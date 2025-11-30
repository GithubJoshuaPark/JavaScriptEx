// ===============================
// 레슨 4: 반복문으로 숫자 합계 계산하기
// ===============================

const { f_pause } = require('../utils');

async function run() {
    console.log('📚 레슨 4: 반복문으로 숫자 합계 계산하기');
    console.log('='.repeat(50));
    console.log('');

    // =============================
    // 1. for 문 (가장 기본적인 반복문)
    // =============================
    console.log('🔹 1. for 문으로 1부터 10까지 더하기');
    console.log('-'.repeat(50));

    let sumFor = 0;
    const n = 10;

    // for (초기화; 조건식; 증감식)
    for (let i = 1; i <= n; i++) {
        sumFor += i; // sumFor = sumFor + i;
        process.stdout.write(`${i}${i < n ? ' + ' : ' = '}`);
    }
    console.log(sumFor);

    await f_pause();

    // =============================
    // 2. while 문 (조건이 참인 동안 반복)
    // =============================
    console.log('🔹 2. while 문으로 1부터 10까지 더하기');
    console.log('-'.repeat(50));

    let sumWhile = 0;
    let j = 1;

    while (j <= n) {
        sumWhile += j;
        j++;
    }
    console.log(`1부터 ${n}까지의 합 (while): ${sumWhile}`);

    await f_pause();

    // =============================
    // 3. do - while 문 (무조건 한 번은 실행)
    // =============================
    console.log('🔹 3. do - while 문');
    console.log('-'.repeat(50));

    let k = 1;
    let sumDoWhile = 0;

    do {
        sumDoWhile += k;
        k++;
    } while (k <= n);
    console.log(`1부터 ${n}까지의 합 (do-while): ${sumDoWhile}`);

    console.log('');
    console.log('💡 do-while 문은 조건이 처음부터 거짓이어도 코드 블록이 최소 한 번은 실행됩니다.');

    await f_pause();

    // =============================
    // 4. break와 continue
    // =============================
    console.log('🔹 4. break와 continue');
    console.log('-'.repeat(50));

    console.log('짝수만 더하고, 합이 30을 넘으면 중단하기:');

    let total = 0;
    for (let i = 1; i <= 20; i++) {
        // 홀수면 건너뛰기 (continue)
        if (i % 2 !== 0) {
            continue;
        }

        total += i;
        console.log(`${i} 더함 (현재 합계: ${total})`);

        // 합이 30을 넘으면 반복 종료 (break)
        if (total > 30) {
            console.log('⚠️ 합계가 30을 넘어서 반복을 종료합니다.');
            break;
        }
    }
    console.log(`최종 합계: ${total}`);

    await f_pause();

    // =============================
    // 5. 중첩 반복문 (구구단)
    // =============================
    console.log('🔹 5. 중첩 반복문 (구구단 2~3단만 출력)');
    console.log('-'.repeat(50));

    for (let i = 2; i <= 3; i++) {
        console.log(`[ ${i}단 ]`);
        for (let j = 1; j <= 9; j++) {
            console.log(`${i} x ${j} = ${i * j}`);
        }
        console.log(''); // 단 사이 빈 줄
    }

    console.log('='.repeat(50));
    console.log('✅ 레슨 4를 완료했습니다!');
}

// ===============================
// 모듈 내보내기
// ===============================
module.exports = { run };
