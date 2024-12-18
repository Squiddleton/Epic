# Node.js Epic Games API Wrapper

A Node.js wrapper for the official Epic Games API, written in TypeScript.

Because the API is undocumented, some types may be incorrect or missing. Please open an issue or submit a pull request if such an error is found.

## Usage

Node.js v18.0.0 or higher is required due to the use of the Fetch API.

First, install the package by running the following command in your terminal:

```sh-session
npm install @squiddleton/epic
```

All functionality is performed via the `EpicClient` class. All properties and methods are typed, so refer to the typings in [src/types.ts](src/types.ts) or via intellisense.

## Examples

### Basic Function Calls

```js
const { EpicClient } = require('@squiddleton/epic');
const grant = require('./grant.json');

const epicClient = new EpicClient();

epicClient.auth.authenticate(grant)
	.then(async loginResponse => {
		console.log(`Authenticated with the account ${loginResponse.displayName}`);

		const friends = await epicClient.friends.getFriends();
		console.log(`You have ${friends.length} friends`);

		await epicClient.fortnite.postMCPOperation(
			'ClaimLoginReward',
			'campaign'
		);
		console.log('Your Save the World daily login reward has been claimed');

		const timeline = await epicClient.fortnite.getTimeline();
		console.log('The current shop tab ids are:', Object.keys(timeline.channels['client-events'].states[0].state.sectionStoreEnds));
	});
```

### First Time Authenticating

Getting an authentication grant often appears more difficult than it is. A recommended flow is to get a temporary access token using the `authorization_code` grant, use that token to generate semi-permanent device auth credentials, and pass those credentials into the `device_auth` grant.

In your browser, go to https://www.epicgames.com and log in. Then, visiting the following link will return a JSON object with an authorization code: https://www.epicgames.com/id/api/redirect?clientId=3f69e56c7649492c8cc29f1af08a8a12&responseType=code

Note that this authorization code can expire very quickly, so the following methods should be called as soon as you have visited the link.

```js
const { EpicClient } = require('@squiddleton/epic');
const { writeFileSync } = require('node:fs');

const client = new EpicClient();

client.auth.authenticate({ grant_type: 'authorization_code', code: 'PASTE YOUR AUTHORIZATION CODE HERE' })
	.then(async loginResponse => {
		const deviceAuthResponse = await client.auth.getDeviceAuth(loginResponse.account_id, loginResponse.access_token);
		const deviceAuthGrant = {
			grant_type: 'device_auth',
			account_id: deviceAuthResponse.accountId,
			device_id: deviceAuthResponse.deviceId,
			secret: deviceAuthResponse.secret
		};
		writeFileSync('./deviceAuthGrant.json', JSON.stringify(deviceAuthGrant));
	});
```

Now, you can use the object at `./deviceAuthGrant.json` as your client's grant.

### Refreshing Access Token

By default, access tokens expire after about two hours. If you only authenticate once and make an API call after the token has expired, an error will be thrown. The `autoRefresh` option when constructing an `EpicClient` instance will internally reauthenticate with the `refresh_token` grant type once the access token has expired.

```js
const client = new EpicClient({ autoRefresh: true });

// Everything else is normal! 
client.auth.authenticate(grant);
```

# Credits
All of the endpoints found for this wrapper were first discovered by the repositories of [MixV2](https://github.com/MixV2/EpicResearch) and [LeleDerGrasshalmi](https://github.com/LeleDerGrasshalmi/FortniteEndpointsDocumentation). This wrapper is not affiliated with Epic Games nor the aforementioned GitHub users.