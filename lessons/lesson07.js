// ===============================
// 레슨 7: 객체 생성 및 속성 다루기
// ===============================

const { f_pause } = require('../utils');

async function run(outerRl) {
    console.log('📚 레슨 7: 객체 생성 및 속성 다루기');
    console.log('='.repeat(50));
    console.log('');

    // =============================
    // 1. 객체 생성 (Object Literal)
    // =============================
    console.log('🔹 1. 객체 생성 (Object Literal)');
    console.log('-'.repeat(50));

    const hero = {
        name: 'Iron Man',
        realName: 'Tony Stark',
        age: 48,
        isAlive: false
    };

    console.log('생성된 객체:', hero);

    await f_pause(outerRl);

    // =============================
    // 2. 속성 접근 (Dot vs Bracket)
    // =============================
    console.log('🔹 2. 속성 접근 (점 표기법 vs 대괄호 표기법)');
    console.log('-'.repeat(50));

    // 점 표기법 (Dot Notation) - 가장 일반적
    console.log(`이름 (Dot): ${hero.name}`);

    // 대괄호 표기법 (Bracket Notation) - 키가 변수이거나 특수문자가 있을 때 필수
    console.log(`본명 (Bracket): ${hero['realName']}`);

    const key = 'age';
    console.log(`나이 (변수로 접근): ${hero[key]}`); // hero.key는 undefined가 됨

    await f_pause(outerRl);

    // =============================
    // 3. 속성 추가, 수정, 삭제
    // =============================
    console.log('🔹 3. 속성 추가, 수정, 삭제');
    console.log('-'.repeat(50));

    // 추가
    hero.suitColor = 'Red/Gold';
    console.log('속성 추가 후:', hero);

    // 수정
    hero.age = 50; // 나이 변경
    console.log('속성 수정 후 (age -> 50):', hero);

    // 삭제
    delete hero.isAlive;
    console.log('속성 삭제 후 (isAlive 삭제):', hero);

    await f_pause(outerRl);

    // =============================
    // 4. 객체 메서드 (Object Methods)
    // =============================
    console.log('🔹 4. 객체 메서드');
    console.log('-'.repeat(50));

    const calculator = {
        a: 10,
        b: 5,
        // 메서드 정의 (단축 문법)
        add() {
            return this.a + this.b;
        },
        subtract() {
            return this.a - this.b;
        }
    };

    console.log(`a: ${calculator.a}, b: ${calculator.b}`);
    console.log(`더하기: ${calculator.add()}`);
    console.log(`빼기: ${calculator.subtract()}`);

    await f_pause(outerRl);

    // =============================
    // 5. 객체 순회 (Iteration)
    // =============================
    console.log('🔹 5. 객체 순회');
    console.log('-'.repeat(50));

    // for...in 반복문 (키를 순회)
    console.log('[ for...in 루프 ]');
    for (const key in hero) {
        console.log(`${key}: ${hero[key]}`);
    }
    console.log('');

    // Object.keys(), Object.values(), Object.entries()
    console.log('[ Object 유틸리티 메서드 ]');
    console.log('Keys:', Object.keys(hero));
    console.log('Values:', Object.values(hero));
    console.log('Entries:', Object.entries(hero));

    console.log('');
    console.log('='.repeat(50));
    console.log('✅ 레슨 7을 완료했습니다!');
}

// ===============================
// 모듈 내보내기
// ===============================
module.exports = { run };
