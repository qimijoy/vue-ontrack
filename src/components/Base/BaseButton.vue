<template>
	<button :class="classes">
		<slot />
	</button>
</template>

<script setup lang="ts">
	const props = withDefaults(defineProps<{ type?: ButtonType }>(), {
		type: BUTTON_TYPE_PRIMARY,
	});

	// CONSTANTS
	const classes = [
		'cursor-pointer rounded p-3 disabled:cursor-not-allowed disabled:opacity-50',
		typeClasses[props.type],
	];
</script>

<script lang="ts">
	import type { ButtonType } from '@/types';

	// This logic is executed once
	import {
		BUTTON_TYPE_PRIMARY,
		BUTTON_TYPE_SUCCESS,
		BUTTON_TYPE_WARNING,
		BUTTON_TYPE_DANGER,
		BUTTON_TYPE_NEUTRAL,
	} from '@/constants/buttons';

	// CONSTANTS
	const typeClasses: Record<ButtonType, string> = {
		[BUTTON_TYPE_PRIMARY]: 'bg-purple-500 enabled:hover:bg-purple-600 text-white',
		[BUTTON_TYPE_SUCCESS]: 'bg-green-500 enabled:hover:bg-green-600 text-white',
		[BUTTON_TYPE_WARNING]: 'bg-yellow-500 enabled:hover:bg-yellow-600 text-white',
		[BUTTON_TYPE_DANGER]: 'bg-red-500 enabled:hover:bg-red-600 text-white',
		[BUTTON_TYPE_NEUTRAL]: 'bg-gray-100 enabled:hover:bg-gray-200',
	};
</script>
