<template>
	<button :class="classes">
		<slot />
	</button>
</template>

<script setup lang="ts">
	import { isButtonTypeValid } from '@/utils/validators';

	const props = defineProps({
		type: {
			type: String,
			default: BUTTON_TYPE_PRIMARY,
			validator: (value) => isButtonTypeValid(value),
		},
	});

	// CONSTANTS
	const classes = `${typeClasses[props.type]} cursor-pointer rounded p-3 disabled:cursor-not-allowed disabled:opacity-50`;
</script>

<script lang="ts">
	// This logic is executed once
	import {
		BUTTON_TYPE_PRIMARY,
		BUTTON_TYPE_SUCCESS,
		BUTTON_TYPE_WARNING,
		BUTTON_TYPE_DANGER,
		BUTTON_TYPE_NEUTRAL,
	} from '@/constants/buttons';

	// CONSTANTS
	const typeClasses = {
		[BUTTON_TYPE_PRIMARY]: 'bg-purple-500 enabled:hover:bg-purple-600 text-white',
		[BUTTON_TYPE_SUCCESS]: 'bg-green-500 enabled:hover:bg-green-600 text-white',
		[BUTTON_TYPE_WARNING]: 'bg-yellow-500 enabled:hover:bg-yellow-600 text-white',
		[BUTTON_TYPE_DANGER]: 'bg-red-500 enabled:hover:bg-red-600 text-white',
		[BUTTON_TYPE_NEUTRAL]: 'bg-gray-100 enabled:hover:bg-gray-200',
	};
</script>
