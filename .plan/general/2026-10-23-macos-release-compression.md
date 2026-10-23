# 2026-10-23 — macOS 릴리스 압축 지연 수정

- Date: 2026-10-23
- GitHub Issue: None (Issues disabled)
- Status: In progress

## Goal
macOS ZIP 압축이 릴리스 실행 제한을 넘지 않도록 일반 압축을 사용한다.

## Non-goals
앱 기능, 서명 정책, 실행 검사, 업데이트 파일 구성은 바꾸지 않는다.

사용자 요청에 따라 macOS Intel 배포를 제외하고 Windows x64, macOS ARM64, Linux x64만 게시한다. 자산 개수와 메타데이터 검증 및 배포 안내도 갱신한다.

## Context / Constraints
v0.2.19 Intel 패키징은 DMG 생성 후 ZIP 압축 중 90분 제한으로 취소되었다. ARM64, Windows, Linux는 성공했다. 공개 태그는 이동하지 않는다.

## Approach (Checklist)
- [x] **Step 0: Recon** — 실패 로그와 electron-builder 압축 인자 확인.
- [x] **Step 1: Implementation** — macOS에 normal 압축 적용.
- [x] **Step 2: Tests** — 플랫폼별 패키징 계약 및 버전 일치 검사.
- [ ] **Step 3: Rollout / Rollback** — v0.2.21 게시 및 지원 플랫폼 실행 검사, 자산 검증.

## Validation
- **Commands to run:** update-packaging.verify.ts, issue-template-version.verify.mjs, desktop workflow.
- **Expected output:** 설치 파일 구성과 검증은 유지하면서 macOS 압축 완료.

## Risks & Rollback
- **Risks:** 설치 파일 크기가 다소 커질 수 있다.
- **Rollback steps:** 수정 커밋을 revert하고 새 버전으로 배포한다.

## Open Questions
- 없음.
