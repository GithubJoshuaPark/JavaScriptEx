// lesson28.js
// ===============================
// 레슨 28: EventEmitter로 커스텀 이벤트 시스템
//  - Node.js events.EventEmitter 기본
//  - 커스텀 이벤트 정의 / 발생 (emit)
//  - on / once / removeListener 활용
// ===============================

const EventEmitter = require('events');
const {
    f_pause,
    getRandomEmoji,
    f_printCodeBlock,
} = require('../utils');

// ------------------------------------------
// 공용 질문 함수 (rl 사용)
// ------------------------------------------
function createAsk(rl) {
    return (question) =>
        new Promise((resolve) => {
            rl.question(question, (answer) => {
                resolve(answer.trim());
            });
        });
}

// ------------------------------------------
// 메뉴 출력
// ------------------------------------------
function showMenu() {
    console.clear();
    const emoji = getRandomEmoji();

    console.log('==============================================');
    console.log(`   ${emoji} 레슨 28: EventEmitter 커스텀 이벤트 시스템 ${emoji}`);
    console.log('==============================================\n');

    console.log(' 1) EventEmitter 기본 사용법 보기');
    console.log(' 2) 주문 흐름 시뮬레이션 (orderCreated, orderPaid 등)');
    console.log(' 3) once vs on 차이 체험하기');
    console.log(' 4) 리스너 제거(removeListener) 동작 확인');
    console.log(' 0) 레슨 종료 (메인 메뉴로 돌아가기)');
    console.log('----------------------------------------------');
}

// ------------------------------------------
// 1) EventEmitter 기본
// ------------------------------------------
function basicEventEmitterDemo() {
    console.log('\n🔹 1) EventEmitter 기본 사용법');
    console.log('----------------------------------------------');

    f_printCodeBlock(
        'EventEmitter 기본 패턴',
        `const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('greet', (name) => {
    console.log('안녕하세요, ' + name + '님!');
});

emitter.emit('greet', 'Joshua');  // 리스너 호출`
    );

    const emitter = new EventEmitter();

    emitter.on('greet', (name) => {
        console.log(`👋 greet 이벤트 수신: 안녕하세요, ${name}님!`);
    });

    emitter.emit('greet', 'Joshua');
    emitter.emit('greet', 'Hong');

    console.log('\n같은 이벤트 이름 "greet"에 여러 번 emit을 호출하면,');
    console.log('등록된 리스너(on)들이 매번 실행됩니다.');
}

// ------------------------------------------
// 2) 주문 흐름 시뮬레이션
// ------------------------------------------
function orderFlowSimulation() {
    console.log('\n🔹 2) 주문 흐름 시뮬레이션');
    console.log('----------------------------------------------');

    console.log(`
    가상의 주문 시스템 이벤트:
    - 'orderCreated'  : 주문 생성
    - 'orderPaid'     : 결제 완료
    - 'orderCancelled': 주문 취소
    `);

    const emitter = new EventEmitter();

    // 주문 생성 리스너
    emitter.on('orderCreated', (order) => {
        console.log(`📝 [orderCreated] 주문이 생성되었습니다. id=${order.id}, amount=${order.amount}`);
    });

    // 결제 완료 리스너
    emitter.on('orderPaid', (order) => {
        console.log(`💰 [orderPaid] 주문 결제가 완료되었습니다. id=${order.id}`);
    });

    // 주문 취소 리스너
    emitter.on('orderCancelled', (order, reason) => {
        console.log(`❌ [orderCancelled] 주문이 취소되었습니다. id=${order.id}, reason=${reason}`);
    });

    // 샘플 주문 데이터
    const order1 = { id: 101, amount: 50000 };
    const order2 = { id: 102, amount: 75000 };

    console.log('\n▶ order1 흐름: 생성 → 결제');
    emitter.emit('orderCreated', order1);
    emitter.emit('orderPaid', order1);

    console.log('\n▶ order2 흐름: 생성 → 취소');
    emitter.emit('orderCreated', order2);
    emitter.emit('orderCancelled', order2, '고객 요청');

    console.log('\n💡 비동기/동기 흐름 속에서 이벤트 기반으로 상태 변화를 통보할 수 있습니다.');
}

// ------------------------------------------
// 3) once vs on 차이
// ------------------------------------------
function onceVsOnDemo() {
    console.log('\n🔹 3) once vs on 차이 체험');
    console.log('----------------------------------------------');

    f_printCodeBlock(
        'once vs on',
        `emitter.on('tick', () => {
    console.log('on: 매번 호출');
});

emitter.once('tick', () => {
    console.log('once: 딱 한 번만 호출');
});

emitter.emit('tick');
emitter.emit('tick');
emitter.emit('tick');`
    );

    const emitter = new EventEmitter();

    emitter.on('tick', () => {
        console.log('⏱ on   리스너: tick 이벤트 수신!');
    });

    emitter.once('tick', () => {
        console.log('🎯 once 리스너: tick 이벤트 "처음 한 번만" 수신!');
    });

    console.log('\n▶ tick를 3번 emit 해 보겠습니다.\n');

    emitter.emit('tick');
    emitter.emit('tick');
    emitter.emit('tick');

    console.log(`
    결과:
    - on   리스너는 3번 모두 실행
    - once 리스너는 첫 번째 emit에서만 실행 후 자동 제거
    `);
}

// ------------------------------------------
// 4) 리스너 제거(removeListener / off)
// ------------------------------------------
function removeListenerDemo() {
    console.log('\n🔹 4) 리스너 제거(removeListener / off)');
    console.log('----------------------------------------------');

    const emitter = new EventEmitter();

    function onData(data) {
        console.log('📦 data 이벤트 수신:', data);
    }

    emitter.on('data', onData);

    console.log('▶ 초기 상태: data 리스너 1개 등록');
    emitter.emit('data', { id: 1, msg: '첫 번째 데이터' });

    console.log('\n▶ data 리스너 제거 후 emit');
    emitter.removeListener('data', onData);
    // Node 10+ 에서는 emitter.off('data', onData) 도 동일
    // emitter.off('data', onData);

    emitter.emit('data', { id: 2, msg: '두 번째 데이터 (리스너 제거 후)' });

    console.log(`
    두 번째 emit 시에는 리스너가 제거되어 아무런 출력이 없습니다.

    💡 정리:
    - 특정 상황 이후 더 이상 이벤트를 듣고 싶지 않을 때
        removeListener / off 로 리스너를 제거합니다.
    `);
}

// ------------------------------------------
// main run (loop + showMenu)
// ------------------------------------------
async function run(rl) {
    console.log('📚 레슨 28: EventEmitter로 커스텀 이벤트 시스템');
    console.log('='.repeat(70));
    console.log('');

    const ask = createAsk(rl);
    let running = true;

    while (running) {
        showMenu();

        const choice = await ask('\n원하는 번호를 입력하세요: ');
        console.log('');

        switch (choice) {
            case '1':
                basicEventEmitterDemo();
                await f_pause(rl);
                break;
            case '2':
                orderFlowSimulation();
                await f_pause(rl);
                break;
            case '3':
                onceVsOnDemo();
                await f_pause(rl);
                break;
            case '4':
                removeListenerDemo();
                await f_pause(rl);
                break;
            case '0':
                running = false;
                break;
            default:
                console.log('⚠ 올바른 번호를 입력해 주세요.');
                await f_pause(rl);
                break;
        }
    }

    console.log('='.repeat(70));
    console.log('✅ 레슨 28을 완료했습니다! 메인 메뉴로 돌아갑니다.');
}

module.exports = { run };
