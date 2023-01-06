import { describe, it, expect } from 'vitest';

import { getList } from './tankerkoenig';

describe('api list test', () => {
	it('tests if a sample query to get a list of tankstellen works', async () => {
		expect(
			await getList({
				lat: 52.52099975265203,
				lng: 13.43803882598877,
				rad: 4,
				sort: 'price',
				type: 'diesel'
			})
		).toSatisfy((obj: any) => obj.stations[0].id == '1c4f126b-1f3c-4b38-9692-05c400ea8e61');
	});
});
