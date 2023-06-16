import { EpicAuthManager } from './auth.js';
import { EpicEndpoints } from './endpoints.js';
import type { BRInventory, EpicCollectionCategory, EpicFriendCode, EpicFriendCodeType, EpicMCPProfileId, EpicMCPRoute, EpicReceipt, EpicStats, GetBulkStatsOptions, GetTrackProgressOptions, HabaneroTrackProgress, LongHabaneroTrack, STWWorldInfo, ShortHabaneroTrack, StorefrontCatalog, Timeline } from './types.js';
import { getBattlePassLevels } from './util.js';

export class FortniteManager {
	auth: EpicAuthManager;
	seasonsLength: number;
	constructor(auth: EpicAuthManager, seasonsLength = 25) {
		this.auth = auth;
		this.seasonsLength = seasonsLength;
	}
	getBRInventory(accountId = this.auth.getAccountId()) {
		return this.auth.get<BRInventory>(EpicEndpoints.BRInventory(accountId));
	}
	getBulkStats(options: GetBulkStatsOptions = {}) {
		const accountIds = options.accountIds ?? [this.auth.getAccountId()];
		const stats = options.stats ?? getBattlePassLevels(this.seasonsLength);
		if (stats.length === 0) throw new TypeError('At least one stat must be included.');

		return this.auth.method<EpicStats[]>(
			'POST',
			EpicEndpoints.BulkStats(),
			{
				appId: 'fortnite',
				startDate: 0,
				endDate: 0,
				owners: accountIds,
				stats
			}
		);
	}
	getCatalog() {
		return this.auth.get<StorefrontCatalog>(EpicEndpoints.Catalog());
	}
	getCollection(collection: EpicCollectionCategory, accountIds?: string[]) {
		accountIds ??= [this.auth.getAccountId()];

		return this.auth.method<EpicStats[]>(
			'POST',
			EpicEndpoints.BulkStats(collection),
			{
				appId: 'fortnite',
				startDate: 0,
				endDate: 0,
				owners: accountIds
			}
		);
	}
	getEnabledFeatures() {
		return this.auth.get<unknown[]>(EpicEndpoints.EnabledFeatures());
	}
	getFriendCodes(codeType: EpicFriendCodeType, accountId = this.auth.getAccountId()) {
		return this.auth.get<EpicFriendCode[]>(EpicEndpoints.FriendCodes(accountId, codeType));
	}
	getKeychain() {
		return this.auth.get<string[]>(EpicEndpoints.Keychain());
	}
	getReceipts(accountId = this.auth.getAccountId()) {
		return this.auth.get<EpicReceipt[]>(EpicEndpoints.Receipts(accountId));
	}
	getStats(accountId = this.auth.getAccountId()) {
		return this.auth.get<EpicStats>(EpicEndpoints.Stats(accountId));
	}
	getSTWWorldInfo() {
		return this.auth.get<STWWorldInfo>(EpicEndpoints.STWWorldInfo());
	}
	getTimeline() {
		return this.auth.get<Timeline>(EpicEndpoints.Timeline());
	}
	getTrack(trackguid: string) {
		return this.auth.get<LongHabaneroTrack>(EpicEndpoints.Track('fortnite', trackguid));
	}
	getTracks() {
		return this.auth.get<ShortHabaneroTrack[]>(EpicEndpoints.TracksQuery('fortnite'));
	}
	getTrackProgress(options: GetTrackProgressOptions & { trackguid: string }): Promise<HabaneroTrackProgress>;
	getTrackProgress(options?: GetTrackProgressOptions): Promise<HabaneroTrackProgress[]>;
	getTrackProgress(options: GetTrackProgressOptions = {}) {
		const { accountId = this.auth.getAccountId(), trackguid } = options;
		return trackguid === undefined
			? this.auth.get<HabaneroTrackProgress[]>(EpicEndpoints.TracksProgress('fortnite', accountId))
			: this.auth.get<HabaneroTrackProgress>(EpicEndpoints.TrackProgress('fortnite', accountId, trackguid));
	}
	postMCPOperation(operation: string, profileId: EpicMCPProfileId, payload: Record<string, string> = {}, route: EpicMCPRoute = 'client', accountId = this.auth.getAccountId()) {
		return this.auth.method(
			'POST',
			EpicEndpoints.MCP(accountId, operation, route, profileId),
			payload
		);
	}
}