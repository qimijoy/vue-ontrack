<template>
	<TheHeader />

	<main class="flex flex-grow flex-col">
		<KeepAlive>
			<component :is="routes[currentPage]" />
		</KeepAlive>
	</main>

	<TheNavigation />
</template>

<script setup lang="ts">
	import TheHeader from '@/components/common/Header/TheHeader.vue';
	import TheNavigation from '@/components/common/Navigation/TheNavigation.vue';

	import { routes, currentPage } from '@/composables/router';
</script>
