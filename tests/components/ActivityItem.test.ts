import { mount } from '@vue/test-utils';
import { expect, it, vi } from 'vitest';

import ActivityItem from '@/components/pages/Activities/ActivityItem.vue';
import RemainingActivitySeconds from '@/components/pages/Activities/RemainingActivitySeconds.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';

import * as activities from '@/modules/activities';
import * as timelineItems from '@/modules/timeline-items';
import { SECONDS_IN_HOUR } from '@/constants/time';
import { ActivityType, ButtonType, IconNameType } from '@/types';

const mountActivityItem = (activityOverrides: Partial<ActivityType> = {}) => {
	return mount(ActivityItem, {
		props: {
			activity: createActivity(activityOverrides),
		},
	});
};

const createActivity = (overrides: Partial<ActivityType> = {}) => {
	return {
		id: '',
		name: '',
		secondsToComplete: 0,
		...overrides,
	};
};

it('has delete button', () => {
	const wrapper = mountActivityItem();

	expect(wrapper.findComponent(BaseButton).props('type')).toBe(ButtonType.DANGER);
	expect(wrapper.findComponent(BaseIcon).props('name')).toBe(IconNameType.TRASH);
});

it('deletes activity', () => {
	const resetTimelineItemActivitiesSpy = vi.spyOn(timelineItems, 'resetTimelineItemActivities');
	const deleteActivitySpy = vi.spyOn(activities, 'deleteActivity');
	const activity = createActivity();
	const wrapper = mountActivityItem(activity);

	wrapper.find('button').trigger('click');

	expect(resetTimelineItemActivitiesSpy).toBeCalledTimes(1);
	expect(resetTimelineItemActivitiesSpy).toBeCalledWith(timelineItems.timelineItems.value, activity);
	expect(deleteActivitySpy).toBeCalledTimes(1);
	expect(deleteActivitySpy).toBeCalledWith(activity);

	vi.restoreAllMocks();
});

it('shows activity name', () => {
	const name = 'Reading';

	expect(mountActivityItem({ name }).text()).toContain(name);
});

it('shows remaining activity seconds', () => {
	const activity = createActivity({ secondsToComplete: SECONDS_IN_HOUR * 1 });

	const wrapper = mountActivityItem(activity);

	expect(wrapper.findComponent(RemainingActivitySeconds).props('activity')).toEqual(activity);
});

it('does not show remaining activity seconds if seconds to complete field of activity = 0', () => {
	const wrapper = mountActivityItem({ secondsToComplete: 0 });

	expect(wrapper.findComponent(RemainingActivitySeconds).exists()).toBe(false);
});
