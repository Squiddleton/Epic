// Public Wrapper Options

export interface EpicClientOptions {
	autoRefresh?: boolean;
	gameClient?: string;
	seasonsLength?: number;
}

export interface GetBulkStatsOptions {
	accountIds?: string[];
	stats?: string[];
}

export interface GetTrackProgressOptions {
	accountId?: string;
	trackguid?: string;
}

// Private Wrapper Options

export interface InternalCredentials {
	accessToken: string;
	accessExpiresAt: number;
	refreshToken: string;
	refreshExpiresAt: number;
}

export interface FetchOptions {
	returnRes?: boolean;
	extraHeaders?: Record<string, string>;
}

// Accounts

export interface BaseEpicAccount {
	id: string;
	displayName: string;
}

export interface BaseSelfEpicAccount extends BaseEpicAccount {
	minorVerified: boolean;
	minorStatus: string;
	cabinedMode: boolean;
}

export type EpicExternalAuthQueryType = 'steam' | 'github' | 'twitch' | 'xbl' | 'psn' | 'nintendo';

export type EpicExternalAuthType = EpicExternalAuthQueryType | 'google';

export interface EpicExternalAuthId {
	id: string;
	type: string;
}

export interface EpicExternalAuth {
	accountId: string;
	type: EpicExternalAuthType;
	externalAuthId: string;
	externalAuthIdType: string;
	externalAuthSecondaryId?: string;
	externalDisplayName?: string;
	avatar?: string;
	authIds: EpicExternalAuthId[];
}

export interface SelfExternalEpicAccount extends BaseSelfEpicAccount {
	externalAuths: Partial<Record<string, EpicExternalAuth>>;
}

export interface SelfInternalEpicAccount extends BaseSelfEpicAccount {
	name: string;
	email: string;
	failedLoginAttempts: number;
	lastLogin: string;
	numberOfDisplayNameChanges: number;
	dateOfBirth: string;
	headless: boolean;
	country: string;
	lastName: string;
	phoneNumber: string;
	preferredLanguage: string;
	canUpdateDisplayName: boolean;
	tfaEnabled: boolean;
	emailVerified: boolean;
	minorExpected: boolean;
	hasHashedEmail: boolean;
}

export interface NonSelfEpicAccount extends BaseEpicAccount {
	links?: Partial<Record<string, unknown>>;
	externalAuths: Partial<Record<string, EpicExternalAuth>>;
}

export type AnyInternalEpicAccount = SelfInternalEpicAccount | NonSelfEpicAccount;

export type AnyExternalEpicAccount = SelfExternalEpicAccount | NonSelfEpicAccount;

export interface BRInventoryStash {
	globalcash: number;
}

export interface BRInventory {
	stash: BRInventoryStash;
}

// Authentication

export interface AuthorizationCodeGrant {
	grant_type: 'authorization_code';
	code: string;
}

export interface ClientCredentialsGrant {
	grant_type: 'client_credentials';
}

export interface ContinuationTokenGrant {
	grant_type: 'continuation_token';
	continuation_token: string;
}

export interface DeviceAuthGrant {
	grant_type: 'device_auth';
	account_id: string;
	device_id: string;
	secret: string;
}

export interface DeviceCodeGrant {
	grant_type: 'device_code';
	device_code: string;
}

export interface ExchangeCodeGrant {
	grant_type: 'exchange_code';
	exchange_code: string;
}

export interface ExternalAuthGrant {
	grant_type: 'external_auth';
	external_auth_type: string;
	external_auth_token: string;
}

export interface OTPGrant {
	grant_type: 'otp';
	otp: string;
	challenge: string;
}

export interface RefreshTokenGrant {
	grant_type: 'refresh_token';
	refresh_token: string;
}

export type AnyGrant = AuthorizationCodeGrant | ClientCredentialsGrant | ContinuationTokenGrant | DeviceAuthGrant | DeviceCodeGrant | ExchangeCodeGrant | ExternalAuthGrant | OTPGrant | RefreshTokenGrant;

export interface DeviceAuthCreated {
	location: string;
	ipAddress: string;
	dateTime: string;
}

export interface DeviceAuthResponse {
	deviceId: string;
	accountId: string;
	secret: string;
	userAgent: string;
	created: DeviceAuthCreated;
}

export interface EpicAuthResponse {
	access_token: string;
	expires_in: number;
	expires_at: string;
	token_type?: string;
	refresh_token: string;
	refresh_expires: number;
	refresh_expires_at: string;
	account_id: string;
	client_id: string;
	internal_client: boolean;
	client_service: string;
	displayName: string;
	app: string;
	in_app_id: string;
	product_id: string;
	application_id: string;
}

