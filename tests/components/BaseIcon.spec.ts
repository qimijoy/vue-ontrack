import { it, expect } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';

import BaseIcon from '@/components/base/BaseIcon.vue';

import { IconNameType } from '@/types';
import { ICONS } from '@/modules/icons';

it('renders icon with default classes', () => {
	const wrapper = shallowMount(BaseIcon, {
		props: {
			name: IconNameType.CLOCK,
		},
	});

	expect(wrapper.classes()).toContain('h-8');
});

it('renders icon with custom classes', () => {
	const classes = 'h-12 text-purple-600';

	const wrapper = shallowMount(BaseIcon, {
		attrs: {
			class: classes,
		},
		props: {
			name: IconNameType.CLOCK,
		},
	});

	expect(wrapper.classes().join(' ')).toContain(classes);
});

it.each(Object.keys(ICONS))('renders %s icon', (name) => {
	const wrapper = mount(BaseIcon, {
		props: {
			name: name as IconNameType,
		},
	});

	expect(wrapper.html()).toMatchSnapshot();
});
