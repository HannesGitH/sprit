import { load } from 'ts-dotenv';

const env = load({
	tankerkoenig_api_key: String
});

const api_key = env.tankerkoenig_api_key;
const base_url = 'https://creativecommons.tankerkoenig.de/json/list.php';
const url = base_url + '?apikey=' + api_key;

type listParams = {
	lat: number;
	lng: number;
	rad: number;
	sort: 'dist' | 'price';
	type: 'e5' | 'e10' | 'diesel' | 'all';
};
export const getList = async (params: listParams) => {
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

export {};
