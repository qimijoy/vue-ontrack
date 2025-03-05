import primaryConfig from '@qimijoy/prettier-config/configs/primary.js';

export default {
	...primaryConfig,

	// Formatting the tailwind classes order
	plugins: ['prettier-plugin-tailwindcss'],
};
