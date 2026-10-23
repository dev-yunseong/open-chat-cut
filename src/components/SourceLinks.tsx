// Added 2026-10-23: expose this modified version's source and license.
import { useT } from '../i18n/locale';
import { theme } from '../theme';

export function SourceLinks() {
  const t = useT();
  const style = { color: theme.textDim, fontSize: 11, textUnderlineOffset: 2 };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
      <a href="https://github.com/dev-yunseong/open-chat-cut" target="_blank" rel="noopener noreferrer"
        data-cc-titlebar-control="true" style={style}>{t('源代码')}</a>
      <a href="https://github.com/dev-yunseong/open-chat-cut/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"
        data-cc-titlebar-control="true" style={style}>AGPL-3.0+</a>
    </span>
  );
}
