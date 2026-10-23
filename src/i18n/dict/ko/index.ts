// Korean localization, added 2026-10-23. Licensed under AGPL-3.0-or-later.
import core from './core';
import captions from './captions';
import components from './components';
import timeline from './timeline';
import exportPanel from './exportPanel';
import media from './media';
import library from './library';
import fx from './fx';
import transcript from './transcript';
import settings from './settings';
import chat from './chat';
import review from './review';

export const KO: Record<string, string> = {
  ...core, ...captions, ...chat, ...components, ...exportPanel, ...fx,
  ...library, ...media, ...review, ...settings, ...timeline, ...transcript,
};
