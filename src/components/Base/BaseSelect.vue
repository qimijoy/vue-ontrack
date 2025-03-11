<template>
	<div class="flex gap-2">
		<BaseButton>
			<XMarkIcon class="h-8" />
		</BaseButton>
		<select class="w-full truncate rounded bg-gray-100 px-2 py-1 text-2xl">
			<option selected disabled value="">{{ placeholder }}</option>
			<option v-for="{ value, label } of options" :key="value" :value="value" :selected="selected === value">
				{{ label }}
			</option>
		</select>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { XMarkIcon } from '@heroicons/vue/24/outline';
	import BaseButton from '@/components/Base/BaseButton.vue';

	import type { selectItemType } from '@/types/select';

	defineProps({
		placeholder: {
			type: String,
			required: true,
		},
		options: {
			type: Array as PropType<Array<selectItemType>>,
			required: true,
		},
		selected: {
			type: Number,
			default: null,
		},
	});
</script>
