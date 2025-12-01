// lesson30.js
// ===============================
// 레슨 30: 모듈 구조를 갖춘 미니 프로젝트 구성
//  - 주제: ✈️ 쓰시마(대마도) 1박 2일 여행 일정 안내
//  - JSON 파일로 여행 계획 데이터 관리
//  - Repository / View "모듈 역할" 분리
// ===============================

const fs = require('fs');
const path = require('path');
const {
    f_pause,
    getRandomEmoji,
    f_printCodeBlock,
} = require('../utils');

// ------------------------------------------
// 0. 공용 설정 및 타입
// ------------------------------------------
const DATA_DIR = path.join(__dirname, '..', 'tmp', 'lesson30');
const PLAN_FILE = path.join(DATA_DIR, 'tsushima_1n2d_plan.json');

// 질문 헬퍼
function createAsk(rl) {
    return (question) =>
        new Promise((resolve) => {
            rl.question(question, (answer) => {
                resolve(answer.trim());
            });
        });
}

// ------------------------------------------
// 1. Repository 모듈: JSON 파일 관리
//    (실제라면 별도 파일로 분리 가능)
// ------------------------------------------
const TripRepository = {
    ensureDataDir() {
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }
    },

    // 기본 여행 계획 생성
    createDefaultPlan() {
        return {
            meta: {
                title: '✈️ 쓰시마(대마도) 1박 2일 여행 계획',
                createdAt: new Date().toISOString(),
                version: 1,
            },
            summary: {
                period: '2025-12-10 (화) ~ 2025-12-11 (수) (1박 2일)',
                hotel: {
                    name: '토요코 인 쓰시마 히타카츠',
                    englishName: 'Toyoko Inn Tsushima Hitakatsu',
                    area: '히타카츠 지역',
                },
                transport: {
                    depart: '부산 → 히타카츠 (배편, 09:40 출발)',
                    return: '이즈하라 → 부산 (배편, 15:00 출발)',
                },
            },
            rentalCar: {
                note: '쓰시마는 대중교통이 불편하므로 렌터카가 가장 편리한 이동 수단입니다.',
                reservation: {
                    mustReserveOnline: true,
                    description: '성수기가 아니더라도 재고가 많지 않아 사전 온라인 예약 필수.',
                    companies: [
                        '밸류마트 렌터카',
                        '니시카와 렌터카',
                        '후루사토 렌터카',
                    ],
                    tips: [
                        '히타카츠 항구 근처 업체가 많음.',
                        '픽업/반납 위치가 히타카츠 항인지 꼭 확인.',
                    ],
                },
                requiredDocuments: [
                    '국제 운전면허증 (한국 발급, 유효기간 1년)',
                    '한국 운전면허증 (국제면허증과 함께 지참)',
                    '여권 (본인 확인용)',
                ],
                drivingNotes: [
                    '우측 운전석, 좌측 통행 → 한국과 반대이므로 초반에 특히 주의.',
                    '산길/시내 도로가 좁아 저속 운전과 코너링 주의.',
                ],
                navigation: [
                    '차량 내 일본어 내비게이션은 사용이 어려울 수 있음.',
                    '스마트폰 구글맵/네이버맵을 함께 사용 권장.',
                ],
            },
            itinerary: [
                {
                    day: 1,
                    date: '2025-12-10',
                    title: '1일차 (상대마도) – 히타카츠 지역',
                    schedule: [
                        {
                            time: '오전 (10:00~)',
                            activity: '입국 및 렌터카 인수',
                            place: '히타카츠 항 국제터미널',
                            tips: '입국 수속 후 예약한 렌터카 사무소로 이동.',
                        },
                        {
                            time: '점심',
                            activity: '신선한 해산물 또는 쓰시마 특색 요리',
                            place: '미우다 식당(みうだ) 또는 키요(きよ)',
                            tips: '미우다: 바닷가 근처, 키요: 해산물 덮밥으로 유명.',
                        },
                        {
                            time: '오후',
                            activity: '주요 관광 + 숙소 체크인',
                            place: '미우다 해변 → 토노사키 공원 → 숙소 체크인',
                            tips: '미우다 해변은 일본의 아름다운 해변 100선 중 하나.',
                        },
                        {
                            time: '저녁',
                            activity: '히타카츠 시내 식사',
                            place: '카이칸 식당(会館食) 또는 야마네코(やまねこ)',
                            tips: '카이칸: 정식 메뉴, 야마네코: 현지 술집 분위기.',
                        },
                    ],
                },
                {
                    day: 2,
                    date: '2025-12-11',
                    title: '2일차 (하대마도) – 이즈하라 지역',
                    schedule: [
                        {
                            time: '아침 (08:00~)',
                            activity: '숙소 조식 및 이동',
                            place: '토요코 인 조식 → 히타카츠 → 이즈하라',
                            tips: '차량 이동 약 2시간 30분 ~ 3시간 소요.',
                        },
                        {
                            time: '오전',
                            activity: '이즈하라 이동 및 경유 관광',
                            place: '만제키바시(만관교) → 와타즈미 신사(和多都美神社)',
                            tips: '만제키바시는 러일전쟁 당시 인공 운하, 신사 방문 시 조용한 관람.',
                        },
                        {
                            time: '점심',
                            activity: '이즈하라 시내 식사 및 쇼핑',
                            place: '이즈하라 마치도모리 또는 카스 마키(카스텔라 김밥)',
                            tips: '식사 후 면세 쇼핑 및 귀국 전 정리.',
                        },
                        {
                            time: '오후 (13:00~)',
                            activity: '렌터카 반납 및 출국 수속',
                            place: '이즈하라 항 국제터미널',
                            tips: '반납 전 주유 필수, 출발 최소 1시간 전 터미널 도착 권장.',
                        },
                    ],
                },
            ],
            money: {
                where: [
                    '한국에서 미리 환전 (부산 시내 은행/환전소, 김해공항 등).',
                    '쓰시마 현지 환전은 장소가 제한적이고 환율이 불리할 수 있음.',
                ],
                howMuch: {
                    recommendation: '1인당 약 30,000 JPY (숙박/렌터카 제외 식사, 쇼핑, 주유 등)',
                    notes: [
                        '현금 결제 위주인 곳이 많음.',
                        '비상용 카드(VISA/Master) 지참 권장.',
                    ],
                },
            },
            mobile: {
                tip: '일본 USIM/eSIM + 데이터만 사용, 한국 통신사 음성 로밍 차단을 병행하면 전화 요금 방지에 유리.',
                options: [
                    {
                        type: '① 일본 USIM 또는 eSIM',
                        pros: [
                            '로밍 대비 저렴한 편.',
                            '데이터 속도 안정적.',
                        ],
                        cons: [
                            'USIM 교체 시 한국 번호 사용 불가.',
                            'eSIM은 단말기 지원 필요.',
                        ],
                        recommendedFor: '데이터 사용량이 많고, 비용 효율을 중시하는 대부분의 여행자에게 가장 추천.',
                    },
                    {
                        type: '② 통신사 데이터 로밍',
                        pros: [
                            '설정이 간편.',
                            '한국 번호로 전화/문자 수신 가능.',
                        ],
                        cons: ['USIM/eSIM 대비 가격이 비쌈 (일일 요금제).'],
                        recommendedFor: '간편함을 중시하거나, 매우 짧은 일정의 여행자.',
                    },
                    {
                        type: '③ 포켓 와이파이',
                        pros: ['여러 명이 함께 데이터 공유 가능.'],
                        cons: [
                            '기기를 항상 들고 다녀야 함.',
                            '충전 필요.',
                            '분실 위험.',
                        ],
                        recommendedFor: '동행 인원이 많은 그룹 여행.',
                    },
                ],
            },
        };
    },

    async loadPlan() {
        this.ensureDataDir();

        if (!fs.existsSync(PLAN_FILE)) {
            const defaultPlan = this.createDefaultPlan();
            await this.savePlan(defaultPlan);
            return defaultPlan;
        }

        const text = await fs.promises.readFile(PLAN_FILE, 'utf-8');
        return JSON.parse(text); // JSON 문자열을 JavaScript 객체 {} 로 변환
    },

    async savePlan(plan) {
        this.ensureDataDir();
        const text = JSON.stringify(plan, null, 2); // JavaScript 객체 {}를 JSON 문자열로 변환
        await fs.promises.writeFile(PLAN_FILE, text, 'utf-8');
    },
};

