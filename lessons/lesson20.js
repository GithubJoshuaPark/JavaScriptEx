// lesson20.js
// ===============================
// 레슨 20: path 모듈로 경로 처리 실습
//  - path.join / resolve
//  - dirname / basename / extname
//  - parse / format
//  - relative / isAbsolute
//  - sep / delimiter
// ===============================

const path = require('path');
const fs = require('fs');
const { f_pause, getRandomEmoji, f_printCodeBlock } = require('../utils');


// ------------------------------------------
// 1. __dirname, __filename 기본
// ------------------------------------------
function showCurrentPaths() {
    console.log('🔹 1) __dirname / __filename');
    console.log('='.repeat(60));

    console.log('현재 파일의 전체 경로 (__filename):');
    console.log(__filename);
    console.log('');

    console.log('현재 파일이 있는 폴더 (__dirname):');
    console.log(__dirname);
    console.log('');

    f_printCodeBlock(
        '__dirname / __filename 예시',
        `console.log(__dirname);   // 이 파일이 위치한 디렉토리
console.log(__filename);  // 이 파일의 전체 경로`
    );

    console.log('💡 포인트: Node.js에서 각 파일은 자신의 위치를 __dirname / __filename으로 알 수 있습니다.\n');
}

// ------------------------------------------
// 2. path.join / path.resolve 비교
// ------------------------------------------
function joinAndResolveExample() {
    console.log('🔹 2) path.join / path.resolve');
    console.log('='.repeat(60));

    const joined = path.join(__dirname, '..', 'tmp', 'lesson20', 'test.txt');
    const resolved = path.resolve(__dirname, '..', 'tmp', 'lesson20', 'test.txt');

    console.log('path.join 결과:');
    console.log(joined);
    console.log('');
    console.log('path.resolve 결과:');
    console.log(resolved);
    console.log('');

    f_printCodeBlock(
        'join vs resolve 비교',
        `const joined  = path.join('folder', 'sub', 'file.txt');
// 단순히 경로를 이어 붙여줌 (상대 경로 가능)

const resolved = path.resolve('folder', 'sub', 'file.txt');
// 현재 작업 디렉토리(process.cwd()) 기준으로 "절대 경로"를 만들어 줌`
    );

    console.log('💡 포인트:');
    console.log('  - join: 경로 조립용 (상대/절대 모두 가능).');
    console.log('  - resolve: 최종 결과를 절대 경로로 만들어 줌.\n');
}

// ------------------------------------------
// 3. dirname / basename / extname
// ------------------------------------------
function pathPartsExample() {
    console.log('🔹 3) dirname / basename / extname');
    console.log('='.repeat(60));

    const filePath = path.join(__dirname, 'sample', 'demo.file.txt');

    const dir = path.dirname(filePath);
    const base = path.basename(filePath);           // demo.file.txt
    const baseNoExt = path.basename(filePath, '.txt'); // demo.file
    const ext = path.extname(filePath);             // .txt

    console.log('예시 경로:', filePath);
    console.log('dirname :', dir);
    console.log('basename:', base);
    console.log('basename(, ".txt"):', baseNoExt);
    console.log('extname :', ext);
    console.log('');

    f_printCodeBlock(
        'dirname / basename / extname',
        `const filePath = '/Users/joshua/dev/project/index.js';

path.dirname(filePath);   // '/Users/joshua/dev/project'
path.basename(filePath);  // 'index.js'
path.extname(filePath);   // '.js'`
    );

    console.log('💡 포인트: 파일 경로에서 디렉토리, 파일명, 확장자를 쉽게 분리할 수 있습니다.\n');
}

// ------------------------------------------
// 4. path.parse / path.format
// ------------------------------------------
function parseAndFormatExample() {
    console.log('🔹 4) path.parse / path.format');
    console.log('='.repeat(60));

    const filePath = path.join(__dirname, 'sample', 'demo.file.txt');

    const parsed = path.parse(filePath);

    console.log('예시 경로:', filePath);
    console.log('path.parse 결과 객체:');
    console.log(parsed);
    console.log('');

    const modified = {
        ...parsed,
        name: 'modified_demo',
        base: 'modified_demo.log',
        ext: '.log',
    };

    const formatted = path.format(modified);

    console.log('수정된 객체를 path.format에 전달:');
    console.log(modified);
    console.log('path.format 결과:');
    console.log(formatted);
    console.log('');

    f_printCodeBlock(
        'parse / format 예시',
        `const parsed = path.parse('/foo/bar/baz.txt');
// {
//   root: '/',
//   dir: '/foo/bar',
//   base: 'baz.txt',
//   ext: '.txt',
//   name: 'baz'
// }

const formatted = path.format({
  dir: '/foo/bar',
  name: 'baz',
  ext: '.txt',
});
// '/foo/bar/baz.txt'`
    );

    console.log('💡 포인트: 경로를 객체로 쪼개서 조작한 뒤 다시 문자열로 조립할 수 있습니다.\n');
}

