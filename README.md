# EasyGift143 통합 대시보드

AI 기술을 활용한 개인화 선물 추천 플랫폼의 통합 관리 시스템

## 📁 프로젝트 구조

```
📦 EasyGift143-Dashboard/
├── 📄 index.html                    # 메인 레이아웃
├── 📂 pages/
│   ├── 📄 product-register.html     # 독립 실행 가능한 제품 등록 페이지
│   ├── 📄 engagement-assistant.html # 인게이지먼트 어시스턴트 페이지 (예정)
│   └── 📄 analytics-dashboard.html  # 분석 대시보드 페이지 (예정)
├── 📂 js/
│   ├── 📄 main.js                   # 공통 함수 및 상태 관리
│   ├── 📄 product-register.js       # 제품 등록 로직
│   ├── 📄 engagement-assistant.js   # 인게이지먼트 어시스턴트 로직
│   └── 📄 analytics.js              # 분석 대시보드 로직
├── 📂 css/
│   ├── 📄 main.css                  # 공통 스타일
│   └── 📄 components.css            # 컴포넌트별 스타일
├── 📂 data/
│   └── 📄 templates.json            # 댓글 템플릿 (예정)
└── 📄 README.md                     # 이 파일
```

# EasyGift143 통합 대시보드

AI 기술을 활용한 개인화 선물 추천 플랫폼의 통합 관리 시스템

## 📁 프로젝트 구조

```
📦 EasyGift143-Dashboard/
├── 📄 index.html                    # 메인 레이아웃
├── 📂 pages/
│   ├── 📄 product-register.html     # 독립 실행 가능한 제품 등록 페이지
│   ├── 📄 engagement-assistant.html # 인게이지먼트 어시스턴트 페이지 (예정)
│   └── 📄 analytics-dashboard.html  # 분석 대시보드 페이지 (예정)
├── 📂 js/
│   ├── 📄 main.js                   # 공통 함수 및 상태 관리
│   ├── 📄 product-register.js       # 제품 등록 로직
│   ├── 📄 engagement-assistant.js   # 인게이지먼트 어시스턴트 로직
│   └── 📄 analytics.js              # 분석 대시보드 로직
├── 📂 css/
│   ├── 📄 main.css                  # 공통 스타일
│   └── 📄 components.css            # 컴포넌트별 스타일
├── 📂 data/
│   └── 📄 templates.json            # 댓글 템플릿 (예정)
└── 📄 README.md                     # 이 파일
```

## 🚀 주요 기능

### 1. 제품 등록 도우미
- **웹훅 기반 데이터 전송**: Make.com → Airtable → Buffer 워크플로우
- **파일 업로드**: 정보 이미지(최대 4개) + 포스팅 이미지(1개)
- **구조화된 데이터 입력**: 제품명, 가격, 정보, 리뷰, 링크, 대가성 문구
- **전송 기록 관리**: 성공/실패 로그, 1일 자동 삭제, 최대 50개 기록 유지

### 2. 인게이지먼트 어시스턴트
- **일일 목표 관리**: 3개 언어 × 3개 플랫폼별 목표 설정 및 추적
- **번역 어시스턴트**: 한국어 → 일본어, 프랑스어 실시간 번역
- **댓글 템플릿**: 칭찬, 질문, 공감, 추천 카테고리별 템플릿 제공
- **게임화 요소**: 진행률 표시, 목표 달성 알림, 연속 달성 추적

### 3. 분석 대시보드 (Pro 모드 전용)
- **실시간 성과 분석**: Buffer + ManyChat API 연동
- **언어별 성과 추적**: 팔로워 수, 인게이지먼트율 분석
- **수익 모니터링**: 일일/월간 수익 추적 및 Pro 모드 업그레이드 권장
- **리포트 내보내기**: CSV 형태의 상세 리포트 생성

## 🎮 모드 시스템

### Free 모드 (기본)
- ✅ 제품 등록 기능
- ✅ 업계 표준 기반 일일 목표
- ✅ 번역 어시스턴트 (시뮬레이션)
- ✅ 댓글 템플릿
- ✅ 수동 데이터 입력

### Pro 모드 (월 $50+ 수익 달성 시 권장)
- ✅ Free 모드의 모든 기능
- ✅ AI 기반 맞춤 목표 설정
- ✅ Buffer Analytics API 연동
- ✅ ManyChat Analytics 연동
- ✅ 실시간 성과 분석
- ✅ 고급 리포팅

