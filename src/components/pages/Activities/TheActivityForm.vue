<template>
	<form class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4" @submit.prevent="submit">
		<input v-model="activity" type="text" class="w-full rounded border px-4 text-xl" placeholder="Activity name" />
		<BaseButton :disabled="activity.trim() === ''">
			<PlusIcon class="h-8" />
		</BaseButton>
	</form>
</template>

<script setup lang="ts">
	import { ref, nextTick } from 'vue';
	import { PlusIcon } from '@heroicons/vue/24/outline';

	import BaseButton from '@/components/base/BaseButton.vue';

	import { isActivityValid } from '@/utils/validators';

	const emit = defineEmits({
		submit: (value) => isActivityValid(value),
	});

	// STATES
	const activity = ref('');

	// FUNCTIONS
	const submit = async () => {
		emit('submit', activity.value);
		activity.value = '';

		await nextTick();

		window.scrollTo(0, document.body.scrollHeight);
	};
</script>
