import { createApp } from 'vue';
import App from '@/App.vue';

import { syncState } from '@/modules/storage';
import { startCurrentDateTimer } from '@/modules/time';

// STYLES
import '@/assets/styles/main.less';

startCurrentDateTimer();

// APPLICATION STATE
syncState();

// Unactive tab or closing the apllication
document.addEventListener('visibilitychange', () => {
	syncState(document.visibilityState === 'visible');
});

// APPLICATION
const app = createApp(App);

app.mount('#vue-ontrack');
