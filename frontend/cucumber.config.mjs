export default {
	default: {
		import: [
			'src/features/step-definitions/**/*.ts', // Use --import instead of --require
		],
		paths: ['src/features/**/*.feature'],
		format: ['@cucumber/html-formatter:cucumber-report.html'],
		requireModule: ['ts-node/esm'],
		publishQuiet: true,
		timeout: 30000,
	},
};
