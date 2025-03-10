<template>
	<nav class="sticky bottom-0 z-10 bg-white">
		<ul class="flex items-center justify-around border-t">
			<NavItem
				v-for="item of NAV_ITEMS"
				:key="item.name"
				:href="`#${item.name}`"
				:class="{ 'pointer-events-none bg-gray-200': item.name === currentPage }"
				@click="emit('navigate', item.name)"
			>
				<component :is="item.icon" class="h-6 w-6" />
				<span>{{ item.name }}</span>
			</NavItem>
		</ul>
	</nav>
</template>

<script setup lang="ts">
	import NavItem from '@/components/common/Navigation/NavItem.vue';

	import { NAV_ITEMS } from '@/constants/pages';

	defineProps({
		currentPage: {
			type: String,
			required: true,
		},
	});

	const emit = defineEmits(['navigate']);
</script>
