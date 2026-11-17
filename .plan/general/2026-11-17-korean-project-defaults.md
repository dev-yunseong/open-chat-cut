# 2026-11-17 — 새 프로젝트 기본 이름과 오류 메시지 한국어화

- Date: 2026-11-17
- GitHub Issue: None
- Status: Implemented

## Goal

처음 실행할 때 한국어를 기본으로 사용하고, 새 프로젝트 이름과 프로젝트 파일 처리 오류를 선택한 언어로 표시한다.

## Non-goals

기존에 저장된 프로젝트 이름과 사용자 언어 설정을 일괄 수정하는 작업은 범위 밖이다.

## Context / Constraints

프로젝트 이름은 생성 시 저장된다. 기존 번역 사전과 번역 키를 재사용한다.

## Approach (Checklist)

- [x] 시작 시 언어 결정과 새 프로젝트 생성 경로를 확인한다.
- [x] 대시보드와 Agent에서 기본 이름을 번역하고 프로젝트 파일과 로컬 폴더 가져오기 오류에 번역을 적용한다.
- [x] 언어 전환 직후 번역 사전이 준비되면 화면을 갱신한다.
- [x] 한국어 시작 설정과 프로젝트 관련 번역을 검증한다.

## Validation

- Commands to run `npm run verify:i18n`, `git diff --check`
- Expected output은 유효한 한국어 번역과 기존 언어 선택 유지다.

## Risks & Rollback

생성 시 저장되는 프로젝트 이름과 오류 메시지에 영향이 있다. 코드 변경을 되돌리는 데 데이터 마이그레이션은 필요 없다.

## Open Questions

없음.
