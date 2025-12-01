// lesson21.js
// ===============================
// 레슨 21: http 모듈로 간단한 HTTP 서버 만들기
// ===============================

const http = require('http');
const { f_pause, getRandomEmoji } = require('../utils');

// ------------------------------------------
// 1. 기본 HTTP 서버 생성
// ------------------------------------------
function createBasicServer() {
    console.log('🔹 1) http.createServer 기본 구조');
    console.log('='.repeat(60));

    console.log(`
    Node.js의 http 모듈은 웹 서버를 직접 만들 수 있는 가장 기본 기능을 제공합니다.

    기본 구조는 다음과 같습니다:

    -------------------------------------
    const http = require('http');

    const server = http.createServer((req, res) => {
        res.end('Hello World');
    });

    server.listen(3000);
    -------------------------------------

    - req: 요청(request) 객체 (메소드, URL 등)
    - res: 응답(response) 객체
    `);
}

// ------------------------------------------
// 2. 라우팅이 포함된 서버 예제
// ------------------------------------------
function showRoutingExample() {
    console.log('\n🔹 2) 라우팅 기능 추가 예시');
    console.log('='.repeat(60));

    console.log(`
    아주 간단한 라우팅을 수동으로 만들 수 있습니다.

    ------------------------------------
    if (req.url === '/') {
        res.end('Home Page');
    } else if (req.url === '/hello') {
        res.end('Hello');
    } else if (req.url === '/json') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ msg: 'Hi!' }));
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
    ------------------------------------
    `);
}

// ------------------------------------------
// 3. 실제로 서버 실행하기
// ------------------------------------------
function startHttpServer(port = 3000) {
    console.log(`\n🔹 3) 실제 HTTP 서버를 포트 ${port}에서 실행해 봅니다.`);
    console.log('='.repeat(60));

    const server = http.createServer((req, res) => {
        console.log(`📨 요청: ${req.method} ${req.url}`);

        // 간단 라우팅
        if (req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('🏠 홈 페이지입니다.\n');
        }
        else if (req.url === '/hello') {
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('👋 Hello, Joshua!\n');
        }
        else if (req.url === '/json') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, msg: 'JSON 응답입니다!' }, null, 2));
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found\n');
        }
    });

    // 서버 시작
    server.listen(port, () => {
        console.log(`🚀 서버가 실행 중입니다 → http://localhost:${port}`);
        console.log('브라우저를 열고 홈/hello/json 주소를 테스트하세요.');
        console.log('ex) http://localhost:3000/hello');
    });

    return server;
}

// ------------------------------------------
// main run
// ------------------------------------------
async function run(rl) {
    console.log('📚 레슨 21: http 모듈로 간단한 HTTP 서버 만들기');
    console.log('='.repeat(70));
    console.log('');

    createBasicServer();
    await f_pause(rl);

    showRoutingExample();
    await f_pause(rl);

    // 서버 시작
    const server = startHttpServer(3000);
    await f_pause(rl);

    // 서버 종료
    console.log('🛑 서버를 종료합니다...');
    server.close();

    console.log('\n='.repeat(5));
    console.log('✅ 레슨 21을 완료했습니다! HTTP 서버 동작 확인 끝!');
}

module.exports = { run };
