<template>
	<div class="flex w-full gap-2">
		<BaseButton :type="BUTTON_TYPE_DANGER">
			<ArrowPathIcon class="h-8" />
		</BaseButton>
		<div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
			{{ formatSeconds(seconds) }}
		</div>
		<BaseButton :type="BUTTON_TYPE_WARNING">
			<PauseIcon class="h-8" />
		</BaseButton>
		<BaseButton :type="BUTTON_TYPE_SUCCESS">
			<PlayIcon class="h-8" />
		</BaseButton>
	</div>
</template>

<script setup lang="ts">
	import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/outline';

	import BaseButton from '@/components/base/BaseButton.vue';

	import { BUTTON_TYPE_DANGER, BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING } from '@/constants/buttons';

	import { isNumber } from '@/utils/validators';
	import { formatSeconds } from '@/utils/timelines';

	defineProps({
		seconds: {
			type: Number,
			default: 0,
			validator: (value) => isNumber(value),
		},
	});
</script>
