const noRunningDev = (cb) => process.env.NODE_ENV == ! 'dev' ? cb : null;

module.exports = {
	plugins: [
		require('postcss-preset-env')({
			stage: 3,
			features: {
				'not-pseudo-class': true,
				'focus-within-pseudo-class': true,
				'matches-pseudo-class': true,
				'place-properties': true,
				'rebeccapurple-color': true,
			},
			autoprefixer: { grid: true }
		}),
		noRunningDev(require('cssnano'))
	]
}