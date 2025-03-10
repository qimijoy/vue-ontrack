<template>
	<nav class="sticky bottom-0 z-10 bg-white">
		<ul class="flex items-center justify-around border-t">
			<li class="flex-1">
				<a class="flex flex-col items-center p-2 text-xs capitalize" href="#timeline">
					<ClockIcon class="h-6 w-6" />
					<span>timeline</span>
				</a>
			</li>
			<li class="flex-1">
				<a class="flex flex-col items-center p-2 text-xs capitalize" href="#activities">
					<ListBulletIcon class="h-6 w-6" />
					<span>activities</span>
				</a>
			</li>
			<li class="flex-1">
				<a class="flex flex-col items-center p-2 text-xs capitalize" href="#pregress">
					<ChartBarIcon class="h-6 w-6" />
					<span>progress</span>
				</a>
			</li>
		</ul>
	</nav>
</template>

<script setup>
	import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline';
</script>
