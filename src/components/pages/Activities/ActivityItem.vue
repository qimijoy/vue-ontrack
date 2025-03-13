<template>
	<li class="flex flex-col gap-2 p-4">
		<div class="flex items-center gap-2">
			<BaseButton :type="BUTTON_TYPE_DANGER">
				<TrashIcon class="h-8" />
			</BaseButton>
			<span class="truncatey text-xl">{{ activity }}</span>
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
	import { ref } from 'vue';
	import { TrashIcon } from '@heroicons/vue/24/outline';

	import BaseButton from '@/components/base/BaseButton.vue';
	import BaseSelect from '@/components/base/BaseSelect.vue';

	import { PERIOD_SELECT_OPTIONS } from '@/constants/activities';
	import { BUTTON_TYPE_DANGER } from '@/constants/buttons';
	import { isActivityValid } from '@/utils/validators';

	defineProps({
		activity: {
			type: String,
			required: true,
			validator: (value) => isActivityValid(value),
		},
	});

	// STATES
	const secondsToComplete = ref(null);
</script>