// ------------------------------------------
// 2. View 모듈: 콘솔 출력 전담
//    (실제라면 별도 파일로 분리 가능)
// ------------------------------------------
const TripView = {
    printSummary(plan) {
        console.log('\n🔹 여행 기본 요약');
        console.log('------------------------------------------');

        const { summary, meta } = plan;
        console.log(meta.title);
        console.log(`- 기간     : ${summary.period}`);
        console.log(`- 숙소     : ${summary.hotel.name} (${summary.hotel.englishName})`);
        console.log(`- 지역     : ${summary.hotel.area}`);
        console.log(`- 출발 교통: ${summary.transport.depart}`);
        console.log(`- 귀국 교통: ${summary.transport.return}`);
    },

    printRentalCar(plan) {
        console.log('\n🔹 렌터카 이용 안내');
        console.log('------------------------------------------');

        const { rentalCar } = plan;
        console.log(rentalCar.note);
        console.log('\n[예약 관련]');
        console.log('- 사전 온라인 예약 필수 여부:', rentalCar.reservation.mustReserveOnline ? '예' : '아니오');
        console.log(`- 설명   : ${rentalCar.reservation.description}`);
        console.log('- 주요 업체:');
        rentalCar.reservation.companies.forEach((c) => console.log(`  · ${c}`));
        console.log('- 팁:');
        rentalCar.reservation.tips.forEach((t) => console.log(`  · ${t}`));

        console.log('\n[필수 준비물]');
        rentalCar.requiredDocuments.forEach((doc) => console.log(`  · ${doc}`));

        console.log('\n[운전 시 주의]');
        rentalCar.drivingNotes.forEach((note) => console.log(`  · ${note}`));

        console.log('\n[내비게이션 팁]');
        rentalCar.navigation.forEach((nav) => console.log(`  · ${nav}`));
    },

    printItineraryForDay(plan, dayNumber) {
        const dayPlan = plan.itinerary.find((d) => d.day === dayNumber);
        if (!dayPlan) {
            console.log(`\n⚠ ${dayNumber}일차 일정 정보를 찾을 수 없습니다.`);
            return;
        }

        console.log(`\n🔹 ${dayPlan.title} (${dayPlan.date})`);
        console.log('------------------------------------------');

        dayPlan.schedule.forEach((item) => {
            console.log(`⏰ 시간대 : ${item.time}`);
            console.log(`   활동   : ${item.activity}`);
            console.log(`   장소   : ${item.place}`);
            console.log(`   팁     : ${item.tips}`);
            console.log('');
        });
    },

    printMoney(plan) {
        console.log('\n🔹 환전 및 예상 경비');
        console.log('------------------------------------------');

        const { money } = plan;
        console.log('[언제/어디서 환전할까?]');
        money.where.forEach((w) => console.log(`  · ${w}`));

        console.log('\n[얼마나 환전할까?]');
        console.log(`- 추천 금액: ${money.howMuch.recommendation}`);
        console.log('- 참고 사항:');
        money.howMuch.notes.forEach((n) => console.log(`  · ${n}`));
    },

    printMobile(plan) {
        console.log('\n🔹 휴대폰 사용 (USIM / 로밍 / 포켓와이파이)');
        console.log('------------------------------------------');

        const { mobile } = plan;
        console.log('[전체 팁]');
        console.log(`- ${mobile.tip}`);

        console.log('\n[옵션별 비교]');
        mobile.options.forEach((opt) => {
            console.log(`\n${opt.type}`);
            console.log('  장점:');
            opt.pros.forEach((p) => console.log(`    · ${p}`));
            console.log('  단점:');
            opt.cons.forEach((c) => console.log(`    · ${c}`));
            console.log('  추천 대상:');
            console.log(`    · ${opt.recommendedFor}`);
        });
    },

    showModuleStructureHint() {
        console.log('\n🔹 모듈 구조 예시 (실전에서 이렇게 쪼갤 수 있습니다)');
        console.log('------------------------------------------');

        f_printCodeBlock(
            '예시: 파일을 나누는 구조',
            `/travelApp
  |- main.js               // 엔트리 포인트 (메뉴 루프)
  |- repositories
  |    \\- tripRepository.js  // JSON 읽기/쓰기
  |- services
  |    \\- tripService.js     // 비즈니스 로직 (검색, 필터 등)
  |- views
       \\- tripView.js        // 콘솔/웹 출력 담당`
        );

        console.log(`
현재 lesson30.js에서는 이 구조를 "한 파일 안에서" 흉내내고 있지만,
실제 프로젝트에서는 파일을 나눠서 각 역할을 분리하면 관리와 재사용성이 좋아집니다.
`);
    },
};

