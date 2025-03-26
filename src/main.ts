import { createApp } from 'vue';
import App from '@/App.vue';

import { syncState } from '@/modules/storage';

// STYLES
import '@/assets/styles/main.less';

// APPLICATION STATE
syncState();

// Unactive tab or closing the apllication
document.addEventListener('visibilitychange', () => {
	syncState(document.visibilityState === 'visible');
});

// APPLICATION
const app = createApp(App);

app.mount('#vue-ontrack');
