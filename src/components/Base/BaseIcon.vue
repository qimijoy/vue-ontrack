<template>
	<component :is="ICONS[name]" :class="$attrs.class || 'h-8'" />
</template>

<script setup lang="ts">
	import type { IconNameType } from '@/types';

	import { ICONS } from '@/modules/icons';

	defineProps<{ name: IconNameType }>();
</script>
