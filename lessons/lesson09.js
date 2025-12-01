// lesson09.js
// ===============================
// 레슨 9: Closure 이해를 위한 카운터 함수 만들기
// ===============================

const { f_pause, getRandomEmoji } = require('../utils');

async function run() {
    console.log('📚 레슨 9: Closure 이해를 위한 카운터 함수 만들기');
    console.log('='.repeat(50));
    console.log('');

    // =============================
    // 1. 문제 상황: 함수가 끝나도 값이 유지되면 좋겠다
    // =============================
    console.log('🔹 1. 문제 상황: 함수가 끝나도 값이 유지되면 좋겠다');
    console.log('-'.repeat(50));

    function wrongCounter() {
        let count = 0; // 매번 0으로 초기화
        count = count + 1;
        return count;
    }

    console.log('wrongCounter() 첫 번째 호출:', wrongCounter()); // 1
    console.log('wrongCounter() 두 번째 호출:', wrongCounter()); // 1
    console.log('wrongCounter() 세 번째 호출:', wrongCounter()); // 1
    console.log('');
    console.log('❗ 함수가 호출될 때마다 count가 다시 0부터 시작합니다.');
    console.log('   → "어딘가에 계속 쌓이는 값"을 유지하고 싶을 때는 이 방식이 부족합니다.');

    await f_pause();

    // =============================
    // 2. Closure를 이용한 카운터 만들기 (객체 버전)
    // =============================
    console.log('🔹 2. Closure를 이용한 카운터 만들기 (객체 버전)');
    console.log('-'.repeat(50));

    function createCounter() {
        let count = 0; // 외부에서 직접 접근할 수 없는 "은닉된 상태"

        // 이 객체 안의 함수들은 count를 계속 참조할 수 있습니다.
        return {
            increment() {
                count++;
                return count;
            },
            decrement() {
                count--;
                return count;
            },
            get() {
                return count;
            }
        };
    }

    const counterA = createCounter();
    const counterB = createCounter();

    console.log(`${getRandomEmoji()} counterA 동작`);
    console.log('counterA.increment():', counterA.increment()); // 1
    console.log('counterA.increment():', counterA.increment()); // 2
    console.log('counterA.get():      ', counterA.get());       // 2

    console.log('\n' + getRandomEmoji() + ' counterB 동작 (A와는 독립적인 상태)');
    console.log('counterB.increment():', counterB.increment()); // 1
    console.log('counterB.get():      ', counterB.get());       // 1

    console.log('\n💡 createCounter()를 호출할 때마다 "서로 다른 count 상태"를 가진 객체가 만들어집니다.');
    console.log('   이때, count 변수는 함수 밖에서는 직접 접근할 수 없습니다.');
    console.log('   하지만 반환된 메서드들이 count를 기억하고 사용하는데, 이것이 Closure입니다.');

    // 아래는 undefined 출력 (직접 접근 불가)
    console.log('\ncounterA.count 직접 접근:', counterA.count); // undefined
    console.log('➡ count는 완전히 숨겨져 있고, 오직 메서드로만 조작 가능합니다.');

    await f_pause();

    // =============================
    // 3. 더 간단한 Closure 카운터 (함수만 반환)
    // =============================
    console.log('🔹 3. 더 간단한 Closure 카운터 (함수만 반환)');
    console.log('-'.repeat(50));

    function simpleCounter() {
        let n = 0;
        return function () {
            n = n + 1;
            return n;
        };
    }

    const simpleA = simpleCounter();
    const simpleB = simpleCounter();

    console.log(`${getRandomEmoji()} simpleA 카운터`);
    console.log('simpleA():', simpleA()); // 1
    console.log('simpleA():', simpleA()); // 2
    console.log('simpleA():', simpleA()); // 3

    console.log('\n' + getRandomEmoji() + ' simpleB 카운터 (A와는 별개)');
    console.log('simpleB():', simpleB()); // 1
    console.log('simpleB():', simpleB()); // 2

    console.log('\n💡 simpleCounter()를 호출할 때마다 n이라는 "개인 상태"를 가진 함수가 하나씩 생성됩니다.');
    console.log('   이 반환된 함수가 n을 계속 기억하고 사용하는 것이 Closure입니다.');

    await f_pause();

    // =============================
    // 4. Arrow Function과 Closure
    // =============================
    console.log('🔹 4. Arrow Function과 Closure');
    console.log('-'.repeat(50));

    const makeArrowCounter = () => {
        let value = 0;
        return () => {
            value++;
            return value;
        };
    };

    const arrowCounter = makeArrowCounter();

    console.log('arrowCounter():', arrowCounter()); // 1
    console.log('arrowCounter():', arrowCounter()); // 2
    console.log('arrowCounter():', arrowCounter()); // 3

    console.log('\n✅ Arrow Function(화살표 함수)도 똑같이 Closure를 형성할 수 있습니다.');
    console.log('   핵심은 "외부에서 직접 접근할 수 없는 상태를, 내부 함수가 계속 기억하고 있는 것"입니다.');
    console.log('');
    console.log('='.repeat(50));
    console.log('✅ 레슨 9를 완료했습니다! (Closure + 카운터 패턴 이해)');
}

// ===============================
// 모듈 내보내기
// ===============================
module.exports = { run };
