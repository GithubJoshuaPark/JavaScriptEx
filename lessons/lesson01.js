// ===============================
// 레슨 1: 변수 선언과 데이터 타입 출력하기
// ===============================

const { f_pause } = require('../utils');

async function run() {
    console.log('📚 레슨 1: 변수 선언과 데이터 타입 출력하기');
    console.log('='.repeat(50));
    console.log('');

    // =============================
    // 1. 변수 선언 방법 (var, let, const)
    // =============================
    console.log('🔹 1. 변수 선언 방법');
    console.log('-'.repeat(50));

    // var: 함수 스코프, 재선언 가능, 호이스팅
    var name1 = 'Alice';
    console.log('var name1 =', name1);

    // let: 블록 스코프, 재할당 가능, 재선언 불가
    let name2 = 'Bob';
    console.log('let name2 =', name2);
    name2 = 'Charlie'; // 재할당 가능
    console.log('name2 (재할당 후) =', name2);

    // const: 블록 스코프, 재할당 불가, 재선언 불가
    const name3 = 'David';
    console.log('const name3 =', name3);
    // name3 = 'Eve'; // ❌ 에러 발생! const는 재할당 불가

    await f_pause();

    // =============================
    // 2. 기본 데이터 타입 (Primitive Types)
    // =============================
    console.log('🔹 2. 기본 데이터 타입 (Primitive Types)');
    console.log('-'.repeat(50));

    // String (문자열)
    const str = 'Hello, JavaScript!';
    console.log('String:', str, '→ typeof:', typeof str);

    // Number (숫자)
    const num = 42;
    const floatNum = 3.14;
    console.log('Number (정수):', num, '→ typeof:', typeof num);
    console.log('Number (실수):', floatNum, '→ typeof:', typeof floatNum);

    // Boolean (불리언)
    const isTrue = true;
    const isFalse = false;
    console.log('Boolean (true):', isTrue, '→ typeof:', typeof isTrue);
    console.log('Boolean (false):', isFalse, '→ typeof:', typeof isFalse);

    // Undefined (정의되지 않음)
    let undefinedVar;
    console.log('Undefined:', undefinedVar, '→ typeof:', typeof undefinedVar);

    // Null (빈 값)
    const nullVar = null;
    console.log('Null:', nullVar, '→ typeof:', typeof nullVar, '(주의: object로 표시됨)');

    // Symbol (ES6+, 고유한 식별자)
    const sym = Symbol('unique');
    console.log('Symbol:', sym.toString(), '→ typeof:', typeof sym);

    // BigInt (ES2020+, 큰 정수)
    const bigNum = 9007199254740991n;
    console.log('BigInt:', bigNum, '→ typeof:', typeof bigNum);

    await f_pause();

    // =============================
    // 3. 참조 데이터 타입 (Reference Types)
    // =============================
    console.log('🔹 3. 참조 데이터 타입 (Reference Types)');
    console.log('-'.repeat(50));

    // Object (객체)
    const person = {
        name: 'John',
        age: 30,
        city: 'Seoul'
    };
    console.log('Object:', person, '→ typeof:', typeof person);

    // Array (배열)
    const colors = ['red', 'green', 'blue'];
    console.log('Array:', colors, '→ typeof:', typeof colors, '(배열도 object)');
    console.log('Array.isArray():', Array.isArray(colors)); // 배열 확인

    // Function (함수)
    const greet = function () {
        return 'Hello!';
    };
    console.log('Function:', greet, '→ typeof:', typeof greet);

    await f_pause();

    // =============================
    // 4. 타입 변환 (Type Conversion)
    // =============================
    console.log('🔹 4. 타입 변환 예제');
    console.log('-'.repeat(50));

    // 문자열 → 숫자
    const strNum = '123';
    const convertedNum = Number(strNum);
    console.log(`'${strNum}' (string) → ${convertedNum} (number)`);

    // 숫자 → 문자열
    const numValue = 456;
    const convertedStr = String(numValue);
    console.log(`${numValue} (number) → '${convertedStr}' (string)`);

    // Boolean 변환
    console.log('Boolean(1):', Boolean(1)); // true
    console.log('Boolean(0):', Boolean(0)); // false
    console.log('Boolean(""):', Boolean('')); // false
    console.log('Boolean("hello"):', Boolean('hello')); // true

    await f_pause();

    // =============================
    // 5. 변수 선언 비교 요약
    // =============================
    console.log('🔹 5. 변수 선언 비교 요약');
    console.log('-'.repeat(50));
    console.log('┌──────────┬────────────┬──────────┬──────────┐');
    console.log('│ 선언방식 │ 스코프     │ 재할당   │ 재선언   │');
    console.log('├──────────┼────────────┼──────────┼──────────┤');
    console.log('│ var      │ 함수       │ 가능     │ 가능     │');
    console.log('│ let      │ 블록       │ 가능     │ 불가     │');
    console.log('│ const    │ 블록       │ 불가     │ 불가     │');
    console.log('└──────────┴────────────┴──────────┴──────────┘');

    console.log('');
    console.log('='.repeat(50));
    console.log('✅ 레슨 1을 완료했습니다!');
    console.log('💡 권장: 현대 JavaScript에서는 const를 기본으로 사용하고,');
    console.log('   재할당이 필요한 경우에만 let을 사용하세요.');
}

// ===============================
// 모듈 내보내기
// ===============================
module.exports = { run };
