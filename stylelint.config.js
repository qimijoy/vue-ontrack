import primaryRules from '@qimijoy/stylelint-config/configs/primary.js';
import tailwindcssConfigRules from 'stylelint-config-tailwindcss';

export default {
	ignoreFiles: ['**/node_modules/**', '**/dist/**'],

	extends: ['stylelint-config-standard', 'stylelint-config-standard-less'],

	plugins: [
		'stylelint-prettier',
		'stylelint-declaration-block-no-ignored-properties',
		'stylelint-order',
		'stylelint-no-unsupported-browser-features',
	],

	defaultSeverity: 'error',

	reportDescriptionlessDisables: true,
	reportInvalidScopeDisables: true,
	reportNeedlessDisables: true,
	configurationComment: 'stylelint', // --> /* stylelint-disable */
	ignoreDisables: true,

	overrides: [
		{
			files: ['**/*.less'],
			customSyntax: 'postcss-less',
		},
		{
			files: ['**/*.vue'],
			extends: ['stylelint-config-standard-vue'],
		},
	],

	rules: {
		...primaryRules.rules,
		...tailwindcssConfigRules.rules,
		'at-rule-allowed-list': ['media', 'font-face', 'import', 'extend', 'keyframes', 'tailwind'], // for tailwind
	},
};
