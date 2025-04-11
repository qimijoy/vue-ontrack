import { shallowMount } from '@vue/test-utils';
import { expect, it } from 'vitest';

import NavItem from '@/components/common/Navigation/NavigationItem.vue';
import TheNavigatio from '@/components/common/Navigation/TheNavigation.vue';

import { NAV_ITEMS } from '@/constants/pages';

it('has all nav items', () => {
	const wrapper = shallowMount(TheNavigatio);

	NAV_ITEMS.forEach((navItem, index) => {
		expect(wrapper.findAllComponents(NavItem)[index].vm.navItem).toEqual(navItem);
	});
});
