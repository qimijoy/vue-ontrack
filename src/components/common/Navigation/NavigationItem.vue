<template>
	<li class="flex-1">
		<a :href="`#${navItem.page}`" :class="classes" @click="navigate(navItem.page)">
			<BaseIcon :name="navItem.icon" classes="h-6 w-6" />
			<span>{{ navItem.page }}</span>
		</a>
	</li>
</template>

<script setup lang="ts">
	import { computed } from 'vue';

	import BaseIcon from '@/components/base/BaseIcon.vue';

	import { navigate, currentPage } from '@/composables/router';
	import { isNavItemValid } from '@/utils/validators';

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
		{ 'pointer-events-none bg-gray-200': props.navItem.page === currentPage.value },
	]);
</script>
