# Modified version — 2026-10-23

This is the Korean-default community fork of [OpenChatCut](https://github.com/0xsline/OpenChatCut).
The upstream authors retain their copyright. This fork remains licensed under
[AGPL-3.0-or-later](LICENSE); third-party code, fonts, models and assets retain their own licenses.

## Changes

- Add Korean UI and template translations using the existing lazy dictionary architecture.
- Default to Korean when no valid language choice is saved; preserve existing saved choices.
- Recognize Korean in server UI-locale synchronization and agent language selection.
- Remove the README Pro promotion and unused timeline PRO badge. External provider credentials,
  subscriptions and usage charges are unaffected.
- Add visible links to this fork's source and the AGPL license in the dashboard and editor.
- Install repository agent guidance, workflow documents, library skills and agent definitions.
- Build desktop installers when a GitHub Release is published, and receive updates from this fork.
  See [release instructions](docs/RELEASING.md).

## Corresponding source

Source repository: https://github.com/dev-yunseong/open-chat-cut

Before distributing a build or serving this modified version to other users, publish the matching
source revision, including these modifications, package-lock.json, configuration and build scripts,
under the same license. Make the complete Corresponding Source available at no charge to network users.
Do not deploy a build whose source link points only to an older or upstream version. Tag releases with
their source commit; if hosting another fork, update the source link in src/components/SourceLinks.tsx.

Use Node.js 24, install with `npm ci`, and follow the README build/runtime instructions.
The root LICENSE is also copied unchanged into public/LICENSE.txt so the license ships with the web build.
No warranty is provided; see LICENSE. These modifications do not imply upstream endorsement.
