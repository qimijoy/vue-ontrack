<template>
	<a :href="`#${PageName.TIMELINE}`" class="origin-left scale-125 rounded bg-black p-1 text-white" @click="handleClick">
		<BaseIcon :name="IconNameType.CLOCK" class="h-5" />
	</a>
</template>

<script setup lang="ts">
	import BaseIcon from '@/components/base/BaseIcon.vue';

	import { currentPage, navigate } from '@/modules/router';
	import { scrollToCurrentHour } from '@/modules/timeline-items';
	import { PageName, IconNameType } from '@/types';

	// FUNCTIONS
	const handleClick = (): void =>
		currentPage.value === PageName.TIMELINE ? scrollToCurrentHour(true) : navigate(PageName.TIMELINE);
</script>
