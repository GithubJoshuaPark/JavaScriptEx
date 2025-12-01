// lesson16.js
// ===============================
// 레슨 16: fetch로 JSONPlaceholder TODO 데이터 받아오기
//  - 1) 전체 TODO 목록 일부 조회
//  - 2) ID로 단일 TODO 조회
//  - 3) userId로 TODO 목록 필터링
//  - 4) 받은 데이터를 파일로 저장(tmp/lesson16)
// ===============================

const { f_pause, getRandomEmoji } = require('../utils');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ✅ 사용할 공공 테스트 API (무료 샘플용)
//   실제 서비스는 아니지만 REST/JSON 패턴 연습에 매우 자주 쓰이는 API입니다.
const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

// Node 24.7.0 이상에서는 fetch가 전역 제공 (별도 npm 설치 필요 없음)

/**
 * tmp/lesson16 폴더에 JSON 저장
 */
function saveJson(label, data) {
    const dir = path.join(__dirname, '..', 'tmp', 'lesson16');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    const safeLabel = String(label).replace(/[^0-9A-Za-z_-]+/g, '_');
    const filePath = path.join(dir, `todos_${safeLabel}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`💾 JSON 데이터를 파일로 저장했습니다: ${filePath}`);
}

/**
 * readline 질문 헬퍼
 */
function createAsk(rl) {
    return (question) =>
        new Promise((resolve) => {
            rl.question(question, (answer) => {
                resolve(answer.trim());
            });
        });
}

/**
 * TODO 일부를 예쁘게 출력하는 헬퍼
 */
function printTodoSummary(todos, limit = 5) {
    if (!todos || todos.length === 0) {
        console.log('⚠ 조회된 TODO 데이터가 없습니다.\n');
        return;
    }

    const sliced = todos.slice(0, limit);
    console.log(`총 ${todos.length}개 중 앞 ${sliced.length}개만 출력합니다.\n`);

    sliced.forEach((t, idx) => {
        console.log(`${getRandomEmoji()} [#${idx + 1}] ID=${t.id}, userId=${t.userId}`);
        console.log(`   - title    : ${t.title}`);
        console.log(`   - completed: ${t.completed}`);
        console.log('');
    });
}

/**
 * 단일 TODO를 출력하는 헬퍼
 */
function printSingleTodo(todo) {
    if (!todo || !todo.id) {
        console.log('⚠ 해당 ID에 대한 TODO가 없습니다.');
        return;
    }
    console.log(`${getRandomEmoji()} 단일 TODO 조회 결과`);
    console.log(`   - id       : ${todo.id}`);
    console.log(`   - userId   : ${todo.userId}`);
    console.log(`   - title    : ${todo.title}`);
    console.log(`   - completed: ${todo.completed}`);
    console.log('');
}

// ===============================
// main run
// ===============================
async function run(outerRl) {
    console.log('📚 레슨 16: fetch로 JSONPlaceholder TODO 데이터 받아오기');
    console.log('='.repeat(70));
    console.log('');

    // 🔹 외부에서 rl을 넘겨주면 그걸 사용, 없으면 새로 만든다
    const rl = outerRl || readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const ask = createAsk(rl);

    let running = true;

    while (running) {
        console.log('🔸 조회 방식 선택');
        console.log('-'.repeat(70));
        console.log('  1) 전체 TODO 목록 일부 조회');
        console.log('  2) ID로 단일 TODO 조회');
        console.log('  3) userId로 TODO 목록 필터링');
        console.log('  4) 전체 TODO를 받아서 파일로 저장');
        console.log('  0) 레슨 종료 (메인 메뉴로 돌아가기)');
        console.log('-'.repeat(70));

        console.log('');
        const choice = await ask('원하는 번호를 입력하세요: ');
        console.log('');

        switch (choice) {
            case '1':
                await scenarioListSomeTodos(rl);
                break;
            case '2':
                await scenarioGetTodoById(ask, rl);
                break;
            case '3':
                await scenarioFilterByUserId(ask, rl);
                break;
            case '4':
                await scenarioSaveAllTodos(rl);
                break;
            case '0':
                running = false;
                break;
            default:
                console.log('⚠ 올바른 번호를 입력해 주세요.\n');
                await f_pause(rl);
                break;
        }
    }

    console.log('\n레슨 16을 종료합니다. (메인 메뉴로 돌아갑니다)');

    // 🔹 outerRl이 없어서 우리가 직접 만든 rl이면 여기서 닫고,
    //    외부에서 받은 rl이면 닫지 않는다.
    if (!outerRl) {
        rl.close();
    }
}

