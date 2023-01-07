import { describe, it, expect } from 'vitest';

import { getStations, type Station, type StationParams } from './tankerkoenig';

describe('api list test', () => {
	const params: StationParams = {
		lat: 52.52099975265203,
		lng: 13.43803882598877,
		rad: 4,
		sort: 'price',
		type: 'diesel'
	};

	it('typed stations', async () => {
		expect(await getStations(params)).toSatisfy(
			(obj: [Station]) => obj[0].id == '1c4f126b-1f3c-4b38-9692-05c400ea8e61'
		);
	});
});
