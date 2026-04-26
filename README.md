# mTalk AI Lab

> LG CNS의 사내 메신저 mTalk에 적용 가능한 7가지 AI 신기능을 통합 데모로 시연하는 프로젝트.

## 컨셉

mTalk이 가진 강력한 기반 (시스템 알림 API, 41개 그룹사 운영) 위에 AI를 더해 업무 효율을 한 단계 진화시키는 7가지 기능을 검증.

모든 AI 기능은 **토글 ON/OFF**로 비교 가능 — 면접관이 직접 "AI 없을 때 vs 있을 때"를 체험.

## 7가지 기능

| # | 기능 | 설명 | 토글 |
|---|------|------|------|
| 1 | **AI 메시지 요약** | 자리 비웠을 때 쌓인 87개 메시지를 핵심 요약 | Smart Catch-up |
| 2 | **알림 우선순위 분류** | 인사/ERP/결재 알림을 긴급/중요/참고로 자동 분류 | Notification AI |
| 3 | **회의록 자동 생성** | 단체 채팅방 대화 → 구조화된 회의록 | Meeting Notes |
| 4 | **답변 초안 제안** | 3가지 톤 (공식/친근/간결)으로 답변 초안 생성 | Smart Reply |
| 5 | **의미 기반 검색** | 자연어로 메시지 검색 (키워드 아닌 의미) | Semantic Search |
| 6 | **우선순위 학습** | 읽기 패턴 학습으로 개인화 알림 큐레이션 | Priority Learning |
| 7 | **워크-라이프 모드** | 근무 시간 외 자동 무음 + 자동 응답 + 발신 경고 | Work-Life Mode |

## 기술 스택

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **AI**: Anthropic Claude API (claude-3-5-haiku)
- **State**: Zustand (persist middleware)
- **Deploy**: Cloudflare Pages (예정)

## 시작하기

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.local.example .env.local
# .env.local에 ANTHROPIC_API_KEY 입력

# 개발 서버 시작
npm run dev
```

http://localhost:3000 에서 확인.

## 프로젝트 구조

```
src/
├── app/
│   ├── api/           # 5개 Edge API Routes
│   │   ├── summarize/ # 기능1: 메시지 요약
│   │   ├── classify/  # 기능2: 알림 분류
│   │   ├── meeting-notes/ # 기능3: 회의록
│   │   ├── reply-draft/   # 기능4: 답변 초안
│   │   └── search/    # 기능5: 의미 검색
│   ├── chat/[id]/     # 채팅방
│   ├── notifications/ # 알림 페이지
│   ├── search/        # 검색 페이지
│   └── settings/      # 설정 + 토글
├── components/
│   ├── chat/          # SmartCatchup, MeetingControls, ReplyDraft, PriorityDashboard
│   ├── layout/        # Sidebar, MobileSidebar
│   └── settings/      # WorkLifeSettings
├── data/              # Mock 데이터 (채팅방 5개, 메시지 100+, 알림 30개)
└── store/             # Zustand stores (feature, meeting, priority, workLife)
```

## 만든 사람

고경석 / TmaxGAIA 5년 5개월 오피스 SW 엔진 + AI 협업 서비스 1년

## Disclaimer

본 프로젝트는 LG CNS와 무관한 컨셉 프로토타입이며, 실제 mTalk 코드와는 별개입니다.
