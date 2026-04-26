---
type: plan
project_slug: mtalk-ai-lab
source_spec: docs/specs/01-spec.md
sprint_weeks_estimate: 1
created: 2026-04-26
---

# mTalk AI Lab — Implementation Plan

## Sprint 1: Phase 1 (4일)

### Day 1: 인프라 + UI 셸 (4~5h)
1. Next.js 14 프로젝트 초기화 (App Router + TypeScript + Tailwind)
2. shadcn/ui 설치 및 기본 컴포넌트 세팅
3. 레이아웃: 사이드바 (6메뉴) + 메인 콘텐츠 영역
4. 라우팅: /, /chat/[id], /notifications, /messages, /search, /settings
5. 가짜 데이터 생성 (채팅방 5개, 메시지 100+, 인물 8명)
6. zustand 토글 스토어 (7개 기능 ON/OFF, localStorage persist)
7. 설정 페이지: 토글 UI 7개

### Day 2: 기능 1 — Smart Catch-up (4~5h)
1. Claude API 래퍼 (fetch 기반, Edge 호환)
2. API Route: /api/summarize
3. SmartCatchup 컴포넌트 (배너 + 결과 카드)
4. 프롬프트 설계: 메시지 배열 → JSON 구조화 요약
5. 로딩 스켈레톤 + 에러 핸들링
6. AI ON vs OFF 비교 시연 버튼
7. 점심메뉴 채팅방 엣지 케이스 (효과 미미 표시)

### Day 3: 기능 2 — 알림 분류 (4~5h)
1. 가짜 알림 30개 생성 (긴급 5 / 중요 12 / 참고 13)
2. API Route: /api/classify
3. NotificationList 컴포넌트 (시간순 vs AI 분류)
4. 분류 근거 표시 (AI 판단 이유)
5. 수동 우선순위 변경 + 학습 시뮬레이션
6. mTalk API 통합 가능성 정보 박스

### Day 4: 기능 3 + 배포 (6h)
1. 회의 시작/종료 플로우 (상태 머신)
2. 회의 중 빨간 배너
3. API Route: /api/meeting-notes
4. 회의록 모달 (편집 + 공지 게시)
5. Cloudflare Pages 배포 설정
6. Edge Function으로 API Routes 변환
7. 환경변수 설정 + 배포 + URL 확보

## 기술 결정

| 결정 | 선택 | 이유 |
|------|------|------|
| AI SDK | fetch 래퍼 | Edge Runtime 호환 |
| 상태 관리 | zustand | 경량 + persist 미들웨어 |
| UI 라이브러리 | shadcn/ui | 커스터마이징 자유 + LG CNS 브랜딩 적용 용이 |
| 배포 | Cloudflare Pages | 무료 + Edge Function + 빠른 배포 |

## 완료 조건
- [ ] 3개 기능 데모 동작
- [ ] 배포 URL 라이브
- [ ] 토글 비교 시연 가능
- [ ] GitHub public repo + README
