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
};