// lesson13.js
// ===============================
// 레슨 13: setTimeout, setInterval 타이머 실습
// ===============================

const { f_pause, getRandomEmoji, f_sleep } = require('../utils');

async function run(outerRl) {
    console.log('📚 레슨 13: setTimeout, setInterval 타이머 실습');
    console.log('='.repeat(50));
    console.log('');

    // =============================
    // 1. setTimeout 기본 동작
    // =============================
    console.log('🔹 1. setTimeout 기본 동작');
    console.log('-'.repeat(50));

    console.log('코드 순서와 실제 실행 순서를 비교해 봅니다.\n');

    console.log('1) A 출력');
    console.log('A');

    console.log('\n2) 1초 후에 실행될 콜백 등록');
    setTimeout(() => {
        console.log('\n⏰ setTimeout 콜백: 1초가 지났습니다.');
    }, 1000);

    console.log('\n3) B 출력 (setTimeout 등록 직후)');
    console.log('B');

    console.log(`
    💡 포인트:
    - setTimeout은 "지금 바로 실행"이 아니라
    "나중에 실행할 콜백을 등록"만 한다.
    - 따라서 A → (setTimeout 등록) → B → ... → (1초 뒤 콜백) 순서가 된다.
    `);

    await f_pause(outerRl);

    // =============================
    // 2. setTimeout + Promise 조합으로 f_sleep 구현
    // =============================
    console.log('🔹 2. setTimeout + Promise로 f_sleep 만들기');
    console.log('-'.repeat(50));

    console.log('3초 카운트다운을 Promise 기반으로 구현해봅니다.\n');

    for (let i = 3; i >= 1; i--) {
        console.log(`${getRandomEmoji()} ${i} ...`);
        await f_sleep(1000); // 1초 대기
    }
    console.log('✅ 3초가 지났습니다! (f_sleep 함수 사용)\n');

    console.log(`
    💡 실제 코드에서는:
    - API 호출 간 대기
    - 재시도 로직 구현
    - 디버깅용 인위적 딜레이
    등에 사용하기 좋다.
    `);

    await f_pause(outerRl);

    // =============================
    // 3. setInterval 기본 동작 + clearInterval
    // =============================
    console.log('🔹 3. setInterval 기본 동작 + clearInterval');
    console.log('-'.repeat(50));

    console.log('1초마다 반복 실행되는 타이머를 만들고, 5번 후에 정지해 보겠습니다.\n');

    let count = 0;

    const intervalPromise = new Promise((resolve) => {
        const intervalId = setInterval(() => {
            count++;
            console.log(`⏱️ setInterval tick: ${count}회째`);

            if (count >= 5) {
                console.log('🛑 5회가 되어 타이머를 정지합니다.');
                clearInterval(intervalId);
                resolve();
            }
        }, 1000);
    });

    await intervalPromise;

    console.log(`
    💡 setInterval(func, ms)
    - ms마다 func를 반복 실행
    - 반드시 clearInterval(id)로 정리하는 습관을 들이는 게 좋다.
    `);

    await f_pause(outerRl);

    // =============================
    // 4. clearTimeout 사용 예
    // =============================
    console.log('🔹 4. clearTimeout 사용 예');
    console.log('-'.repeat(50));

    console.log('2초 후에 메시지를 출력하는 setTimeout을 등록했다가,');
    console.log('그 전에 취소(clearTimeout)해 보겠습니다.\n');

    const timeoutId = setTimeout(() => {
        console.log('❌ 이 메시지는 보이면 안 됩니다!');
    }, 2000);

    console.log('⏳ 1초 기다린 후, clearTimeout으로 취소합니다.');
    await f_sleep(1000);

    clearTimeout(timeoutId);
    console.log('✅ clearTimeout 호출 완료 — 타이머 취소됨.\n');

    console.log(`
    💡 실전에서는:
    - 사용자가 화면을 떠남 (페이지 이동, 모달 닫기)
    - 더 이상 필요 없는 작업 취소
    등의 상황에서 clearTimeout/clearInterval로 리소스를 정리한다.
    `);

    await f_pause(outerRl);

    // =============================
    // 5. setInterval로 간단한 카운트다운 타이머 만들기
    // =============================
    console.log('🔹 5. setInterval로 간단한 카운트다운 구현');
    console.log('-'.repeat(50));

    let remain = 5;
    console.log(`🎯 ${remain}초 카운트다운을 시작합니다.\n`);

    const countdownPromise = new Promise((resolve) => {
        const id = setInterval(() => {
            console.log(`⏳ 남은 시간: ${remain}초`);

            remain--;

            if (remain < 0) {
                clearInterval(id);
                console.log('🎉 카운트다운 완료!');
                resolve();
            }
        }, 1000);
    });

    await countdownPromise;

    console.log(`
    💡 이런 간단한 타이머 로직은:
    - 게임 대기 시간
    - 요청 재시도 대기
    - UI 상의 진행 표시
    등에 바로 응용할 수 있다.
    `);

    await f_pause(outerRl);

    // =============================
    // 6. setTimeout을 이용한 재귀적 setInterval 패턴
    // =============================
    console.log('🔹 6. setTimeout을 이용한 반복 (재귀적 setTimeout 패턴)');
    console.log('-'.repeat(50));

    console.log(`setInterval 대신 setTimeout을 스스로 다시 호출해서
반복 동작을 만드는 패턴입니다.\n`);

    let n = 0;

    const recursivePromise = new Promise((resolve) => {
        function tick() {
            n++;
            console.log(`🔁 재귀 setTimeout tick: ${n}`);

            if (n >= 3) {
                console.log('🛑 3회 후 종료');
                resolve();
                return;
            }

            setTimeout(tick, 700); // 0.7초 간격으로 다시 자기 자신 호출
        }

        setTimeout(tick, 700);
    });

    await recursivePromise;

    console.log(`
    💡 재귀 setTimeout 패턴:
    - setInterval보다 "다음 실행 시점"을 유연하게 조절 가능.
    - 각 작업의 수행 시간이 달라질 때,
        "완료 후 일정 시간 뒤"에 다시 실행하고 싶을 때 유용.
    `);

    console.log('');
    console.log('='.repeat(50));
    console.log('✅ 레슨 13을 완료했습니다! (setTimeout / setInterval 기본 & 응용)');
}

// ===============================
// 모듈 내보내기
// ===============================
module.exports = { run };
