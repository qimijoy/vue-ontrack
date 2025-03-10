<template>
	<a :href="`#${PAGE_DEFAULT}`">
		<img src="@/assets/images/logo.png" alt="Logo" class="h-9" />
	</a>
</template>

<script setup lang="ts">
	import { PAGE_DEFAULT } from '@/constants/pages';
</script>
