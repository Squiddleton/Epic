import { EpicAuthManager } from './auth.js';
import { EpicEndpoints } from './endpoints.js';
import type { BaseEpicFriend, EpicFriend, EpicFriendWithNote, EpicFriendsExternalSettings, EpicFriendsExternalSource, EpicFriendsSettings, EpicFriendsSummary, EpicFriendsType, EpicSuggestedFriend } from './types.js';

export class EpicFriendManager {
	auth: EpicAuthManager;
	constructor(auth: EpicAuthManager) {
		this.auth = auth;
	}
	#getType<ResType>(type: EpicFriendsType) {
		return this.auth.get<ResType>(EpicEndpoints.Friends(this.auth.getAccountId(), type));
	}
	addFriend(friendId: string, accountId = this.auth.getAccountId()) {
		return this.auth.method(
			'POST',
			EpicEndpoints.Friend(accountId, friendId),
			{},
			{ returnRes: false }
		);
	}
	bulkAcceptIncoming(targetIds: string[], accountId = this.auth.getAccountId()) {
		return this.auth.method(
			'POST',
			EpicEndpoints.BulkAcceptIncoming(accountId, targetIds),
			{}
		);
	}
	editExternalSettings(source: EpicFriendsExternalSource, doNotShowLinkingProposal: boolean, accountId = this.auth.getAccountId()) {
		return this.auth.method<EpicFriendsExternalSettings>(
			'PUT',
			EpicEndpoints.FriendsExternalSettings(accountId, source),
			{ doNotShowLinkingProposal }
		);
	}
	editSettings(settings: Partial<EpicFriendsSettings>, accountId = this.auth.getAccountId()) {
		return this.auth.method<EpicFriendsSettings>(
			'PATCH',
			EpicEndpoints.FriendsSettings(accountId),
			settings
		);
	}
	getBlocklist(accountId = this.auth.getAccountId()) {
		return this.auth.get<BaseEpicFriend[]>(EpicEndpoints.Blocklist(accountId));
	}
	getExternalSettings(source: EpicFriendsExternalSource, accountId = this.auth.getAccountId()) {
		return this.auth.get<EpicFriendsExternalSettings>(EpicEndpoints.FriendsExternalSettings(accountId, source));
	}
	getFriends() {
		return this.#getType<EpicFriendWithNote[]>('friends');
	}
	getIncoming() {
		return this.#getType<EpicFriend[]>('incoming');
	}
	getOutgoing() {
		return this.#getType<EpicFriend[]>('outgoing');
	}
	getSettings(accountId = this.auth.getAccountId()) {
		return this.auth.get<EpicFriendsSettings>(EpicEndpoints.FriendsSettings(accountId));
	}
	getSuggested() {
		return this.#getType<EpicSuggestedFriend[]>('suggested');
	}
	getSummary() {
		return this.#getType<EpicFriendsSummary>('summary');
	}
	removeFriend(friendId: string, accountId = this.auth.getAccountId()) {
		return this.auth.method(
			'DELETE',
			EpicEndpoints.Friend(accountId, friendId),
			{},
			{ returnRes: false }
		);
	}
	removeNickname(friendId: string, accountId = this.auth.getAccountId()) {
		return this.auth.method(
			'DELETE',
			EpicEndpoints.FriendAlias(accountId, friendId),
			{},
			{ returnRes: false }
		);
	}
}