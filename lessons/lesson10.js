// lesson10.js
// ===============================
// 레슨 10: this 바인딩 — call, apply, bind 실습
// ===============================

const { f_pause, getRandomEmoji } = require('../utils');

async function run() {
    console.log('📚 레슨 10: this 바인딩 — call, apply, bind 실습');
    console.log('='.repeat(50));
    console.log('');

    // =============================
    // 1. this 기본 동작 (전역, 메서드, 단순 함수)
    // =============================
    console.log('🔹 1. this 기본 동작 이해하기');
    console.log('-'.repeat(50));

    console.log('1) 전역 컨텍스트에서의 this (Node.js 환경)');
    console.log('   - Node.js 모듈에서 전역의 this는 module.exports를 가리키는 경우가 많습니다.');
    console.log('   - 브라우저에서는 window를 가리키지만, Node.js는 다릅니다.');
    console.log('');
    console.log('현재 this 값 (전역):', this);

    console.log('\n2) 객체 메서드에서의 this');

    const user = {
        name: 'Joshua',
        sayHello() {
            console.log(`안녕하세요, 저는 ${this.name} 입니다. ${getRandomEmoji()}`);
        }
    };

    user.sayHello(); // this === user

    console.log(`
3) 단순 함수에서의 this
   - 'use strict' 모드에서는 undefined
   - 그 외에는 (Node.js REPL 등에서) 전역 객체 또는 다른 값일 수 있음
   - REPL
   - R: Read
   - E: Evaluate
   - P: Print
   - L: Loop
`);

    function plainFunction() {
        console.log('plainFunction 내부 this:', this);
    }

    plainFunction();

    await f_pause();

    // =============================
    // 2. this를 잃어버리는 상황 (메서드를 변수에 할당)
    // =============================
    console.log('🔹 2. this를 잃어버리는 상황');
    console.log('-'.repeat(50));

    const dog = {
        name: '멍멍이',
        speak() {
            console.log(`멍멍! 나는 ${this.name}야!`);
        }
    };

    dog.speak(); // 정상: this === dog

    console.log('\n➡ 이제 메서드를 변수에 할당해 보겠습니다.');
    const speakFn = dog.speak;

    console.log('speakFn() 직접 호출 결과:');
    speakFn(); // this가 더 이상 dog가 아님

    console.log(`
❗ 메서드였던 함수를 변수에 담아 단독으로 호출하면
   원래의 객체와 연결이 끊어져 this가 달라집니다.
`);

    await f_pause();

    // =============================
    // 3. call() 로 this 지정하기
    // =============================
    console.log('🔹 3. call()로 this 지정하기');
    console.log('-'.repeat(50));

    function introduce(lang) {
        console.log(`언어: ${lang}, 이름: ${this.name}`);
    }

    const personA = { name: 'Alice' };
    const personB = { name: 'Bob' };

    console.log('introduce.call(personA, "ko")');
    introduce.call(personA, 'ko'); // this === personA

    console.log('\nintroduce.call(personB, "en")');
    introduce.call(personB, 'en'); // this === personB

    console.log(`
💡 call(thisArg, arg1, arg2, ...)
   - 첫 번째 인자로 this로 사용할 객체를 전달
   - 나머지 인자는 일반 함수 인자처럼 하나씩 전달
`);

    await f_pause();

    // =============================
    // 4. apply() 로 this + 인자 배열 지정
    // =============================
    console.log('🔹 4. apply()로 this 지정 + 인자 배열 전달');
    console.log('-'.repeat(50));

    function sum(a, b, c) {
        console.log(`this.label = ${this.label}, 합계 = ${a + b + c}`);
    }

    const ctx = { label: '테스트 컨텍스트' };

    console.log('sum.apply(ctx, [1, 2, 3])');
    sum.apply(ctx, [1, 2, 3]);

    console.log(`
💡 apply(thisArg, [arg1, arg2, ...])
   - call과 거의 동일하지만, 인자를 "배열"로 전달
   - ES5 시절, 배열을 그대로 전달할 때 자주 사용
`);

    await f_pause();

    // =============================
    // 5. bind() 로 this가 고정된 새 함수 만들기
    // =============================
    console.log('🔹 5. bind()로 this가 고정된 새 함수 만들기');
    console.log('-'.repeat(50));

    const button = {
        label: '저장',
        click() {
            console.log(`"${this.label}" 버튼이 클릭됨!`);
        }
    };

    console.log('원래 메서드 호출: button.click()');
    button.click();

    console.log(`
이제 button.click을 이벤트 핸들러처럼 다른 변수에 할당해 봅니다.
일반적으로 this가 바뀌어 버리는 상황을 시뮬레이션합니다.
`);

    const looseClick = button.click;
    console.log('looseClick() 직접 호출:');
    looseClick(); // this가 button이 아님

    console.log('\n➡ bind를 사용해 this를 영구적으로 button에 고정해 봅니다.');

    const boundClick = button.click.bind(button);

    console.log('boundClick() 첫 호출:');
    boundClick();

    console.log('boundClick() 두 번째 호출:');
    boundClick();

    console.log(`
💡 bind(thisArg)
   - this가 thisArg로 "영구 고정"된 새 함수를 반환
   - React, 이벤트 핸들러, 콜백 등에서 매우 자주 사용하는 패턴
`);

    await f_pause();

    // =============================
    // 6. call/apply/bind + 부분 적용(Partial Application)
    // =============================
    console.log('🔹 6. bind를 이용한 부분 적용(Partial Application)');
    console.log('-'.repeat(50));

    function multiply(a, b) {
        return a * b;
    }

    console.log('multiply(2, 5) =', multiply(2, 5));

    const double = multiply.bind(null, 2); // this는 중요하지 않으므로 null, 첫번째 인자로 2를 미리 채움
    const triple = multiply.bind(null, 3); // this는 중요하지 않으므로 null, 첫번째 인자로 3를 미리 채움

    console.log('double(10) =', double(10));  // 20; 첫번째 인자로 2를 미리 채웠기 때문에, 두번째 인자로 10을 전달
    console.log('triple(10) =', triple(10));  // 30; 첫번째 인자로 3를 미리 채웠기 때문에, 두번째 인자로 10을 전달

    console.log(`
💡 bind를 사용하면 단순히 this만 고정하는 것이 아니라,
   앞쪽 인자 일부를 "미리 채워 둔" 새로운 함수를 만들 수도 있습니다.
   (이를 Partial Application이라고 부릅니다.)
`);

    await f_pause();

    // =============================
    // 7. Arrow Function과 this
    // =============================
    console.log('🔹 7. Arrow Function과 this');
    console.log('-'.repeat(50));

    console.log(`
Arrow Function은 "자신만의 this"를 가지지 않고,
   자신이 "정의된 위치"의 this를 그대로 사용합니다.
`);

    const arrowObj = {
        value: 42,
        normalFunc: function () {
            console.log('normalFunc this.value =', this.value);
        },
        arrowFunc: () => {
            console.log('arrowFunc this =', this);
            console.log('arrowFunc this.value =', this && this.value);
        }
    };

    console.log('arrowObj.normalFunc():');
    arrowObj.normalFunc(); // this === arrowObj

    console.log('\narrowObj.arrowFunc():');
    arrowObj.arrowFunc(); // this는 arrowObj가 아님 (정의된 상위 스코프의 this)

    console.log(`
✅ 정리:
   - 일반 함수: 호출 방식에 따라 this가 달라진다 (obj.method, call, apply, bind 등)
   - 화살표 함수: 자신만의 this가 없고, "선언된 위치"의 this를 그대로 사용
`);

    console.log('');
    console.log('='.repeat(50));
    console.log('✅ 레슨 10을 완료했습니다! (this + call/apply/bind + arrow function)');
}

// ===============================
// 모듈 내보내기
// ===============================
module.exports = { run };
