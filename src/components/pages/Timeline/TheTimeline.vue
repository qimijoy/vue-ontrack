<template>
	<div class="mt-7">
		<ul>
			<TimelineItem v-for="timelineItem of timelineItems" :key="timelineItem.hour" :timeline-item="timelineItem" />
		</ul>
	</div>
</template>

<script setup lang="ts">
	import TimelineItem from '@/components/pages/Timeline/TimelineItem.vue';

	defineProps({
		timelineItems: {
			type: Object,
			required: true,
		},
	});
</script>
