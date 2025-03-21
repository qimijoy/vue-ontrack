<template>
	<div class="flex w-full gap-2">
		<BaseButton :type="BUTTON_TYPE_DANGER" :disabled="!seconds" @click="reset">
			<BaseIcon :name="ICON_ARROW_PATH" />
		</BaseButton>
		<div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
			{{ formatSeconds(seconds) }}
		</div>
		<BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
			<BaseIcon :name="ICON_PAUSE" />
		</BaseButton>
		<BaseButton v-else :type="BUTTON_TYPE_SUCCESS" :disabled="isStartButtonDisabled" @click="start">
			<BaseIcon :name="ICON_PLAY" />
		</BaseButton>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import type { timelineItemType } from '@/types/timeline';

	import { ref, watch } from 'vue';

	import BaseButton from '@/components/base/BaseButton.vue';
	import BaseIcon from '@/components/base/BaseIcon.vue';

	import { BUTTON_TYPE_DANGER, BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING } from '@/constants/buttons';
	import { MILLISECONDS_IN_SECOND } from '@/constants/time';
	import { isTimelineItemValid } from '@/utils/validators';
	import { getCurrentHour } from '@/utils/timelines';
	import { formatSeconds } from '@/utils/timelines';

	import { updateTimelineItem } from '@/composables/timelineItems';
	import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '@/composables/icons';

	const props = defineProps({
		timelineItem: {
			type: Object as PropType<timelineItemType>,
			required: true,
			validator: (timelineItem: timelineItemType) => isTimelineItemValid(timelineItem),
		},
	});

	// CONSTANTS
	const isStartButtonDisabled = props.timelineItem.hour !== getCurrentHour();

	// STATES
	const seconds = ref(props.timelineItem.activitySeconds);
	const isRunning = ref();

	// WATCHERS
	watch(
		() => props.timelineItem.activityId,
		() => {
			updateTimelineItem(props.timelineItem, { activitySeconds: seconds.value });
		},
	);

	// FUNCTIONS
	const start = () => {
		isRunning.value = setInterval(() => {
			updateTimelineItem(props.timelineItem, { activitySeconds: props.timelineItem.activitySeconds + 1 });
			seconds.value++;
		}, MILLISECONDS_IN_SECOND);
	};

	const stop = () => {
		clearInterval(isRunning.value);
		isRunning.value = false;
	};

	const reset = () => {
		stop();
		updateTimelineItem(props.timelineItem, { activitySeconds: props.timelineItem.activitySeconds - seconds.value });

		seconds.value = 0;
	};
</script>
