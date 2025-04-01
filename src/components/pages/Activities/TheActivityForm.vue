<template>
	<form class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4" @submit.prevent="submit">
		<input v-model="name" type="text" class="w-full rounded border px-4 text-xl" placeholder="Activity name" />
		<BaseButton :disabled="name.trim() === ''">
			<BaseIcon :name="ICON_PLUS" />
		</BaseButton>
	</form>
</template>

<script setup lang="ts">
	import { ref, nextTick } from 'vue';

	import BaseButton from '@/components/base/BaseButton.vue';
	import BaseIcon from '@/components/base/BaseIcon.vue';

	import { id } from '@/utils/generators';
	import { createActivity } from '@/modules/activities';
	import { ICON_PLUS } from '@/modules/icons';

	// STATES
	const name = ref<string>('');

	// FUNCTIONS
	const submit = async (): Promise<void> => {
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
