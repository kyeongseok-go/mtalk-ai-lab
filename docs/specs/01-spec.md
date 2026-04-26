---
type: spec
project_slug: mtalk-ai-lab
version: v1.0
source_design_doc: docs/specs/design-doc-mtalk-ai-lab.md
status: draft
created: 2026-04-26
sprint_weeks_estimate: 1
---

# mTalk AI Lab — Spec v1.0

## 1. 개요

### 무엇
LG CNS 사내 메신저 mTalk에 적용 가능한 7가지 AI 기능의 통합 데모 웹앱.

### 왜
- 채용 면접에서 "이미 만들어봤습니다" 증명
- AI가 사내 메신저에 줄 수 있는 가치를 토글 ON/OFF 비교로 시연

### 범위
- Phase 1 (D-4): 기능 1~3 + 배포
- Phase 2 (D+5): 기능 4~7 추가

## 2. 커리어 시그널

- **타겟사**: 한화에어로스페이스, LG CNS, SK AX, 삼성 SDS, KT, GS칼텍스, 한화시스템 ICT, CJ올리브네트웍스, HD현대, 포스코
- **JD 키워드 매치**: LLM 워크플로우, 프롬프트 엔지니어링, TypeScript, React, Next.js, Cloudflare Workers, AI 에이전트
- **포트폴리오 한 줄**: "사내 메신저 mTalk에 7가지 AI 기능을 설계·구현한 통합 데모 — 토글 비교로 AI 전/후를 즉시 체험"
- **이력서 불릿**: "Next.js + Claude API 기반 사내 메신저 AI 기능 7종 프로토타입 설계·개발·배포 (4일, 단독)"

## 3. 기능 요구사항 (FR)

### FR-1: AI 메시지 요약 (Smart Catch-up)
- 채팅방 진입 시 안 읽은 메시지 수 배너 표시
- "AI 요약 보기" 클릭 → Claude API 호출 → 결과 카드
- 결과: 핵심 결정사항 / 액션 아이템 / 본인 멘션 / 첨부파일
- 토글 OFF 시 컴포넌트 미렌더링
- 5개 미만 메시지면 배너 미표시
- AI ON vs OFF 비교 시연 버튼

### FR-2: 시스템 알림 우선순위 분류
- 30개 가짜 알림 (긴급 5 / 중요 12 / 참고 13)
- 토글 OFF: 시간순 정렬
- 토글 ON: AI 자동 분류 + 그룹핑 + 판단 근거
- 사용자 수동 변경 → 학습 시뮬레이션

### FR-3: 회의록 자동 생성
- 채팅방 헤더 "회의 시작" 버튼
- 진행 중 빨간 배너
- "회의 종료" → 5초 로딩 → 회의록 모달
- 편집 + "공지로 게시" 기능

### FR-4~7: Phase 2 (답변 초안, 의미 검색, 우선순위 학습, 워크-라이프 모드)
- Coming Soon 페이지로 표시
- 토글은 존재하되 ON 시 "준비 중" 안내

## 4. 비기능 요구사항 (NFR)

- **NFR-1**: 토글 상태 페이지 이동 후에도 유지 (localStorage 또는 zustand)
- **NFR-2**: Claude API 응답 JSON 안전 추출 (```json 블록 파싱)
- **NFR-3**: 로딩 스켈레톤 + 에러 처리 모든 API 호출에 적용
- **NFR-4**: Cloudflare Pages 배포 가능 (Edge Runtime 호환)
- **NFR-5**: 모바일 반응형 (최소 375px)
- **NFR-6**: LG CNS 브랜딩 (#C8102E 포인트 컬러)

## 5. 아키텍처

### 기술 스택
| 영역 | 선택 |
|------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| AI | Claude API (Anthropic SDK) |
| State | zustand (토글 상태) |
| Deploy | Cloudflare Pages + Functions |

### 파일 구조 (예상)
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx          # 홈 (대시보드)
│   ├── chat/[id]/page.tsx
│   ├── notifications/page.tsx
│   └── api/
│       ├── summarize/route.ts
│       ├── classify/route.ts
│       └── meeting-notes/route.ts
├── components/
│   ├── layout/Sidebar.tsx
│   ├── chat/
│   ├── notification/
│   └── ui/ (shadcn)
├── data/
│   ├── chatrooms.ts
│   ├── messages.ts
│   └── notifications.ts
├── store/
│   └── useFeatureToggle.ts
└── lib/
    └── claude.ts
```

## 6. 수용 기준

- [ ] `npm run dev` 정상 동작
- [ ] 사이드바 메뉴 6개 (홈/채팅/쪽지/알림/검색/설정)
- [ ] 채팅방 5개, 메시지 100+개 표시
- [ ] 기능 토글 7개 (OFF 기본)
- [ ] FR-1: 요약 카드 정상 표시
- [ ] FR-2: 알림 분류 ON/OFF 비교
- [ ] FR-3: 회의록 생성 + 공지 게시
- [ ] Cloudflare Pages 배포 URL 확보
- [ ] 토글 상태 persist

## 7. 미해결

- Cloudflare Edge Runtime에서 Anthropic SDK 호환 여부 → 빌드 시 확인
- 가짜 데이터 양이 시연에 충분한지 → Day 1 이후 판단
