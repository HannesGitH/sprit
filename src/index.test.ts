import { describe, it, expect } from 'vitest';

describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
});

import * as denv from 'ts-dotenv';
import fs from 'fs';
describe('.env loading', () => {
	it('has a .env', () => {
		expect(fs.existsSync('.env')).toBe(true); //succeeds
		console.log(fs.readFileSync('.env')); //api_key=123456
	});
	it('loads .env ts', () => {
		const env = denv.load({ mapbox_api_key: String }); //already fails here if i .load({api_key : String})
		expect(env.mapbox_api_key).toBeDefined(); //FAILS
	});
});
