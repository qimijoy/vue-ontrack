import { createApp } from 'vue';
import App from '@/App.vue';

import { loadState, saveState } from '@/modules/storage';

// STYLES
import '@/assets/styles/main.less';

// APPLICATION STATE
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
