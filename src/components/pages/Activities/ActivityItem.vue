<template>
	<li class="flex flex-col gap-2 p-4">
		<div class="flex items-center gap-2">
			<BaseButton :type="ButtonType.DANGER" @click="deleteAndResetActivity(activity)">
				<BaseIcon :name="IconNameType.TRASH" />
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
			<RemainingActivitySeconds v-if="activity.secondsToComplete > 0" :activity="activity" />
		</div>
	</li>
</template>

<script setup lang="ts">
	import type { ActivityType } from '@/types';

	import BaseButton from '@/components/base/BaseButton.vue';
	import BaseSelect from '@/components/base/BaseSelect.vue';
	import BaseIcon from '@/components/base/BaseIcon.vue';
	import RemainingActivitySeconds from '@/components/pages/Activities/RemainingActivitySeconds.vue';

	import { IconNameType, ButtonType } from '@/types';
	import { PERIOD_SELECT_OPTIONS } from '@/constants/time';
	import { deleteActivity, updateActivity } from '@/modules/activities';
	import { timelineItems, resetTimelineItemActivities } from '@/modules/timeline-items';

	defineProps<{ activity: ActivityType }>();

	// FUNCTIONS
	const deleteAndResetActivity = (activity: ActivityType): void => {
		resetTimelineItemActivities(timelineItems.value, activity);
		deleteActivity(activity);
	};
</script>
