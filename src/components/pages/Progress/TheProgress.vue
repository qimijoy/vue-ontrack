<template>
	<ul class="divide-y">
		<ProgressItem v-for="activity of trackedActivities" :key="activity.id" :activity="activity" />
	</ul>
</template>

<script setup lang="ts">
	import ProgressItem from '@/components/pages/Progress/ProgressItem.vue';

	import { trackedActivities } from '@/composables/activities';
</script>
