<template>
	<div class="flex grow flex-col">
		<ul v-if="activities.length > 0" class="grow divide-y">
			<ActivityItem v-for="activity of activities" :key="activity.id" :activity="activity" />
		</ul>

		<TheActivitiesEmptyState v-else />

		<TheActivityForm />
	</div>
</template>

<script setup lang="ts">
	import ActivityItem from '@/components/pages/Activities/ActivityItem.vue';
	import TheActivitiesEmptyState from '@/components/pages/Activities/TheActivitiesEmptyState.vue';
	import TheActivityForm from '@/components/pages/Activities/TheActivityForm.vue';

	import { activities } from '@/composables/activities';
</script>
