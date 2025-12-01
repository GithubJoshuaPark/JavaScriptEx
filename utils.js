const fs = require('fs');
const path = require('path');

// ###############################
// 🎲 이모지 배열 정의
// ###############################
const ME_EMOJI = ['💡', '✅️', '⛔', '🚫', '⚙️', '🧩', '✨', '⚠️', '💻', '🐶', '🐱', '🐹', '🐰', '🦊', '🐻', '🐼', '🐯', '🦁', '🐮', '🐸', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🐣', '🐳', '🌏', '🍎', '🍳', '⚾️', '🏄', '🚴', '🎧', '🎮', '🏍', '✈️', '🏝️', '🕹️', '❤️', '💞', '⚽️', '🥊', '🐘', '🐒', '🐨', '🐺', '🐷', '🐧', '🐥', '🐔', '🐦', '🐍', '🐄', '🐟', '🐉', '🐋', '🐌', '🐙', '🐝', '🐞', '🐛', '🐳', '🐐', '🐃', '🐡', '🌸', '🌹', '🐆', '🐫', '🐈', '🐊', '🐩', '🐾', '🎃', '🎅', '💾', '🎊', '📷', '🎁', '🎇', '🌆', '⛪', '🏬', '🏤', '😁', '😝', '🙈', '🙉', '💎', '💗'];

// ###############################
// 🎲 랜덤 이모지 선택 함수
// ###############################
/**
 * ME_EMOJI 배열에서 랜덤으로 하나의 이모지를 선택하여 반환합니다.
 * @returns {string} 랜덤으로 선택된 이모지
 */
function getRandomEmoji() {
    const randomIndex = Math.floor(Math.random() * ME_EMOJI.length);
    return ME_EMOJI[randomIndex];
}

// 간단한 sleep 유틸 (ms 후 resolve)
function f_sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// ###############################
// ⏸️ 일시정지 함수
// ###############################
/**
 * 사용자가 Enter 키를 누를 때까지 대기합니다.
 * @param {readline.Interface} [rlInterface] - 선택적 readline 인터페이스
 * @returns {Promise<void>}
 */
async function f_pause(rlInterface) {
    return new Promise((resolve) => {
        console.log();

        if (rlInterface) {
            // 기존 readline 인터페이스 사용 (main.js에서 호출 시)
            rlInterface.question(getRandomEmoji() + ' 계속하려면 [Enter] 키를 누르세요...', () => {
                console.log();
                resolve();
            });
        } else {
            // 독립적으로 사용 시 (레슨 내부에서 호출 시)
            const readline = require('readline');
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question(getRandomEmoji() + ' 계속하려면 [Enter] 키를 누르세요...', () => {
                console.log();
                rl.close();
                resolve();
            });
        }
    });
}

/**
 * YYYYMMDD 형식으로 정리:
 * - 사용자가 2025-11-28, 2025/11/28, 20251128 처럼 입력해도
 *   숫자만 남기고 "20251128" 형태로 맞춰 줍니다.
 */
function f_normalizeDateInput(input) {
    if (!input) return '';
    return input.replace(/\D/g, ''); // 숫자만 남김
}

/**
 * 파일명에 쓸 라벨을 안전하게 변환 (공백/한글 등 → _ 로 대체)
 */
function f_normalizeLabel(label) {
    if (!label) return 'unknown';
    return String(label).replace(/[^0-9A-Za-z_-]+/g, '_');
}

// 헬퍼: 코드 블록 출력
function f_printCodeBlock(title, code) {
    console.log(`\n${getRandomEmoji()} ${title}`);
    console.log('-'.repeat(60));
    console.log(code);
    console.log('-'.repeat(60));
    console.log('');
}


// ###############################
// 📝 간단 Logger 생성 함수
// ###############################
/**
 * scope(이름) 별로 로그 파일을 만들어 주는 간단 Logger
 * - 콘솔 출력 + 파일 로그 둘 다 남김
 * - 로그 파일 경로: <프로젝트>/tmp/logs/<scope>.log
 *
 * 사용 예:
 *   const { Logger } = require('./utils');
 *   const log = Logger('lesson24');
 *   log.info('시작');
 *   log.warn('경고');
 *   log.error('에러!');
 */
function Logger(scope = 'app') {
    const logDir = path.join(__dirname, 'tmp', 'logs');
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    const logFile = path.join(logDir, `${scope}.log`);

    function write(level, message) {
        const time = new Date().toISOString();
        const line = `[${time}][${scope}][${level}] ${message}`;
        // 콘솔 출력
        console.log(line);
        // 파일에 추가
        try {
            fs.appendFileSync(logFile, line + '\n', 'utf-8');
        } catch (err) {
            console.error('Logger 파일 쓰기 오류:', err.message);
        }
    }

    return {
        info: (msg) => write('💡 INFO', msg),
        warn: (msg) => write('⚠️ WARN', msg),
        error: (msg) => write('🚫 ERROR', msg),
        // 필요하면 디버그 용도도 추가 가능
        debug: (msg) => write('🐛 DEBUG', msg),
        // 로그 파일 위치 확인용
        getLogFilePath: () => logFile,
    };
}

// ###############################
// ✅ 유효성 검사 함수들
// ###############################

/**
 * 비어있지 않은 문자열인지 검사
 * - null, undefined, 빈 문자열, 공백만 있는 문자열 → false
 */
function isNonEmptyString(value) {
    if (typeof value !== 'string') return false;
    return value.trim().length > 0;
}

/**
 * 숫자 형태의 문자열인지 검사 (정수/실수 모두 허용)
 * - 예: "123", "3.14", "-10" → true
 * - 공백, 비어있음, 숫자 아님 → false
 */
function isNumberString(value) {
    if (typeof value !== 'string') return false;
    const trimmed = value.trim();
    if (trimmed === '') return false;
    const num = Number(trimmed);
    return !Number.isNaN(num);
}

/**
 * 정수 형태의 문자열인지 검사
 * - 예: "10", "-5" → true
 * - "3.14", "abc" → false
 */
function isIntegerString(value) {
    if (typeof value !== 'string') return false;
    const trimmed = value.trim();
    if (trimmed === '') return false;
    const num = Number(trimmed);
    return Number.isInteger(num);
}

/**
 * 정수가 특정 범위 안에 있는지 검사 (문자열도 허용)
 * - 값이 숫자가 아니거나 정수가 아니면 false
 * - min <= 값 <= max 이면 true
 */
function isIntInRange(value, min, max) {
    const num = typeof value === 'number' ? value : Number(String(value).trim());
    if (!Number.isInteger(num)) return false;
    return num >= min && num <= max;
}

/**
 * 이메일 형식인지 간단히 검사
 * - 아주 엄격한 RFC 수준은 아니고, 실무에서 자주 쓰는 기본 패턴
 */
function isEmail(value) {
    if (typeof value !== 'string') return false;
    const trimmed = value.trim();
    if (trimmed === '') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(trimmed);
}

/**
 * 휴대폰 번호(한국) 형식인지 검사
 * - 숫자만 남긴 후 01로 시작 + 10~11자리 허용
 *   예: 01012345678, 0112345678
 *   하이픈 포함 입력도 허용: 010-1234-5678
 */
function isKoreanPhone(value) {
    if (typeof value !== 'string') return false;
    const digits = value.replace(/\D/g, ''); // 숫자만 남김
    // 01로 시작, 뒤에 8~9자리 (총 10~11자리)
    return /^01[0-9]{8,9}$/.test(digits);
}

/**
 * 날짜 입력이 유효한 YYYYMMDD인지 검사
 * - "2025-11-28", "2025/11/28", "20251128" 모두 허용
 * - 내부적으로 숫자만 남기고 8자리 YYYYMMDD 검사
 */
function isValidDateYYYYMMDD(input) {
    if (typeof input !== 'string') return false;
    const digits = f_normalizeDateInput(input); // 숫자만 남김

    if (digits.length !== 8) return false;

    const year = Number(digits.slice(0, 4));
    const month = Number(digits.slice(4, 6));
    const day = Number(digits.slice(6, 8));

    if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
        return false;
    }

    // 간단한 연도 범위 체크 (필요시 조정 가능)
    if (year < 1900 || year > 2100) return false;

    // 실제로 존재하는 날짜인지 Date 객체로 검증
    const date = new Date(year, month - 1, day);
    const valid =
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;

    return valid;
}

// ###############################
// 📤 모듈 내보내기
// ###############################
module.exports = {
    ME_EMOJI,
    getRandomEmoji,
    f_pause,
    f_sleep,
    f_normalizeDateInput,
    f_normalizeLabel,
    f_printCodeBlock,
    Logger,
    // ✅ 유효성 검사 함수들
    isNonEmptyString,
    isNumberString,
    isIntegerString,
    isIntInRange,
    isEmail,
    isKoreanPhone,
    isValidDateYYYYMMDD,
};