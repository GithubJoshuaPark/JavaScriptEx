// ===============================
// 레슨 8: Scope와 Hoisting 동작 실험하기
// ===============================

const { f_pause } = require('../utils');

async function run(outerRl) {
    console.log('📚 레슨 8: Scope와 Hoisting 동작 실험하기');
    console.log('='.repeat(50));
    console.log('');

    // =============================
    // 1. 스코프의 종류 (Global, Function, Block)
    // =============================
    console.log('🔹 1. 스코프의 종류');
    console.log('-'.repeat(50));

    // 전역 스코프 (Global Scope)
    const globalVar = '전역 변수';
    console.log(`전역: ${globalVar}`);

    function testFunctionScope() {
        // 함수 스코프 (Function Scope)
        const functionVar = '함수 내부 변수';
        console.log(`함수 내부: ${functionVar}`);
        console.log(`함수 내부에서 전역 접근: ${globalVar}`);
    }
    testFunctionScope();

    // console.log(functionVar); // ❌ 에러! 함수 밖에서 접근 불가

    if (true) {
        // 블록 스코프 (Block Scope) - let, const만 해당
        const blockVar = '블록 내부 변수';
        console.log(`블록 내부: ${blockVar}`);
    }
    // console.log(blockVar); // ❌ 에러! 블록 밖에서 접근 불가

    await f_pause(outerRl);

    // =============================
    // 2. var vs let/const 스코프 차이
    // =============================
    console.log('🔹 2. var vs let/const 스코프 차이');
    console.log('-'.repeat(50));

    // var는 함수 스코프 (블록 무시)
    if (true) {
        var varTest = 'var는 블록을 무시';
    }
    console.log(`블록 밖에서 var 접근: ${varTest} ✅`);

    // let/const는 블록 스코프
    if (true) {
        let letTest = 'let은 블록 스코프';
        console.log(`블록 안에서 let 접근: ${letTest} ✅`);
    }
    // console.log(letTest); // ❌ 에러! 블록 밖에서 접근 불가

    console.log('');
    console.log('💡 var는 함수 스코프, let/const는 블록 스코프를 따릅니다.');

    await f_pause(outerRl);

    // =============================
    // 3. 호이스팅 (Hoisting) - var
    // =============================
    console.log('🔹 3. 호이스팅 (Hoisting) - var');
    console.log('-'.repeat(50));

    console.log(`선언 전 x 값: ${x}`); // undefined (호이스팅됨, 초기화는 안됨)
    var x = 10;
    console.log(`선언 후 x 값: ${x}`); // 10

    console.log('');
    console.log('💡 var는 선언이 호이스팅되지만 undefined로 초기화됩니다.');

    await f_pause(outerRl);

    // =============================
    // 4. 호이스팅 (Hoisting) - let/const
    // =============================
    console.log('🔹 4. 호이스팅 (Hoisting) - let/const');
    console.log('-'.repeat(50));

    // console.log(y); // ❌ ReferenceError! TDZ(Temporal Dead Zone)
    let y = 20;
    console.log(`선언 후 y 값: ${y}`);

    console.log('');
    console.log('💡 let/const도 호이스팅되지만, 선언 전까지 접근 불가 (TDZ).');

    await f_pause(outerRl);

    // =============================
    // 5. 함수 호이스팅
    // =============================
    console.log('🔹 5. 함수 호이스팅');
    console.log('-'.repeat(50));

    // 함수 선언문은 전체가 호이스팅됨
    console.log(`선언 전 호출: ${hoistedFunc()}`);

    function hoistedFunc() {
        return '함수 선언문은 호이스팅됩니다!';
    }

    // 함수 표현식은 변수 호이스팅 규칙을 따름
    // console.log(notHoisted()); // ❌ TypeError! (변수는 호이스팅되지만 undefined)
    const notHoisted = function () {
        return '함수 표현식은 호이스팅 안됨';
    };
    console.log(`선언 후 호출: ${notHoisted()}`);

    console.log('');
    console.log('='.repeat(50));
    console.log('✅ 레슨 8을 완료했습니다!');
}

// ===============================
// 모듈 내보내기
// ===============================
module.exports = { run };
