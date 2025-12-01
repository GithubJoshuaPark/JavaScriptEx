// lesson22.js
// ===============================
// 레슨 22: npm 패키지(lodash) 설치 및 사용해 보기
//  - npm install lodash
//  - _.chunk, _.shuffle, _.uniq, _.sortBy, _.groupBy 실습
//  - require 방식으로 패키지 불러오기
// ===============================

const _ = require('lodash'); // npm 설치 필요
const { f_pause, getRandomEmoji } = require('../utils');

// ------------------------------------------
// 1) lodash 소개
// ------------------------------------------
function explainLodash() {
    console.log('🔹 1) lodash 소개');
    console.log('='.repeat(60));

    console.log(`
    lodash는 자바스크립트에서 가장 인기 있는 유틸리티 라이브러리입니다.

    주요 기능:
    - 배열 조작
    - 객체 조작
    - 문자열 처리
    - 깊은 복사, 클론 연산
    - 자료 변환 (map, groupBy, chunk 등)
    - 정렬 및 필터 유틸리티
    `);

    console.log(`
    설치 방법:
    npm install lodash

    사용 방법:
    const _ = require('lodash');
    `);
}

// ------------------------------------------
// 2) 배열 조각내기 _.chunk
// ------------------------------------------
function exampleChunk() {
    console.log('\n🔹 2) _.chunk 예제 (배열 조각내기)');
    console.log('='.repeat(60));

    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    const result = _.chunk(arr, 3);

    console.log('원본 배열:', arr);
    console.log('_.chunk(arr, 3):', result);
    console.log('// 3개씩 자르면 [[1,2,3], [4,5,6], [7,8]]');
}

// ------------------------------------------
// 3) _.shuffle (랜덤 섞기)
// ------------------------------------------
function exampleShuffle() {
    console.log('\n🔹 3) _.shuffle 예제 (배열 섞기)');
    console.log('='.repeat(60));

    const arr = [10, 20, 30, 40, 50];
    const result = _.shuffle(arr);

    console.log('원본 배열:', arr);
    console.log('_.shuffle(arr):', result);
}

// ------------------------------------------
// 4) _.uniq / _.uniqBy
// ------------------------------------------
function exampleUniq() {
    console.log('\n🔹 4) _.uniq / _.uniqBy 예제 (중복 제거)');
    console.log('='.repeat(60));

    const arr = [1, 2, 2, 3, 4, 4, 5];
    console.log('원본 배열:', arr);
    console.log('_.uniq(arr):', _.uniq(arr));

    const arrObj = [
        { id: 1, name: 'A' },
        { id: 1, name: 'X' },
        { id: 2, name: 'B' },
        { id: 2, name: 'C' },
    ];

    console.log('\n객체 배열 중복 제거 (id 기준)');
    console.log('_.uniqBy(arrObj, "id"):', _.uniqBy(arrObj, 'id'));
}

// ------------------------------------------
// 5) _.sortBy
// ------------------------------------------
function exampleSortBy() {
    console.log('\n🔹 5) _.sortBy 예제 (정렬)');
    console.log('='.repeat(60));

    const users = [
        { name: '홍길동', age: 29 },
        { name: '김영희', age: 22 },
        { name: '박철수', age: 35 },
    ];

    const sorted = _.sortBy(users, 'age');

    console.log('원본:', users);
    console.log('_.sortBy(users, "age"):', sorted);
}

// ------------------------------------------
// 6) _.groupBy
// ------------------------------------------
function exampleGroupBy() {
    console.log('\n🔹 6) _.groupBy 예제');
    console.log('='.repeat(60));

    const items = [
        { type: 'fruit', name: 'apple' },
        { type: 'fruit', name: 'banana' },
        { type: 'vege', name: 'carrot' },
        { type: 'vege', name: 'cucumber' },
        { type: 'drink', name: 'water' },
    ];

    const grouped = _.groupBy(items, 'type');

    console.log('원본 데이터:', items);
    console.log('_.groupBy(items, "type") 결과:');
    console.log(grouped);
}

// ------------------------------------------
// main run
// ------------------------------------------
async function run(rl) {
    console.log('📚 레슨 22: npm 패키지(lodash) 설치 및 사용해 보기');
    console.log('='.repeat(70));
    console.log('');

    explainLodash();
    await f_pause(rl);

    exampleChunk();
    await f_pause(rl);

    exampleShuffle();
    await f_pause(rl);

    exampleUniq();
    await f_pause(rl);

    exampleSortBy();
    await f_pause(rl);

    exampleGroupBy();
    await f_pause(rl);

    console.log('='.repeat(70));
    console.log('✅ 레슨 22를 완료했습니다!');
}

module.exports = { run };
