<template>
	<component :is="ICONS[name]" :class="$attrs.class || 'h-8'" />
</template>

<script setup lang="ts">
	import { isIconValid } from '@/utils/validators';

	import { ICONS } from '@/modules/icons';

	defineProps({
		name: {
			type: String,
			required: true,
			validator: (value: string) => isIconValid(value),
		},
	});
</script>
