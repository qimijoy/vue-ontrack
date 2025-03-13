<template>
	<div>
		<ul class="divide-y">
			<ActivityItem
				v-for="activity of activities"
				:key="activity"
				:activity="activity"
				@delete="emit('deleteActivity', activity)"
			/>
		</ul>

		<TheActivityForm @submit="emit('createActivity', $event)" />
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';

	import ActivityItem from '@/components/pages/Activities/ActivityItem.vue';
	import TheActivityForm from '@/components/pages/Activities/TheActivityForm.vue';

	import { validateActivities, isActivityValid } from '@/utils/validators';

	defineProps({
		activities: {
			type: Array as PropType<string[]>,
			required: true,
			validator: (value) => validateActivities(value),
		},
	});

	const emit = defineEmits({
		deleteActivity: (value) => isActivityValid(value),
		createActivity: (value) => isActivityValid(value),
	});
</script>
