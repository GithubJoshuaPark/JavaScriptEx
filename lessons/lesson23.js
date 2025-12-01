// lesson23.js
// ===============================
// 레슨 23: Todo List 데이터 관리 로직 (CRUD) 기초
//  - JSON 파일에 Todo 목록 저장/읽기
//  - loop + showMenu() 구조
//  - 목록, 추가, 완료 토글, 내용 수정, 삭제
// ===============================

const fs = require('fs');
const path = require('path');
const { f_pause, getRandomEmoji } = require('../utils');

// 데이터 파일 경로 설정
const DATA_DIR = path.join(__dirname, '..', 'tmp', 'lesson23');
const DATA_FILE = path.join(DATA_DIR, 'todos.json');

// 메모리 상의 Todo 리스트
let todos = [];

// ------------------------------------------
// 공용 질문 함수 (rl 사용)
// ------------------------------------------
function createAsk(rl) {
    return (question) =>
        new Promise((resolve) => {
            rl.question(question, (answer) => {
                resolve(answer.trim());
            });
        });
}

// ------------------------------------------
// JSON 파일에서 Todo 목록 로드
// ------------------------------------------
async function loadTodos() {
    try {
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }

        if (!fs.existsSync(DATA_FILE)) {
            todos = [];
            await saveTodos(); // 빈 배열로 초기 파일 생성
            return;
        }

        const text = await fs.promises.readFile(DATA_FILE, 'utf-8');
        todos = JSON.parse(text);
    } catch (err) {
        console.log('⚠ Todo 파일을 읽는 중 오류가 발생했습니다. 빈 목록으로 시작합니다.');
        console.log('   오류 메시지:', err.message);
        todos = [];
    }
}

// ------------------------------------------
// Todo 목록을 JSON 파일에 저장
// ------------------------------------------
async function saveTodos() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    const text = JSON.stringify(todos, null, 2);
    await fs.promises.writeFile(DATA_FILE, text, 'utf-8');
}

// ------------------------------------------
// 메뉴 출력
// ------------------------------------------
function showMenu() {
    console.clear();
    const emoji = getRandomEmoji();

    console.log('=========================================');
    console.log(`   ${emoji} 레슨 23: Todo List (CRUD 기초) ${emoji}`);
    console.log('=========================================\n');

    console.log(' 1) Todo 목록 보기');
    console.log(' 2) Todo 추가하기');
    console.log(' 3) 완료/미완료 토글');
    console.log(' 4) Todo 내용 수정하기');
    console.log(' 5) Todo 삭제하기');
    console.log(' 0) 레슨 종료 (메인 메뉴로 돌아가기)');
    console.log('-----------------------------------------');
}

// ------------------------------------------
// Todo 목록 출력
// ------------------------------------------
function printTodos() {
    console.log('\n📋 현재 Todo 목록');
    console.log('-----------------------------------------');

    if (todos.length === 0) {
        console.log('등록된 Todo가 없습니다.');
        return;
    }

    todos.forEach((todo) => {
        const status = todo.completed ? '✅' : '⬜';
        console.log(
            `${status} [${todo.id}] ${todo.title} (createdAt: ${todo.createdAt})`
        );
    });
}

// ------------------------------------------
// 새로운 ID 생성 (간단한 최대값 + 1 방식)
// ------------------------------------------
function generateId() {
    if (todos.length === 0) return 1;
    const maxId = todos.reduce((max, t) => (t.id > max ? t.id : max), todos[0].id);
    return maxId + 1;
}

// ------------------------------------------
// 1) Todo 목록 보기
// ------------------------------------------
async function handleList(rl) {
    console.log('\n🔹 1) Todo 목록 보기');
    console.log('-----------------------------------------');

    printTodos();
    await f_pause(rl);
}

