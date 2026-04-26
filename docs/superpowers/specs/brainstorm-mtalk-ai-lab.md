---
type: brainstorm
project_slug: mtalk-ai-lab
source_spec: docs/specs/01-spec.md
created: 2026-04-26
---

# mTalk AI Lab — Brainstorm Notes

## Spec 검증 결과

### 강점
- 토글 ON/OFF 비교 시연은 면접관에게 즉각적 임팩트
- 가짜 데이터 전략이 현실적 (실제 API 접근 불가)
- 1주 sprint로 Phase 1 완성 가능한 범위

### 잠재 리스크
1. **Cloudflare Edge + Anthropic SDK**: `@anthropic-ai/sdk`가 Node.js 전용일 수 있음
   - 대안: `fetch`로 직접 Claude API 호출 (Edge 호환)
2. **가짜 데이터 품질**: 한국어 대화가 부자연스러우면 데모 인상 하락
   - 대안: 실제 카카오톡/슬랙 대화 패턴 참고하여 자연스럽게 작성
3. **Claude API 비용**: 데모 시 매번 API 호출하면 비용 누적
   - 대안: 첫 호출 결과를 localStorage에 캐싱, 재시연 시 캐시 사용

### 추가 아이디어
- "이 기능이 mTalk에 실제 적용되면?" 섹션을 각 기능 하단에 추가 → 비즈니스 감각 어필
- 데모 시작 시 온보딩 투어 (3~4 스텝) → 면접관이 길 잃지 않도록
- 각 AI 호출에 소요 시간 / 토큰 수 표시 → 기술적 이해도 어필

### 확정 결정
- Edge Runtime 호환을 위해 Anthropic SDK 대신 fetch 기반 Claude API 래퍼 사용
- 가짜 데이터는 프로젝트A 채팅방에 집중 (87개 메시지, 의사결정 패턴 풍부)
- API 응답 캐싱은 Phase 1에서 선택적 구현 (시간 여유 시)
