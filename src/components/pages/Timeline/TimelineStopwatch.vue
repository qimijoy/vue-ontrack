<template>
	<div class="flex w-full gap-2">
		<BaseButton
			:type="BUTTON_TYPE_DANGER"
			:disabled="!timelineItem.activitySeconds"
			@click="resetTimelineItemTimer(timelineItem)"
		>
			<BaseIcon :name="ICON_ARROW_PATH" />
		</BaseButton>
		<div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
			{{ formatSeconds(timelineItem.activitySeconds) }}
		</div>
		<BaseButton v-if="timelineItem === activeTimelineItem" :type="BUTTON_TYPE_WARNING" @click="stopTimelineItemTimer">
			<BaseIcon :name="ICON_PAUSE" />
		</BaseButton>
		<BaseButton
			v-else
			:type="BUTTON_TYPE_SUCCESS"
			:disabled="timelineItem.hour !== now.getHours()"
			@click="startTimelineItemTimer(timelineItem)"
		>
			<BaseIcon :name="ICON_PLAY" />
		</BaseButton>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import type { TimelineItemType } from '@/types';

	import BaseButton from '@/components/base/BaseButton.vue';
	import BaseIcon from '@/components/base/BaseIcon.vue';

	import { BUTTON_TYPE_DANGER, BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING } from '@/constants/buttons';

	import { isTimelineItemValid } from '@/utils/validators';
	import { formatSeconds } from '@/utils/timelines';

	import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '@/modules/icons';
	import { activeTimelineItem } from '@/modules/timeline-items';
	import { startTimelineItemTimer, stopTimelineItemTimer, resetTimelineItemTimer } from '@/modules/timeline-item-timer';
	import { now } from '@/modules/time';

	defineProps({
		timelineItem: {
			type: Object as PropType<TimelineItemType>,
			required: true,
			validator: (timelineItem: TimelineItemType) => isTimelineItemValid(timelineItem),
		},
	});
</script>
