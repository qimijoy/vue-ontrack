<template>
	<div :class="classes">
		{{ formatSecondsWithSign(remainingSeconds) }}
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import type { ActivityType } from '@/types';

	import { computed } from 'vue';

	import { formatSecondsWithSign } from '@/utils/timelines';
	import { isActivityValid } from '@/utils/validators';
	import { timelineItems, calculateTrackedActivitySeconds } from '@/modules/timeline-items';

	const props = defineProps({
		activity: {
			type: Object as PropType<ActivityType>,
			required: true,
			validator: (value: ActivityType) => isActivityValid(value),
		},
	});

	// COMPUTED
	const classes = computed(() => [
		'flex items-center rounded px-2 font-mono text-xl',
		remainingSeconds.value < 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600',
	]);

	const remainingSeconds = computed(
		() => calculateTrackedActivitySeconds(timelineItems.value, props.activity) - props.activity.secondsToComplete,
	);
</script>
