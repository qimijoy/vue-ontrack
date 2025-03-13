<template>
	<a href="#" :class="classes"> {{ formattedHour }} </a>
</template>

<script setup lang="ts">
	import { getCurrentHour } from '@/utils/timelines';
	import { isHourValid } from '@/utils/validators';

	const props = defineProps({
		hour: {
			type: Number,
			required: true,
			validator: (value) => isHourValid(value),
		},
	});

	// CONSTANTS
	const classes = [
		'absolute -top-4 left-1/2 -translate-x-1/2 rounded px-2 font-mono text-lg',
		props.hour === getCurrentHour() ? 'bg-purple-900 font-black text-white' : 'bg-gray-100 text-gray-500',
	];

	const formattedHour = `${String(props.hour).padStart(2, '0')}:00`;
</script>
