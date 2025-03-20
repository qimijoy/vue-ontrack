<template>
	<form class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4" @submit.prevent="submit">
		<input v-model="name" type="text" class="w-full rounded border px-4 text-xl" placeholder="Activity name" />
		<BaseButton :disabled="name.trim() === ''">
			<PlusIcon class="h-8" />
		</BaseButton>
	</form>
</template>

<script setup lang="ts">
	import { ref, nextTick } from 'vue';
	import { PlusIcon } from '@heroicons/vue/24/outline';

	import BaseButton from '@/components/base/BaseButton.vue';

	import { id } from '@/utils/generators';
	import { createActivity } from '@/composables/activities';

	// STATES
	const name = ref('');

	// FUNCTIONS
	const submit = async () => {
		createActivity({
			id: id(),
			name: name.value,
			secondsToComplete: 0,
		});

		name.value = '';

		await nextTick();

		window.scrollTo(0, document.body.scrollHeight);
	};
</script>
