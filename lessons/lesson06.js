// ===============================
// 레슨 6: 함수 선언문 vs 화살표 함수 비교
// ===============================

const { f_pause } = require('../utils');

async function run(outerRl) {
    console.log('📚 레슨 6: 함수 선언문 vs 화살표 함수 비교');
    console.log('='.repeat(50));
    console.log('');

    // =============================
    // 1. 함수 선언문 (Function Declaration)
    // =============================
    console.log('🔹 1. 함수 선언문 (Function Declaration)');
    console.log('-'.repeat(50));

    // 호이스팅(Hoisting) 확인: 선언하기 전에도 호출 가능
    console.log(`호출 결과: ${add(2, 3)} (선언 전 호출 가능)`);

    function add(a, b) {
        return a + b;
    }
    console.log('특징: 호이스팅이 되어 코드의 어디서든 호출할 수 있습니다.');

    await f_pause(outerRl);

    // =============================
    // 2. 함수 표현식 (Function Expression)
    // =============================
    console.log('🔹 2. 함수 표현식 (Function Expression)');
    console.log('-'.repeat(50));

    // subtract(5, 2); // ❌ 에러 발생! 표현식은 호이스팅되지 않음 (변수는 되지만 초기화 안됨)

    const subtract = function (a, b) {
        return a - b;
    };

    console.log(`호출 결과: ${subtract(5, 2)}`);
    console.log('특징: 변수에 할당된 이후에만 호출할 수 있습니다.');

    await f_pause(outerRl);

    // =============================
    // 3. 화살표 함수 (Arrow Function)
    // =============================
    console.log('🔹 3. 화살표 함수 (Arrow Function)');
    console.log('-'.repeat(50));

    // 기본 형태
    const multiply = (a, b) => {
        return a * b;
    };
    console.log(`기본 형태: ${multiply(3, 4)}`);

    // 단축 형태 (중괄호와 return 생략 가능 - 표현식이 하나일 때)
    const divide = (a, b) => a / b;
    console.log(`단축 형태 (return 생략): ${divide(10, 2)}`);

    // 매개변수가 하나일 때 (소괄호 생략 가능)
    const square = x => x * x;
    console.log(`매개변수 하나 (소괄호 생략): ${square(5)}`);

    await f_pause(outerRl);

    // =============================
    // 4. this 바인딩의 차이 (중요!)
    // =============================
    console.log('🔹 4. this 바인딩의 차이');
    console.log('-'.repeat(50));

    const user = {
        name: 'Soro',
        // 일반 함수 메서드: this는 호출한 객체(user)를 가리킴
        sayHi: function () {
            console.log(`[일반 함수] 안녕, 나는 ${this.name}야.`);
        },
        // 화살표 함수 메서드: this는 상위 스코프의 this를 가리킴 (여기서는 전역 또는 빈 객체)
        sayBye: () => {
            console.log(`[화살표 함수] 잘 가, 나는 ${this.name}야.`);
        }
    };

    user.sayHi(); // 정상 출력
    user.sayBye(); // undefined 출력 (Node.js 전역 스코프의 this에는 name이 없음)

    console.log('');
    console.log('💡 일반 함수는 "호출할 때" this가 결정되고,');
    console.log('   화살표 함수는 "선언될 때" 상위 스코프의 this를 그대로 씁니다.');
    console.log('   따라서 객체의 메서드로 화살표 함수를 쓰는 것은 주의해야 합니다!');

    console.log('');
    console.log('='.repeat(50));
    console.log('✅ 레슨 6을 완료했습니다!');
}

// ===============================
// 모듈 내보내기
// ===============================
module.exports = { run };
