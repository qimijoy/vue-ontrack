import { createApp } from 'vue';
import App from '@/App.vue';

// STYLES
import '@/assets/styles/main.less';

// APPLICATION
const app = createApp(App);

app.mount('#vue-ontrack');