// ------------------------------------------
// 5. path.relative / isAbsolute
// ------------------------------------------
function relativeAndIsAbsoluteExample() {
    console.log('🔹 5) path.relative / isAbsolute');
    console.log('='.repeat(60));

    const from = '/Users/joshua/dev/project';
    const to = '/Users/joshua/dev/project/src/index.js';

    const relative = path.relative(from, to);

    console.log('from 경로:', from);
    console.log('to   경로:', to);
    console.log('relative(from, to):', relative);
    console.log('');

    console.log('isAbsolute("/Users/joshua"):', path.isAbsolute('/Users/joshua'));
    console.log('isAbsolute("src/index.js"):', path.isAbsolute('src/index.js'));
    console.log('');

    f_printCodeBlock(
        'relative / isAbsolute',
        `path.relative('/data/origin', '/data/origin/images/pic.png');
// 'images/pic.png'

path.isAbsolute('/abc/def');      // true (유닉스/맥)
path.isAbsolute('C:\\abc\\def');  // true (윈도우)
path.isAbsolute('relative/path'); // false`
    );

    console.log('💡 포인트:');
    console.log('  - relative: 기준 경로에서 목표 경로로의 상대 경로 계산.');
    console.log('  - isAbsolute: 경로가 절대 경로인지 여부 판별.\n');
}

// ------------------------------------------
// 6. path.sep / path.delimiter
// ------------------------------------------
function sepAndDelimiterExample() {
    console.log('🔹 6) path.sep / path.delimiter');
    console.log('='.repeat(60));

    console.log('path.sep       (경로 구분자):', JSON.stringify(path.sep));
    console.log('path.delimiter (환경변수 구분자):', JSON.stringify(path.delimiter));
    console.log('');

    f_printCodeBlock(
        'sep / delimiter 예시',
        `// Windows 예시
// path.sep       -> '\\\\'
// path.delimiter -> ';'

// POSIX (macOS, Linux) 예시
// path.sep       -> '/'
// path.delimiter -> ':'`
    );

    console.log(`
💡 포인트:
  - path.sep: 파일 경로에서 디렉토리 사이를 구분하는 문자
    (윈도우: '\\\\', 유닉스/맥: '/')
  - path.delimiter: PATH 같은 환경변수에서 여러 경로를 나눌 때 쓰는 문자
    (윈도우: ';', 유닉스/맥: ':')
`);
}

// ------------------------------------------
// 7. 실제로 tmp/lesson20에 파일 하나 만들어 보기 (fs + path)
// ------------------------------------------
async function createDemoFile() {
    console.log('🔹 7) path + fs 조합으로 데모 파일 만들기');
    console.log('='.repeat(60));

    const dir = path.join(__dirname, '..', 'tmp', 'lesson20');
    const filePath = path.join(dir, 'demo_path_fs.txt');

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const content = [
        '이 파일은 lesson20에서 path + fs 데모로 생성한 파일입니다.',
        `__dirname: ${__dirname}`,
        `filePath: ${filePath}`,
        `생성 시각: ${new Date().toISOString()}`,
        '',
    ].join('\n');

    await fs.promises.writeFile(filePath, content, 'utf-8');

    console.log('📄 생성된 파일 경로:');
    console.log(filePath);
    console.log('');
    console.log('💾 파일 내용:');
    console.log(content);
    console.log('');
}

// ------------------------------------------
// main run
// ------------------------------------------
async function run(rl) {
    console.log('📚 레슨 20: path 모듈로 경로 처리 실습');
    console.log('='.repeat(70));
    console.log('');

    showCurrentPaths();
    await f_pause(rl);

    joinAndResolveExample();
    await f_pause(rl);

    pathPartsExample();
    await f_pause(rl);

    parseAndFormatExample();
    await f_pause(rl);

    relativeAndIsAbsoluteExample();
    await f_pause(rl);

    sepAndDelimiterExample();
    await f_pause(rl);

    await createDemoFile();
    await f_pause(rl);

    console.log('='.repeat(70));
    console.log('✅ 레슨 20을 완료했습니다!');
}

module.exports = { run };
