// lesson11.js
// ===============================
// 레슨 11: Destructuring & Spread 연산자 실습
// ===============================

const { f_pause, getRandomEmoji } = require('../utils');

async function run() {
    console.log('📚 레슨 11: Destructuring & Spread 연산자 실습');
    console.log('='.repeat(50));
    console.log('');

    // =============================
    // 1. 배열 구조 분해 할당 (Array Destructuring)
    // =============================
    console.log('🔹 1. 배열 구조 분해 할당 (Array Destructuring)');
    console.log('-'.repeat(50));

    const arr = ['Joshua', 'JavaScript', 'Node.js', 'macOS'];

    // 기본적인 구조 분해
    const [name, mainSkill] = arr;
    console.log('원본 배열:', arr);
    console.log('name:', name);
    console.log('mainSkill:', mainSkill);

    console.log('\n인덱스 생략 + 나머지(rest) 모으기');
    const [, , runtime, os] = arr;
    console.log('runtime:', runtime);
    console.log('os:', os);

    const [first, ...restItems] = arr;
    console.log('\nfirst:', first);
    console.log('restItems:', restItems);

    console.log(`
💡 배열 구조 분해 포인트:
   - 순서(position)에 따라 값이 매칭된다.
   - 쉼표(,)로 건너뛸 수 있다.
   - ...rest 문법으로 나머지를 한 번에 모을 수 있다.
`);

    await f_pause();

    // =============================
    // 2. 객체 구조 분해 할당 (Object Destructuring)
    // =============================
    console.log('🔹 2. 객체 구조 분해 할당 (Object Destructuring)');
    console.log('-'.repeat(50));

    const user = {
        name: 'Joshua',
        age: 53,
        job: 'Senior Software Developer',
        stack: {
            frontend: 'Vue / Angular',
            backend: 'Spring Boot / Node.js',
            db: 'MariaDB / PostgreSQL'
        }
    };

    const { name: userName, age, job } = user;
    console.log('원본 객체:', user);
    console.log('userName:', userName);
    console.log('age:', age);
    console.log('job:', job);

    console.log('\n중첩 객체 구조 분해: stack 안의 값 꺼내기');
    const {
        stack: { frontend, backend, db }
    } = user;

    console.log('frontend:', frontend);
    console.log('backend:', backend);
    console.log('db      :', db);

    console.log('\n기본값(Default Value) 설정 예시');
    const { nickname = '별명 없음', country = 'Korea' } = user;
    console.log('nickname:', nickname);
    console.log('country :', country);

    console.log(`
💡 객체 구조 분해 포인트:
   - 키 이름으로 값을 꺼낸다.
   - name: userName 처럼 "새 변수 이름"으로 받을 수 있다.
   - 기본값 (= '기본')을 설정하면, 해당 키가 없을 때 사용된다.
`);

    await f_pause();

    // =============================
    // 3. 함수 파라미터에서 Destructuring 사용하기
    // =============================
    console.log('🔹 3. 함수 파라미터에서 Destructuring 사용하기');
    console.log('-'.repeat(50));

    function printUserInfo({ name, age, job }) {
        console.log(`${getRandomEmoji()} 사용자 정보: ${name}, ${age}세, 직업: ${job}`);
    }

    printUserInfo(user);

    console.log(`
💡 함수 파라미터에서 바로 구조 분해를 하면:
   - 함수 내부에서 user.name, user.age 이런 식으로 접근할 필요가 없다.
   - 필요한 필드만 바로 꺼내 쓸 수 있어 코드가 간결해진다.
`);

    console.log('\n배열 파라미터 예시');

    function sumPair([a, b]) {
        console.log(`[${a}, ${b}] 두 수의 합:`, a + b);
    }

    sumPair([10, 20]);
    sumPair([7, 5]);

    await f_pause();

    // =============================
    // 4. Spread 연산자 — 배열
    // =============================
    console.log('🔹 4. Spread 연산자 — 배열에서 사용하기');
    console.log('-'.repeat(50));

    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];

    console.log('arr1:', arr1);
    console.log('arr2:', arr2);

    const merged = [...arr1, ...arr2];
    console.log('\n[...arr1, ...arr2] =', merged);

    const extended = [0, ...arr1, 99, ...arr2];
    console.log('[0, ...arr1, 99, ...arr2] =', extended);

    console.log('\n배열 복사(Copy)에도 사용 가능');
    const copyArr = [...arr1];
    copyArr.push(999);

    console.log('원본 arr1:', arr1);
    console.log('복사본 copyArr:', copyArr);

    console.log(`
💡 Spread 연산자 (...) - 배열
   - 배열을 "펼쳐서" 각 요소로 나열한다.
   - 배열 병합, 복사, 사이에 끼워넣기 등에 매우 자주 사용된다.
`);

    await f_pause();

    // =============================
    // 5. Spread 연산자 — 객체
    // =============================
    console.log('🔹 5. Spread 연산자 — 객체에서 사용하기');
    console.log('-'.repeat(50));

    const baseConfig = {
        host: 'localhost',
        port: 8080,
        useSSL: false
    };

    const devConfig = {
        ...baseConfig,
        env: 'development',
        port: 3000 // 덮어쓰기(overwrite)
    };

    console.log('baseConfig:', baseConfig);
    console.log('\nspread로 확장된 devConfig:', devConfig);

    console.log('\n기존 객체 + 추가 필드로 새 객체 만들기');

    const userProfile = {
        id: 1,
        name: 'Joshua',
        role: 'developer'
    };

    const extendedProfile = {
        ...userProfile,
        role: 'senior-developer',
        skills: ['JavaScript', 'Node.js', 'Spring Boot']
    };

    console.log('userProfile:', userProfile);
    console.log('extendedProfile:', extendedProfile);

    console.log(`
💡 Spread 연산자 (...) - 객체
   - 기존 객체를 "펼쳐서" 새로운 객체를 만들 때 사용.
   - 뒤에 오는 속성들이 앞의 것들을 덮어쓴다.
   - React, Redux, 설정 객체 등에서 압도적으로 자주 보이는 패턴.
`);

    await f_pause();

    // =============================
    // 6. Destructuring + Rest + Spread 조합
    // =============================
    console.log('🔹 6. Destructuring + Rest + Spread 조합');
    console.log('-'.repeat(50));

    const todo = {
        id: 100,
        title: 'JavaScript 학습',
        done: false,
        priority: 'high',
        createdAt: '2025-12-01',
        updatedAt: '2025-12-01'
    };

    console.log('원본 todo:', todo);

    const { id, title, ...meta } = todo;

    console.log('\n구조 분해 결과:');
    console.log('id:', id);
    console.log('title:', title);
    console.log('meta (나머지):', meta);

    console.log('\nmeta를 다시 spread해서 새로운 객체 구성');

    const updatedTodo = {
        id,
        title: `[완료] ${title}`,
        done: true,
        ...meta,
        updatedAt: '2025-12-02'
    };

    console.log('updatedTodo:', updatedTodo);

    console.log(`
✅ 정리:
   - Destructuring: "꺼내기" + "필요 없는 것 버리기" + "나머지 모으기(...rest)"에 강력.
   - Spread: 기존 배열/객체를 "펼쳐서" 새로운 배열/객체를 만들 때 사용.
   - 이 둘을 조합하면, 데이터를 다루는 코드가 훨씬 깔끔하고 선언적으로 바뀐다.
`);

    console.log('');
    console.log('='.repeat(50));
    console.log('✅ 레슨 11을 완료했습니다! (Destructuring + Spread 기본 패턴 이해)');
}

// ===============================
// 모듈 내보내기
// ===============================
module.exports = { run };
