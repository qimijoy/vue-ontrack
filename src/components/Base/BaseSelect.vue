<template>
	<div class="flex gap-2">
		<BaseButton :type="BUTTON_TYPE_NEUTRAL" @click="select(null)">
			<BaseIcon :name="ICON_X_MARK" />
		</BaseButton>
		<select
			class="w-full truncate rounded bg-gray-100 px-2 py-1 text-2xl"
			@change="select(($event.target as HTMLSelectElement).value)"
		>
			<option :selected="isNotSelected" disabled value="">{{ placeholder }}</option>
			<option v-for="{ value, label } of options" :key="value" :value="value" :selected="selected === value">
				{{ label }}
			</option>
		</select>
	</div>
</template>

<script setup lang="ts" generic="T extends number | string">
	import type { SelectOptionType } from '@/types';

	import { computed } from 'vue';

	import BaseButton from '@/components/base/BaseButton.vue';
	import BaseIcon from '@/components/base/BaseIcon.vue';

	import { isUndefinedOrNull } from '@/utils/validators';
	import { normalizeSelectValue } from '@/utils/normalizeSelectValue';
	import { BUTTON_TYPE_NEUTRAL } from '@/constants/buttons';
	import { ICON_X_MARK } from '@/modules/icons';

	const props = defineProps<{
		options: SelectOptionType<T>[];
		selected: T | null;
		placeholder: string;
	}>();

	// EMIT
	const emit = defineEmits<{
		select: [value: T | null];
	}>();

	// COMPUTED
	const isNotSelected = computed((): boolean => isUndefinedOrNull(props.selected));

	// FUNCTIONS
	const select = (value: string | null): void => {
		emit('select', normalizeSelectValue(value));
	};
</script>
