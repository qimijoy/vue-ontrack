<template>
	<div class="flex gap-2">
		<BaseButton :type="ButtonType.NEUTRAL" @click="select(null)">
			<BaseIcon :name="IconNameType.X_MARK" />
		</BaseButton>
		<select
			class="w-full truncate rounded bg-gray-100 px-2 py-1 text-2xl"
			@change="select(($event.target as HTMLSelectElement).value)"
		>
			<option :selected="selected === null" disabled value="">{{ placeholder }}</option>
			<option v-for="{ value, label } of options" :key="value" :value="value" :selected="selected === value">
				{{ label }}
			</option>
		</select>
	</div>
</template>

<script setup lang="ts" generic="T extends number | string">
	import type { SelectOptionType } from '@/types';

	import BaseButton from '@/components/base/BaseButton.vue';
	import BaseIcon from '@/components/base/BaseIcon.vue';

	import { normalizeSelectValue } from '@/utils/normalizeSelectValue';
	import { IconNameType, ButtonType } from '@/types';

	defineProps<{
		options: SelectOptionType<T>[];
		selected: T | null;
		placeholder: string;
	}>();

	// EMIT
	const emit = defineEmits<{
		select: [value: T | null];
	}>();

	// FUNCTIONS
	const select = (value: string | null): void => {
		emit('select', normalizeSelectValue(value) as T | null);
	};
</script>
