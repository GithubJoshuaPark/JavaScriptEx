// lesson19.js
// ===============================
// 레슨 19: fs 모듈로 파일 읽고 쓰기
// ===============================

const fs = require('fs');
const path = require('path');
const { f_pause, getRandomEmoji, f_printCodeBlock } = require('../utils');

// ----------------------------------------------------
// 1. 기본 파일 쓰기/읽기 (Sync 버전)
// ----------------------------------------------------
function writeReadBasicSync() {
    console.log('🔹 1) 기본 파일 쓰기/읽기 (동기 방식: writeFileSync / readFileSync)');
    console.log('='.repeat(60));

    const dir = path.join(__dirname, '..', 'tmp', 'lesson19');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, 'hello_sync.txt');
    const text = `Hello Sync World! (${new Date().toISOString()})\n`;

    // 파일 쓰기
    fs.writeFileSync(filePath, text, 'utf-8');

    // 파일 읽기
    const readBack = fs.readFileSync(filePath, 'utf-8');

    console.log('📄 파일 경로:', filePath);
    console.log('💾 writeFileSync로 작성한 내용:');
    console.log(text);
    console.log('📖 readFileSync로 읽은 내용:');
    console.log(readBack);
}

// ----------------------------------------------------
// 2. 비동기 파일 쓰기/읽기 (Async 버전)
// ----------------------------------------------------
async function writeReadBasicAsync() {
    console.log('\n🔹 2) 비동기 파일 쓰기/읽기 (fs.promises) ');
    console.log('='.repeat(60));

    const dir = path.join(__dirname, '..', 'tmp', 'lesson19');
    const filePath = path.join(dir, 'hello_async.txt');

    const text = `Hello Async World! (${new Date().toISOString()})\n`;

    await fs.promises.writeFile(filePath, text, 'utf-8');

    const readBack = await fs.promises.readFile(filePath, 'utf-8');

    console.log('📄 파일 경로:', filePath);
    console.log('💾 writeFile (async) 내용:');
    console.log(text);
    console.log('📖 readFile (async) 내용:');
    console.log(readBack);
}

// ----------------------------------------------------
// 3. JSON 파일 저장 및 읽기
// ----------------------------------------------------
async function writeReadJsonExample() {
    console.log('\n🔹 3) JSON 파일 저장/읽기');
    console.log('='.repeat(60));

    const dir = path.join(__dirname, '..', 'tmp', 'lesson19');
    const filePath = path.join(dir, 'data.json');

    const data = {
        now: new Date().toISOString(),
        score: 99,
        valid: true,
        tags: ['node', 'fs', 'lesson19'],
    };

    // JSON.stringify로 변환 후 저장
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

    // 다시 읽기
    const jsonText = await fs.promises.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(jsonText);

    console.log('📄 파일 경로:', filePath);
    console.log('💾 저장된 JSON:');
    console.log(data);
    console.log('📖 읽어서 JS 객체로 변환:');
    console.log(parsed);
}

// ----------------------------------------------------
// 4. 파일/폴더 존재 여부 확인
// ----------------------------------------------------
function checkExistence() {
    console.log('\n🔹 4) 파일/폴더 존재 여부 확인');
    console.log('='.repeat(60));

    const dir = path.join(__dirname, '..', 'tmp', 'lesson19');
    const filePath = path.join(dir, 'hello_sync.txt');

    console.log('폴더 존재 여부:', fs.existsSync(dir));
    console.log('파일 존재 여부:', fs.existsSync(filePath));

    f_printCodeBlock(
        'existsSync 사용 예',
        `const exists = fs.existsSync('/path/to/file');
if (exists) {
    console.log('파일이 존재합니다');
} else {
    console.log('파일이 없습니다');
}`
    );
}

// ----------------------------------------------------
// 5. 파일 삭제하기
// ----------------------------------------------------
async function deleteExample() {
    console.log('\n🔹 5) 파일 삭제하기 (fs.unlink / fs.rm)');
    console.log('='.repeat(60));

    const dir = path.join(__dirname, '..', 'tmp', 'lesson19');
    const filePath = path.join(dir, 'delete_me.txt');

    // 삭제 테스트용 파일 생성
    await fs.promises.writeFile(filePath, '삭제 테스트 파일입니다.', 'utf-8');

    console.log('📄 생성된 파일 경로:', filePath);

    await fs.promises.rm(filePath);
    console.log('🗑 파일 삭제 완료!\n');
}

// ----------------------------------------------------
// main run
// ----------------------------------------------------
async function run(rl) {
    console.log('📚 레슨 19: fs 모듈로 파일 읽고 쓰기');
    console.log('='.repeat(70));

    writeReadBasicSync();
    await f_pause(rl);

    await writeReadBasicAsync();
    await f_pause(rl);

    await writeReadJsonExample();
    await f_pause(rl);

    checkExistence();
    await f_pause(rl);

    await deleteExample();
    await f_pause(rl);

    console.log('='.repeat(70));
    console.log('✅ 레슨 19을 완료했습니다!');
}

module.exports = { run };
