import { describe, it, expect } from 'vitest';

describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
});

import * as denv from 'dotenv';
import fs from 'fs';
describe('.env loading', () => {
	it('has a .env', () => {
		expect(fs.existsSync('.env')).toBe(true);
	});
	it('loads .env', () => {
		denv.config();
		expect(process.env.mapbox_api_key).toBeDefined();
	});
});
