<template>
	<div class="flex w-full gap-2">
		<BaseButton
			:type="ButtonType.DANGER"
			:disabled="!timelineItem.activitySeconds"
			@click="resetTimelineItemTimer(timelineItem)"
		>
			<BaseIcon :name="IconNameType.ARROW_PATH" />
		</BaseButton>
		<div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
			{{ formatSeconds(timelineItem.activitySeconds) }}
		</div>
		<BaseButton v-if="timelineItem === activeTimelineItem" :type="ButtonType.WARNING" @click="stopTimelineItemTimer">
			<BaseIcon :name="IconNameType.PAUSE" />
		</BaseButton>
		<BaseButton
			v-else
			:type="ButtonType.SUCCESS"
			:disabled="timelineItem.hour !== now.getHours()"
			@click="startTimelineItemTimer(timelineItem)"
		>
			<BaseIcon :name="IconNameType.PLAY" />
		</BaseButton>
	</div>
</template>

<script setup lang="ts">
	import type { TimelineItemType } from '@/types';

	import BaseButton from '@/components/base/BaseButton.vue';
	import BaseIcon from '@/components/base/BaseIcon.vue';

	import { IconNameType, ButtonType } from '@/types';
	import { formatSeconds } from '@/utils/timelines';
	import { activeTimelineItem } from '@/modules/timeline-items';
	import { startTimelineItemTimer, stopTimelineItemTimer, resetTimelineItemTimer } from '@/modules/timeline-item-timer';
	import { now } from '@/modules/time';

	defineProps<{ timelineItem: TimelineItemType }>();
</script>
