// lesson24.js
// ===============================
// 레슨 24: 간단한 Logger(로그 기록기) 만들기
//  - utils.Logger 사용
//  - info / warn / error / debug 로그 남기기
//  - 로그 파일 위치 확인 및 일부 내용 출력
// ===============================

const fs = require('fs');
const { f_pause, f_printCodeBlock, Logger } = require('../utils');

async function run(rl) {
    console.log('📚 레슨 24: 간단한 Logger(로그 기록기) 만들기');
    console.log('='.repeat(70));
    console.log('');

    // lesson24 전용 로거 생성
    const log = Logger('lesson24');

    // ------------------------------------------------
    // 1) Logger 소개
    // ------------------------------------------------
    console.log('🔹 1) Logger 소개');
    console.log('='.repeat(60));

    f_printCodeBlock(
        'utils.js 에서 Logger 생성 함수 사용 예',
        `const { Logger } = require('./utils');

const log = Logger('myApp');

log.info('서버가 시작되었습니다.');
log.warn('메모리 사용량이 높습니다.');
log.error('DB 연결 실패!');
log.debug('디버그용 상세 정보');`
    );

    console.log(`
        Logger(scope) 함수는:
        - scope 이름(예: 'lesson24', 'todo', 'server') 별로
        - 콘솔 + 파일 로그를 동시에 남깁니다.
        - 로그 파일 경로: ./tmp/logs/<scope>.log
        `);
    await f_pause(rl);

    // ------------------------------------------------
    // 2) info / warn / error / debug 로그 찍어보기
    // ------------------------------------------------
    console.log('\n🔹 2) info / warn / error / debug 로그 시연');
    console.log('='.repeat(60));

    log.info('레슨 24를 시작합니다.');
    log.debug('디버그: 내부 설정값 { foo: 1, bar: 2 }');
    log.warn('경고: 설정 파일이 기본값으로 사용됩니다.');
    log.error('에러: 샘플 오류 메시지입니다. (실제 오류는 아님)');

    console.log('\n위 네 줄이 콘솔과 파일에 모두 기록되었습니다.');
    console.log('이제 로그 파일 위치를 확인해 보겠습니다.');
    const logFilePath = log.getLogFilePath();
    console.log('\n📄 로그 파일 경로:');
    console.log(`   ${logFilePath}`);

    await f_pause(rl);

    // ------------------------------------------------
    // 3) 로그 파일 내용 일부 읽어오기
    // ------------------------------------------------
    console.log('\n🔹 3) 로그 파일의 마지막 몇 줄을 읽어보기');
    console.log('='.repeat(60));

    try {
        if (fs.existsSync(logFilePath)) {
            const text = fs.readFileSync(logFilePath, 'utf-8');
            const lines = text.trim().split('\n');
            const lastLines = lines.slice(-5); // 마지막 5줄만

            console.log('📖 로그 파일 마지막 5줄:');
            console.log('-'.repeat(60));
            lastLines.forEach((line) => console.log(line));
            console.log('-'.repeat(60));
        } else {
            console.log('⚠ 로그 파일이 아직 존재하지 않습니다.');
        }
    } catch (err) {
        console.log('⚠ 로그 파일을 읽는 중 오류:', err.message);
    }

    await f_pause(rl);

    // ------------------------------------------------
    // 4) 간단한 "작업 시나리오"에 Logger 사용해 보기
    // ------------------------------------------------
    console.log('\n🔹 4) 가짜 작업 흐름 + Logger 사용 예');
    console.log('='.repeat(60));

    function fakeTask(name, ms, shouldFail = false) {
        return new Promise((resolve, reject) => {
            log.info(`작업 "${name}"을(를) 시작합니다. (예상 소요: ${ms}ms)`);

            setTimeout(() => {
                if (shouldFail) {
                    const msg = `작업 "${name}"이(가) 실패했습니다.`;
                    log.error(msg);
                    reject(new Error(msg));
                } else {
                    const msg = `작업 "${name}"이(가) 성공적으로 완료되었습니다.`;
                    log.info(msg);
                    resolve(msg);
                }
            }, ms);
        });
    }

    try {
        await fakeTask('A-초기화', 300, false);
        await fakeTask('B-데이터 로딩', 300, false);
        await fakeTask('C-검증', 300, true); // 여기서 일부러 실패
        await fakeTask('D-정리', 300, false); // 이 줄은 실행되지 않음
    } catch (err) {
        console.log('\n⚠ fakeTask 흐름에서 오류 발생 (콘솔용):', err.message);
        console.log('   (Logger.error로도 이미 파일에 기록되어 있습니다.)');
    }

    await f_pause(rl);

    console.log('='.repeat(70));
    console.log('✅ 레슨 24를 완료했습니다! (Logger 사용법 연습 끝)');
}

module.exports = { run };
