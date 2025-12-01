// lesson27.js
// ===============================
// 레슨 27: Prototype vs Class 상속 비교
//  - 생성자 함수 + prototype으로 상속 구현
//  - ES6 class / extends 로 상속 구현
//  - instanceof, 메서드 공유 비교
// ===============================

const {
    f_pause,
    getRandomEmoji,
    f_printCodeBlock,
} = require('../utils');

// ------------------------------------------
// 1) Prototype 기본 개념
// ------------------------------------------
function explainPrototypeBasics() {
    console.log('🔹 1) Prototype 기본 개념');
    console.log('='.repeat(70));

    console.log(`
    자바스크립트의 객체 상속은 "프로토타입 체인(prototype chain)"을 기반으로 동작합니다.

    - 함수(생성자 함수)에는 .prototype 이라는 속성이 있고,
    - new 키워드로 만든 객체의 숨겨진 [[Prototype]] (__proto__)이
    그 함수의 prototype을 가리키게 됩니다.

    즉,

    new Person('Josh') 로 만든 객체의
    __proto__ === Person.prototype 이고,

    메서드를 찾을 때:
    1) 자기 자신 객체에서 찾고
    2) 없으면 __proto__ (즉, Person.prototype)에서 찾습니다.
    `);

    f_printCodeBlock(
        '생성자 함수 + prototype 메서드 예시',
        `function Person(name) {
    this.name = name;
}

Person.prototype.sayHello = function () {
console.log('안녕하세요, 저는 ' + this.name + '입니다.');
};

const p = new Person('Joshua');
p.sayHello();  // Person.prototype에서 메서드 찾음`
    );
}

// ------------------------------------------
// 2) 생성자 함수 + prototype 상속
// ------------------------------------------
function prototypeInheritanceExample() {
    console.log('\n🔹 2) 생성자 함수 + prototype 상속');
    console.log('='.repeat(70));

    function Person(name) {
        this.name = name;
    }

    Person.prototype.sayHello = function () {
        console.log(`👤 [Person] 안녕하세요, 저는 ${this.name}입니다.`);
    };

    function Employee(name, role) {
        // 부모 생성자 호출 (this 바인딩)
        Person.call(this, name);
        this.role = role;
    }

    // 프로토타입 체인 설정: Employee.prototype → Person.prototype
    Employee.prototype = Object.create(Person.prototype);
    // constructor 복구
    Employee.prototype.constructor = Employee;

    Employee.prototype.work = function () {
        console.log(`💼 [Employee] ${this.name}님은 ${this.role}로 일합니다.`);
    };

    const p = new Person('홍길동');
    const e = new Employee('Joshua', 'Senior Developer');

    console.log('▶ Person 인스턴스');
    p.sayHello();
    console.log('');

    console.log('▶ Employee 인스턴스');
    e.sayHello(); // Person.prototype에서 상속받은 메서드
    e.work();     // Employee.prototype의 메서드
    console.log('');

    console.log('instanceof 확인:');
    console.log('  p instanceof Person   →', p instanceof Person);
    console.log('  p instanceof Employee →', p instanceof Employee);
    console.log('  e instanceof Person   →', e instanceof Person);
    console.log('  e instanceof Employee →', e instanceof Employee);
}

// ------------------------------------------
// 3) class / extends 로 상속 구현
// ------------------------------------------
function classInheritanceExample() {
    console.log('\n🔹 3) class / extends 상속');
    console.log('='.repeat(70));

    console.log(`
    ES6 이후에는 class 문법으로 "프로토타입 기반 상속"을
    더 읽기 쉬운 형태로 표현할 수 있습니다.

    내부적으로는 역시 prototype을 사용합니다.
    `);

    class PersonClass {
        constructor(name) {
            this.name = name;
        }

        sayHello() {
            console.log(`👤 [PersonClass] 안녕하세요, 저는 ${this.name}입니다.`);
        }
    }

    class EmployeeClass extends PersonClass {
        constructor(name, role) {
            super(name); // 부모 생성자 호출
            this.role = role;
        }

        work() {
            console.log(`💼 [EmployeeClass] ${this.name}님은 ${this.role}로 일합니다.`);
        }
    }

    const p = new PersonClass('김영희');
    const e = new EmployeeClass('Joshua', 'Tech Lead');

    console.log('▶ PersonClass 인스턴스');
    p.sayHello();
    console.log('');

    console.log('▶ EmployeeClass 인스턴스');
    e.sayHello(); // 상속받은 메서드
    e.work();     // 자식 클래스 메서드
    console.log('');

    console.log('instanceof 확인:');
    console.log('  p instanceof PersonClass      →', p instanceof PersonClass);
    console.log('  p instanceof EmployeeClass    →', p instanceof EmployeeClass);
    console.log('  e instanceof PersonClass      →', e instanceof PersonClass);
    console.log('  e instanceof EmployeeClass    →', e instanceof EmployeeClass);
}

// ------------------------------------------
// 4) Prototype vs Class 비교 요약
// ------------------------------------------
function compareSummary() {
    console.log('\n🔹 4) Prototype vs Class 비교 요약');
    console.log('='.repeat(70));

    f_printCodeBlock(
        'Prototype 방식 (전통적인 패턴)',
        `function Person(name) {
    this.name = name;
}
Person.prototype.sayHello = function () { ... };

function Employee(name, role) {
    Person.call(this, name);
    this.role = role;
}

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;
Employee.prototype.work = function () { ... };`
    );

    f_printCodeBlock(
        'Class / extends 방식 (ES6 이후 문법)',
        `class Person {
    constructor(name) {
        this.name = name;
    }
    sayHello() { ... }
    }

    class Employee extends Person {
    constructor(name, role) {
        super(name);
        this.role = role;
    }
    work() { ... }
}`
    );

    console.log(`
    정리하면:

    1) Prototype 방식
    - ES5 이전부터 사용하던 전통적인 방식
    - new + 생성자 함수 + prototype 체인을 직접 다룸
    - 유연하지만 문법이 다소 장황하고 실수 포인트(Employee.prototype = ... 등)가 있음

    2) Class / extends 방식
    - 문법이 더 직관적이고, 다른 OOP 언어 경험자에게 익숙함
    - 내부적으로는 여전히 prototype 기반
    - 실무에서는 class 문법을 훨씬 더 자주 사용

    Joshua님 관점:
    - Node.js / 브라우저 환경 둘 다 class 문법 위주로 코드를 짜되,
    - prototype 방식의 동작 원리를 이해하고 있으면
        프레임워크 내부 코드, 레거시 코드, JS 동작 원리를 볼 때 큰 도움이 됩니다.
    `);
}

// ------------------------------------------
// main run
// ------------------------------------------
async function run(rl) {
    console.log('📚 레슨 27: Prototype vs Class 상속 비교');
    console.log('='.repeat(70));
    console.log('');

    explainPrototypeBasics();
    await f_pause(rl);

    prototypeInheritanceExample();
    await f_pause(rl);

    classInheritanceExample();
    await f_pause(rl);

    compareSummary();
    await f_pause(rl);

    console.log('='.repeat(70));
    console.log('✅ 레슨 27을 완료했습니다!');
}

module.exports = { run };
