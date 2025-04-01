<template>
	<header class="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 bg-white p-3">
		<TheLogo />
		<TheHeaderProgress />
	</header>
</template>

<script setup lang="ts">
	import TheLogo from '@/components/common/TheLogo.vue';
	import TheHeaderProgress from '@/components/common/Header/TheHeaderProgress.vue';
</script>
