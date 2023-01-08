import { load } from 'ts-dotenv';

const env = load({
	tankerkoenig_api_key: String
});

const api_key = env.tankerkoenig_api_key;
const base_url = 'https://creativecommons.tankerkoenig.de/json/list.php';
const url = base_url + '?apikey=' + api_key;

export type StationParams = {
	lat: number;
	lng: number;
	rad: number;
	sort: 'dist' | 'price';
	type: 'e5' | 'e10' | 'diesel' | 'all';
};
const getList = async (params: StationParams) => {
	const response = await fetch(
		url +
			'&lat=' +
			params.lat +
			'&lng=' +
			params.lng +
			'&rad=' +
			params.rad +
			'&sort=' +
			params.sort +
			'&type=' +
			params.type
	);
	const json = await response.json();
	return json;
};

interface BaseStation {
	id: string;
	name: string;
	brand: string;
	street: string;
	place: string;
	dist: number;
	houseNumber: string;
	isOpen: boolean;
	postCode: number;
}
interface SinglePriceStation extends BaseStation {
	price: number;
}
interface MultiplePriceStation extends BaseStation {
	e5: number;
	e10: number;
	diesel: number;
}
export type Station = SinglePriceStation | MultiplePriceStation;

export const getStations = async (params: StationParams): Promise<[Station]> => {
	const response = await getList(params);
	if (!response.ok) {
		throw new Error(response.message);
	}
	return response.stations;
};

export {};
