<template>
	<div class="flex w-full gap-2">
		<BaseButton :type="BUTTON_TYPE_DANGER" :disabled="!seconds" @click="reset">
			<ArrowPathIcon class="h-8" />
		</BaseButton>
		<div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
			{{ formatSeconds(seconds) }}
		</div>
		<BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
			<PauseIcon class="h-8" />
		</BaseButton>
		<BaseButton v-else :type="BUTTON_TYPE_SUCCESS" :disabled="isStartButtonDisabled" @click="start">
			<PlayIcon class="h-8" />
		</BaseButton>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/outline';

	import BaseButton from '@/components/base/BaseButton.vue';

	import { BUTTON_TYPE_DANGER, BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING } from '@/constants/buttons';
	import { MILLISECONDS_IN_SECOND } from '@/constants/time';
	import { isHourValid, isNumber } from '@/utils/validators';
	import { formatSeconds } from '@/utils/timelines';

	const props = defineProps({
		seconds: {
			type: Number,
			default: 0,
			validator: (value) => isNumber(value),
		},
		hour: {
			type: Number,
			required: true,
			validator: (value) => isHourValid(value),
		},
	});

	const emit = defineEmits({
		updateSeconds: (value) => isNumber(value),
	});

	// CONSTANTS
	const isStartButtonDisabled = props.hour !== new Date().getHours();

	// STATES
	const seconds = ref(props.seconds);
	const isRunning = ref();

	// FUNCTIONS
	const start = () => {
		isRunning.value = setInterval(() => {
			emit('updateSeconds', 1);
			seconds.value++;
		}, MILLISECONDS_IN_SECOND);
	};

	const stop = () => {
		clearInterval(isRunning.value);
		isRunning.value = false;
	};

	const reset = () => {
		stop();
		emit('updateSeconds', -seconds.value);

		seconds.value = 0;
	};
</script>
