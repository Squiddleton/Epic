import { EpicAuthManager } from './auth.js';
import { EpicDiscoveryManager } from './discovery.js';
import { EpicEndpoints } from './endpoints.js';
import { FortniteManager } from './fortnite.js';
import { EpicFriendManager } from './friends.js';
import type { AnyExternalEpicAccount, AnyInternalEpicAccount, EpicClientOptions, EpicExternalAuthQueryType, SelfInternalEpicAccount } from './types.js';

export class EpicClient {
	auth: EpicAuthManager;
	discovery: EpicDiscoveryManager;
	fortnite: FortniteManager;
	friends: EpicFriendManager;
	constructor(options: EpicClientOptions = {}) {
		this.auth = new EpicAuthManager(options.autoRefresh ?? false, options.gameClient);
		this.discovery = new EpicDiscoveryManager(this.auth);
		this.fortnite = new FortniteManager(this.auth, options.seasonsLength);
		this.friends = new EpicFriendManager(this.auth);
	}
	getAccountByDisplayName(displayName: string): Promise<AnyInternalEpicAccount>;
	getAccountByDisplayName(displayName: string, externalAuthType?: EpicExternalAuthQueryType): Promise<AnyExternalEpicAccount[]>;
	getAccountByDisplayName(displayName: string, externalAuthType?: EpicExternalAuthQueryType) {
		return externalAuthType !== undefined
			? this.auth.get(EpicEndpoints.AccountByExternalDisplayName(displayName, externalAuthType))
			: this.auth.get(EpicEndpoints.AccountByDisplayName(displayName));
	}
	getAccountById(): Promise<SelfInternalEpicAccount>;
	getAccountById(accountId: string): Promise<AnyInternalEpicAccount>;
	getAccountById(accountId = this.auth.getAccountId()) {
		return this.auth.get<AnyInternalEpicAccount>(EpicEndpoints.AccountById(accountId));
	}
}