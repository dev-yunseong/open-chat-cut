// Added 2026-10-23: Korean coverage, startup, persistence and source access.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { EN } from './dict/en';
import { KO } from './dict/ko';
import EN_DATA from './dict/en/templates-data';
import KO_DATA from './dict/ko/templates-data';

const scenario = process.argv[process.argv.indexOf('--initial') + 1];
if (process.argv.includes('--initial')) {
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { language: 'zh-CN' } });
  if (scenario !== 'unavailable') Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: { getItem() {
      if (scenario === 'blocked') throw new Error('Storage disabled');
      return scenario === 'empty' ? null : scenario;
    }, setItem() {} },
  });
  const documentElement = { lang: 'en' };
  Object.defineProperty(globalThis, 'document', { configurable: true, value: { documentElement } });
  const { getLocale, ALL_LOCALES } = await import('./locale');
  const expected = ALL_LOCALES.includes(scenario as never) ? scenario : 'ko';
  assert.equal(getLocale(), expected, `startup: ${scenario}`);
  assert.equal(documentElement.lang, expected === 'zh' ? 'zh-CN' : expected);
} else {
  const placeholders = (value: string) => (value.match(/\{\w+\}/g) ?? []).sort();
  for (const [reference, translated] of [[EN, KO], [EN_DATA, KO_DATA]]) {
    for (const key of Object.keys(reference)) {
      assert.ok(translated[key]?.trim(), `Missing Korean: ${key}`);
      assert.deepEqual(placeholders(translated[key]), placeholders(key), `Placeholder mismatch: ${key}`);
      assert.doesNotMatch(translated[key], /[\u3400-\u9fff]/, `Untranslated Chinese: ${key}`);
    }
  }
  for (const initial of ['empty', 'invalid', 'blocked', 'unavailable', 'ko', 'en', 'zh', 'it', 'ru']) {
    const child = spawnSync(process.execPath, [...process.execArgv, fileURLToPath(import.meta.url), '--initial', initial], { encoding: 'utf8' });
    assert.equal(child.status, 0, `${initial}: ${child.stderr || child.stdout}`);
  }
  let saved: string | null = null;
  Object.defineProperty(globalThis, 'localStorage', { configurable: true,
    value: { getItem: () => saved, setItem: (_key: string, value: string) => { saved = value; } },
  });
  const { ensureLocaleDict, getLocale, setLocale, t, tData, localeLanguageName } = await import('./locale');
  assert.equal(getLocale(), 'ko');
  await ensureLocaleDict('ko');
  assert.equal(t('新建工程'), '새 프로젝트');
  assert.equal(t('已选择 {n} 个片段', { n: 3 }), '클립 3개 선택됨');
  assert.equal(tData('竖屏·重点词弹出'), '세로 · 핵심 단어 팝업');
  assert.equal(localeLanguageName('ko'), 'Korean');
  setLocale('en');
  await ensureLocaleDict('en');
  assert.equal(saved, 'en');
  assert.equal(t('新建工程'), 'New Project');
  setLocale('ko');
  assert.equal(saved, 'ko');
  assert.equal(t('新建工程'), '새 프로젝트');
  const { createElement } = await import('react');
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { SourceLinks } = await import('../components/SourceLinks');
  const html = renderToStaticMarkup(createElement(SourceLinks));
  assert.match(html, /https:\/\/github.com\/dev-yunseong\/open-chat-cut/);
  assert.match(html, /소스 코드/);
  assert.match(html, /https:\/\/github.com\/dev-yunseong\/open-chat-cut\/blob\/main\/LICENSE/);
  assert.equal(readFileSync('public/LICENSE.txt', 'utf8'), readFileSync('LICENSE', 'utf8'));
  console.log(`korean.verify: ${Object.keys(EN).length} UI keys, templates, placeholders, startup, persistence and source access passed`);
}
