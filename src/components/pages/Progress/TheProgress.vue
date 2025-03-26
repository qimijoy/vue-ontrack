<template>
	<ul v-if="trackedActivities.length" class="divide-y">
		<ProgressItem v-for="activity of trackedActivities" :key="activity.id" :activity="activity" />
	</ul>
	<TheProgressEmptyState v-else />
</template>

<script setup lang="ts">
	import ProgressItem from '@/components/pages/Progress/ProgressItem.vue';
	import TheProgressEmptyState from '@/components/pages/Progress/TheProgressEmptyState.vue';

	import { trackedActivities } from '@/composables/activities';
</script>
