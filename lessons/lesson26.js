// lesson26.js
// ===============================
// 레슨 26: 간단한 사용자 인증 흐름 시뮬레이션
//  - users.json 파일에 사용자 저장
//  - 회원 가입 / 로그인 / 로그아웃 / 상태 확인
//  - 비밀번호는 학습용으로 평문 저장 (실무 X)
// ===============================

const fs = require('fs');
const path = require('path');
const {
    f_pause,
    getRandomEmoji,
    f_printCodeBlock,
    isNonEmptyString,
    isEmail,
} = require('../utils');

// ------------------------------------------
// 데이터 파일 경로
// ------------------------------------------
const DATA_DIR = path.join(__dirname, '..', 'tmp', 'lesson26');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// 메모리 상 사용자 목록 & 현재 로그인 정보
let users = [];          // { id, email, password, createdAt }
let currentUser = null;  // { id, email, createdAt }

// ------------------------------------------
// 공용 질문 함수
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
// 초기 로딩: users.json 읽기
// ------------------------------------------
async function loadUsers() {
    try {
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }

        if (!fs.existsSync(USERS_FILE)) {
            users = [];
            await saveUsers();
            return;
        }

        // Read JSON file into string
        const text = await fs.promises.readFile(USERS_FILE, 'utf-8');

        // Parse JSON string into JavaScript object { id, email, password, createdAt }
        users = JSON.parse(text);

    } catch (err) {
        console.log('⚠ 사용자 목록을 읽는 중 오류가 발생했습니다. 빈 목록으로 시작합니다.');
        console.log('   오류 메시지:', err.message);
        users = [];
    }
}

// ------------------------------------------
// users.json 저장
// ------------------------------------------
async function saveUsers() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    const text = JSON.stringify(users, null, 2); // Make JSON readable with indentation (2 spaces)
    await fs.promises.writeFile(USERS_FILE, text, 'utf-8');
}

// ------------------------------------------
// ID 생성 (간단한 max + 1 방식)
// ------------------------------------------
function generateUserId() {
    if (users.length === 0) return 1;
    const maxId = users.reduce((max, u) => (u.id > max ? u.id : max), users[0].id);
    return maxId + 1;
}

// ------------------------------------------
// 메뉴 출력
// ------------------------------------------
function showMenu() {
    console.clear();
    const emoji = getRandomEmoji();

    console.log('=========================================');
    console.log(`   ${emoji} 레슨 26: 간단한 사용자 인증 흐름 ${emoji}`);
    console.log('=========================================\n');

    console.log(' 1) 회원 목록(요약) 보기');
    console.log(' 2) 회원 가입 (Sign Up)');
    console.log(' 3) 로그인 (Login)');
    console.log(' 4) 현재 로그인 상태 확인');
    console.log(' 5) 로그아웃 (Logout)');
    console.log(' 0) 레슨 종료 (메인 메뉴로 돌아가기)');
    console.log('-----------------------------------------');
}

// ------------------------------------------
// 1) 회원 목록(요약) 보기
// ------------------------------------------
async function handleListUsers(rl) {
    console.log('\n🔹 1) 회원 목록(요약) 보기');
    console.log('-----------------------------------------');

    if (users.length === 0) {
        console.log('등록된 사용자가 없습니다.');
        await f_pause(rl);
        return;
    }

    console.log('총 사용자 수:', users.length);
    console.log('');

    users.forEach((u) => {
        console.log(`- [id=${u.id}] email=${u.email}, createdAt=${u.createdAt}`);
    });

    await f_pause(rl);
}

