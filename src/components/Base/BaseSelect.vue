<template>
	<div class="flex gap-2">
		<BaseButton :type="BUTTON_TYPE_NEUTRAL" @click="select(null)">
			<XMarkIcon class="h-8" />
		</BaseButton>
		<select
			class="w-full truncate rounded bg-gray-100 px-2 py-1 text-2xl"
			@change="select(($event.target as HTMLInputElement).value)"
		>
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

	import { isOptionsValid, isUndefinedOrNull, isSelectValueValid } from '@/utils/validators';
	import { normalizeSelectValue } from '@/utils/normalizeSelectValue';
	import { BUTTON_TYPE_NEUTRAL } from '@/constants/buttons';

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
			type: [Number, String],
			default: null,
		},
	});

	// EMIT
	const emit = defineEmits({
		select: (value) => isSelectValueValid(value),
	});

	// COMPUTED
	const isNotSelected = computed(() => isUndefinedOrNull(props.selected));

	// FUNCTIONS
	const select = (value) => {
		emit('select', normalizeSelectValue(value));
	};
</script>
