import { shallowMount } from '@vue/test-utils';
import { expect, it } from 'vitest';

import TheActivitiesEmptyState from '@/components/pages/Activities/TheActivitiesEmptyState.vue';

it('renders activities empty state', () => {
	const wrapper = shallowMount(TheActivitiesEmptyState);

	expect(wrapper.text()).toContain("You don't have any activities");
});
