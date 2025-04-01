import type { Component } from 'vue';

import { IconNameType } from '@/types';

import {
	CheckCircleIcon as CheckCircle,
	ListBulletIcon as ListBullet,
	ArrowPathIcon as ArrowPath,
	ChartBarIcon as ChartBar,
	ClockIcon as Clock,
	TrashIcon as Trash,
	XMarkIcon as XMark,
	PauseIcon as Pause,
	PlayIcon as Play,
	PlusIcon as Plus,
} from '@heroicons/vue/24/outline';

export const ICONS: Record<IconNameType, Component> = {
	[IconNameType.CHECK_CIRCLE]: CheckCircle,
	[IconNameType.LIST_BULLET]: ListBullet,
	[IconNameType.ARROW_PATH]: ArrowPath,
	[IconNameType.CHART_BAR]: ChartBar,
	[IconNameType.CLOCK]: Clock,
	[IconNameType.TRASH]: Trash,
	[IconNameType.X_MARK]: XMark,
	[IconNameType.PAUSE]: Pause,
	[IconNameType.PLAY]: Play,
	[IconNameType.PLUS]: Plus,
};
