// lesson29.js
// ===============================
// 레슨 29: 함수형 프로그래밍 기초(map, reduce)
//  - map / filter / reduce / find / some / every
//  - 실전형 예제로 감각 잡기
//  - loop + showMenu 구조
// ===============================

const {
    f_pause,
    getRandomEmoji,
    f_printCodeBlock,
} = require('../utils');

// ------------------------------------------
// 질문 헬퍼
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

    console.log('====================================================');
    console.log(`   ${emoji} 레슨 29: 함수형 프로그래밍 기초 (map, reduce) ${emoji}`);
    console.log('====================================================\n');

    console.log(' 1) map 기본 예제');
    console.log(' 2) filter 기본 예제');
    console.log(' 3) reduce 기본 예제 (총합 / 평균)');
    console.log(' 4) 실전 예제: 주문 금액 합산');
    console.log(' 5) some / every / find 예제');
    console.log(' 6) map + filter + reduce 조합 예제');
    console.log(' 0) 레슨 종료 (메인 메뉴로 돌아가기)');
    console.log('----------------------------------------------------');
}

// ------------------------------------------
// 1) map 기본
// ------------------------------------------
function demoMap() {
    console.log('\n🔹 1) map 기본 사용법');
    console.log('----------------------------------------------------');

    f_printCodeBlock(
        'map 기본 예시',
        `const nums = [1, 2, 3, 4];
const doubled = nums.map(n => n * 2);
console.log(doubled); // [2,4,6,8]`
    );

    const nums = [1, 2, 3, 4];
    console.log('원본:', nums);
    console.log('모두 2배:', nums.map(n => n * 2));
    console.log('모두 문자열로:', nums.map(n => 'num=' + n));
}

// ------------------------------------------
// 2) filter 기본
// ------------------------------------------
function demoFilter() {
    console.log('\n🔹 2) filter 기본 사용법');
    console.log('----------------------------------------------------');

    f_printCodeBlock(
        'filter 기본 예시',
        `const nums = [1,2,3,4,5,6];
nums.filter(n => n % 2 === 0); // [2,4,6]`
    );

    const nums = [1, 2, 3, 4, 5, 6];
    console.log('원본:', nums);
    console.log('짝수만:', nums.filter(n => n % 2 === 0));
    console.log('3보다 큰 숫자만:', nums.filter(n => n > 3));
}

// ------------------------------------------
// 3) reduce 기본
// ------------------------------------------
function demoReduce() {
    console.log('\n🔹 3) reduce 기본 사용법 (총합 / 평균)');
    console.log('----------------------------------------------------');

    f_printCodeBlock(
        'reduce 예시',
        `const nums = [10,20,30];
nums.reduce((acc, cur) => acc + cur, 0); // 60`
    );

    const nums = [10, 20, 30, 40];
    const sum = nums.reduce((acc, cur) => acc + cur, 0);
    const avg = sum / nums.length;

    console.log('원본:', nums);
    console.log('총합:', sum);
    console.log('평균:', avg.toFixed(2));
}

// ------------------------------------------
// 4) 실전 예제: 주문 금액 합산
// ------------------------------------------
function demoOrderAmountSum() {
    console.log('\n🔹 4) 실전 예제: 주문 금액 합산');
    console.log('----------------------------------------------------');

    const orders = [
        { id: 101, price: 5000, qty: 2 },
        { id: 102, price: 15000, qty: 1 },
        { id: 103, price: 7000, qty: 3 },
    ];

    f_printCodeBlock(
        'reduce로 주문 총액 계산',
        `const total = orders.reduce((acc, order) => {
  return acc + order.price * order.qty;
}, 0);`
    );

    console.log('주문 목록:', orders);

    const total = orders.reduce(
        (acc, order) => acc + order.price * order.qty,
        0
    );

    console.log('총 결제 금액:', total.toLocaleString(), '원');
}

// ------------------------------------------
// 5) some / every / find
// ------------------------------------------
function demoSomeEveryFind() {
    console.log('\n🔹 5) some / every / find 예제');
    console.log('----------------------------------------------------');

    const arr = [3, 10, 20, -5, 7];

    console.log('원본 배열:', arr);
    console.log('some(양수?) →', arr.some(n => n > 0));
    console.log('every(양수?) →', arr.every(n => n > 0));
    console.log('find(첫 양수) →', arr.find(n => n > 0));

    f_printCodeBlock(
        'some / every / find 사용 예',
        `arr.some(n => n > 0);     // 1개라도 >0 이면 true
arr.every(n => n > 0);    // 모두 >0 이어야 true
arr.find(n => n > 0);     // 조건을 만족하는 첫 요소`
    );
}

// ------------------------------------------
// 6) map + filter + reduce 조합
// ------------------------------------------
function demoChain() {
    console.log('\n🔹 6) map + filter + reduce 조합 예제');
    console.log('----------------------------------------------------');

    f_printCodeBlock(
        'map → filter → reduce',
        `const nums = [1,2,3,4,5];

const result = nums
  .map(n => n * 10)     // [10,20,30,40,50]
  .filter(n => n >= 30) // [30,40,50]
  .reduce((acc, n) => acc + n, 0); // 120`
    );

    const nums = [1, 2, 3, 4, 5];

    const result = nums
        .map(n => n * 10)
        .filter(n => n >= 30)
        .reduce((acc, n) => acc + n, 0);

    console.log('nums:', nums);
    console.log('map → filter → reduce 결과:', result);
}

// ------------------------------------------
// main run (loop + menu)
// ------------------------------------------
async function run(rl) {
    console.log('📚 레슨 29: 함수형 프로그래밍 기초(map, reduce)');
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
                demoMap();
                await f_pause(rl);
                break;
            case '2':
                demoFilter();
                await f_pause(rl);
                break;
            case '3':
                demoReduce();
                await f_pause(rl);
                break;
            case '4':
                demoOrderAmountSum();
                await f_pause(rl);
                break;
            case '5':
                demoSomeEveryFind();
                await f_pause(rl);
                break;
            case '6':
                demoChain();
                await f_pause(rl);
                break;
            case '0':
                running = false;
                break;
            default:
                console.log('⚠ 올바른 번호를 입력하세요.');
                await f_pause(rl);
                break;
        }
    }

    console.log('='.repeat(70));
    console.log('✅ 레슨 29를 완료했습니다! 메인 메뉴로 돌아갑니다.');
}

module.exports = { run };
