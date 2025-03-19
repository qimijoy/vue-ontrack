<template>
	<li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
		<TimelineHour :hour="timelineItem.hour" @click.prevent="emit('scrollToHour', timelineItem.hour)" />
		<BaseSelect
			:options="activitySelectOptions"
			:placeholder="'Rest'"
			:selected="timelineItem.activityId"
			@select="selectActivity($event)"
		/>
		<TimelineStopwatch :timeline-item="timelineItem" />
	</li>
</template>

<script setup lang="ts">
	import type { timelineItemType } from '@/types/timeline';
	import type { ActivityItemType } from '@/types/activity';
	import type { selectItemType } from '@/types/select';

	import { inject } from 'vue';

	import BaseSelect from '@/components/base/BaseSelect.vue';
	import TimelineHour from '@/components/pages/Timeline/TimelineHour.vue';
	import TimelineStopwatch from '@/components/pages/Timeline/TimelineStopwatch.vue';

	import { isTimelineItemValid, isActivityValid, isHourValid } from '@/utils/validators';
	import { findActivityById } from '@/utils/activities';

	defineProps({
		timelineItem: {
			type: Object,
			required: true,
			validator: (timelineItem: timelineItemType) => isTimelineItemValid(timelineItem),
		},
	});

	// INJECT
	const activities = inject<ActivityItemType[]>('activities');
	const activitySelectOptions = inject<selectItemType[]>('activitySelectOptions');

	// EMIT
	const emit = defineEmits({
		selectActivity: (value) => isActivityValid(value),
		scrollToHour: (value) => isHourValid(value),
	});

	// FUNCTIONS
	const selectActivity = (id: string) => {
		emit('selectActivity', findActivityById(activities, id));
	};
</script>