// ------------------------------------------
// 2) 회원 가입
// ------------------------------------------
async function handleSignUp(ask, rl) {
    console.log('\n🔹 2) 회원 가입 (Sign Up)');
    console.log('-----------------------------------------');

    f_printCodeBlock(
        '간단한 회원 데이터 구조',
        `{
  id: 1,
  email: 'user@example.com',
  password: 'plain-text-password', // ⚠ 학습용 (실무에서는 해시 필요)
  createdAt: '2025-12-01T12:34:56.789Z'
}`
    );

    const email = await ask('이메일 주소를 입력하세요: ');
    const password = await ask('비밀번호를 입력하세요: ');

    // 간단한 유효성 검사
    if (!isEmail(email)) {
        console.log('\n⚠ 유효하지 않은 이메일 형식입니다.');
        await f_pause(rl);
        return;
    }

    if (!isNonEmptyString(password) || password.length < 4) {
        console.log('\n⚠ 비밀번호는 최소 4자 이상 입력해 주세요.');
        await f_pause(rl);
        return;
    }

    // 중복 이메일 체크
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
        console.log('\n⚠ 이미 등록된 이메일입니다.');
        await f_pause(rl);
        return;
    }

    const newUser = {
        id: generateUserId(),
        email,
        password, // ⚠ 실무라면 bcrypt 같은 해시 함수 사용 필수
        createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await saveUsers();

    console.log('\n✅ 회원 가입이 완료되었습니다!');
    console.log(`   [id=${newUser.id}] email=${newUser.email}`);
    await f_pause(rl);
}

// ------------------------------------------
// 3) 로그인
// ------------------------------------------
async function handleLogin(ask, rl) {
    console.log('\n🔹 3) 로그인 (Login)');
    console.log('-----------------------------------------');

    if (currentUser) {
        console.log(`이미 로그인 중입니다: ${currentUser.email}`);
        console.log('먼저 로그아웃 후 다시 시도해 주세요.');
        await f_pause(rl);
        return;
    }

    const email = await ask('이메일: ');
    const password = await ask('비밀번호: ');

    const found = users.find(
        (u) =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
    );

    if (!found) {
        console.log('\n⚠ 이메일 또는 비밀번호가 올바르지 않습니다.');
        await f_pause(rl);
        return;
    }

    currentUser = {
        id: found.id,
        email: found.email,
        createdAt: found.createdAt,
    };

    console.log('\n✅ 로그인 성공!');
    console.log(`   환영합니다, ${currentUser.email} 님 😊`);
    await f_pause(rl);
}

// ------------------------------------------
// 4) 현재 로그인 상태 확인
// ------------------------------------------
async function handleStatus(rl) {
    console.log('\n🔹 4) 현재 로그인 상태 확인');
    console.log('-----------------------------------------');

    if (!currentUser) {
        console.log('현재 로그인된 사용자가 없습니다.');
    } else {
        console.log('현재 로그인한 사용자:');
        console.log(`  id       : ${currentUser.id}`);
        console.log(`  email    : ${currentUser.email}`);
        console.log(`  createdAt: ${currentUser.createdAt}`);
    }

    await f_pause(rl);
}

// ------------------------------------------
// 5) 로그아웃
// ------------------------------------------
async function handleLogout(rl) {
    console.log('\n🔹 5) 로그아웃 (Logout)');
    console.log('-----------------------------------------');

    if (!currentUser) {
        console.log('현재 로그인된 사용자가 없습니다.');
        await f_pause(rl);
        return;
    }

    console.log(`로그아웃합니다: ${currentUser.email}`);
    currentUser = null;

    console.log('✅ 로그아웃이 완료되었습니다.');
    await f_pause(rl);
}

// ------------------------------------------
// main run
// ------------------------------------------
async function run(rl) {
    console.log('📚 레슨 26: 간단한 사용자 인증 흐름 시뮬레이션');
    console.log('='.repeat(70));
    console.log('');

    const ask = createAsk(rl);

    // 기존 사용자 목록 로드
    await loadUsers();

    let running = true;

    while (running) {
        showMenu();

        const choice = await ask('\n원하는 번호를 입력하세요: ');
        console.log('');

        switch (choice) {
            case '1':
                await handleListUsers(rl);
                break;
            case '2':
                await handleSignUp(ask, rl);
                break;
            case '3':
                await handleLogin(ask, rl);
                break;
            case '4':
                await handleStatus(rl);
                break;
            case '5':
                await handleLogout(rl);
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

    console.log('\n레슨 26을 종료합니다. (메인 메뉴로 돌아갑니다)');
}

module.exports = { run };