// ------------------------------------------
// 2) Todo 추가하기
// ------------------------------------------
async function handleAdd(ask, rl) {
    console.log('\n🔹 2) Todo 추가하기');
    console.log('-----------------------------------------');

    const title = await ask('추가할 Todo 내용을 입력하세요: ');

    if (!title) {
        console.log('\n⚠ 내용이 비어 있습니다. 추가를 취소합니다.');
        await f_pause(rl);
        return;
    }

    const newTodo = {
        id: generateId(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
    };

    todos.push(newTodo);
    await saveTodos();

    console.log('\n✅ 새 Todo가 추가되었습니다:');
    console.log(newTodo);
    await f_pause(rl);
}

// ------------------------------------------
// 3) 완료/미완료 토글
// ------------------------------------------
async function handleToggle(ask, rl) {
    console.log('\n🔹 3) 완료/미완료 토글');
    console.log('-----------------------------------------');

    printTodos();
    if (todos.length === 0) {
        await f_pause(rl);
        return;
    }

    const idInput = await ask('\n완료 상태를 토글할 Todo ID를 입력하세요: ');
    const id = Number(idInput);

    if (!id || Number.isNaN(id)) {
        console.log('\n⚠ 올바른 숫자 ID를 입력해 주세요.');
        await f_pause(rl);
        return;
    }

    const todo = todos.find((t) => t.id === id);
    if (!todo) {
        console.log('\n⚠ 해당 ID의 Todo를 찾을 수 없습니다.');
        await f_pause(rl);
        return;
    }

    todo.completed = !todo.completed;
    await saveTodos();

    console.log('\n✅ 상태가 변경되었습니다:');
    console.log(
        `[${todo.id}] ${todo.title} → ${todo.completed ? '완료 ✅' : '미완료 ⬜'}`
    );
    await f_pause(rl);
}

// ------------------------------------------
// 4) Todo 내용 수정하기
// ------------------------------------------
async function handleEdit(ask, rl) {
    console.log('\n🔹 4) Todo 내용 수정하기');
    console.log('-----------------------------------------');

    printTodos();
    if (todos.length === 0) {
        await f_pause(rl);
        return;
    }

    const idInput = await ask('\n수정할 Todo ID를 입력하세요: ');
    const id = Number(idInput);

    if (!id || Number.isNaN(id)) {
        console.log('\n⚠ 올바른 숫자 ID를 입력해 주세요.');
        await f_pause(rl);
        return;
    }

    const todo = todos.find((t) => t.id === id);
    if (!todo) {
        console.log('\n⚠ 해당 ID의 Todo를 찾을 수 없습니다.');
        await f_pause(rl);
        return;
    }

    console.log(`\n현재 내용: ${todo.title}`);
    const newTitle = await ask('새로운 내용을 입력하세요 (빈 값이면 취소): ');

    if (!newTitle) {
        console.log('\n⚠ 내용이 비어 있어 수정이 취소되었습니다.');
        await f_pause(rl);
        return;
    }

    todo.title = newTitle;
    await saveTodos();

    console.log('\n✅ Todo 내용이 수정되었습니다:');
    console.log(`[${todo.id}] ${todo.title}`);
    await f_pause(rl);
}

// ------------------------------------------
// 5) Todo 삭제하기
// ------------------------------------------
async function handleDelete(ask, rl) {
    console.log('\n🔹 5) Todo 삭제하기');
    console.log('-----------------------------------------');

    printTodos();
    if (todos.length === 0) {
        await f_pause(rl);
        return;
    }

    const idInput = await ask('\n삭제할 Todo ID를 입력하세요: ');
    const id = Number(idInput);

    if (!id || Number.isNaN(id)) {
        console.log('\n⚠ 올바른 숫자 ID를 입력해 주세요.');
        await f_pause(rl);
        return;
    }

    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) {
        console.log('\n⚠ 해당 ID의 Todo를 찾을 수 없습니다.');
        await f_pause(rl);
        return;
    }

    const removed = todos.splice(index, 1)[0];
    await saveTodos();

    console.log('\n🗑 삭제된 Todo:');
    console.log(removed);
    await f_pause(rl);
}

// ------------------------------------------
// main run (loop + showMenu)
// ------------------------------------------
async function run(rl) {
    console.log('📚 레슨 23: Todo List 데이터 관리 로직 (CRUD) 기초');
    console.log('='.repeat(70));
    console.log('');

    const ask = createAsk(rl);

    // JSON 파일에서 기존 Todo 로드
    await loadTodos();

    let running = true;

    while (running) {
        showMenu();

        const choice = await ask('\n원하는 번호를 입력하세요: ');
        console.log('');

        switch (choice) {
            case '1':
                await handleList(rl);
                break;
            case '2':
                await handleAdd(ask, rl);
                break;
            case '3':
                await handleToggle(ask, rl);
                break;
            case '4':
                await handleEdit(ask, rl);
                break;
            case '5':
                await handleDelete(ask, rl);
                break;
            case '0':
                running = false;
                break;
            default:
                console.log('⚠ 올바른 번호를 입력해 주세요.');
                await f_pause(rl);
                break;
        }
    }

    console.log('='.repeat(70));
    console.log('✅ 레슨 23을 완료했습니다!(메인 메뉴로 돌아갑니다) \n');
}

module.exports = { run };
