import { EpicEndpoints } from './endpoints.js';
import { EpicAPIError } from './error.js';
import type { AnyGrant, DeviceAuthResponse, EpicAuthResponse, EpicVerifyAuthResponse, EpicVerifyAuthResponseWithPerms, FetchOptions, InternalCredentials } from './types.js';
import { FortniteGameClient } from './util.js';

export class EpicAuthManager {
	accountId: string | null = null;
	autoRefresh: boolean;
	gameClient: string = FortniteGameClient.IOS;
	reauthenticate: boolean;
	#credentials: InternalCredentials | null = null;
	#lastGrant: AnyGrant = { grant_type: 'client_credentials' };
	constructor(autoRefresh: boolean, reauthenticate: boolean, gameClient?: string) {
		this.autoRefresh = autoRefresh;
		if (gameClient !== undefined) this.gameClient = gameClient;
		this.reauthenticate = reauthenticate;
	}
	#editCredentials(accessTokenResponse: EpicAuthResponse) {
		this.accountId = accessTokenResponse.account_id;
		this.#credentials = {
			accessToken: accessTokenResponse.access_token,
			accessExpiresAt: new Date(accessTokenResponse.expires_at).getTime(),
			refreshToken: accessTokenResponse.refresh_token,
			refreshExpiresAt: new Date(accessTokenResponse.refresh_expires_at).getTime()
		};
		return this.#credentials;
	}
	#fetch(url: string, init: RequestInit, returnRes: false): Promise<number>;
	#fetch<ResType = unknown>(url: string, init: RequestInit, returnRes?: boolean): Promise<ResType>;
	async #fetch<ResType = unknown>(url: string, init: RequestInit, returnRes = true) {
		if (this.#credentials !== null) {
			const now = Date.now();
			if (now > this.#credentials.accessExpiresAt) {
				if (now > this.#credentials.refreshExpiresAt) {
					if (this.reauthenticate) {
						const res = await this.authenticate(this.#lastGrant);
						this.#editCredentials(res);
					}
					else {
						throw new Error('The Epic access token and refresh token have both expired. Please login with new credentials.');
					}
				}
				const res = await this.authenticate({
					grant_type: 'refresh_token',
					refresh_token: this.#credentials.refreshToken
				});
				this.#editCredentials(res);
			}
		}

		const res = await fetch(url, init);
		if (!returnRes) return res.status;

		if (res.ok) {
			const returned: ResType = await res.json();
			return returned;
		}
		else {
			const rawText = await res.text();
			throw new EpicAPIError(res, rawText, url);
		}
	}
	async authenticate(grant: AnyGrant) {
		const res = await this.get<EpicAuthResponse>(
			EpicEndpoints.AccessToken(),
			{
				method: 'POST',
				headers: {
					Authorization: `basic ${this.gameClient}`
				},
				body: new URLSearchParams({ ...grant })
			}
		);

		this.#lastGrant = grant;
		this.#editCredentials(res);

		if (this.autoRefresh) {
			setTimeout(async () => {
				await this.authenticate({
					grant_type: 'refresh_token',
					refresh_token: res.refresh_token
				});
			}, res.expires_in * 1000);
		}

		return res;
	}
	get<ResType>(url: string, init?: RequestInit) {
		if (init !== undefined) return this.#fetch<ResType>(url, init);

		EpicAuthManager.validateCredentials(this.#credentials);
		return this.#fetch<ResType>(
			url,
			{
				headers: {
					Authorization: `bearer ${this.#credentials.accessToken}`
				}
			}
		);
	}
	getAccountId() {
		if (this.accountId === null) throw new Error('The Epic client has not logged in, and its account id is not accessible.');
		return this.accountId;
	}
	getDeviceAuth(accountId: string, accessToken: string) {
		return this.get<DeviceAuthResponse>(
			EpicEndpoints.DeviceAuth(accountId),
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}` // TODO: try lowercase bearer
				}
			}
		);
	}
	method<ResType>(method: 'PATCH' | 'PUT' | 'POST' | 'DELETE', url: string, body: unknown, options?: FetchOptions): Promise<ResType>;
	method(method: 'PATCH' | 'PUT' | 'POST' | 'DELETE', url: string, body: unknown, options: FetchOptions & { returnRes: false }): Promise<number>;
	method<ResType>(method: 'PATCH' | 'PUT' | 'POST' | 'DELETE', url: string, body: unknown, options: FetchOptions = {}) {
		EpicAuthManager.validateCredentials(this.#credentials);

		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
			Authorization: `bearer ${this.#credentials.accessToken}`
		};
		if (options.extraHeaders !== undefined) {
			for (const header in options.extraHeaders) headers[header] = options.extraHeaders[header];
		}

		return this.#fetch<ResType>(
			url,
			{
				method,
				headers,
				body: JSON.stringify(body)
			},
			options.returnRes
		);
	}
	verify(includePerms: true): Promise<EpicVerifyAuthResponseWithPerms>;
	verify(includePerms?: boolean): Promise<EpicVerifyAuthResponse>;
	verify(includePerms?: boolean) {
		return this.get(EpicEndpoints.Verify(includePerms));
	}
	static validateCredentials(credentials: InternalCredentials | null): asserts credentials is InternalCredentials {
		if (credentials === null) throw new Error('The Epic client has not logged in, and its credentials are not accessible.');
	}
}