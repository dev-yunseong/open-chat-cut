# 한국어 포크 릴리스

이 저장소는 PR에서 기존 lint, 테스트, 프로덕션 빌드 CI를 실행한다.
`desktop` workflow는 GitHub Release를 **Publish release**로 게시하면 자동 실행된다.
정식 릴리스와 prerelease 모두 해당하며, draft 저장만으로는 실행되지 않는다.

## 게시 순서

1. PR을 검토하고 병합한다. Actions가 비활성화된 fork라면 저장소 Actions에서 활성화한다.
2. `npm version <새 버전> --no-git-tag-version`으로 package.json과 package-lock.json을 함께 갱신하여 커밋한다.
   `.github/ISSUE_TEMPLATE/bug_report_en.yml`과 `bug_report_zh.yml`의 첫 버전 선택지도 함께 갱신하고,
   `node scripts/issue-template-version.verify.mjs`로 일치 여부를 확인한다.
3. 그 커밋에 `v<새 버전>` 태그를 지정한 GitHub Release를 게시한다. 예를 들어 프로젝트 버전이 `0.2.18`이면 태그는 `v0.2.18`이다.
4. Actions의 `desktop` 실행이 끝나면 같은 릴리스의 Assets에서 설치 파일을 받는다.

태그와 package.json 버전이 다르면 실패한다. workflow가 포함된 커밋에 태그를 붙여야 한다.
빌드와 설치 후 smoke 검증을 모두 통과한 뒤 Windows x64 EXE, macOS ARM64/x64 DMG·ZIP,
Linux x64 AppImage, 자동 업데이트 메타데이터, SHA256SUMS.txt를 첨부한다.
릴리스 본문과 prerelease 설정은 수정하지 않는다. 기존 수동 실행은 브랜치에서 Actions
아티팩트만 생성하며, `v*` 태그에서 실행하면 검증 후 draft를 게시하는 기존 흐름을 유지한다.

게시 직후에는 빌드 파일이 아직 없다. 실패하면 Actions 로그를 확인하고 실패한 작업을 재실행한다.
재실행은 해당 릴리스의 같은 이름 자산을 교체하고 체크섬을 검증한다. 자동 생성 파일 외의
자산을 수동 첨부하면 전체 자산 목록 검증에 실패할 수 있다.
변경된 소스를 빌드하려면 기존 태그를 옮기지 말고 새 버전을 게시한다.

기본 GITHUB_TOKEN만으로 현재 저장소 릴리스에 업로드한다. 별도의 PAT는 필요 없다.
fork의 자동 업데이트 주소는 `dev-yunseong/open-chat-cut`이다.
이 포크에서 빌드한 앱은 위 저장소의 정식 릴리스만 확인하며 prerelease와 다운그레이드는 받지 않는다.
이미 설치된 원본 앱의 업데이트 주소가 원격으로 바뀌지는 않으므로, 처음 한 번은 이 저장소의
설치 파일로 교체해야 한다. 이후 Windows 및 Linux AppImage에서 더 높은 버전으로 업데이트할 수 있다.
macOS는 현재 앱 내부 자동 업데이트가 비활성화되어 있으므로 이 저장소의 새 DMG로 직접 교체한다.
코드 서명 인증서는 포함하지 않으며 macOS는 ad-hoc 서명, Windows는 서명 경고가 나타날 수 있다.

GitHub의 태그별 소스 아카이브와 저장소에는 실제 빌드에 사용한 수정 소스, lockfile,
빌드 설정을 함께 제공한다. LICENSE 및 제3자 고지를 유지하고 MODIFICATIONS.md를 확인한다.

이벤트 동작: [GitHub release 이벤트 문서](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#release).
