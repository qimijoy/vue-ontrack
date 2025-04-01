<template>
	<div :class="classes">
		{{ formatSecondsWithSign(remainingSeconds) }}
	</div>
</template>

<script setup lang="ts">
	import type { ActivityType } from '@/types';

	import { computed } from 'vue';

	import { formatSecondsWithSign } from '@/utils/timelines';
	import { timelineItems, calculateTrackedActivitySeconds } from '@/modules/timeline-items';

	const props = defineProps<{ activity: ActivityType }>();

	// COMPUTED
	const classes = computed((): string[] => [
		'flex items-center rounded px-2 font-mono text-xl',
		remainingSeconds.value < 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600',
	]);

	const remainingSeconds = computed(
		(): number =>
			calculateTrackedActivitySeconds(timelineItems.value, props.activity) - props.activity.secondsToComplete,
	);
</script>
