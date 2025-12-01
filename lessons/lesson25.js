// lesson25.js
// ===============================
// 레슨 25: 유효성 검사 함수 세트 만들기
//  - utils.js에 만든 유효성 함수들을 실습
//  - loop + showMenu 구조
//  - 문자열, 숫자, 정수 범위, 이메일, 휴대폰, 날짜 형식 검사
// ===============================

const {
    f_pause,
    getRandomEmoji,
    f_printCodeBlock,
    isNonEmptyString,
    isNumberString,
    isIntegerString,
    isIntInRange,
    isEmail,
    isKoreanPhone,
    isValidDateYYYYMMDD,
} = require('../utils');

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
// 메뉴 출력
// ------------------------------------------
function showMenu() {
    console.clear();
    const emoji = getRandomEmoji();

    console.log('=========================================');
    console.log(`   ${emoji} 레슨 25: 유효성 검사 함수 세트 ${emoji}`);
    console.log('=========================================\n');

    console.log(' 1) 비어있지 않은 문자열인지 검사');
    console.log(' 2) 숫자(정수/실수) 입력인지 검사');
    console.log(' 3) 정수 + 범위(1~100) 검사');
    console.log(' 4) 이메일 형식 검사');
    console.log(' 5) 휴대폰 번호(한국) 형식 검사');
    console.log(' 6) 날짜 형식(YYYYMMDD) 검사');
    console.log(' 0) 레슨 종료 (메인 메뉴로 돌아가기)');
    console.log('-----------------------------------------');
}

// ------------------------------------------
// 1) 비어있지 않은 문자열 검사
// ------------------------------------------
async function handleNonEmptyString(ask, rl) {
    console.log('\n🔹 1) 비어있지 않은 문자열인지 검사');
    console.log('-----------------------------------------');

    f_printCodeBlock(
        'isNonEmptyString 사용 예',
        `isNonEmptyString('hello');   // true
        isNonEmptyString('   ');      // false
        isNonEmptyString('');         // false`
    );

    const input = await ask('검사할 문자열을 입력하세요: ');

    const ok = isNonEmptyString(input);
    console.log('\n결과:', ok ? '✅ 비어있지 않은 문자열입니다.' : '⚠ 비어있거나 공백뿐인 문자열입니다.');
    await f_pause(rl);
}

// ------------------------------------------
// 2) 숫자(정수/실수) 검사
// ------------------------------------------
async function handleNumberString(ask, rl) {
    console.log('\n🔹 2) 숫자(정수/실수) 입력인지 검사');
    console.log('-----------------------------------------');

    f_printCodeBlock(
        'isNumberString 사용 예',
        `isNumberString('123');    // true
        isNumberString('-3.14');  // true
        isNumberString('abc');    // false
        isNumberString('');       // false`
    );

    const input = await ask('검사할 값을 입력하세요: ');

    const ok = isNumberString(input);
    console.log('\n결과:', ok ? '✅ 숫자 형태의 입력입니다.' : '⚠ 숫자가 아닙니다.');
    await f_pause(rl);
}

// ------------------------------------------
// 3) 정수 + 범위(1~100) 검사
// ------------------------------------------
async function handleIntRange(ask, rl) {
    console.log('\n🔹 3) 정수 + 범위(1 ~ 100) 검사');
    console.log('-----------------------------------------');

    f_printCodeBlock(
        'isIntegerString / isIntInRange 사용 예',
        `isIntegerString('10');         // true
        isIntInRange('10', 1, 100);    // true
        isIntInRange('0', 1, 100);     // false (범위 밖)
        isIntInRange('3.14', 1, 100);  // false (정수 아님)`
    );

    const input = await ask('1 ~ 100 사이의 정수를 입력하세요: ');

    if (!isIntegerString(input)) {
        console.log('\n결과: ⚠ 정수 형태의 입력이 아닙니다.');
        await f_pause(rl);
        return;
    }

    const ok = isIntInRange(input, 1, 100);
    console.log('\n결과:', ok ? '✅ 1 ~ 100 범위의 정수입니다.' : '⚠ 정수이지만 1 ~ 100 범위를 벗어났습니다.');
    await f_pause(rl);
}

