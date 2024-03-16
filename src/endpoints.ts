import type { EpicCollectionCategory, EpicExternalAuthQueryType, EpicFriendCodeType, EpicFriendsExternalSource, EpicFriendsType, EpicMCPProfileId, EpicMCPRoute, EpicStatsTimeWindow, HabaneroNamespace } from './types.js';

export const EpicEndpoints = {
	AccessToken() {
		return 'https://account-public-service-prod.ol.epicgames.com/account/api/oauth/token';
	},
	AccountByDisplayName(displayName: string) {
		return `https://account-public-service-prod.ol.epicgames.com/account/api/public/account/displayName/${displayName}`;
	},
	AccountByExternalDisplayName(displayName: string, externalAuthType: EpicExternalAuthQueryType) {
		return `https://account-public-service-prod.ol.epicgames.com/account/api/public/account/lookup/externalAuth/${externalAuthType}/displayName/${displayName}?caseInsensitive=true`;
	},
	AccountById(accountId: string) {
		return `https://account-public-service-prod.ol.epicgames.com/account/api/public/account/${accountId}`;
	},
	Blocklist(accountId: string) {
		return `https://friends-public-service-prod.ol.epicgames.com/friends/api/v1/${accountId}/blocklist`;
	},
	BRInventory(accountId: string) {
		return `https://fngw-mcp-gc-livefn.ol.epicgames.com/fortnite/api/game/v2/br-inventory/account/${accountId}`;
	},
	BulkAcceptIncoming(accountId: string, targetIds: string[]) {
		return `https://friends-public-service-prod.ol.epicgames.com/friends/api/v1/${accountId}/incoming/accept?targetIds=${targetIds.join(',')}`;
	},
	BulkStats(category?: EpicCollectionCategory) {
		return `https://statsproxy-public-service-live.ol.epicgames.com/statsproxy/api/statsv2/query${category !== undefined ? `?category=collection_${category}` : ''}`;
	},
	Catalog() {
		return 'https://fngw-mcp-gc-livefn.ol.epicgames.com/fortnite/api/storefront/v2/catalog';
	},
	CreatorPage(creatorAccountId: string, playerId: string, limit: number) {
		return `https://fn-service-discovery-live-public.ogs.live.on.epicgames.com/api/v1/creator/page/${creatorAccountId}?playerId=${playerId}&limit=${limit}`;
	},
	DeviceAuth(accountId: string) {
		return `https://account-public-service-prod.ol.epicgames.com/account/api/public/account/${accountId}/deviceAuth`;
	},
	DiscoveryFavorite(accountId: string, linkCode: string) {
		return `${this.DiscoveryFavorites(accountId)}/${linkCode}`;
	},
	DiscoveryFavorites(accountId: string) {
		return `https://fn-service-discovery-live-public.ogs.live.on.epicgames.com/api/v1/links/favorites/${accountId}`;
	},
	DiscoveryFavoritesCheck(accountId: string) {
		return `${this.DiscoveryFavorites(accountId)}/check`;
	},
	DiscoveryHistory(accountId: string, limitOrLinkCode?: number | string) {
		return `https://fn-service-discovery-live-public.ogs.live.on.epicgames.com/api/v1/links/history/${accountId}${typeof limitOrLinkCode === 'string' ? `/${limitOrLinkCode}` : ''}${typeof limitOrLinkCode === 'number' ? `?limit=${limitOrLinkCode}` : ''}`;
	},
	DiscoverySurface(accountId: string, appId: string) {
		return `https://fn-service-discovery-live-public.ogs.live.on.epicgames.com/api/v1/discovery/surface/${accountId}?appId=${appId}`;
	},
	EnabledFeatures() {
		return 'https://fngw-mcp-gc-livefn.ol.epicgames.com/fortnite/api/game/v2/enabled_features';
	},
	Friend(accountId: string, friendId: string) {
		return `https://friends-public-service-prod.ol.epicgames.com/friends/api/v1/${accountId}/friends/${friendId}`;
	},
	FriendAlias(accountId: string, friendId: string) {
		return `${this.Friend(accountId, friendId)}/alias`;
	},
	FriendCodes(accountId: string, codeType: EpicFriendCodeType) {
		return `https://fngw-mcp-gc-livefn.ol.epicgames.com/fortnite/api/game/v2/friendcodes/${accountId}/${codeType}`;
	},
	FriendNote(accountId: string, friendId: string) {
		return `${this.Friend(accountId, friendId)}/note`;
	},
	Friends(accountId: string, type: EpicFriendsType) {
		return `https://friends-public-service-prod.ol.epicgames.com/friends/api/v1/${accountId}/${type}`;
	},
	FriendsExternalSettings(accountId: string, source: EpicFriendsExternalSource) {
		return `https://friends-public-service-prod06.ol.epicgames.com/friends/api/v1/${accountId}/settings/externalSources/${source}`;
	},
	FriendsSettings(accountId: string) {
		return `https://friends-public-service-prod.ol.epicgames.com/friends/api/v1/${accountId}/settings`;
	},
	Keychain() {
		return 'https://fngw-mcp-gc-livefn.ol.epicgames.com/fortnite/api/storefront/v2/keychain';
	},
	MCP(accountId: string, operation: string, route: EpicMCPRoute, profileId: EpicMCPProfileId) {
		return `https://fngw-mcp-gc-livefn.ol.epicgames.com/fortnite/api/game/v2/profile/${accountId}/${route}/${operation}?profileId=${profileId}&rvn=-1`;
	},
	Receipts(accountId: string) {
		return `https://fngw-mcp-gc-livefn.ol.epicgames.com/fortnite/api/receipts/v1/account/${accountId}/receipts`;
	},
	Stats(accountId: string, timeWindow: EpicStatsTimeWindow) {
		const init: Record<string, string> = {};
		Object.entries(timeWindow).forEach(([k, v]) => init[k] = v.toString());
		const queryParams = new URLSearchParams(init).toString();
		return `https://statsproxy-public-service-live.ol.epicgames.com/statsproxy/api/statsv2/account/${accountId}${queryParams === '' ? '' : `?${queryParams}`}`;
	},
	STWWorldInfo() {
		return 'https://fngw-mcp-gc-livefn.ol.epicgames.com/fortnite/api/game/v2/world/info';
	},
	Timeline() {
		return 'https://fngw-mcp-gc-livefn.ol.epicgames.com/fortnite/api/calendar/v1/timeline';
	},
	Track(namespace: HabaneroNamespace, trackguid: string) {
		return `https://fn-service-habanero-live-public.ogs.live.on.epicgames.com/api/v1/games/${namespace}/tracks/${trackguid}`;
	},
	TrackProgress(namespace: HabaneroNamespace, accountId: string, trackguid: string) {
		return `https://fn-service-habanero-live-public.ogs.live.on.epicgames.com/api/v1/games/${namespace}/trackprogress/${accountId}/byTrack/${trackguid}`;
	},
	TracksProgress(namespace: string, accountId: string) {
		return `https://fn-service-habanero-live-public.ogs.live.on.epicgames.com/api/v1/games/${namespace}/trackprogress/${accountId}`;
	},
	TracksQuery(namespace: string) {
		return `https://fn-service-habanero-live-public.ogs.live.on.epicgames.com/api/v1/games/${namespace}/tracks/query`;
	},
	Verify(includePerms?: boolean) {
		return `https://account-public-service-prod.ol.epicgames.com/account/api/oauth/verify${includePerms !== undefined ? `?includePerms=${includePerms}` : ''}`;
	}
};