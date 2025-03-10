<template>
	<nav class="sticky bottom-0 z-10 bg-white">
		<ul class="flex items-center justify-around border-t">
			<NavItem
				v-for="item of NAV_ITEMS"
				:key="item.name"
				:href="`#${item.name}`"
				:class="{ 'pointer-events-none bg-gray-200': item.name === currentPage }"
				@click="currentPage = item.name"
			>
				<component :is="item.icon" class="h-6 w-6" />
				<span>{{ item.name }}</span>
			</NavItem>
		</ul>
	</nav>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline';

	import NavItem from '@/components/common/Navigation/NavItem.vue';

	import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_DEFAULT } from '@/constants/pages';

	const NAV_ITEMS = [
		{ name: PAGE_TIMELINE, icon: ClockIcon },
		{ name: PAGE_ACTIVITIES, icon: ListBulletIcon },
		{ name: PAGE_PROGRESS, icon: ChartBarIcon },
	];

	// HOOKS
	onMounted(() => {
		currentPage.value = normalizePageHash();
	});

	// STATES
	const currentPage = ref('');

	// FUNCTIONS
	const normalizePageHash = () => {
		const pageHash = window.location.hash.slice(1);

		if (NAV_ITEMS.some(({ name }) => name === pageHash)) {
			return pageHash;
		}

		// If page is undefined, navigate to default page
		window.location.hash = PAGE_DEFAULT;

		return PAGE_DEFAULT;
	};
</script>
