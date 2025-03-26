<template>
	<div class="flex w-full gap-2">
		<BaseButton :type="BUTTON_TYPE_DANGER" :disabled="!timelineItem.activitySeconds" @click="reset">
			<BaseIcon :name="ICON_ARROW_PATH" />
		</BaseButton>
		<div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
			{{ formatSeconds(timelineItem.activitySeconds) }}
		</div>
		<BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
			<BaseIcon :name="ICON_PAUSE" />
		</BaseButton>
		<BaseButton v-else :type="BUTTON_TYPE_SUCCESS" :disabled="timelineItem.hour !== now.getHours()" @click="start">
			<BaseIcon :name="ICON_PLAY" />
		</BaseButton>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import type { timelineItemType } from '@/types/timeline';

	import { watch, watchEffect, onMounted } from 'vue';

	import BaseButton from '@/components/base/BaseButton.vue';
	import BaseIcon from '@/components/base/BaseIcon.vue';

	import { BUTTON_TYPE_DANGER, BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING } from '@/constants/buttons';

	import { isTimelineItemValid } from '@/utils/validators';
	import { formatSeconds } from '@/utils/timelines';

	import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '@/modules/icons';
	import { updateTimelineItem } from '@/modules/timeline-items';
	import { useStopwatch } from '@/composables/stopwatch';
	import { now } from '@/modules/time';

	const props = defineProps({
		timelineItem: {
			type: Object as PropType<timelineItemType>,
			required: true,
			validator: (timelineItem: timelineItemType) => isTimelineItemValid(timelineItem),
		},
	});

	onMounted(() => {
		if (props.timelineItem.isActive) {
			start();
		}
	});

	const {
		// STATES
		seconds,
		isRunning,

		// FUNCTIONS
		start,
		stop,
		reset,
	} = useStopwatch(props.timelineItem.activitySeconds);

	// WATCHERS
	watchEffect(() => {
		updateTimelineItem(props.timelineItem, {
			activitySeconds: seconds.value,
		});
	});

	watchEffect(() => {
		if (props.timelineItem.hour !== now.value.getHours() && isRunning.value) {
			stop();
		}
	});

	watch(isRunning, () =>
		updateTimelineItem(props.timelineItem, {
			isActive: Boolean(isRunning.value),
		}),
	);
</script>
