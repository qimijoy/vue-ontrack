import { shallowMount } from '@vue/test-utils';
import { expect, it } from 'vitest';

import TheHeader from '@/components/common/Header/TheHeader.vue';
import TheHeaderProgress from '@/components/common/Header/TheHeaderProgress.vue';
import TheLogo from '@/components/common/TheLogo.vue';

it('renders header', () => {
	const wrapper = shallowMount(TheHeader);

	expect(wrapper.findComponent(TheLogo).exists()).toBe(true);
	expect(wrapper.findComponent(TheHeaderProgress).exists()).toBe(true);
});
