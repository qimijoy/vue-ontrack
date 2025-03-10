<template>
	<TheHeader @go-to-home="goTo(PAGE_DEFAULT)" @go-to-progress="goTo(PAGE_PROGRESS)" />
	<TheContent :current-page="currentPage" />
	<TheNavigation :current-page="currentPage" @navigate="goTo($event)" />
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';

	import TheHeader from '@/components/common/Header/TheHeader.vue';
	import TheContent from '@/components/common/TheContent.vue';
	import TheNavigation from '@/components/common/Navigation/TheNavigation.vue';

	import { PAGE_PROGRESS, PAGE_DEFAULT } from '@/constants/pages';
	import { normalizePageHash } from '@/utils/normalizeHash';

	// HOOKS
	onMounted(() => {
		currentPage.value = normalizePageHash();
	});

	// STATES
	const currentPage = ref('');

	// FUNCTIONS

	const goTo = (page: string) => {
		currentPage.value = page;
	};
</script>
