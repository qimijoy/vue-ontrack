<template>
	<li class="flex flex-col gap-2 p-4">
		<div class="flex items-center gap-2">
			<BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteAndResetActivity(activity)">
				<TrashIcon class="h-8" />
			</BaseButton>
			<span class="truncatey text-xl">{{ activity.name }}</span>
		</div>
		<div class="flex gap-2">
			<BaseSelect
				class="grow font-mono"
				placeholder="hh:mm"
				:options="PERIOD_SELECT_OPTIONS"
				:selected="activity.secondsToComplete || null"
				@select="updateActivity(activity, { secondsToComplete: $event || 0 })"
			/>
			<ActivitySecondsToComplete v-if="activity.secondsToComplete > 0" :activity="activity" />
		</div>
	</li>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import type { ActivityItemType } from '@/types/activity';

	import { TrashIcon } from '@heroicons/vue/24/outline';

	import BaseButton from '@/components/base/BaseButton.vue';
	import BaseSelect from '@/components/base/BaseSelect.vue';
	import ActivitySecondsToComplete from '@/components/pages/Activities/ActivitySecondsToComplete.vue';

	import { BUTTON_TYPE_DANGER } from '@/constants/buttons';
	import { PERIOD_SELECT_OPTIONS } from '@/constants/time';
	import { isActivityValid } from '@/utils/validators';
	import { deleteActivity, updateActivity } from '@/composables/activities';
	import { resetTimelineItemActivities } from '@/composables/timelineItems';

	defineProps({
		activity: {
			type: Object as PropType<ActivityItemType>,
			required: true,
			validator: (value: ActivityItemType) => isActivityValid(value),
		},
	});

	// FUNCTIONS
	const deleteAndResetActivity = (activity: ActivityItemType) => {
		resetTimelineItemActivities(activity);
		deleteActivity(activity);
	};
</script>
