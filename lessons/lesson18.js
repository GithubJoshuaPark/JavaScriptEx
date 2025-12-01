// lesson18.js
// ===============================
// 레슨 18: Node.js 모듈 시스템 이해하기
//  - CommonJS (require, module.exports) 기본
//  - 내장 모듈 사용 (fs, path 예시)
//  - 상대 경로로 로컬 모듈 불러오기
//  - require 캐시와 단일 인스턴스 개념
// ===============================

const { f_pause, getRandomEmoji, f_printCodeBlock } = require('../utils');
const path = require('path');
const fs = require('fs');


// ===============================
// 1. 모듈과 파일 스코프 소개
// ===============================
function explainModuleScope() {
    console.log('🔹 1) 모듈과 파일 스코프');
    console.log('='.repeat(60));
    console.log(`
    Node.js에서 "각 파일"은 하나의 모듈(module)입니다.

    - 파일마다 자신만의 스코프가 있어서,
    다른 파일의 변수와 직접 섞이지 않습니다.
    - 밖으로 내보내고 싶은 것만 module.exports에 담아서 공개합니다.
    - 다른 파일에서는 require(...)로 그 모듈을 가져와서 사용합니다.
    `);

    f_printCodeBlock(
        '📄 예시: mathUtil.js',
        `// mathUtil.js
console.log('mathUtil 모듈이 로드되었습니다.');

function add(a, b) {
    return a + b;
}

function mul(a, b) {
    return a * b;
}

// 바깥에서 쓸 수 있도록 "내보내기"
module.exports = {
    add,
    mul,
};`
    );

    f_printCodeBlock(
        '📄 예시: app.js (mathUtil 모듈 사용)',
        `// app.js
const mathUtil = require('./mathUtil');

console.log('1 + 2 =', mathUtil.add(1, 2));
console.log('3 * 4 =', mathUtil.mul(3, 4));`
    );

    console.log(`
    💡 포인트:
    - 파일 하나 = 모듈 하나
    - "module.exports"로 공개 범위를 명시
    - "require"로 다른 파일의 모듈을 불러와서 사용
    `);
}

// ===============================
// 2. module.exports / exports 차이 간단 설명
// ===============================
function explainExports() {
    console.log('🔹 2) module.exports / exports 사용법');
    console.log('='.repeat(60));

    f_printCodeBlock(
        '✅ 올바른 사용 예시',
        `// a.js
function foo() { /* ... */ }
function bar() { /* ... */ }

// 객체로 내보내기
module.exports = { foo, bar };

// 또는 개별로 속성 추가도 가능
module.exports.foo = foo;
module.exports.bar = bar;`
    );

    f_printCodeBlock(
        '⚠ exports를 사용할 때 주의할 점',
        `// b.js
function foo() {}
function bar() {}

// 초기에는 exports === module.exports 이지만...
exports.foo = foo;
exports.bar = bar;

// 이렇게 전체를 바꾸면 문제가 생김:
// exports = { foo, bar };  // ❌ 이건 module.exports를 바꾸지 않음
`
    );

    console.log(`
    💡 정리:
    - 기본적으로 "module.exports"를 사용하는 것이 가장 안전합니다.
    - "exports.xxx = ..." 는 "module.exports.xxx = ..." 와 거의 같지만,
    - "exports = {...}" 처럼 전체를 교체하면 module.exports와 연결이 끊어질 수 있습니다.
`);
}