// ------------------------------------------
// 3. 메뉴 출력
// ------------------------------------------
function showMenu() {
    console.clear();
    const emoji = getRandomEmoji();

    console.log('=======================================================');
    console.log(`   ${emoji} 레슨 30: 모듈 구조를 갖춘 미니 여행 프로젝트 ${emoji}`);
    console.log('=======================================================\n');

    console.log(' 1) 여행 기본 요약 보기');
    console.log(' 2) 1일차(히타카츠) 일정 보기');
    console.log(' 3) 2일차(이즈하라) 일정 보기');
    console.log(' 4) 렌터카 이용 안내 보기');
    console.log(' 5) 환전 및 예상 경비 안내');
    console.log(' 6) 휴대폰 사용(USIM/eSIM/로밍) 안내');
    console.log(' 7) 모듈 구조 예시 설명 보기');
    console.log(' 0) 레슨 종료 (메인 메뉴로 돌아가기)');
    console.log('-------------------------------------------------------');
}

// ------------------------------------------
// 4. main run
// ------------------------------------------
async function run(rl) {
    console.log('📚 레슨 30: 모듈 구조를 갖춘 미니 프로젝트 구성');
    console.log('='.repeat(70));
    console.log('');

    const ask = createAsk(rl);

    // JSON 계획 로드 (없으면 기본값 생성 후 저장)
    const plan = await TripRepository.loadPlan();

    let running = true;

    while (running) {
        showMenu();

        const choice = await ask('\n원하는 번호를 입력하세요: ');
        console.log('');

        switch (choice) {
            case '1':
                TripView.printSummary(plan);
                await f_pause(rl);
                break;
            case '2':
                TripView.printItineraryForDay(plan, 1);
                await f_pause(rl);
                break;
            case '3':
                TripView.printItineraryForDay(plan, 2);
                await f_pause(rl);
                break;
            case '4':
                TripView.printRentalCar(plan);
                await f_pause(rl);
                break;
            case '5':
                TripView.printMoney(plan);
                await f_pause(rl);
                break;
            case '6':
                TripView.printMobile(plan);
                await f_pause(rl);
                break;
            case '7':
                TripView.showModuleStructureHint();
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
    console.log('✅ 레슨 30를 완료했습니다! 메인 메뉴로 돌아갑니다.');
}

module.exports = { run };
