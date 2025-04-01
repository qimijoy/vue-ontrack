<template>
	<li class="flex-1">
		<a :href="`#${navItem.page}`" :class="classes" @click="handleClick">
			<BaseIcon :name="navItem.icon" classes="h-6 w-6" />
			<span>{{ navItem.page }}</span>
		</a>
	</li>
</template>

<script setup lang="ts">
	import type { NavItemType } from '@/types';

	import { computed } from 'vue';

	import BaseIcon from '@/components/base/BaseIcon.vue';

	import { navigate, currentPage } from '@/modules/router';
	import { scrollToCurrentHour } from '@/modules/timeline-items';
	import { PageNameType } from '@/types';

	const props = defineProps<{ navItem: NavItemType }>();

	// COMPUTED
	const classes = computed((): string[] => [
		'flex flex-col items-center p-2 text-xs capitalize',
		props.navItem.page === currentPage.value ? 'bg-gray-200' : 'hover:bg-gray-100',
	]);

	// FUNCTIONS
	const handleClick = (): void =>
		currentPage.value === PageNameType.TIMELINE && props.navItem.page === PageNameType.TIMELINE
			? scrollToCurrentHour(true)
			: navigate(props.navItem.page);
</script>
