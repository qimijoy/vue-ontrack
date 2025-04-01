<template>
	<a href="#" :class="classes" @click.prevent="scrollToHour(hour)"> {{ formattedHour }} </a>
</template>

<script setup lang="ts">
	import { HourType } from '@/types';
	import { computed } from 'vue';

	import { scrollToHour } from '@/modules/timeline-items';
	import { now } from '@/modules/time';

	const props = defineProps<{ hour: HourType }>();

	// CONSTANTS
	const classes = computed((): string[] => [
		'absolute -top-4 left-1/2 -translate-x-1/2 rounded px-2 font-mono text-lg',
		props.hour === now.value.getHours() ? 'bg-purple-900 font-black text-white' : 'bg-gray-100 text-gray-500',
	]);

	const formattedHour = `${String(props.hour).padStart(2, '0')}:00`;
</script>