// ------------------------------------------
// 4) 이메일 형식 검사
// ------------------------------------------
async function handleEmail(ask, rl) {
    console.log('\n🔹 4) 이메일 형식 검사');
    console.log('-----------------------------------------');

    f_printCodeBlock(
        'isEmail 사용 예',
        `isEmail('user@example.com'); // true
        isEmail('user@');            // false
        isEmail('abc');              // false`
    );

    const input = await ask('검사할 이메일 주소를 입력하세요: ');

    const ok = isEmail(input);
    console.log('\n결과:', ok ? '✅ 유효한 이메일 형식입니다.' : '⚠ 이메일 형식이 올바르지 않습니다.');
    await f_pause(rl);
}

// ------------------------------------------
// 5) 휴대폰 번호(한국) 형식 검사
// ------------------------------------------
async function handleKoreanPhone(ask, rl) {
    console.log('\n🔹 5) 휴대폰 번호(한국) 형식 검사');
    console.log('-----------------------------------------');

    f_printCodeBlock(
        'isKoreanPhone 사용 예',
        `isKoreanPhone('01012345678');      // true
        isKoreanPhone('010-1234-5678');    // true
        isKoreanPhone('0191234567');       // true
        isKoreanPhone('1234');             // false`
    );

    const input = await ask('검사할 휴대폰 번호를 입력하세요 (예: 010-1234-5678): ');

    const ok = isKoreanPhone(input);
    console.log('\n결과:', ok ? '✅ 한국 휴대폰 번호 형식으로 유효합니다.' : '⚠ 유효한 휴대폰 번호 형식이 아닙니다.');
    await f_pause(rl);
}

// ------------------------------------------
// 6) 날짜 형식(YYYYMMDD) 검사
// ------------------------------------------
async function handleDate(ask, rl) {
    console.log('\n🔹 6) 날짜 형식(YYYYMMDD) 검사');
    console.log('-----------------------------------------');

    f_printCodeBlock(
        'isValidDateYYYYMMDD 사용 예',
        `isValidDateYYYYMMDD('2025-11-28'); // true
        isValidDateYYYYMMDD('20251128');   // true
        isValidDateYYYYMMDD('2025/02/30'); // false (없는 날짜)
        isValidDateYYYYMMDD('20251301');   // false (13월은 없음)`
    );

    const input = await ask('검사할 날짜를 입력하세요 (예: 2025-11-28 또는 20251128): ');

    const ok = isValidDateYYYYMMDD(input);
    console.log('\n결과:', ok ? '✅ 유효한 날짜입니다.' : '⚠ 유효하지 않은 날짜 형식이거나 존재하지 않는 날짜입니다.');
    await f_pause(rl);
}

// ------------------------------------------
// main run (loop + showMenu)
// ------------------------------------------
async function run(rl) {
    console.log('📚 레슨 25: 유효성 검사 함수 세트 만들기');
    console.log('='.repeat(70));
    console.log('');

    const ask = createAsk(rl);

    let running = true;

    while (running) {
        showMenu();

        const choice = await ask('\n원하는 번호를 입력하세요: ');
        console.log('');

        switch (choice) {
            case '1':
                await handleNonEmptyString(ask, rl);
                break;
            case '2':
                await handleNumberString(ask, rl);
                break;
            case '3':
                await handleIntRange(ask, rl);
                break;
            case '4':
                await handleEmail(ask, rl);
                break;
            case '5':
                await handleKoreanPhone(ask, rl);
                break;
            case '6':
                await handleDate(ask, rl);
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

    console.log('\n레슨 25를 종료합니다. (메인 메뉴로 돌아갑니다)');
}

module.exports = { run };
