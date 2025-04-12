import { shallowMount } from '@vue/test-utils';
import { expect, it } from 'vitest';

import TheProgressEmptyState from '@/components/pages/Progress/TheProgressEmptyState.vue';

it('renders progress empty state', () => {
	const wrapper = shallowMount(TheProgressEmptyState);

	expect(wrapper.text()).toContain("You don't have any tracked activities");
	expect(wrapper.find('img').attributes()).toMatchObject({
		src: '/src/assets/images/no_tracked_activities.svg',
		alt: 'No tracked activities',
	});
});
