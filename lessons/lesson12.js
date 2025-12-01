// lesson12.js
// ===============================
// 레슨 12: JSON.parse / JSON.stringify 실습
//       : Node.js 기본 내장 기능(JSON, fs)만 사용하므로 npm install 할 것은 없습니다.
// ===============================

const { f_pause, getRandomEmoji } = require('../utils');
const fs = require('fs');
const path = require('path');

async function run() {
    console.log('📚 레슨 12: JSON.parse / JSON.stringify 실습');
    console.log('='.repeat(50));
    console.log('');

    // =============================
    // 1. JS 객체 → JSON 문자열 (JSON.stringify)
    // =============================
    console.log('🔹 1. JS 객체를 JSON 문자열로 변환하기 (JSON.stringify)');
    console.log('-'.repeat(50));

    const user = {
        name: 'Joshua',
        age: 53,
        isDeveloper: true,
        skills: ['JavaScript', 'Node.js', 'Spring Boot'],
        profile: {
            os: 'macOS (Intel)',
            editor: 'VS Code',
            nodeVersion: 'v24.7.0'
        }
    };

    console.log('원본 JS 객체:');
    console.log(user);

    const json1 = JSON.stringify(user); // 기본
    console.log('\n기본 JSON.stringify(user) 결과:');
    console.log(json1);

    const json2 = JSON.stringify(user, null, 2); // 들여쓰기 포함(가독성)
    console.log('\nJSON.stringify(user, null, 2) 결과 (들여쓰기 포함):');
    console.log(json2);

    console.log(`
💡 JSON.stringify(obj, replacer, space)
   - obj: JS 객체
   - replacer: 특정 키만 선택하거나 변환할 때 사용 (지금은 null)
   - space: 들여쓰기 칸 수 (숫자 또는 문자열) → 2를 많이 사용
`);

    await f_pause();

    // =============================
    // 2. JSON 문자열 → JS 객체 (JSON.parse)
    // =============================
    console.log('🔹 2. JSON 문자열을 JS 객체로 변환하기 (JSON.parse)');
    console.log('-'.repeat(50));

    const jsonText = `
{
  "title": "JavaScript 연습",
  "completed": false,
  "tags": ["javascript", "node", "study"],
  "progress": 0.7
}
`.trim();

    console.log('JSON 문자열:');
    console.log(jsonText);

    const parsed = JSON.parse(jsonText);

    console.log('\nJSON.parse(jsonText) 결과 (JS 객체):');
    console.log(parsed);
    console.log(`\nparsed.title      = ${parsed.title}`);
    console.log(`parsed.completed  = ${parsed.completed}`);
    console.log(`parsed.tags[1]    = ${parsed.tags[1]}`);
    console.log(`parsed.progress   = ${parsed.progress}`);

    console.log(`
💡 JSON.parse(text)
   - JSON 형식의 문자열을 JS 객체로 변환
   - 문자열 포맷이 JSON 규칙을 위반하면 예외(에러) 발생
`);

    await f_pause();

    // =============================
    // 3. stringify의 replacer 사용 예
    // =============================
    console.log('🔹 3. JSON.stringify의 replacer 사용 예');
    console.log('-'.repeat(50));

    // (1) 배열 replacer: 포함할 키를 지정
    const filteredJson = JSON.stringify(user, ['name', 'age', 'isDeveloper'], 2);
    console.log('특정 키만 포함하여 JSON으로 만들기:');
    console.log(filteredJson);

    // (2) 함수 replacer: 값 가공
    const maskedJson = JSON.stringify(
        user,
        (key, value) => {
            if (key === 'name') {
                return '***익명***';
            }
            if (key === 'age') {
                return value + ' (비공개)';
            }
            return value;
        },
        2
    );

    console.log('\n이름/나이를 가공해서 JSON으로 만들기:');
    console.log(maskedJson);

    console.log(`
💡 replacer:
   - 배열: 포함할 키 목록을 지정
   - 함수: 각 key, value를 받아서 "변환된 값"을 반환
   - 민감 정보 마스킹, 로그 필터링 등에 사용 가능
`);

    await f_pause();

    // =============================
    // 4. parse의 reviver 사용 예
    // =============================
    console.log('🔹 4. JSON.parse의 reviver 사용 예');
    console.log('-'.repeat(50));

    const jsonWithDates = `
{
  "title": "일정 관리",
  "start": "2025-12-01T09:00:00.000Z",
  "end": "2025-12-01T11:00:00.000Z"
}
`.trim();

    console.log('날짜 문자열이 포함된 JSON:');
    console.log(jsonWithDates);

    const parsedNormal = JSON.parse(jsonWithDates);
    console.log('\n일반 JSON.parse 결과:');
    console.log(parsedNormal);
    console.log('start 타입:', typeof parsedNormal.start, ', 값:', parsedNormal.start);

    console.log('\nreviver를 사용하여 날짜 문자열을 Date 객체로 변환:');

    const parsedWithReviver = JSON.parse(jsonWithDates, (key, value) => {
        // 간단한 예: ISO 형식의 문자열이면 Date로 변환 시도
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
            return new Date(value);
        }
        return value;
    });

    console.log(parsedWithReviver);
    console.log('start instanceof Date:', parsedWithReviver.start instanceof Date);
    console.log('start.toLocaleString():', parsedWithReviver.start.toLocaleString());

    console.log(`
💡 JSON.parse(text, reviver)
   - reviver(key, value): 파싱 과정에서 각 값을 가공할 수 있는 함수
   - 문자열 → Date, 숫자 변환, 마이그레이션 등에 활용 가능
`);

    await f_pause();

    // =============================
    // 5. 파일로 JSON 저장/읽기 (fs 모듈 사용) — tmp/lesson12 로 변경
    // =============================
    console.log('🔹 5. 파일로 JSON 저장/읽기 (fs 모듈 사용)');
    console.log('-'.repeat(50));

    // 🔥 Joshua님 요청대로 저장 위치 변경!
    const dataDir = path.join(__dirname, '..', 'tmp', 'lesson12');

    // 폴더 없으면 생성
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, 'lesson12_sample.json');

    const todo = {
        id: 1,
        title: 'JSON 연습하기',
        done: false,
        createdAt: new Date().toISOString()
    };

    const todoJson = JSON.stringify(todo, null, 2);

    console.log(`JSON 파일로 저장할 내용 (${filePath}):`);
    console.log(todoJson);

    // 파일로 쓰기
    fs.writeFileSync(filePath, todoJson, 'utf-8');
    console.log('\n✅ JSON 데이터를 파일로 저장했습니다.');

    // 파일에서 읽기
    const loadedText = fs.readFileSync(filePath, 'utf-8');
    const loadedTodo = JSON.parse(loadedText);

    console.log('\n파일에서 다시 읽어온 JSON 문자열:');
    console.log(loadedText);

    console.log('\nJSON.parse로 다시 객체로 변환:');
    console.log(loadedTodo);

    console.log(`
💡 JSON + fs 조합은 로컬 데이터 임시 저장, 로그 기록, 설정 파일 관리 등에 무척 자주 사용됩니다.
`);

    await f_pause();

    // =============================
    // 6. 잘못된 JSON 파싱 시 에러 처리
    // =============================
    console.log('🔹 6. 잘못된 JSON 파싱 시 에러 처리');
    console.log('-'.repeat(50));

    const invalidJson = '{ "name": "Joshua", "age": 53, }'; // 끝에 , 때문에 잘못된 JSON

    console.log('잘못된 JSON 문자열:');
    console.log(invalidJson);

    try {
        const bad = JSON.parse(invalidJson);
        console.log('파싱 결과:', bad); // 여기는 실행되지 않음
    } catch (err) {
        console.log('\n❌ JSON.parse 중 에러 발생!');
        console.log('에러 메시지:', err.message);
    }

    console.log(`
✅ 정리:
   - JSON.stringify: JS 객체 → JSON 문자열
   - JSON.parse: JSON 문자열 → JS 객체
   - replacer / reviver로 변환 과정에서 필터링, 가공 가능
   - 실제 개발에서는 파일, API 통신, 설정 관리 등에 필수적으로 사용
`);

    console.log('');
    console.log('='.repeat(50));
    console.log('✅ 레슨 12를 완료했습니다! (JSON.parse / JSON.stringify 기본 및 응용)');
}

// ===============================
// 모듈 내보내기
// ===============================
module.exports = { run };
