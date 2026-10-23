# 2026-10-23 — 한국어 포크 PR 및 릴리스 자동 빌드

- Date: 2026-10-23
- GitHub Issue: None (repository Issues disabled)
- Status: In progress

## Goal
한국어 기본값 변경을 PR로 게시하고 릴리스 게시 시 설치 파일을 자동으로 첨부한다.

## Non-goals
이번 작업에서 릴리스 게시, 태그 생성, PR 병합은 하지 않는다.

## Context / Constraints
기존 4개 플랫폼 패키징 및 smoke 검증을 재사용한다. 기존 PR CI를 유지하며 fork의 업데이트 저장소를 지정한다.

## Approach (Checklist)
- [x] **Step 0: Recon** — 기존 workflow, 버전 검사, updater 설정 확인.
- [x] **Step 1: Implementation** — release published 트리거, 공개 릴리스 자산 업로드, fork updater, 사용법.
- [x] **Step 2: Tests** — packaging 계약, i18n, lint, 타입 및 workflow 파싱.
- [ ] **Step 3: Rollout / Rollback** — draft PR 게시 및 원격 검증. 문제 시 해당 변경 revert.

## Validation
- **Commands to run:** `npx tsx desktop/update-packaging.verify.ts`, `npm run verify:i18n`, `npm run lint`, `npx tsc -b`.
- **Expected output:** 기존 수동 draft 흐름과 새 공개 릴리스 흐름 모두 계약 통과.

## Risks & Rollback
- **Risks:** 실제 4개 OS 설치 파일 생성은 GitHub runners에서 검증해야 한다. 인증서 없이 빌드하며 기존 OS 서명 경고가 적용된다. 공개 후 빌드하므로 실패하면 파일이 없는 릴리스가 남는다.
- **Rollback steps:** PR revert, 이미 배포한 설치 파일은 별도로 관리한다.

## Open Questions
- 없음. Issues 비활성 상태를 유지하고 이슈 번호 없이 브랜치 생성.

## Results
- packaging 계약, i18n, lint (기존 warnings), 타입 검사, js-yaml 파싱 통과.
- pair-review PASS. docs/RELEASING.md는 ignore 예외로 명시적으로 추적.
- 정적 브라우저 미리보기에서 한국어 화면과 저장된 영어 유지 확인. 서버/API 통합은 미검증.
- 전체 npm test 진행 결과는 PR Validation에 기록.
