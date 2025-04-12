import { shallowMount } from '@vue/test-utils';
import { afterEach, expect, it, vi } from 'vitest';
import { computed } from 'vue';

import BaseIcon from '@/components/base/BaseIcon.vue';
import TheHeaderProgress from '@/components/common/Header/TheHeaderProgress.vue';

import { useTotalProgress } from '@/composables/total-progress';
import { HUNDRED_PERCENT, MEDIUM_PERCENT } from '@/constants/percentages';
import * as router from '@/modules/router';
import { IconNameType, PageName, ProgressColorClassType } from '@/types';

vi.mock('@/composables/total-progress', () => {
	return {
		useTotalProgress: vi.fn(() => {
			return {
				percentage: computed(() => MEDIUM_PERCENT),
				colorClass: computed(() => ProgressColorClassType.BLUE),
			};
		}),
	};
});

afterEach(() => {
	vi.restoreAllMocks();
});

it('has href attribute with progress page hash', () => {
	expect(shallowMount(TheHeaderProgress).attributes('href')).toBe(`#${PageName.PROGRESS}`);
});

it('shows current progress', () => {
	expect(shallowMount(TheHeaderProgress).text()).toContain(`Progress: ${MEDIUM_PERCENT}%`);
});

it('uses proper progress indicator color', () => {
	expect(shallowMount(TheHeaderProgress).html()).toContain(ProgressColorClassType.BLUE);
});

it('navigates to progress page on click', () => {
	const navigateSpy = vi.spyOn(router, 'navigate');

	shallowMount(TheHeaderProgress).trigger('click');

	expect(navigateSpy).toBeCalledTimes(1);
	expect(navigateSpy).toBeCalledWith(PageName.PROGRESS);
});

it('shows completion label when day is complete', () => {
	vi.mocked(useTotalProgress).mockReturnValue({
		percentage: computed(() => HUNDRED_PERCENT),
		colorClass: computed(() => ProgressColorClassType.BLUE),
	});

	const wrapper = shallowMount(TheHeaderProgress);

	expect(wrapper.text()).toContain('Day complete!');
	expect(wrapper.findComponent(BaseIcon).vm.name).toBe(IconNameType.CHECK_CIRCLE);
});
