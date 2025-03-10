<template>
	<a href="#" class="text-sm">
		<span v-if="true" class="flex items-center gap-1">
			Day complete!
			<CheckCircleIcon class="h-7 text-green-500" />
		</span>
		<span v-else class="flex items-center gap-1">
			Progress:
			<span class="font-mono">20%</span>
			<span class="h-3 w-3 rounded-full bg-red-500" />
		</span>
	</a>
</template>

<script setup lang="ts">
	import { CheckCircleIcon } from '@heroicons/vue/24/solid';
</script>