/**
 * 1) 전체 TODO 목록 일부 조회
 */
async function scenarioListSomeTodos(rl) {
    console.log('📝 1) 전체 TODO 목록 일부 조회');
    console.log('-'.repeat(70));

    try {
        console.log(`📡 요청 URL: ${BASE_URL}`);
        const res = await fetch(BASE_URL);
        console.log('HTTP 상태 코드:', res.status, res.statusText);

        if (!res.ok) {
            throw new Error(`요청 실패: HTTP ${res.status} ${res.statusText}`);
        }

        const todos = await res.json();

        console.log('');
        printTodoSummary(todos, 10);
    } catch (err) {
        console.log('❌ API 호출 중 오류 발생:', err.message);
    }

    await f_pause(rl);
}

/**
 * 2) ID로 단일 TODO 조회
 */
async function scenarioGetTodoById(ask, rl) {
    console.log('🔍 2) ID로 단일 TODO 조회');
    console.log('-'.repeat(70));

    const idInput = await ask('조회할 TODO ID를 입력하세요 (예: 1 ~ 200): ');
    const id = Number(idInput);

    if (!id || id <= 0) {
        console.log('\n⚠ 올바른 숫자 ID를 입력해 주세요.\n');
        await f_pause(rl);
        return;
    }

    const url = `${BASE_URL}/${id}`;

    try {
        console.log(`\n📡 요청 URL: ${url}`);
        const res = await fetch(url);
        console.log('HTTP 상태 코드:', res.status, res.statusText);

        if (!res.ok) {
            throw new Error(`요청 실패: HTTP ${res.status} ${res.statusText}`);
        }

        const todo = await res.json();
        console.log('');
        printSingleTodo(todo);
    } catch (err) {
        console.log('❌ API 호출 중 오류 발생:', err.message);
    }

    await f_pause(rl);
}

/**
 * 3) userId로 TODO 목록 필터링
 */
async function scenarioFilterByUserId(ask, rl) {
    console.log('👤 3) userId로 TODO 목록 필터링');
    console.log('-'.repeat(70));

    const userIdInput = await ask('조회할 userId를 입력하세요 (예: 1 ~ 10): ');
    const userId = Number(userIdInput);

    if (!userId || userId <= 0) {
        console.log('\n⚠ 올바른 숫자 userId를 입력해 주세요.\n');
        await f_pause(rl);
        return;
    }

    const url = `${BASE_URL}?userId=${userId}`;

    try {
        console.log(`\n📡 요청 URL: ${url}`);
        const res = await fetch(url);
        console.log('HTTP 상태 코드:', res.status, res.statusText);

        if (!res.ok) {
            throw new Error(`요청 실패: HTTP ${res.status} ${res.statusText}`);
        }

        const todos = await res.json();
        console.log('');
        printTodoSummary(todos, 10);

        saveJson(`userId_${userId}`, todos);
    } catch (err) {
        console.log('❌ API 호출 중 오류 발생:', err.message);
    }

    await f_pause(rl);
}

/**
 * 4) 전체 TODO를 받아서 파일로 저장
 */
async function scenarioSaveAllTodos(rl) {
    console.log('💾 4) 전체 TODO를 받아서 파일로 저장');
    console.log('-'.repeat(70));

    try {
        console.log(`📡 요청 URL: ${BASE_URL}`);
        const res = await fetch(BASE_URL);
        console.log('HTTP 상태 코드:', res.status, res.statusText);

        if (!res.ok) {
            throw new Error(`요청 실패: HTTP ${res.status} ${res.statusText}`);
        }

        const todos = await res.json();
        console.log(`\n총 ${todos.length}개의 TODO를 받아왔습니다.`);
        saveJson('all', todos);
    } catch (err) {
        console.log('❌ API 호출 중 오류 발생:', err.message);
    }

    await f_pause(rl);
}

// ===============================
// 모듈 내보내기
// ===============================
module.exports = { run };
