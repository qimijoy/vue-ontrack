<template>
	<header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3">
		<TheLogo @click="emit('navigate', PAGE_DEFAULT)" />
		<TheHeaderProgress @click="emit('navigate', PAGE_PROGRESS)" />
	</header>
</template>

<script setup lang="ts">
	import TheLogo from '@/components/common/TheLogo.vue';
	import TheHeaderProgress from '@/components/common/Header/TheHeaderProgress.vue';

	import { PAGE_DEFAULT, PAGE_PROGRESS } from '@/constants/pages';
	import { isPageValid } from '@/utils/validators';

	// EMIT
	const emit = defineEmits({
		navigate: isPageValid,
	});
</script>
