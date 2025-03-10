<template>
	<a :href="BASE_URL">
		<img src="@/assets/images/logo.png" alt="Logo" class="h-9" />
	</a>
</template>

<script setup lang="ts">
	import { BASE_URL } from '@config';
</script>
