<template>
	<a :href="`#${PAGE_DEFAULT}`" class="origin-left scale-125 rounded bg-black p-1 text-white" @click="handleClick">
		<BaseIcon :name="ICON_CLOCK" class="h-5" />
	</a>
</template>

<script setup lang="ts">
	import BaseIcon from '@/components/base/BaseIcon.vue';

	import { currentPage, navigate } from '@/modules/router';
	import { scrollToCurrentHour } from '@/modules/timeline-items';
	import { ICON_CLOCK } from '@/modules/icons';
	import { PAGE_DEFAULT, PAGE_TIMELINE } from '@/constants/pages';

	// FUNCTIONS
	const handleClick = (): void =>
		currentPage.value === PAGE_TIMELINE ? scrollToCurrentHour(true) : navigate(PAGE_DEFAULT);
</script>
