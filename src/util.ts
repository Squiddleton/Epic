export enum FortniteGameClient {
	ANDROID = 'M2Y2OWU1NmM3NjQ5NDkyYzhjYzI5ZjFhZjA4YThhMTI6YjUxZWU5Y2IxMjIzNGY1MGE2OWVmYTY3ZWY1MzgxMmU='
}

export const getBattlePassLevels = (length: number) =>
	Array
		.from({ length }, (v, k) => k + 1)
		.map(seasonNumber => `s${seasonNumber}_social_bp_level`)
		.slice(10);