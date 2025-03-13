<template>
	<li class="flex flex-col gap-2 p-4">
		<div class="flex items-center gap-2">
			<BaseButton :type="BUTTON_TYPE_DANGER" @click="emit('delete')">
				<TrashIcon class="h-8" />
			</BaseButton>
			<span class="truncatey text-xl">{{ activity.name }}</span>
		</div>
		<div>
			<BaseSelect
				class="font-mono"
				placeholder="h:mm"
				:options="PERIOD_SELECT_OPTIONS"
				:selected="secondsToComplete"
				@select="secondsToComplete = $event"
			/>
		</div>
	</li>
</template>

<script setup lang="ts">
	import type { ActivityItemType } from '@/types/activity';
	import type { PropType } from 'vue';

	import { ref } from 'vue';

	import { TrashIcon } from '@heroicons/vue/24/outline';

	import BaseButton from '@/components/base/BaseButton.vue';
	import BaseSelect from '@/components/base/BaseSelect.vue';

	import { PERIOD_SELECT_OPTIONS } from '@/constants/activities';
	import { BUTTON_TYPE_DANGER } from '@/constants/buttons';
	import { isActivityValid, isUndefined } from '@/utils/validators';

	defineProps({
		activity: {
			type: Object as PropType<ActivityItemType>,
			required: true,
			validator: (value: ActivityItemType) => isActivityValid(value),
		},
	});

	const emit = defineEmits({
		delete: isUndefined,
	});

	// STATES
	const secondsToComplete = ref(0);
</script>
