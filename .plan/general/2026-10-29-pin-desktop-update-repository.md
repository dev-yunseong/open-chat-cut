# 2026-10-29 — 설치형 업데이트 저장소 고정

- Date: 2026-10-29
- GitHub Issue: None
- Status: Complete (local implementation)

## Goal

웹·macOS의 업데이트 조회 및 릴리스 링크와 Windows/Linux 설치형의 업데이트 확인 및 다운로드를 dev-yunseong/open-chat-cut으로 고정한다.

## Non-goals

기존 설치본 수정, 릴리스 게시, macOS 직접 설치 지원 추가.

## Context / Constraints

패키징 설정과 웹 경로는 우리 저장소를 사용한다. 실행 시에도 provider를 지정하고 기존 CPU별 채널과 수동 다운로드 정책을 유지한다.

## Approach (Checklist)
- [x] **Step 0: Recon** — updater 설정과 패키징 채널 확인.
- [x] **Step 1: Implementation** — desktop/update-service.ts에서 런타임 feed 고정.
- [x] **Step 2: Tests** — 이전 feed 대체와 확인/다운로드 경로 검증. 실제 GitHubProvider에 fixture 응답을 주입해 Windows x64/ARM64의 조회·메타데이터·설치 파일 URL 확인.
- [x] **Step 3: Rollout / Rollback** — 새 빌드 설치로 적용; 변경 되돌리기로 복구. 릴리스 게시 및 설치는 수행하지 않음.

## Validation
- **Commands to run:** npm run verify:desktop-update; npx tsc -b; git diff --check.
- **Expected output:** 업데이트 관련 검증과 타입 검사 통과.
- **Results:** 업데이트 검증 6개 통과. 실제 네트워크 다운로드/설치 검증은 수행하지 않음.
- **Tracking:** 저장소의 이슈 기능이 비활성화되어 이슈 없이 codex/fix-update-repository 브랜치로 PR을 생성한다.

## Risks & Rollback
- **Risks:** 우리 릴리스에 latest-x64 / latest-arm64 메타데이터가 없으면 확인이 실패한다. 원본 저장소로 대체하지 않는다.
- **Rollback steps:** 런타임 feed 고정 변경을 되돌리고 다시 빌드한다.

## Open Questions
- None.
