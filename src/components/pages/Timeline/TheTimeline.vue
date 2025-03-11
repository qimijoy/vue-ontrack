<template>
	<div class="mt-7">
		<ul>
			<TimelineItem v-for="timelineItem of timelineItems" :key="timelineItem.hour" :timeline-item="timelineItem" />
		</ul>
	</div>
</template>

<script setup lang="ts">
	import { inject } from 'vue';
	import type { timelineItemType } from '@/types/timeline';

	import TimelineItem from '@/components/pages/Timeline/TimelineItem.vue';

	// INJECT
	const timelineItems: timelineItemType[] = inject('timelineItems');
</script>
