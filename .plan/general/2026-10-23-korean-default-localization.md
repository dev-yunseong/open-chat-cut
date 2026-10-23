# 2026-10-23 — 한국어 기본 설정 및 Pro 홍보 제거

- Date: 2026-10-23
- GitHub Issue: None
- Status: Complete (local implementation)

## Goal
한국어 UI와 기본 언어를 추가하고 Pro 홍보 잔재를 제거한다. AGPL 고지와 수정본 소스 접근을 유지한다. 요청받은 프로젝트 지침과 전체 라이브러리 스킬/에이전트를 설치한다.

## Non-goals
외부 AI 제공자의 요금이나 인증을 변경하지 않는다. 배포, 커밋, PR 생성은 이번 로컬 수정 범위에 포함하지 않는다.

## Context / Constraints
현재 소스에는 결제 팝업이 없으며 README의 Pro 링크와 미사용 PRO 배지가 있다. 기존 중국어 키와 지연 로딩 사전을 유지한다. AGPL-3.0-or-later 및 제3자 라이선스를 보존한다.

## Approach (Checklist)
- [x] **Step 0: Recon** — 언어 초기화, 사전, Pro 참조, 라이선스 확인.
- [x] **Step 1: Implementation** — 한국어 사전, 기본값, 서버 언어 인식, 소스 링크, 홍보 제거, 프로젝트 지침 설치.
- [x] **Step 2: Tests** — 번역 키/보간 변수, 저장된 언어, 초기 언어, 타입 검사 및 빌드.
- [x] **Step 3: Rollout / Rollback** — 로컬 변경 검토. 게시 시 실제 서비스 버전에 대응하는 소스를 함께 제공한다.

## Validation
- **Commands to run:** `npm run verify:i18n`, `npx tsx src/i18n/dictRegistry.verify.ts`, `npx tsc -b`, `npm run build`.
- **Expected output:** 한국어 키와 보간 변수 일치, 언어 선택 유지, 타입 및 빌드 오류 없음.

## Risks & Rollback
- **Risks:** 새로운 업스트림 문구는 영어로 대체될 수 있다. 서버에서 만드는 메시지는 한국어가 없으면 영어를 표시한다. 외부 AI 서비스 요금은 그대로 적용된다.
- **Rollback steps:** 이번 언어/홍보 변경을 이전 버전으로 되돌린다. 프로젝트 데이터는 변경하지 않는다.

## Open Questions
- 없음.

## Results
- 한국어 UI 2,497개 키와 템플릿, 보간 변수, 기본 언어 및 저장된 언어 유지 검증 통과.
- 타입 검사, 전체 빌드, 기존 i18n 검증, 모바일 업로드 및 URL 오류 검증 통과.
- 독립 검토 PASS. 라이선스 외부 링크 및 모바일 한국어 보완 완료.
- 스킬 9개, 에이전트 2개 설치 확인. 기존 ignore 규칙에 따라 .agents와 AGENTS.md는 로컬 유지.
- 후속 PR 작업에서 별도 포트의 프로덕션 미리보기로 한국어 대시보드/편집기 및 영어 선택 후 새로고침 유지 확인. 스크린샷은 .plan/assets/korean-release-ci/. 서버 API는 없는 정적 미리보기이므로 통합 실행의 증거는 아님.
- 후속 PR 요청으로 커밋/푸시/PR 게시 범위 추가. 실제 릴리스 게시와 병합은 별도.
