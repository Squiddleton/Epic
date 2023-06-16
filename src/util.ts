export enum FortniteGameClient {
	IOS = 'MzQ0NmNkNzI2OTRjNGE0NDg1ZDgxYjc3YWRiYjIxNDE6OTIwOWQ0YTVlMjVhNDU3ZmI5YjA3NDg5ZDMxM2I0MWE='
}

export const getBattlePassLevels = (length: number) =>
	Array
		.from({ length }, (v, k) => k + 1)
		.map(seasonNumber => `s${seasonNumber}_social_bp_level`)
		.slice(10);