export interface EpicVerifyAuthResponse {
	token: string;
	session_id: string;
	token_type: string;
	client_id: string;
	internal_client: boolean;
	client_service: string;
	account_id: string;
	expires_in: number;
	expires_at: string;
	auth_method: string;
	display_name: string;
	app: string;
	in_app_id: string;
	product_id?: string;
	application_id?: string;
}

export interface EpicVerifyAuthPerm {
	resource: string;
	action: number;
}

export interface EpicVerifyAuthResponseWithPerms extends EpicVerifyAuthResponse {
	perms: EpicVerifyAuthPerm[];
}

// Calendar

export interface TimelineActiveEvent {
	eventType: string;
	activeUntil: string;
	activeSince: string;
}

export interface TimelineChannelData<State> {
	validFrom: string;
	activeEvents: TimelineActiveEvent[];
	state: State;
}

export interface TimelineChannel<State> {
	states: TimelineChannelData<State>[];
	cacheExpire: string;
}

export interface TimelineStandaloneStoreState {
	activePurchaseLimitingEventIds: unknown[];
	storeFront: Partial<Record<string, unknown>>;
	rmtPromotionConfig: unknown[];
	storeEnd: string;
}

export interface TimelineClientMatchmakingRegion {
	eventFlagsForcedOff: string[];
}

export interface TimelineClientMatchmakingState {
	region: Partial<Record<string, TimelineClientMatchmakingRegion>>;
}

export interface TimelineTKState {
	k: unknown[];
}

export interface TimelineFeaturedIslandsState {
	islandCodes: unknown[];
	playlistCuratedContent: Partial<Record<string, unknown>>;
	playlistCuratedHub: Partial<Record<string, unknown>>;
	islandTemplates: unknown[];
}

export interface TimelineCommunityVotesState {
	electionId: string;
	candidates: unknown[];
	electionEnds: string;
	numWinners: number;
}

export interface TimelineClientEventsActiveEvent {
	instanceId: string;
	devName: string;
	eventName: string;
	eventStart: string;
	eventEnd: string;
	eventType: string;
}

export interface TimelineClientEventsState {
	activeStorefronts: unknown[];
	eventNamedWeights: Partial<Record<string, unknown>>;
	activeEvents: TimelineClientEventsActiveEvent[];
	seasonNumber: number;
	seasonTemplateId: string;
	matchXpBonusPoints: number;
	eventPunchCardTemplateId: string;
	seasonBegin: string;
	seasonEnd: string;
	seasonDisplayedEnd: string;
	weeklyStoreEnd: string;
	stwEventStoreEnd: string;
	stwWeeklyStoreEnd: string;
	sectionStoreEnds: Partial<Record<string, string>>;
	rmtPromotion: string;
	dailyStoreEnd: string;
}

export interface Timeline {
	channels: {
		'standalone-store': TimelineChannel<TimelineStandaloneStoreState>;
		'client-matchmaking': TimelineChannel<TimelineClientMatchmakingState>;
		tk: TimelineChannel<TimelineTKState>;
		'featured-islands': TimelineChannel<TimelineFeaturedIslandsState>;
		'community-votes': TimelineChannel<TimelineCommunityVotesState>;
		'client-events': TimelineChannel<TimelineClientEventsState>;
	};
	cacheIntervalMins: number;
	currentTime: string;
}

// Discovery

export interface DiscoveryFrontendOptions {
	matchmakingRegion: string;
	platform: string;
	fortniteVersion: string;
	partyMemberIds: 'self' | string[];
}

export interface DiscoveryCreatorLink {
	linkCode: string;
	lastActivatedDate: string;
	isFavorite: boolean;
	globalCCU: number;
}

export interface DiscoveryCreatorPage {
	creatorId: string;
	links: DiscoveryCreatorLink[];
	hasMore: boolean;
}

export interface DiscoveryPageResult {
	lastVisited: string | null;
	linkCode: string;
	isFavorite: boolean;
	globalCCU: number;
}

export interface DiscoveryPage {
	results: DiscoveryPageResult[];
	hasMore: boolean;
}

export interface DiscoveryPanel {
	panelName: string;
	pages: DiscoveryPage[];
}

export interface DiscoverySurface {
	panels: DiscoveryPanel[];
	testCohorts: string[];
}

