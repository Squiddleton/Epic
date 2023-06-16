import type { EpicAuthManager } from './auth.js';
import { EpicEndpoints } from './endpoints.js';
import type { DiscoveryCreatorPage, DiscoveryFrontendOptions, DiscoveryHistory, DiscoveryResult, DiscoverySurface, FavoriteDiscoveryResult } from './types.js';

export class EpicDiscoveryManager {
	auth: EpicAuthManager;
	constructor(auth: EpicAuthManager) {
		this.auth = auth;
	}
	addFavorite(linkCode: string, accountId = this.auth.getAccountId()) {
		return this.auth.method(
			'POST',
			EpicEndpoints.DiscoveryFavorite(accountId, linkCode),
			{},
			{ returnRes: false }
		);
	}
	addToHistory(linkCode: string, accountId = this.auth.getAccountId()) {
		return this.auth.method(
			'POST',
			EpicEndpoints.DiscoveryHistory(accountId, linkCode),
			{},
			{ returnRes: false }
		);
	}
	checkFavorites(linkCodes: string[], accountId = this.auth.getAccountId()) {
		return this.auth.method<DiscoveryHistory<FavoriteDiscoveryResult>>(
			'POST',
			EpicEndpoints.DiscoveryFavoritesCheck(accountId),
			{ linkCodes }
		);
	}
	getCreatorPage(creatorAccountId: string, accountId = this.auth.getAccountId()) {
		return this.auth.get<DiscoveryCreatorPage>(EpicEndpoints.CreatorPage(creatorAccountId, accountId, 100));
	}
	getFavorites(accountId = this.auth.getAccountId()) {
		return this.auth.get<DiscoveryHistory<FavoriteDiscoveryResult>>(EpicEndpoints.DiscoveryFavorites(accountId));
	}
	getFrontend(options: DiscoveryFrontendOptions, accountId?: string) {
		const selfAccountId = this.auth.getAccountId();

		return this.auth.method<DiscoverySurface>(
			'POST',
			EpicEndpoints.DiscoverySurface(accountId ?? selfAccountId, 'Fortnite'),
			{
				surfaceName: 'CreativeDiscoverySurface_Frontend',
				revision: -1,
				partyMemberIds: options.partyMemberIds === 'self' ? [selfAccountId] : options.partyMemberIds,
				matchmakingRegion: options.matchmakingRegion,
				isCabined: false,
				platform: options.platform
			},
			{
				extraHeaders: {
					'User-Agent': `Fortnite/++Fortnite+Release-${options.fortniteVersion}-CL-18163738 Windows/10`
				}
			}
		);
	}
	getHistory(limit?: number, accountId = this.auth.getAccountId()) {
		return this.auth.get<DiscoveryHistory<DiscoveryResult>>(EpicEndpoints.DiscoveryHistory(accountId, limit));
	}
	removeFavorite(linkCode: string, accountId = this.auth.getAccountId()) {
		return this.auth.method(
			'DELETE',
			EpicEndpoints.DiscoveryFavorite(accountId, linkCode),
			{},
			{ returnRes: false }
		);
	}
	removeFromHistory(linkCode: string, accountId = this.auth.getAccountId()) {
		return this.auth.method(
			'DELETE',
			EpicEndpoints.DiscoveryHistory(accountId, linkCode),
			{},
			{ returnRes: false }
		);
	}
}