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
	import { secondsSinceMidnightInPercentage } from '@/composables/time';

	const getTimelineHeight = () => {
		return indicatorRef.value?.parentNode.getBoundingClientRect().height;
	};

	// STATES
	const indicatorRef = ref();

	// COMPUTED
	const topOffset = computed(() => (secondsSinceMidnightInPercentage.value * getTimelineHeight()) / HUNDRED_PERCENT);
</script>
