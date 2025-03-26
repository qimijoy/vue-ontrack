import { createApp } from 'vue';
import App from '@/App.vue';

import * as storage from '@/modules/storage';
import { activities } from '@/modules/activities';
import { timelineItems } from '@/modules/timelineItems';

// STYLES
import '@/assets/styles/main.less';

// APPLICATION STATE
const loadState = () => {
	const state = storage.load();

	timelineItems.value = state.timelineItems;
	activities.value = state.activities;
};

const saveState = () => {
	storage.save({
		timelineItems: timelineItems.value,
		activities: activities.value,
	});
};

loadState();

// Unactive tab or closing the apllication
document.addEventListener('visibilitychange', () => {
	if (document.visibilityState === 'visible') {
		loadState();
	} else {
		saveState();
	}
});

// APPLICATION
const app = createApp(App);

app.mount('#vue-ontrack');
