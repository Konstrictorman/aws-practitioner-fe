import {
	Given,
	When,
	Then,
	setDefaultTimeout,
	After,
} from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { expect } from '@playwright/test';

setDefaultTimeout(30000);

let browser: Browser;
let page: Page;

Given('the user is on the products page', async function () {
	browser = await chromium.launch({ headless: true, slowMo: 50 });
	const context = await browser.newContext();
	page = await context.newPage();
	await page.goto('http://localhost:3000/products', {
		waitUntil: 'networkidle',
	});
});

When('the rooms are loaded', async function () {
	await page.waitForSelector('h2'); // Wait for the room titles to be visible
});

Then(
	'the user should see a list of rooms with titles, prices, capacity, and locations',
	async function () {
		const roomTitles = await page.locator('h2').allTextContents();
		expect(roomTitles.length).toBeGreaterThan(0); // At least one room should be listed

		const prices = await page
			.locator('svg[data-testid="LocalAtmIcon"]')
			.count();
		const capacities = await page
			.locator('svg[data-testid="PeopleAltIcon"]')
			.count();
		const locations = await page
			.locator('svg[data-testid="LocationOnIcon"]')
			.count();

		expect(prices).toBe(roomTitles.length);
		expect(capacities).toBe(roomTitles.length);
		expect(locations).toBe(roomTitles.length);
	}
);

Then('each room should display an image', async function () {
	const images = await page.locator('img').count();
	expect(images).toBeGreaterThan(0);
});

Then('each room should have a "View Details" button', async function () {
	const viewButtons = await page.locator('text=View Details').count();
	expect(viewButtons).toBeGreaterThan(0);
});

When(
	'the user clicks on "View Details" for room {string}',
	async function (roomTitle: string) {
		await page.click(`text=${roomTitle}`);
	}
);

Then(
	'the user should see the details of the room including title, price, capacity, and location',
	async function () {
		await page.waitForSelector('h2');
		const title = await page.locator('h2').textContent();
		expect(title).not.toBeNull();

		const price = await page
			.locator('svg[data-testid="LocalAtmIcon"]')
			.textContent();
		const capacity = await page
			.locator('svg[data-testid="PeopleAltIcon"]')
			.textContent();
		const location = await page
			.locator('svg[data-testid="LocationOnIcon"]')
			.textContent();

		expect(price).not.toBeNull();
		expect(capacity).not.toBeNull();
		expect(location).not.toBeNull();
	}
);

Then('the user should see the room image', async function () {
	const image = await page.locator('img').getAttribute('src');
	expect(image).not.toBeNull();
});

Given('an image fails to load', async function () {
	await page.route('**/api.pexels.com/**', (route) => route.abort());
});

Then('the user should see a placeholder image instead', async function () {
	const placeholderImage = await page.locator('img').getAttribute('src');
	expect(placeholderImage).toBe('xx');
});

After(async function () {
	await browser.close();
});
