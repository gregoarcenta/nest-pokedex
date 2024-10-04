export interface PokeResponse {
	count: number;
	next: string;
	results: PokeResult[];
}
interface PokeResult {
	name: string;
	url: string;
}
