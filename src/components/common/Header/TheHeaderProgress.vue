<template>
	<a :href="`#${PAGE_PROGRESS}`" class="text-sm" @click="navigate(PAGE_PROGRESS)">
		<span v-if="true" class="flex items-center gap-1">
			Day complete!
			<BaseIcon :name="ICON_CHECK_CIRCLE" classes="h-7 text-green-500" />
		</span>
		<span v-else class="flex items-center gap-1">
			Progress:
			<span class="font-mono">20%</span>
			<span class="h-3 w-3 rounded-full bg-red-500" />
		</span>
	</a>
</template>

<script setup lang="ts">
	import BaseIcon from '@/components/base/BaseIcon.vue';

	import { navigate } from '@/composables/router';
	import { ICON_CHECK_CIRCLE } from '@/composables/icons';
	import { PAGE_PROGRESS } from '@/constants/pages';
</script>
