<template>
	<li class="flex flex-col gap-1 p-4">
		<div class="truncate text-xl">{{ activity.name }}</div>
		<div class="flex h-5 overflow-hidden rounded bg-neutral-200">
			<div :class="getProgressColorClass(progress)" :style="`width: ${progress}%`"></div>
		</div>
		<div class="flex justify-between font-mono text-sm">
			<span>{{ progress }}%</span>
			<span>
				{{ formatSeconds(getTotalActivitySeconds(activity)) }} /
				{{ formatSeconds(activity.secondsToComplete) }}
			</span>
		</div>
	</li>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import type { ActivityItemType } from '@/types/activity';

	import { computed } from 'vue';

	import { isActivityValid } from '@/utils/validators';
	import { formatSeconds } from '@/utils/timelines';
	import { getActivityProgress } from '@/composables/activities';
	import { getProgressColorClass } from '@/composables/progress';
	import { getTotalActivitySeconds } from '@/composables/timelineItems';

	const props = defineProps({
		activity: {
			type: Object as PropType<ActivityItemType>,
			required: true,
			validator: (value: ActivityItemType) => isActivityValid(value),
		},
	});

	// COMPUTED
	const progress = computed(() => getActivityProgress(props.activity));
</script>
