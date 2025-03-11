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
	import BaseButton from '@/components/base/BaseButton.vue';

	import type { selectItemType } from '@/types/select';

	import { isOptionsValid } from '@/utils/validators';

	defineProps({
		placeholder: {
			type: String,
			required: true,
		},
		options: {
			type: Array as PropType<Array<selectItemType>>,
			required: true,
			validator: (options: selectItemType[]) => isOptionsValid(options),
		},
		selected: {
			type: Number,
			default: null,
		},
	});
</script>