export interface BaseDiscoveryResult {
	playerId: string;
	linkCode: string;
	linkType: string;
	pagingDate: string;
}

export interface FavoriteDiscoveryResult extends BaseDiscoveryResult {
	lastVisited?: string;
	sortDate: string;
}

export interface DiscoveryResult extends BaseDiscoveryResult {
	lastVisited: string;
	isFavorite: boolean;
}

export interface DiscoveryHistory<Result> {
	results: Result[];
	hasMore: boolean;
}

// Fortnite (General)

export type EpicMCPProfileId = 'athena' | 'creative' | 'campaign' | 'common_public' | 'collections' | 'common_core' | 'metadata' | 'collection_book_people0' | 'collection_book_schematics0' | 'outpost0' | 'theater0' | 'theater1' | 'theater2' | 'recycle_bin';

export type EpicMCPRoute = 'client' | 'public';

export interface EpicReceipt {
	appStore: string;
	appStoreId: string;
	receiptId: string;
	receiptInfo: string;
}

// Friends

export interface BaseEpicFriend {
	accountId: string;
}

export interface LimitedEpicFriend extends BaseEpicFriend {
	mutual: number;
	favorite: boolean;
	created: string;
}

export interface EpicFriend extends LimitedEpicFriend {
	groups: unknown[];
	alias: string;
}

export interface EpicFriendWithNote extends EpicFriend {
	note: string;
}

export interface EpicFriendCode {
	codeId: string;
	codeType: string;
	dateCreated: string;
}

export type EpicFriendCodeType = 'epic' | 'xbox';

export interface EpicFriendsExternalSettings {
	doNotShowLinkingProposal: boolean;
}

export type EpicFriendsExternalSource = 'default' | 'steam';

export type EpicInviteSettings = 'public' | 'friends_of_friends' | 'private';

export type EpicMutualPrivacy = 'ALL' | 'FRIENDS' | 'NONE';

export interface EpicSuggestedFriendSortFactors {
	x: number;
	y: number;
	k: string;
	l: string;
}

export interface EpicSuggestedFriendConnection {
	id: string;
	sortFactors: EpicSuggestedFriendSortFactors;
}

export interface EpicSuggestedFriend extends BaseEpicFriend {
	connections: Partial<Record<string, EpicSuggestedFriendConnection>>;
	mutual: number;
}

export interface EpicFriendsSettings {
	acceptInvites: EpicInviteSettings;
	mutualPrivacy: EpicMutualPrivacy;
}

export interface EpicFriendsLimits {
	incoming: boolean;
	outgoing: boolean;
	accepted: boolean;
}

export interface EpicFriendsSummary {
	friends: EpicFriendWithNote[];
	incoming: LimitedEpicFriend[];
	outgoing: LimitedEpicFriend[];
	suggested: EpicSuggestedFriend[];
	blocklist: BaseEpicFriend[];
	settings: EpicFriendsSettings;
	limitsReached: EpicFriendsLimits;
}

export type EpicFriendsType = 'summary' | 'incoming' | 'outgoing' | 'suggested' | 'friends';

// Item Shop

export interface StorefrontCatlogEntryPrice {
	currencyType: string;
	currencySubType: string;
	regularPrice: number;
	dynamicRegularPrice: number;
	finalPrice: number;
	saleExpiration: string;
	basePrice: number;
}

export interface StorefrontCatalotEntryMeta {
	NewDisplayAssetPath: string;
	SectionId: string;
	TileSize: string;
	AnalyticOfferGroupId: string;
}

export interface StorefrontCatalogEntryRequirement {
	requirementType: string;
	requiredId: string;
	minQuantity: number;
}

export interface StorefrontCatalogEntryGiftInfo {
	bIsEnabled: boolean;
	forcedGiftBoxTemplateId: string;
	purchaseRequirements: unknown[];
	giftRecordIds?: unknown[];
}

export interface StorefrontCatlogEntryMetaInfo {
	key: string;
	value: string;
}

export interface StorefrontCatalogEntryItemGrant {
	tempalateId: string;
	quantity: number;
	attributes?: Partial<Record<string, boolean>>;
}

export interface BaseStorefrontCatalogEntry {
	devName: string;
	offerId: string;
	offerType: string;
	dailyLimit: number;
	weeklyLimit: number;
	monthlyLimit: number;
	categories: string[];
	prices: StorefrontCatlogEntryPrice[];
	appStoreId: string[];
	requirements: StorefrontCatalogEntryRequirement[];
	refundable: boolean;
	metaInfo: StorefrontCatlogEntryMetaInfo[];
	itemGrants: StorefrontCatalogEntryItemGrant[];
	sortPriority: number;
	catalogGroupPriority: number;
}

