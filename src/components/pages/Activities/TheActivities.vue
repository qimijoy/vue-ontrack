<template>
	<div>
		<ul class="divide-y">
			<ActivityItem v-for="activity of activities" :key="activity" :activity="activity" />
		</ul>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';

	import ActivityItem from '@/components/pages/Activities/ActivityItem.vue';

	import { validateActivities } from '@/utils/validators';

	defineProps({
		activities: {
			type: Array as PropType<string[]>,
			required: true,
			validator: (value) => validateActivities(value),
		},
	});
</script>
