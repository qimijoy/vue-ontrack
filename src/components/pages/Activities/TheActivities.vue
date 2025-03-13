<template>
	<div class="flex grow flex-col">
		<ul v-if="activities.length > 0" class="grow divide-y">
			<ActivityItem
				v-for="activity of activities"
				:key="activity.id"
				:activity="activity"
				@delete="emit('deleteActivity', activity.id)"
			/>
		</ul>

		<TheActivitiesEmptyState v-else />

		<TheActivityForm @submit="emit('createActivity', $event)" />
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import type { ActivityItemType } from '@/types/activity';

	import ActivityItem from '@/components/pages/Activities/ActivityItem.vue';
	import TheActivitiesEmptyState from '@/components/pages/Activities/TheActivitiesEmptyState.vue';
	import TheActivityForm from '@/components/pages/Activities/TheActivityForm.vue';

	import { validateActivities, isActivityValid, isString } from '@/utils/validators';

	defineProps({
		activities: {
			type: Array as PropType<ActivityItemType[]>,
			required: true,
			validator: (value) => validateActivities(value),
		},
	});

	const emit = defineEmits({
		deleteActivity: (value) => isString(value),
		createActivity: (value: ActivityItemType) => isActivityValid(value),
	});
</script>
