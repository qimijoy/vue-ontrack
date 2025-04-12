import { flushPromises, shallowMount } from '@vue/test-utils';
import { expect, it, vi } from 'vitest';

import BaseIcon from '@/components/base/BaseIcon.vue';
import NavigationItem from '@/components/common/Navigation/NavigationItem.vue';

import * as router from '@/modules/router';
import * as timelineItems from '@/modules/timeline-items';
import { NAV_ITEMS } from '@/constants/pages';
import { PageName } from '@/types';

const timelineNavigationItem = NAV_ITEMS[0];

const shallowMountTimelineNavItem = () => {
	return shallowMount(NavigationItem, {
		props: {
			navItem: timelineNavigationItem,
		},
	});
};

it('renders navigation item', () => {
	const wrapper = shallowMountTimelineNavItem();

	expect(wrapper.text()).toContain(timelineNavigationItem.page);
	expect(wrapper.findComponent(BaseIcon).props('name')).toEqual(timelineNavigationItem.icon);
	expect(wrapper.find('a').attributes('href')).toBe(`#${timelineNavigationItem.page}`);
});

it('has hover state if navigation item does not correspond to current page', async () => {
	router.currentPage.value = PageName.TIMELINE;
	const hoverClass = 'hover:bg-gray-100';
	const wrapper = shallowMountTimelineNavItem();
	expect(wrapper.find('a').classes()).not.toContain(hoverClass);

	router.currentPage.value = PageName.ACTIVITIES;
	await flushPromises();

	expect(wrapper.find('a').classes()).toContain(hoverClass);
});

it('scrolls to current hour on click if navigation item corresponds to timeline page and timeline page is open', () => {
	const scrollToCurrentHourSpy = vi.spyOn(timelineItems, 'scrollToCurrentHour');
	router.currentPage.value = PageName.TIMELINE;

	shallowMountTimelineNavItem().find('a').trigger('click');

	expect(scrollToCurrentHourSpy).toBeCalledTimes(1);
	expect(scrollToCurrentHourSpy).toBeCalledWith(true);
	vi.restoreAllMocks();
});

it('navigates to corresponding page on click', () => {
	const navigateSpy = vi.spyOn(router, 'navigate');
	router.currentPage.value = PageName.ACTIVITIES;

	shallowMountTimelineNavItem().find('a').trigger('click');

	expect(navigateSpy).toBeCalledTimes(1);
	expect(navigateSpy).toBeCalledWith(timelineNavigationItem.page);
	vi.restoreAllMocks();
});
