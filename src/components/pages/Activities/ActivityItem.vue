<template>
	<li class="flex flex-col gap-2 p-4">
		<div class="flex items-center gap-2">
			<BaseButton :type="BUTTON_TYPE_DANGER" @click="emit('delete')">
				<TrashIcon class="h-8" />
			</BaseButton>
			<span class="truncatey text-xl">{{ activity.name }}</span>
		</div>
		<div class="flex gap-2">
			<BaseSelect
				class="grow font-mono"
				placeholder="hh:mm"
				:options="periodSelectOptions"
				:selected="activity.secondsToComplete || null"
				@select="emit('setSecondsToComplete', $event || 0)"
			/>
			<ActivitySecondsToComplete v-if="activity.secondsToComplete > 0" :activity="activity" />
		</div>
	</li>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import type { ActivityItemType } from '@/types/activity';
	import type { selectItemType } from '@/types/select';

	import { inject } from 'vue';
	import { TrashIcon } from '@heroicons/vue/24/outline';

	import BaseButton from '@/components/base/BaseButton.vue';
	import BaseSelect from '@/components/base/BaseSelect.vue';
	import ActivitySecondsToComplete from '@/components/pages/Activities/ActivitySecondsToComplete.vue';

	import { BUTTON_TYPE_DANGER } from '@/constants/buttons';
	import { isActivityValid, isUndefined, isNumber, isNull } from '@/utils/validators';

	defineProps({
		activity: {
			type: Object as PropType<ActivityItemType>,
			required: true,
			validator: (value: ActivityItemType) => isActivityValid(value),
		},
	});

	// INJECT
	const periodSelectOptions = inject<selectItemType[]>('periodSelectOptions');

	// EMIT
	const emit = defineEmits({
		delete: isUndefined,
		setSecondsToComplete: (value) => isNumber(value) || isNull(value),
	});
</script>
