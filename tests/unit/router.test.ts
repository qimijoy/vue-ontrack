// @vitest-environment happy-dom

import { it, expect } from 'vitest';

import { normalizePageHash } from '@/modules/router';
import { PageName } from '@/types';

it.each(Object.values(PageName))('normalizes valid page hash: %s', (page) => {
	window.location.hash = page;
	expect(normalizePageHash()).toBe(page);
	expect(window.location.hash).toBe(`#${page}`);
});

it('normalizes invalid page hash', () => {
	window.location.hash = 'invalid';
	expect(normalizePageHash()).toBe(PageName.TIMELINE);
	expect(window.location.hash).toBe(`#${PageName.TIMELINE}`);
});
