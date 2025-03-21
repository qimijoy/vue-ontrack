<template>
	<component :is="ICONS[name]" :class="classes" />
</template>

<script setup lang="ts">
	import { isIconValid, isNotEmptyString } from '@/utils/validators';

	import { ICONS } from '@/composables/icons';

	defineProps({
		name: {
			type: String,
			required: true,
			validator: (value: string) => isIconValid(value),
		},
		classes: {
			type: String,
			default: 'h-8',
			validator: (value) => isNotEmptyString(value),
		},
	});
</script>
