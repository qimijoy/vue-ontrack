<template>
	<nav class="sticky bottom-0 z-10 bg-white">
		<ul class="flex items-center justify-around border-t">
			<NavigationItem v-for="navItem of NAV_ITEMS" :key="navItem.page" :nav-item="navItem" />
		</ul>
	</nav>
</template>

<script setup lang="ts">
	import NavigationItem from '@/components/common/Navigation/NavigationItem.vue';

	import { NAV_ITEMS } from '@/constants/pages';
</script>
