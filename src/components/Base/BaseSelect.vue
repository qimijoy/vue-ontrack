<template>
	<div class="flex gap-2">
		<BaseButton @click="emit('select', null)">
			<XMarkIcon class="h-8" />
		</BaseButton>
		<select class="w-full truncate rounded bg-gray-100 px-2 py-1 text-2xl" @change="handleSelect">
			<option :selected="isNotSelected" disabled value="">{{ placeholder }}</option>
			<option v-for="{ value, label } of options" :key="value" :value="value" :selected="selected === value">
				{{ label }}
			</option>
		</select>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import type { selectItemType } from '@/types/select';

	import { computed } from 'vue';

	import { XMarkIcon } from '@heroicons/vue/24/outline';
	import BaseButton from '@/components/base/BaseButton.vue';

	import { isOptionsValid, isUndefinedOrNull, isNumberOrNull } from '@/utils/validators';

	const props = defineProps({
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

	const emit = defineEmits({
		select: (value) => isNumberOrNull(value),
	});

	// COMPUTED
	const isNotSelected = computed(() => isUndefinedOrNull(props.selected));

	// FUNCTIONS
	const handleSelect = (event: Event) => {
		const target = event.target as HTMLSelectElement;

		emit('select', Number(target.value));
	};
</script>
