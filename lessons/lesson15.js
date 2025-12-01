// lesson15.js
// ===============================
// 레슨 15: async/await으로 비동기 흐름 제어하기
// ===============================

const { f_pause, getRandomEmoji, f_sleep } = require('../utils');

// 가짜 비동기 요청 유틸 (성공/실패 테스트용)
function fakeRequest(name, ms, shouldFail = false) {
    return new Promise((resolve, reject) => {
        console.log(`${getRandomEmoji()} [${name}] 요청 시작 (${ms}ms 예상)`);

        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`[${name}] 요청 실패!`));
            } else {
                resolve(`[${name}] 응답 데이터`);
            }
        }, ms);
    });
}

async function run(outerRl) {
    console.log('📚 레슨 15: async/await으로 비동기 흐름 제어하기');
    console.log('='.repeat(50));
    console.log('');

    // =============================
    // 1. async 함수란? (Promise를 더 쉽고 예쁘게 쓰는 문법)
    // =============================
    console.log('🔹 1. async 함수의 기본 개념');
    console.log('-'.repeat(50));

    function normalFunction() {
        return 123;
    }

    async function asyncFunction() {
        return 123;
    }

    const v1 = normalFunction();
    const v2 = asyncFunction(); // Promise

    console.log('normalFunction() 결과:', v1, '(일반 값)');
    console.log('asyncFunction() 결과:', v2, '(Promise 객체)');
    console.log('');

    const resolved = await asyncFunction();
    console.log('await asyncFunction() 결과:', resolved);

    console.log(`
    💡 정리:
    - 함수에 async를 붙이면, "반환값을 자동으로 Promise로 감싸서" 반환.
    - async 함수 안에서는 await를 쓸 수 있다.
    - async 함수의 return 값 → Promise.resolve(그 값)으로 처리된다고 보면 됨.
    `);

    await f_pause(outerRl);

    // =============================
    // 2. await로 비동기 코드를 "동기처럼" 작성하기
    // =============================
    console.log('🔹 2. await로 비동기 흐름을 순서대로 표현하기');
    console.log('-'.repeat(50));

    function delay(ms, label) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`⏰ [${label}] ${ms}ms 후 완료`);
            }, ms);
        });
    }

    console.log('then 체이닝으로 작성한 코드 예:');

    delay(500, 'A')
        .then((msgA) => {
            console.log('then A:', msgA);
            return delay(700, 'B');
        })
        .then((msgB) => {
            console.log('then B:', msgB);
            return delay(400, 'C');
        })
        .then((msgC) => {
            console.log('then C:', msgC);
        });

    console.log('\n같은 흐름을 async/await으로 작성하면:\n');

    async function runWithAwait() {
        const msgA = await delay(500, 'A');
        console.log('await A:', msgA);

        const msgB = await delay(700, 'B');
        console.log('await B:', msgB);

        const msgC = await delay(400, 'C');
        console.log('await C:', msgC);
    }

    await runWithAwait();

    console.log(`
    💡 await 키워드:
    - Promise가 "settled(완료)"될 때까지 기다렸다가, 그 결과 값을 꺼낸다.
    - then 체이닝보다 읽고 이해하기 훨씬 쉽다.
    `);

    await f_pause(outerRl);

    // =============================
    // 3. async/await에서 에러 처리 (try/catch)
    // =============================
    console.log('🔹 3. async/await에서 에러 처리 (try/catch)');
    console.log('-'.repeat(50));

    async function runSuccessAndFail() {
        console.log('1) 성공하는 경우');
        try {
            const res = await fakeRequest('SUCCESS-REQ', 700, false);
            console.log('성공 응답:', res);
        } catch (err) {
            console.log('이 줄은 실행되지 않습니다 (성공 케이스).', err);
        } finally {
            console.log('finally: 성공/실패 상관없이 실행\n');
        }

        console.log('2) 실패하는 경우');
        try {
            const res = await fakeRequest('FAIL-REQ', 700, true);
            console.log('성공 응답:', res); // 실행 안 됨
        } catch (err) {
            console.log('catch에서 에러 처리:', err.message);
        } finally {
            console.log('finally: 여기 역시 항상 실행됩니다.\n');
        }
    }

    await runSuccessAndFail();

    console.log(`
    💡 async/await + try/catch:
    - then/catch 대신 "동기 코드와 비슷한 스타일"로 에러 처리 가능.
    - 비즈니스 로직이 복잡할수록 가독성이 크게 좋아진다.
    `);

    await f_pause(outerRl);

    // =============================
    // 4. 순차 실행 vs 병렬 실행 (성능 차이)
    // =============================
    console.log('🔹 4. 순차 실행 vs 병렬 실행');
    console.log('-'.repeat(50));

    async function runSequential() {
        console.log('⏳ 순차 실행 시작');
        const a = await delay(700, 'SEQ-1');
        console.log(a);
        const b = await delay(700, 'SEQ-2');
        console.log(b);
        const c = await delay(700, 'SEQ-3');
        console.log(c);
        console.log('✅ 순차 실행 완료\n');
    }

    async function runParallel() {
        console.log('⚡ 병렬 실행 시작');

        // const p1 = delay(700, 'PAR-1');
        // const p2 = delay(700, 'PAR-2');
        // const p3 = delay(700, 'PAR-3');

        // const r1 = await p1;
        // console.log(r1);
        // const r2 = await p2;
        // console.log(r2);
        // const r3 = await p3;
        // console.log(r3);

        try {
            const results = await Promise.all([
                delay(700, 'PAR-1'),
                delay(1500, 'PAR-2'),
                delay(1000, 'PAR-3')
            ]);

            console.log('\nPromise.all 결과:');
            console.log(results);
        } catch (err) {
            console.log('❌ Promise.all 중 하나가 실패했습니다:', err.message);
        }

        console.log('✅ 병렬 실행 완료\n');
    }

    console.log('먼저 순차 실행 예제를 보고, 이어서 병렬 실행을 봅니다.\n');

    await runSequential();
    await runParallel();

    console.log(`
    💡 포인트:
    - "await를 어디에서 언제 쓰느냐"에 따라
        실제 실행 시간이 크게 달라질 수 있다.
    - 순차: 하나 끝나야 다음 시작 → 총 시간 = 합
    - 병렬: 여러 작업을 동시에 시작 → 총 시간 ≒ 가장 오래 걸리는 하나의 시간
    `);

    await f_pause(outerRl);

    // =============================
    // 5. forEach + await 주의점 vs for...of
    // =============================
    console.log('🔹 5. forEach + await 주의점 vs for...of');
    console.log('-'.repeat(50));

    const items = [1, 2, 3];

    console.log('❗ Array.forEach 안에서 await를 쓰면 기대대로 동작하지 않을 수 있습니다.\n');

    async function wrongForEach() {
        console.log('🚫 forEach + await 예제 (끝나는 시점을 제어하기 어려움)');
        items.forEach(async (n) => {
            await f_sleep(300);
            console.log(`forEach 내부 처리: ${n}`);
        });
        console.log('forEach 호출 직후 이 줄이 바로 실행됩니다 (모두 끝나기 전에)!\n');
    }

    async function correctForOf() {
        console.log('✅ for...of + await 예제 (순차 제어 가능)');
        for (const n of items) {
            await f_sleep(300);
            console.log(`for...of 내부 처리: ${n}`);
        }
        console.log('for...of 루프가 모두 끝난 후 이 줄이 실행됩니다.\n');
    }

    await wrongForEach();
    await f_sleep(1500); // forEach 내부 콜백들이 끝날 시간을 조금 줌
    await correctForOf();

    console.log(`
    💡 실무 팁:
    - 비동기를 순서대로 처리해야 할 때 → for...of + await
    - 동시에 처리해도 될 때     → map으로 Promise 배열 만들고 Promise.all
    `);

    await f_pause(outerRl);

    // =============================
    // 6. Promise.all과 async/await 조합
    // =============================
    console.log('🔹 6. Promise.all과 async/await 조합');
    console.log('-'.repeat(50));

    async function loadAll() {
        console.log('3개의 fakeRequest를 동시에 실행하고, 모두 끝나길 기다립니다.\n');

        try {
            const promises = [
                fakeRequest('API-1', 800),
                fakeRequest('API-2', 500),
                fakeRequest('API-3', 1000)
            ];

            const results = await Promise.all(promises);
            console.log('모든 결과:', results);
        } catch (err) {
            console.log('❌ 하나 이상이 실패했습니다:', err.message);
        }
    }

    await loadAll();

    console.log(`
    ✅ 정리:
    - async/await은 Promise를 더 읽기 쉽게 사용하기 위한 문법.
    - try/catch와 함께 사용하면 에러 처리 흐름도 단순해진다.
    - 순차 vs 병렬, forEach vs for...of를 잘 구분하면
        성능과 가독성을 모두 챙길 수 있다.
    `);

    console.log('');
    console.log('='.repeat(50));
    console.log('✅ 레슨 15를 완료했습니다! (async/await 비동기 흐름 제어 마스터)');
}

// ===============================
// 모듈 내보내기
// ===============================
module.exports = { run };