export interface StorefrontCatalogItemEntry extends BaseStorefrontCatalogEntry {
	fulfillmentIds: unknown[];
	meta: StorefrontCatalotEntryMeta;
	matchFilter: string;
	filterWeight: number;
	giftInfo: StorefrontCatalogEntryGiftInfo;
	additionalGrants: unknown[];
}

export interface StorefrontCatalogCurrencyEntry extends BaseStorefrontCatalogEntry {
	catalogGroup: string;
	title: string;
	shortDescription: string;
	description: string;
	displayAssetPath: string;
}

export type AnyStorefrontCatalogEntry = StorefrontCatalogItemEntry | StorefrontCatalogCurrencyEntry;

export interface Storefront {
	name: string;
	catalogEntries: AnyStorefrontCatalogEntry[];
}

export interface StorefrontCatalog {
	refreshIntervalHrs: number;
	dailyPurchaseHrs: number;
	expiration: string;
	storefronts: Storefront[];
}

// Ranked

export type HabaneroNamespace = 'fortnite';

export interface BaseHabaneroTrack {
	gameId: string;
	trackguid: string;
	rankingType: string;
	beginTime: string;
	endTime: string;
}

export interface ShortHabaneroTrack extends BaseHabaneroTrack {
	divisionCount: number;
}

export interface HabaneroDivsion {
	lowerRatingThreshold: number;
	upperRatingThreshold: number;
	ratingGrace: number;
	trackTopPlayers: number;
}

export interface LongHabaneroTrack extends BaseHabaneroTrack {
	divisions: HabaneroDivsion[];
	firstWeekRolloverTime: string;
	leaderboardTrackingEventId: string;
}

export interface HabaneroTrackProgress {
	gameId: string;
	trackguid: string;
	accountId: string;
	rankingType: string;
	lastUpdated: string;
	currentDivision: number;
	highestDivision: number;
	promotionProgress: number;
	currentPlayerRanking: number | null;
}

// Save the World

export interface STWTheaterTag {
	tagName: string;
}

export interface STWTheaterTags {
	gameplayTags: STWTheaterTag[];
}

export interface STWEventDependentTheaterTag {
	requiredEventFlag: string;
	relatedTag: STWTheaterTag;
}

export interface STWTheaterRequirements {
	commanderLevel: number;
	personalPowerRating: number;
	maxPersonalPowerRating: number;
	partyPowerRating: number;
	maxPartyPowerRating: number;
	activeQuestDefinitions: string[];
	questDefinition: string;
	objectiveStatHandle: STWTable;
	uncompletedQuestDefinition: string;
	itemDefinition: string;
	eventFlag: string;
}

export interface STWTheaterImageSize {
	x: number;
	y: number;
}

export interface STWTheaterImageMargin {
	left: number;
	top: number;
	right: number;
	bottom: number;
}

export interface STWTheaterImageCornerRadii extends STWTheaterImageSize {
	z: number;
	w: number;
}

export interface STWTheaterImageOutlineSettings {
	cornerRadii: STWTheaterImageCornerRadii;
	color: STWColor;
	width: number;
	roundingType: string;
	bUseBrushTransparency: boolean;
}

export interface STWTheaterImageUVRegion {
	min: STWTheaterImageSize;
	max: STWTheaterImageSize;
	bIsValid: boolean;
}

export interface STWTheaterImage {
	bIsDynamicallyLoaded: boolean;
	drawAs: string;
	tiling: string;
	mirroring: string;
	imageType: string;
	imageSize: STWTheaterImageSize;
	margin: STWTheaterImageMargin;
	tintColor: STWColor;
	outlineSettings: STWTheaterImageOutlineSettings;
	resourceObject: string;
	resourceName: string;
	uVRegion: STWTheaterImageUVRegion;
}

export interface STWRGBAColor {
	r: number;
	g: number;
	b: number;
	a: number;
}

export interface STWColor {
	specifiedColor: STWRGBAColor;
	colorUseRule: string;
}

export interface STWTheaterColorInfo {
	bUseDifficultyToDetermineColor: boolean;
	color: STWColor;
}

export interface STWMissionAlertCategoryRequirement {
	missionAlertCategoryName: string;
	bRespectTileRequirements: boolean;
	bAllowQuickplay: boolean;
}

