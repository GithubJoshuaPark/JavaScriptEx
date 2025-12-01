// lesson14.js
// ===============================
// 레슨 14: Promise 기본 — 성공/실패 제어
// ===============================

const { f_pause, getRandomEmoji, f_sleep } = require('../utils');

async function run() {
    console.log('📚 레슨 14: Promise 기본 — 성공/실패 제어');
    console.log('='.repeat(50));
    console.log('');

    // =============================
    // 1. Promise란? (개념 + 가장 단순한 예제)
    // =============================
    console.log('🔹 1. Promise란?');
    console.log('-'.repeat(50));

    console.log(`
        Promise는 "미래에 완료될 수도 있고, 실패할 수도 있는 비동기 작업"을
        하나의 값처럼 다루기 위한 객체입니다.

        상태(state)는 세 가지 중 하나입니다:
        - pending  (대기 중)
        - fulfilled(성공)
        - rejected (실패)
    `);

    const simplePromise = new Promise((resolve, reject) => {
        // 1초 후 성공시키는 아주 단순한 예
        setTimeout(() => {
            resolve('✅ simplePromise: 작업이 성공적으로 완료되었습니다!');
            // reject('❌ simplePromise: 작업 실패!');  // 이 줄을 대신 쓰면 실패 흐름 실험 가능
        }, 1000);
    });

    console.log('simplePromise 생성 직후:', simplePromise);
    console.log('→ 아직 pending 상태입니다.\n');

    simplePromise.then((result) => {
        console.log('\n\nsimplePromise.then()에서 받은 값:', result);
    });

    console.log('\n\n💡 then을 등록한 직후 코드가 바로 계속 실행됩니다 (비동기).');

    await f_pause();

    // =============================
    // 2. resolve / reject 흐름 실습
    // =============================
    console.log('🔹 2. resolve / reject 흐름 실습');
    console.log('-'.repeat(50));

    function doAsyncWork(success = true) {
        return new Promise((resolve, reject) => {
            console.log('⏳ 비동기 작업 시작...');
            setTimeout(() => {
                if (success) {
                    resolve('🎉 작업 성공!');
                } else {
                    reject(new Error('💥 작업 실패! (에러 발생)'));
                }
            }, 1000);
        });
    }

    console.log('1) 성공 케이스');
    await doAsyncWork(true)
        .then((msg) => {
            console.log('then에서 받은 메시지:', msg);
        })
        .catch((err) => {
            console.log('이 줄은 실행되지 않습니다 (성공했기 때문에).');
        })
        .finally(() => {
            console.log('finally: 성공이든 실패든 무조건 한 번 실행됩니다.');
        });

    console.log('\n2) 실패 케이스');
    await doAsyncWork(false)
        .then((msg) => {
            console.log('이 줄은 실행되지 않습니다 (실패했기 때문에).', msg);
        })
        .catch((err) => {
            console.log('catch에서 에러 메시지 확인:', err.message);
        })
        .finally(() => {
            console.log('finally: 여기 역시 항상 실행됩니다.');
        });

    console.log(`
    💡 정리:
    - resolve(...) → then(...) 으로 전달
    - reject(...)  → catch(...) 로 전달
    - finally(...) → 성공/실패와 상관없이 항상 실행
    `);

    await f_pause();

    // =============================
    // 3. 콜백 기반 setTimeout을 Promise로 감싸기
    // =============================
    console.log('🔹 3. 콜백 기반 setTimeout을 Promise로 감싸기');
    console.log('-'.repeat(50));

    function delay(ms, label = '') {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`⏰ ${label} ${ms}ms 후 완료`);
            }, ms);
        });
    }

    console.log('delay(1000, "테스트") 호출 후 then으로 결과 받기:\n');

    await delay(1000, '첫 번째').then((msg) => {
        console.log('then에서 받은 값:', msg);
    });

    console.log('\n같은 함수를 async/await 문법으로도 사용 가능:');

    const result2 = await delay(500, '두 번째');
    console.log('await 결과:', result2);

    console.log(`
    💡 콜백 방식 함수를 Promise로 감싸두면:
    - then / catch / finally 패턴으로 제어 가능
    - 나중에 async/await로 전환하기도 편하다.
    `);

    await f_pause();

    // =============================
    // 4. Promise 체이닝 (then 연속 호출)
    // =============================
    console.log('🔹 4. Promise 체이닝 (then 연속 호출)');
    console.log('-'.repeat(50));

    function addAsync(x, y) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const sum = x + y;
                console.log(`➕ ${x} + ${y} = ${sum}`);
                resolve(sum);
            }, 500);
        });
    }

    console.log('1 + 2 + 3 + 4 를 비동기 체이닝으로 계산해 봅니다.\n');

    await addAsync(1, 2)
        .then((sum12) => {
            return addAsync(sum12, 3);
        })
        .then((sum123) => {
            return addAsync(sum123, 4);
        })
        .then((finalResult) => {
            console.log(`✅ 최종 결과: ${finalResult}`);
        });

    console.log(`
    💡 then 체이닝 포인트:
    - then에서 "값"을 반환하면 → 다음 then으로 전달
    - then에서 "Promise"를 반환하면 → 그 Promise가 끝날 때까지 기다렸다가 다음 then 실행
    `);

    await f_pause();

    // =============================
    // 5. Promise.all — 여러 비동기 작업 동시에 실행
    // =============================
    console.log('🔹 5. Promise.all — 여러 비동기 작업 동시에 실행');
    console.log('-'.repeat(50));

    function fakeRequest(name, ms, shouldFail = false) {
        return new Promise((resolve, reject) => {
            console.log(`${getRandomEmoji()} [${name}] 요청 시작 (${ms}ms 예상)`);

            setTimeout(() => {
                if (shouldFail) {
                    reject(new Error(`[${name}] 요청 실패!`));
                } else {
                    resolve(`[${name}] 결과 데이터`);
                }
            }, ms);
        });
    }

    console.log('3개의 요청을 동시에 보내고, 모두 끝난 뒤 결과를 모아봅니다.\n');

    try {
        const results = await Promise.all([
            fakeRequest('REQ-1', 800),
            fakeRequest('REQ-2', 500),
            fakeRequest('REQ-3', 1200)
        ]);

        console.log('\nPromise.all 결과:');
        console.log(results);
    } catch (err) {
        console.log('❌ Promise.all 중 하나가 실패했습니다:', err.message);
    }

    console.log(`
    💡 Promise.all([...]):
    - 모든 Promise가 "성공"해야 전체가 성공(fulfilled)
    - 하나라도 실패하면 (reject) → 전체가 reject
    - 여러 비동기 작업의 "성공 결과들을 배열"로 받고 싶을 때 사용
    `);

    await f_pause();

    // =============================
    // 6. Promise.race — 가장 먼저 끝나는 것만 관심 있을 때
    // =============================
    console.log('🔹 6. Promise.race — 가장 먼저 끝나는 Promise');
    console.log('-'.repeat(50));

    console.log('두 개의 요청 중 "누가 먼저 응답하는지" 확인해 봅니다.\n');

    try {
        const winner = await Promise.race([
            fakeRequest('FAST', 500),
            fakeRequest('SLOW', 1500)
        ]);

        console.log('\nPromise.race 승자:', winner);
    } catch (err) {
        console.log('❌ Promise.race에서 첫 번째로 끝난 것이 실패했습니다:', err.message);
    }

    console.log(`
    💡 Promise.race([...]):
    - 배열에 넣은 Promise들 중 "가장 먼저 settled (성공/실패)" 된 것의 결과만 신경 쓸 때 사용
    - 예: 느린 서버가 있을 때, 더 빠른 서버 응답을 우선 사용하고 싶을 때 등
    `);

    await f_pause();

    // =============================
    // 7. 실전 패턴 요약
    // =============================
    console.log('🔹 7. 실전에서 Promise를 사용할 때 패턴 요약');
    console.log('-'.repeat(50));

    console.log(`
    1) "하나의 비동기 작업"을 Promise로 감싼다.
    - 예: setTimeout, 파일 읽기, HTTP 요청 등

    2) then / catch / finally로 후속 작업을 연결한다.
    - 성공 → then
    - 실패 → catch
    - 공통 정리 → finally

    3) 여러 개를 동시에 처리할 땐:
    - Promise.all (모두 성공해야 할 때)
    - Promise.race (가장 먼저 끝나는 것만 필요할 때)

    4) 나중에는 async / await를 쓰면
    - 동기 코드처럼 작성하면서
    - Promise의 장점을 그대로 활용 가능
    `);

    console.log('');
    console.log('='.repeat(50));
    console.log('✅ 레슨 14를 완료했습니다! (Promise 기본과 성공/실패 제어 흐름 이해)');
}

// ===============================
// 모듈 내보내기
// ===============================
module.exports = { run };
