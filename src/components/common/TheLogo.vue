<template>
	<a :href="`#${PAGE_DEFAULT}`" @click="handleClick">
		<img src="@/assets/images/logo.png" alt="Logo" class="h-9" />
	</a>
</template>

<script setup lang="ts">
	import { currentPage, navigate } from '@/modules/router';
	import { scrollToCurrentHour } from '@/modules/timelineItems';
	import { PAGE_DEFAULT, PAGE_TIMELINE } from '@/constants/pages';

	// FUNCTIONS
	const handleClick = () => (currentPage.value === PAGE_TIMELINE ? scrollToCurrentHour() : navigate(PAGE_DEFAULT));
</script>
