import { shallowMount } from '@vue/test-utils';
import { expect, it, vi } from 'vitest';

import BaseIcon from '@/components/base/BaseIcon.vue';
import TheLogo from '@/components/common/TheLogo.vue';

import * as router from '@/modules/router';
import * as timelineItems from '@/modules/timeline-items';
import { IconNameType, PageName } from '@/types';

it('renders logo', () => {
	expect(shallowMount(TheLogo).findComponent(BaseIcon).props('name')).toBe(IconNameType.CLOCK);
});

it('has href attribute with timeline page hash', () => {
	expect(shallowMount(TheLogo).attributes('href')).toBe(`#${PageName.TIMELINE}`);
});

it('scrolls page to current hour on click if timeline page is open', () => {
	const scrollToCurrentHourSpy = vi.spyOn(timelineItems, 'scrollToCurrentHour');
	router.currentPage.value = PageName.TIMELINE;

	shallowMount(TheLogo).trigger('click');

	expect(scrollToCurrentHourSpy).toBeCalledTimes(1);
	expect(scrollToCurrentHourSpy).toBeCalledWith(true);
	vi.restoreAllMocks();
});

it('navigates to timeline page on click if another page is open', () => {
	const navigateSpy = vi.spyOn(router, 'navigate');
	router.currentPage.value = PageName.PROGRESS;

	shallowMount(TheLogo).trigger('click');

	expect(navigateSpy).toBeCalledTimes(1);
	expect(navigateSpy).toBeCalledWith(PageName.TIMELINE);
	vi.restoreAllMocks();
});
