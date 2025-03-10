<template>
	<header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3">
		<TheLogo @click="emit('goToHome')" />
		<TheHeaderProgress @click="emit('goToProgress')" />
	</header>
</template>

<script setup lang="ts">
	import TheLogo from '@/components/common/TheLogo.vue';
	import TheHeaderProgress from '@/components/common/Header/TheHeaderProgress.vue';

	const emit = defineEmits(['goToHome', 'goToProgress']);
</script>
