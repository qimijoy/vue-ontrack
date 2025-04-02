<template>
	<a :href="`#${PageName.PROGRESS}`" class="text-sm" @click="navigate(v.PROGRESS)">
		<span v-if="percentage < HUNDRED_PERCENT" class="flex items-center gap-1">
			Progress:
			<span class="font-mono">{{ percentage }}%</span>
			<span :class="`h-3 w-3 rounded-full ${colorClass}`" />
		</span>
		<span v-else class="flex items-center gap-1">
			Day complete!
			<BaseIcon :name="IconNameType.CHECK_CIRCLE" class="h-7 text-green-500" />
		</span>
	</a>
</template>

<script setup lang="ts">
	import BaseIcon from '@/components/base/BaseIcon.vue';

	import { navigate } from '@/modules/router';
	import { PageName, IconNameType } from '@/types';
	import { useTotalProgress } from '@/composables/total-progress';
	import { HUNDRED_PERCENT } from '@/constants/percentages';

	const { colorClass, percentage } = useTotalProgress();
</script>