## 🛠️ 기술 스택

### Frontend
- **HTML5/CSS3**: 반응형 디자인
- **Vanilla JavaScript**: 모듈화된 구조
- **Local Storage**: 상태 저장 및 히스토리 관리

### API 연동
- **Make.com**: 워크플로우 자동화
- **Airtable**: 데이터베이스
- **Buffer API**: SNS 포스팅 자동화 (Pro)
- **ManyChat API**: DM 분석 (Pro)
- **OpenAI GPT API**: 번역 및 AI 기능

### 데이터 플로우
```
Discord 메시지 → Make.com → Airtable → Buffer → SNS 플랫폼
                    ↓
웹 인터페이스 → 웹훅 1 → 웹훅 2 → 포스팅 완료
```

## 📱 사용법

### 1. 초기 설정
1. `index.html`을 브라우저에서 열기
2. 웹훅 URL 2개 설정 및 저장
3. Make.com 워크플로우 연결 확인

### 2. 제품 등록
1. **데이터 입력**: 제품 정보 및 이미지 업로드
2. **전송**: 웹훅 1 → 웹훅 2 순차 처리
3. **확인**: 전송 로그에서 성공/실패 상태 확인

### 3. 인게이지먼트 관리
1. **목표 설정**: 언어별/플랫폼별 일일 목표 확인
2. **번역 사용**: 한국어 댓글을 3개 언어로 번역
3. **템플릿 활용**: 상황별 댓글 템플릿 사용
4. **진행률 추적**: 실시간 목표 달성률 모니터링

### 4. 분석 및 리포팅 (Pro 모드)
1. **대시보드 확인**: 실시간 성과 지표 모니터링
2. **언어별 분석**: 각 언어별 계정 성과 비교
3. **리포트 생성**: CSV 형태로 상세 분석 데이터 내보내기

## 🔧 설치 및 실행

### 로컬 실행
```bash
# 프로젝트 클론
git clone [repository-url]
cd EasyGift143-Dashboard

# 로컬 서버 실행 (선택사항)
python -m http.server 8000
# 또는
npx serve .

# 브라우저에서 접속
http://localhost:8000
```

### GitHub Pages 배포
1. GitHub 저장소에 코드 업로드
2. Settings → Pages → Source: Deploy from a branch
3. Branch: main, Folder: / (root) 선택
4. 배포된 URL로 접속

## 🎯 개발 로드맵

### Phase 1: 기본 구조 ✅
- [x] 모듈화 설계 완료
- [x] 메인 레이아웃 구현
- [x] Free 모드 기본 기능

### Phase 2: 제품 등록 개선 ✅
- [x] 웹훅 기반 전송 시스템
- [x] 파일 업로드 및 관리
- [x] 전송 기록 및 오류 처리
- [x] 기존 시스템과 완전 호환

### Phase 3: 인게이지먼트 어시스턴트 ✅
- [x] 일일 목표 시스템
- [x] 번역 어시스턴트 (시뮬레이션)
- [x] 댓글 템플릿 시스템
- [x] 게임화 요소

### Phase 4: Pro 모드 구현 🔄
- [x] 분석 대시보드 기본 구조
- [ ] Buffer API 실제 연동
- [ ] ManyChat API 실제 연동
- [ ] GPT API 실제 연동

### Phase 5: 최적화 및 확장 📋
- [ ] 성능 최적화
- [ ] 모바일 최적화
- [ ] PWA 기능 추가
- [ ] 다국어 지원 확대

## 🐛 알려진 이슈

1. **번역 기능**: 현재 시뮬레이션으로 구현됨 (GPT API 연동 예정)
2. **Pro 모드 API**: Buffer/ManyChat API 실제 연동 작업 중
3. **파일 저장**: 브라우저 세션 기반 (서버 저장소 연동 예정)

## 📞 지원 및 문의

- **개발자**: IdeaForest24
- **버전**: v2.0.0-modular
- **최종 업데이트**: 2025년 6월

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

**중요**: 이 시스템은 Gift Gift(EasyGift143) 프로젝트의 1단계 구현체입니다. 향후 2단계(대화형 AI 선물 추천 웹사이트)로 확장될 예정입니다.
