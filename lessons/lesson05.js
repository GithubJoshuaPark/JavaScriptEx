// ===============================
// 레슨 5: 배열 기본 조작(map, filter) 실습
// ===============================

const { f_pause } = require('../utils');

async function run(outerRl) {
    console.log('📚 레슨 5: 배열 기본 조작(map, filter) 실습');
    console.log('='.repeat(50));
    console.log('');

    // =============================
    // 1. 배열 요소 추가/삭제 (push, pop, shift, unshift)
    // =============================
    console.log('🔹 1. 배열 요소 추가/삭제');
    console.log('-'.repeat(50));

    const fruits = ['Apple', 'Banana'];
    console.log('초기 배열:', fruits);

    // push: 끝에 추가
    fruits.push('Orange');
    console.log("push('Orange') 후:", fruits);

    // pop: 끝에서 제거
    const popped = fruits.pop();
    console.log(`pop() 결과: ${popped}`);
    console.log('pop() 후:', fruits);

    // unshift: 앞에 추가
    fruits.unshift('Strawberry');
    console.log("unshift('Strawberry') 후:", fruits);

    // shift: 앞에서 제거
    const shifted = fruits.shift();
    console.log(`shift() 결과: ${shifted}`);
    console.log('shift() 후:', fruits);

    await f_pause(outerRl);

    // =============================
    // 2. map (배열 변환)
    // =============================
    console.log('🔹 2. map() - 배열의 모든 요소를 변환');
    console.log('-'.repeat(50));

    const numbers = [1, 2, 3, 4, 5];
    console.log('원본 숫자:', numbers);

    // 각 숫자를 제곱하기
    const squared = numbers.map(num => num * num);
    console.log('제곱된 숫자 (map):', squared);

    // 각 숫자를 문자열로 변환하고 텍스트 붙이기
    const textNumbers = numbers.map(num => `No.${num}`);
    console.log('텍스트 변환 (map):', textNumbers);

    console.log('');
    console.log('💡 map은 원본 배열을 변경하지 않고 새로운 배열을 반환합니다.');

    await f_pause(outerRl);

    // =============================
    // 3. filter (조건에 맞는 요소만 추출)
    // =============================
    console.log('🔹 3. filter() - 조건에 맞는 요소만 필터링');
    console.log('-'.repeat(50));

    const scores = [85, 42, 90, 55, 78, 95];
    console.log('전체 점수:', scores);

    // 80점 이상인 점수만 골라내기
    const highScores = scores.filter(score => score >= 80);
    console.log('80점 이상 (filter):', highScores);

    // 짝수만 골라내기
    const evenScores = scores.filter(score => score % 2 === 0);
    console.log('짝수 점수 (filter):', evenScores);

    await f_pause(outerRl);

    // =============================
    // 4. 메서드 체이닝 (Chaining)
    // =============================
    console.log('🔹 4. 메서드 체이닝 (map + filter)');
    console.log('-'.repeat(50));

    const products = [
        { name: 'Laptop', price: 1000 },
        { name: 'Mouse', price: 20 },
        { name: 'Keyboard', price: 50 },
        { name: 'Monitor', price: 200 }
    ];

    console.log('전체 상품:', products);

    // 1. 가격이 100달러 이상인 제품만 필터링
    // 2. 제품 이름만 추출
    // 3. 대문자로 변환
    const expensiveProductNames = products
        .filter(product => product.price >= 100)
        .map(product => product.name.toUpperCase());

    console.log('100달러 이상 제품명 (대문자):', expensiveProductNames);

    console.log('');
    console.log('='.repeat(50));
    console.log('✅ 레슨 5를 완료했습니다!');
}

// ===============================
// 모듈 내보내기
// ===============================
module.exports = { run };