export interface STWGameplayModifier {
	eventFlagName: string;
	gameplayModifier: string;
}

export interface STWTheaterRuntimeInfo {
	theaterType: string;
	theaterTags: STWTheaterTags;
	eventDependentTheaterTags: STWEventDependentTheaterTag[];
	theaterVisibilityRequirements: STWTheaterRequirements;
	requirements: STWTheaterRequirements;
	requiredSubGameForVisibility: string;
	bOnlyMatchLinkedQuestsToTiles: boolean;
	worldMapPinClass: string;
	theaterImage: string;
	theaterImages: Partial<Record<string, STWTheaterImage>>;
	theaterColorInfo: STWTheaterColorInfo;
	socket: string;
	missionAlertRequirements: STWTheaterRequirements;
	missionAlertCategoryRequirements: STWMissionAlertCategoryRequirement[];
	gameplayModifierList: STWGameplayModifier[];
}

export interface STWTable {
	dataTable: string;
	rowName: string;
}

export interface STWLinkedQuest {
	questDefinition: string;
	objectiveStatHandle: STWTable;
}

export interface STWMissionWeight {
	weight: number;
	missionGenerator: string;
}

export interface STWDifficultyWeight {
	weight: number;
	difficultyInfo: STWTable;
}

export interface STWTheaterTile {
	tileType: string;
	zoneTheme: string;
	requirements: STWTheaterRequirements;
	linkedQuests: (STWLinkedQuest | undefined)[];
	xCoordinate: number;
	yCoordinate: number;
	missionWeightOverrides: STWMissionWeight[];
	difficultyWeightOverrides: STWDifficultyWeight[];
	canBeMissionAlert: boolean;
	tileTags: STWTheaterTags;
	bDisallowQuickplay: boolean;
}

export interface STWMissionData {
	missionWeights: STWMissionWeight[];
	difficultyWeights: STWDifficultyWeight[];
	numMissionsAvailable: number;
	numMissionsToChange: number;
	missionChangeFrequency: number;
}

export interface STWMissionAlertRequirements {
	categoryName: string;
	requirements: STWTheaterRequirements;
}

export interface STWRegion {
	displayName: string;
	uniqueId: string;
	regionTags: STWTheaterTags;
	tileIndices: number[];
	regionThemeIcon: string;
	missionData: STWMissionData;
	requirements: STWTheaterRequirements;
	missionAlertRequirements: STWMissionAlertRequirements[];
}

export interface STWTheater {
	displayName: string;
	uniqueId: string;
	theaterSlot: number;
	theaterUIOrder: number;
	bIsTestTheater: boolean;
	bHideLikeTestTheater: boolean;
	requiredEventFlag: string;
	missionRewardNamedWeightsRowName: string;
	description: string;
	runtimeInfo: STWTheaterRuntimeInfo;
	tiles: STWTheaterTile[];
	regions: STWRegion[];
}

export interface STWItem {
	itemType: string;
	quantity: number;
}

export interface STWMissionRewards {
	tierGroupName: string;
	items: STWItem[];
}

export interface STWOverrideMissionRewards {
	Endurance: STWMissionRewards;
	Wargames: STWMissionRewards;
}

export interface STWAvailableMission {
	missionGuid: string;
	missionRewards: STWMissionRewards;
	overrideMissionRewards: STWOverrideMissionRewards | Record<string, never>;
	missionGenerator: string;
	missionDifficultyInfo: STWTable;
	tileIndex: number;
	availableUntil: string;
}

export interface BaseSTWMission {
	theaterId: string;
	nextRefresh: string;
}

export interface STWMission extends BaseSTWMission {
	availableMissions: STWAvailableMission[];
}

export interface STWAvailableMissionAlert {
	name: string;
	categoryName: string;
	spreadDataName: string;
	missionAlertGuid: string;
	tileIndex: number;
	availableUntil: string;
	totalSpreadRefreshes: number;
	missionAlertRewards: STWMissionRewards;
	missionAlertModifiers: STWMissionRewards;
}

export interface STWMissionAlert extends BaseSTWMission {
	availableMissionAlerts: STWAvailableMissionAlert[];
}

export interface STWWorldInfo {
	theaters: STWTheater[];
	missions: STWMission[];
	missionAlerts: STWMissionAlert[];
}

// Stats

export type EpicCollectionCategory = 'fish' | 'character';

export interface EpicStats {
	startTime: number;
	endTime: number;
	stats: Partial<Record<string, number>>;
	accountId: string;
}