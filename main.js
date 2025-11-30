// main.js
const readline = require('readline');
const { getRandomEmoji } = require('./utils');

// 레슨 목록 정의 (1 ~ 30)
const lessons = [
    { id: 1, title: '변수 선언과 데이터 타입 출력하기', file: './lessons/lesson01' },
    { id: 2, title: '템플릿 리터럴로 문자열 조합하기', file: './lessons/lesson02' },
    { id: 3, title: '조건문으로 점수 평가 프로그램 만들기', file: './lessons/lesson03' },
    { id: 4, title: '반복문으로 숫자 합계 계산하기', file: './lessons/lesson04' },
    { id: 5, title: '배열 기본 조작(map, filter) 실습', file: './lessons/lesson05' },
    { id: 6, title: '함수 선언문 vs 화살표 함수 비교', file: './lessons/lesson06' },
    { id: 7, title: '객체 생성 및 속성 다루기', file: './lessons/lesson07' },

    { id: 8, title: 'Scope와 Hoisting 동작 실험하기', file: './lessons/lesson08' },
    { id: 9, title: 'Closure 이해를 위한 카운터 함수 만들기', file: './lessons/lesson09' },
    { id: 10, title: 'this 바인딩 — call, apply, bind 실습', file: './lessons/lesson10' },
    { id: 11, title: 'Destructuring & Spread 연산자 실습', file: './lessons/lesson11' },
    { id: 12, title: 'JSON.parse / JSON.stringify 실습', file: './lessons/lesson12' },

    { id: 13, title: 'setTimeout, setInterval 타이머 실습', file: './lessons/lesson13' },
    { id: 14, title: 'Promise 기본 — 성공/실패 제어', file: './lessons/lesson14' },
    { id: 15, title: 'async/await으로 비동기 흐름 제어하기', file: './lessons/lesson15' },
    { id: 16, title: 'fetch로 공공 API 데이터 받아오기', file: './lessons/lesson16' },
    { id: 17, title: '비동기 오류 처리 (try/catch)', file: './lessons/lesson17' },

    { id: 18, title: 'Node.js 모듈 시스템 이해하기', file: './lessons/lesson18' },
    { id: 19, title: 'fs 모듈로 파일 읽고 쓰기', file: './lessons/lesson19' },
    { id: 20, title: 'path 모듈로 경로 처리 실습', file: './lessons/lesson20' },
    { id: 21, title: 'http 모듈로 간단한 HTTP 서버 만들기', file: './lessons/lesson21' },
    { id: 22, title: 'npm 패키지(lodash) 설치 및 사용해 보기', file: './lessons/lesson22' },

    { id: 23, title: 'Todo List 데이터 관리 로직 (CRUD) 기초', file: './lessons/lesson23' },
    { id: 24, title: '간단한 Logger(로그 기록기) 만들기', file: './lessons/lesson24' },
    { id: 25, title: '유효성 검사 함수 세트 만들기', file: './lessons/lesson25' },
    { id: 26, title: '간단한 사용자 인증 흐름 시뮬레이션', file: './lessons/lesson26' },

    { id: 27, title: 'Prototype vs Class 상속 비교', file: './lessons/lesson27' },
    { id: 28, title: 'EventEmitter로 커스텀 이벤트 시스템', file: './lessons/lesson28' },
    { id: 29, title: '함수형 프로그래밍 기초(map, reduce)', file: './lessons/lesson29' },
    { id: 30, title: '모듈 구조를 갖춘 미니 프로젝트 구성', file: './lessons/lesson30' },
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function showMenu() {
    console.clear();
    const emoji = getRandomEmoji();
    console.log('====================================');
    console.log(`   ${emoji} JavaScript Lessons (1 ~ 30) ${emoji}`);
    console.log('====================================\n');

    lessons.forEach((lesson) => {
        console.log(
            `${String(lesson.id).padStart(2, '0')}. ${lesson.title}`
        );
    });

    console.log('\n  0 to Exit');
    console.log('------------------------------------');
}

function ask(question, rlInterface = rl) {
    return new Promise((resolve) => {
        rlInterface.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

async function mainLoop() {
    let currentRl = rl;

    while (true) {
        showMenu();

        const answer = await ask('\n실행할 레슨 번호를 선택하세요 (0: 종료): ', currentRl);
        const num = Number(answer);

        if (Number.isNaN(num)) {
            console.log(`\n${getRandomEmoji()} 숫자를 입력해 주세요.`);
            await ask('엔터를 누르면 메뉴로 돌아갑니다...', currentRl);
            continue;
        }

        if (answer === '0') {
            console.log(`\n${getRandomEmoji()} 프로그램을 종료합니다. 안녕히 가세요!`);
            break;
        }

        const lessonInfo = lessons.find((l) => l.id === num);

        if (!lessonInfo) {
            console.log(`\n${getRandomEmoji()} 존재하지 않는 레슨 번호입니다.`);
            await ask('엔터를 누르면 메뉴로 돌아갑니다...', currentRl);
            continue;
        }

        console.clear();
        console.log(`\n${getRandomEmoji()} [레슨 ${lessonInfo.id}] ${lessonInfo.title}`);
        console.log('------------------------------------\n');

        try {
            // 각 레슨 파일은 ./lessons/lessonXX.js 형태
            const lessonModule = require(lessonInfo.file);

            if (typeof lessonModule.run === 'function') {
                // run()이 동기든 비동기든 대응
                await Promise.resolve(lessonModule.run());
            } else {
                console.log(`${getRandomEmoji()} 이 레슨은 아직 run() 함수가 구현되지 않았습니다.`);
            }
        } catch (err) {
            console.log(`${getRandomEmoji()} 레슨 실행 중 오류가 발생했습니다.`);
            console.log(err.message);
        }

        // 레슨 실행 후 readline 인터페이스 재생성
        currentRl.close();
        currentRl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        console.log('\n------------------------------------');
        await ask(`${getRandomEmoji()} 엔터를 누르면 메뉴로 돌아갑니다...`, currentRl);
    }

    currentRl.close();
}

mainLoop();
