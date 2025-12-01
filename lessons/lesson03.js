// ===============================
// 레슨 3: 조건문으로 점수 평가 프로그램 만들기
// ===============================

const { f_pause } = require('../utils');

async function run(outerRl) {
    console.log('📚 레슨 3: 조건문으로 점수 평가 프로그램 만들기');
    console.log('='.repeat(50));
    console.log('');

    // =============================
    // 1. if - else if - else 문
    // =============================
    console.log('🔹 1. if - else if - else 문 (학점 계산)');
    console.log('-'.repeat(50));

    const score = 85;
    let grade;

    console.log(`점수: ${score}점`);

    if (score >= 90) {
        grade = 'A';
        console.log('90점 이상이므로 A학점입니다.');
    } else if (score >= 80) {
        grade = 'B';
        console.log('80점 이상이므로 B학점입니다.');
    } else if (score >= 70) {
        grade = 'C';
        console.log('70점 이상이므로 C학점입니다.');
    } else if (score >= 60) {
        grade = 'D';
        console.log('60점 이상이므로 D학점입니다.');
    } else {
        grade = 'F';
        console.log('60점 미만이므로 F학점입니다.');
    }

    console.log(`➡️ 최종 학점: ${grade}`);

    await f_pause(outerRl);

    // =============================
    // 2. switch 문
    // =============================
    console.log('🔹 2. switch 문 (학점별 피드백)');
    console.log('-'.repeat(50));

    // 위에서 결정된 grade 변수 사용
    console.log(`학점: ${grade}`);

    switch (grade) {
        case 'A':
            console.log('피드백: 탁월합니다! 완벽해요! 🏆');
            break;
        case 'B':
            console.log('피드백: 잘했습니다! 조금만 더 노력해봐요. 👍');
            break;
        case 'C':
            console.log('피드백: 보통입니다. 분발하세요. 🙂');
            break;
        case 'D':
            console.log('피드백: 재수강을 고려해보세요. 😅');
            break;
        case 'F':
            console.log('피드백: 공부를 전혀 안 하셨군요... 😱');
            break;
        default:
            console.log('피드백: 알 수 없는 학점입니다.');
    }

    await f_pause(outerRl);

    // =============================
    // 3. 삼항 연산자 (Ternary Operator)
    // =============================
    console.log('🔹 3. 삼항 연산자 (합격 여부)');
    console.log('-'.repeat(50));

    // (조건) ? 참일_때_값 : 거짓일_때_값
    const passScore = 60;
    const isPassed = score >= passScore ? '합격 🎉' : '불합격 💧';

    console.log(`기준 점수: ${passScore}점`);
    console.log(`내 점수: ${score}점`);
    console.log(`결과: ${isPassed}`);

    console.log('');
    console.log('💡 삼항 연산자는 간단한 if-else 문을 한 줄로 줄일 때 유용합니다.');

    await f_pause(outerRl);

    // =============================
    // 4. 단축 평가 (Short-circuit Evaluation)
    // =============================
    console.log('🔹 4. 논리 연산자 단축 평가');
    console.log('-'.repeat(50));

    const username = 'Guest';
    const savedName = null;

    // || (OR): 앞의 값이 Falsy면 뒤의 값을 사용 (기본값 설정에 유용)
    const displayName = savedName || username;
    console.log(`저장된 이름: ${savedName}`);
    console.log(`기본 이름: ${username}`);
    console.log(`➡️ 표시할 이름: ${displayName}`);

    console.log('');

    // && (AND): 앞의 값이 Truthy일 때만 뒤의 코드를 실행 (조건부 실행에 유용)
    const isLoggedIn = true;
    isLoggedIn && console.log('✅ 로그인 상태이므로 이 메시지가 보입니다.');

    const isAdmin = false;
    isAdmin && console.log('❌ 관리자가 아니므로 이 메시지는 안 보입니다.');

    console.log('');
    console.log('='.repeat(50));
    console.log('✅ 레슨 3을 완료했습니다!');
}

// ===============================
// 모듈 내보내기
// ===============================
module.exports = { run };