// ===============================
// 3. 내장 모듈 사용 예시 (fs, path)
// ===============================
function explainBuiltinModules() {
    console.log('🔹 3) 내장 모듈(fs, path) 사용하기');
    console.log('='.repeat(60));

    console.log(`
    Node.js는 이미 많은 기능을 "내장 모듈"로 제공합니다.
    예: fs(파일 시스템), path(경로 처리), http, os 등
    `);

    f_printCodeBlock(
        '📦 내장 모듈 불러오기',
        `const fs = require('fs');
const path = require('path');`
    );

    // 실제로 path, fs를 한번 사용해 보기
    const currentFile = __filename;
    const currentDir = __dirname;
    const parentDir = path.dirname(currentDir);
    const samplePath = path.join(currentDir, 'sample.txt');

    console.log('현재 파일 경로 (__filename):', currentFile);
    console.log('현재 디렉토리 (__dirname):   ', currentDir);
    console.log('부모 디렉토리:              ', parentDir);
    console.log('path.join으로 만든 예시 경로:', samplePath);
    console.log('');

    console.log('fs 모듈로 간단한 내용 쓰기/읽기 데모를 보여드립니다.\n');

    try {
        const tmpDir = path.join(__dirname, '..', 'tmp', 'lesson18');
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir, { recursive: true });
        }

        const filePath = path.join(tmpDir, 'demo_fs.txt');
        const content = `Hello from lesson18! (${new Date().toISOString()})\n`;

        fs.writeFileSync(filePath, content, 'utf-8');
        const readBack = fs.readFileSync(filePath, 'utf-8');

        console.log('💾 fs.writeFileSync로 파일에 쓴 내용:');
        console.log(content);
        console.log('📖 fs.readFileSync로 다시 읽은 내용:');
        console.log(readBack);
    } catch (err) {
        console.log('⚠ fs 사용 예제에서 오류 발생:', err.message);
    }

    console.log(`
    💡 포인트:
    - 내장 모듈은 "npm install" 없이 바로 require('모듈명')으로 사용.
    - path: 운영체제 별 경로 구분자 고민 없이 경로 조합 가능.
    - fs: 파일 읽기/쓰기 등 파일 시스템 작업.
    `);
}

// ===============================
// 4. 상대 경로로 로컬 모듈 불러오기 예시
// ===============================
function explainLocalRequire() {
    console.log('🔹 4) 상대 경로로 로컬 모듈 불러오기');
    console.log('='.repeat(60));

    f_printCodeBlock(
        '예시: 현재 프로젝트의 utils.js 불러오기',
        `// 어떤 파일에서...
const utils = require('../utils');

console.log(utils.getRandomEmoji());
utils.f_pause(rl); // ← rl을 인자로 넘겨서 사용`
    );

    console.log(`
    지금 이 lesson18.js 파일 자체도, 다른 파일(main.js)에서

    const lesson18 = require('./lessons/lesson18');
    await lesson18.run(rl);

    처럼 require(...)로 불러와서 실행하고 있습니다.
    `);
}

// ===============================
// 5. require 캐시와 단일 인스턴스 개념
// ===============================
function explainRequireCache() {
    console.log('🔹 5) require 캐시 (한 번만 로드되는 이유)');
    console.log('='.repeat(60));

    console.log(`
    Node.js에서 같은 경로로 require(...)    를 여러 번 호출해도,
    실제로 모듈 파일은 "한 번만" 실행되고, 그 결과가 캐시에 저장됩니다.

    예:

    // a.js
    const util1 = require('./utils');
    const util2 = require('./utils');

    console.log(util1 === util2); // true

    즉, 동일 경로의 require는 항상 "같은 객체"를 반환합니다.
    이 덕분에:
    - 설정, 싱글톤, 공용 상태 등을 모듈 단위로 공유할 수 있습니다.
    - 불필요하게 같은 파일을 여러 번 실행하지 않습니다.
    `);
}

// ===============================
// main run
// ===============================
async function run(rl) {
    console.log('📚 레슨 18: Node.js 모듈 시스템 이해하기');
    console.log('='.repeat(70));
    console.log('');

    explainModuleScope();
    await f_pause(rl);

    explainExports();
    await f_pause(rl);

    explainBuiltinModules();
    await f_pause(rl);

    explainLocalRequire();
    await f_pause(rl);

    explainRequireCache();
    await f_pause(rl);

    console.log('='.repeat(70));
    console.log('✅ 레슨 18을 완료했습니다!');
}

// ===============================
module.exports = { run };
