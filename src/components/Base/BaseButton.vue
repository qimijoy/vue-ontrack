<template>
	<button :class="`${typeClasses[type]} cursor-pointer rounded p-3 disabled:cursor-not-allowed disabled:opacity-50`">
		<slot />
	</button>
</template>

<script setup lang="ts">
	import { isButtonTypeValid } from '@/utils/validators';

	defineProps({
		type: {
			type: String,
			default: BUTTON_TYPE_PRIMARY,
			validator: (value) => isButtonTypeValid(value),
		},
	});
</script>

<script lang="ts">
	// This logic is executed once
	import { BUTTON_TYPE_PRIMARY, BUTTON_TYPE_NEUTRAL, BUTTON_TYPE_DANGER } from '@/constants/buttons';

	// CONSTANTS
	const typeClasses = {
		[BUTTON_TYPE_PRIMARY]: 'bg-purple-500 enabled:hover:bg-purple-600 text-white',
		[BUTTON_TYPE_NEUTRAL]: 'bg-gray-100 enabled:hover:bg-gray-200',
		[BUTTON_TYPE_DANGER]: 'bg-red-500 enabled:hover:bg-red-600 text-white',
	};
</script>
