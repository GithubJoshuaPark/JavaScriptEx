// ===============================
// 레슨 2: 템플릿 리터럴로 문자열 조합하기
// ===============================

const { f_pause } = require('../utils');

async function run(outerRl) {
    console.log('📚 레슨 2: 템플릿 리터럴로 문자열 조합하기');
    console.log('='.repeat(50));
    console.log('');

    // =============================
    // 1. 기존 문자열 연결 방식 vs 템플릿 리터럴
    // =============================
    console.log('🔹 1. 기존 방식 vs 템플릿 리터럴');
    console.log('-'.repeat(50));

    const name = 'JavaScript';
    const version = 'ES6';

    // 기존 방식 (따옴표와 + 연산자 사용)
    const oldWay = 'Hello, ' + name + '! This is ' + version + '.';
    console.log('기존 방식: ' + oldWay);

    // 템플릿 리터럴 (백틱 ` 사용)
    const newWay = `Hello, ${name}! This is ${version}.`;
    console.log(`새로운 방식: ${newWay}`);

    console.log('');
    console.log('💡 템플릿 리터럴은 백틱(`)으로 감싸고, ${} 안에 변수를 넣습니다.');

    await f_pause(outerRl);

    // =============================
    // 2. 표현식 삽입 (Expression Interpolation)
    // =============================
    console.log('🔹 2. 표현식 삽입하기');
    console.log('-'.repeat(50));

    const price = 1000;
    const quantity = 3;

    // ${} 안에는 변수뿐만 아니라 연산식도 들어갈 수 있습니다.
    console.log(`가격: ${price}원`);
    console.log(`수량: ${quantity}개`);
    console.log(`총액: ${price * quantity}원 (연산 결과)`);

    const isMember = true;
    console.log(`회원 여부: ${isMember ? '회원입니다 🙆‍♂️' : '비회원입니다 🙅‍♂️'} (삼항 연산자)`);

    await f_pause(outerRl);

    // =============================
    // 3. 멀티라인 문자열 (Multi-line Strings)
    // =============================
    console.log('🔹 3. 멀티라인 문자열 (줄바꿈)');
    console.log('-'.repeat(50));

    // 기존 방식: \n을 사용해야 함
    const oldMulti = '줄바꿈을 하려면\n' +
        '이스케이프 문자를\n' +
        '써야 했습니다.';
    console.log('[기존 방식]');
    console.log(oldMulti);
    console.log('');

    // 템플릿 리터럴: 엔터키로 줄바꿈 가능
    const newMulti = `템플릿 리터럴은
그냥 엔터를 치면
그대로 줄바꿈이
반영됩니다! 👍`;
    console.log('[템플릿 리터럴]');
    console.log(newMulti);

    await f_pause(outerRl);

    // =============================
    // 4. 함수 호출 결과 삽입
    // =============================
    console.log('🔹 4. 함수 호출 결과 삽입');
    console.log('-'.repeat(50));

    function getGreeting(time) {
        if (time < 12) return '좋은 아침입니다 ☀️';
        if (time < 18) return '좋은 오후입니다 🌤️';
        return '좋은 저녁입니다 🌙';
    }

    const currentHour = new Date().getHours();

    console.log(`현재 시간은 ${currentHour}시 입니다.`);
    console.log(`인사말: ${getGreeting(currentHour)}`);

    console.log('');
    console.log('='.repeat(50));
    console.log('✅ 레슨 2를 완료했습니다!');
}

// ===============================
// 모듈 내보내기
// ===============================
module.exports = { run };
