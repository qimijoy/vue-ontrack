<template>
	<nav class="sticky bottom-0 z-10 bg-white">
		<ul class="flex items-center justify-around border-t">
			<NavigationItem
				v-for="item of NAV_ITEMS"
				:key="item.name"
				:href="`#${item.name}`"
				:class="{ 'pointer-events-none bg-gray-200': item.name === currentPage }"
				@click="navigate(item.name)"
			>
				<component :is="item.icon" class="h-6 w-6" />
				<span>{{ item.name }}</span>
			</NavigationItem>
		</ul>
	</nav>
</template>

<script setup lang="ts">
	import NavigationItem from '@/components/common/Navigation/NavigationItem.vue';

	import { NAV_ITEMS } from '@/constants/pages';
	import { navigate, currentPage } from '@/router';
</script>
