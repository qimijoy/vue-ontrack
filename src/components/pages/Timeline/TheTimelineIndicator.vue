<template>
	<hr
		ref="indicatorRef"
		class="pointer-events-none absolute z-10 w-full border-b-2 border-red-600"
		:style="{ top: `${topOffset}px` }"
	/>
</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';
	import { HUNDRED_PERCENT } from '@/constants/percentages';
	import { secondsSinceMidnightInPercentage } from '@/modules/time';

	// STATES
	const indicatorRef = ref<HTMLHRElement | null>(null);

	// COMPUTED
	const topOffset = computed((): number =>
		Math.round((secondsSinceMidnightInPercentage.value * getTimelineHeight()) / HUNDRED_PERCENT),
	);

	// FUNCTIONS
	const getTimelineHeight = (): number => {
		return indicatorRef.value?.parentElement?.getBoundingClientRect().height ?? 0;
	};
</script>
