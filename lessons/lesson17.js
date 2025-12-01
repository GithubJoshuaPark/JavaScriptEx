// lesson17.js
// ===============================
// 레슨 17: 비동기 오류 처리 (try/catch)
// ===============================

const { f_pause, getRandomEmoji, f_sleep } = require('../utils');

// ------------------------------------------
// 1. 기본 try/catch 예제
// ------------------------------------------
function syncErrorExample() {
    console.log('🔹 1) 동기 코드에서의 try/catch 예제');
    console.log('-'.repeat(60));

    try {
        console.log('정상 출력 1');
        throw new Error('의도적으로 발생시킨 오류입니다.');
        console.log('이 줄은 실행되지 않습니다.');
    } catch (err) {
        console.log('⚠ catch에서 오류를 잡았습니다:', err.message);
    } finally {
        console.log('🔸 finally: 오류 여부와 관계없이 항상 실행됩니다.\n');
    }
}

// ------------------------------------------
// 2. Promise 오류 처리
// ------------------------------------------
function promiseErrorExample() {
    console.log('🔹 2) Promise에서 발생하는 오류 처리');
    console.log('-'.repeat(60));

    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Promise 내부에서 발생한 오류입니다.'));
        }, 300);
    });

    return p
        .then(() => {
            console.log('이 줄은 실행되지 않습니다.');
        })
        .catch((err) => {
            console.log('⚠ catch()에서 오류 처리:', err.message);
        })
        .finally(() => {
            console.log('🔸 finally: Promise 종료 후 실행\n');
        });
}

// ------------------------------------------
// 3. async/await 오류 처리
// ------------------------------------------
async function asyncAwaitErrorExample() {
    console.log('🔹 3) async/await에서 오류 처리');
    console.log('-'.repeat(60));

    async function willFail() {
        await f_sleep(300);
        throw new Error('async 함수 내부 오류 발생!');
    }

    try {
        await willFail();
        console.log('이 줄은 실행되지 않습니다.');
    } catch (err) {
        console.log('⚠ try/catch로 async 오류 처리:', err.message);
    } finally {
        console.log('🔸 finally: async 흐름 종료\n');
    }
}

// ------------------------------------------
// 4. fetch 실패 상황 시뮬레이션
// ------------------------------------------
async function fetchErrorExample() {
    console.log('🔹 4) fetch 실패 오류 처리');
    console.log('-'.repeat(60));

    const WRONG_URL = 'https://jsonplaceholder.typicode.com/wrong-url-1111';

    try {
        console.log(`📡 요청 URL: ${WRONG_URL}`);
        const res = await fetch(WRONG_URL);

        if (!res.ok) {
            throw new Error(`HTTP 오류: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        console.log('이 줄은 실행되지 않습니다 (성공 불가).');
    } catch (err) {
        console.log('⚠ fetch 오류 처리:', err.message);
    } finally {
        console.log('🔸 finally: fetch 오류 처리 후 실행\n');
    }
}

// ------------------------------------------
// 5. 사용자 정의 비동기 오류 처리
// ------------------------------------------
async function customAsyncErrorExample() {
    console.log('🔹 5) 사용자 정의 비동기 작업의 오류 처리 패턴');
    console.log('-'.repeat(60));

    function asyncTask(name, ms, shouldFail = false) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (shouldFail) {
                    reject(new Error(`${name} 작업 실패!`));
                } else {
                    resolve(`${name} 작업 성공`);
                }
            }, ms);
        });
    }

    try {
        const result1 = await asyncTask('A', 300, false);
        console.log(getRandomEmoji(), result1);

        const result2 = await asyncTask('B', 300, true);
        console.log('이 줄은 실행되지 않습니다:', result2);
    } catch (err) {
        console.log('⚠ try/catch에서 asyncTask 오류 잡음:', err.message);
    } finally {
        console.log('🔸 finally: custom async 흐름 종료\n');
    }
}

// ------------------------------------------
// main run
// ------------------------------------------
async function run(rl) {
    console.log('📚 레슨 17: 비동기 오류 처리 (try/catch)');
    console.log('='.repeat(70));
    console.log('');

    syncErrorExample();
    await f_pause(rl);

    await promiseErrorExample();
    await f_pause(rl);

    await asyncAwaitErrorExample();
    await f_pause(rl);

    await fetchErrorExample();
    await f_pause(rl);

    await customAsyncErrorExample();
    await f_pause(rl);

    console.log('='.repeat(70));
    console.log('✅ 레슨 17을 완료했습니다!');
}

// ------------------------------------------
module.exports = { run };
