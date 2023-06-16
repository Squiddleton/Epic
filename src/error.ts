export class EpicAPIError extends Error {
	raw: unknown;
	rawText: string;
	status: number;
	url: string;
	constructor(res: Response, rawText: string, url: string) {
		super(res.statusText);
		let raw: unknown;
		try {
			raw = JSON.parse(rawText);
		}
		catch {
			raw = null;
		}
		this.raw = raw;
		this.rawText = rawText;
		this.status = res.status;
		this.url = url;
	}
}