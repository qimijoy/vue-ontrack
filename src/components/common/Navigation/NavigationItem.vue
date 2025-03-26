<template>
	<li class="flex-1">
		<a :href="`#${navItem.page}`" :class="classes" @click="handleClick">
			<BaseIcon :name="navItem.icon" classes="h-6 w-6" />
			<span>{{ navItem.page }}</span>
		</a>
	</li>
</template>

<script setup lang="ts">
	import { computed } from 'vue';

	import BaseIcon from '@/components/base/BaseIcon.vue';

	import { navigate, currentPage } from '@/modules/router';
	import { scrollToCurrentHour } from '@/modules/timeline-items';
	import { isNavItemValid } from '@/utils/validators';
	import { PAGE_TIMELINE } from '@/constants/pages';

	const props = defineProps({
		navItem: {
			type: Object,
			required: true,
			validator: (value: object) => isNavItemValid(value),
		},
	});

	// COMPUTED
	const classes = computed(() => [
		'flex flex-col items-center p-2 text-xs capitalize',
		props.navItem.page === currentPage.value ? 'bg-gray-200' : 'hover:bg-gray-100',
	]);

	// FUNCTIONS
	const handleClick = () =>
		currentPage.value === PAGE_TIMELINE && props.navItem.page === PAGE_TIMELINE
			? scrollToCurrentHour()
			: navigate(props.navItem.page);
</script>
