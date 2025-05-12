import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Page, Browser } from 'playwright';

let browser: Browser;
let page: Page;

// Set a longer timeout (30 seconds)
setDefaultTimeout(30000); // 30 seconds

Given(
	'the user is on the product details page for room {string}',
	async function (roomName: string) {
		browser = await chromium.launch({ headless: true, slowMo: 50 }); // Adding slowMo for better visibility
		const context = await browser.newContext();
		page = await context.newPage();
		await page.goto('http://localhost:3000/products', {
			waitUntil: 'networkidle',
		}); // Wait for the page to fully load
		await page.click(`text=${roomName}`); // Assume room is listed by name
	}
);

When(
	'they select a start date {string} and an end date {string}',
	async function (startDate: string, endDate: string) {
		await page.fill('input[name="startDate"]', startDate);
		await page.fill('input[name="finishDate"]', endDate);
	}
);

When('they enter their email {string}', async function (email: string) {
	await page.fill('input[name="clientEmail"]', email);
});

When('they leave the email field empty', async function () {
	await page.fill('input[name="clientEmail"]', '');
});

When('they click on {string}', async function (buttonText: string) {
	await page.click(`text=${buttonText}`);
});

Then(
	'they should see a confirmation message with a booking code',
	async function () {
		await page.waitForSelector(
			'text=Room booked successfully! Your booking code is:',
			{ timeout: 15000 }
		);
		await browser.close();
	}
);

Then(
	'they should see an error message {string}',
	async function (errorMessage: string) {
		await page.waitForSelector(`text=${errorMessage}`, { timeout: 15000 });
		await browser.close();
	}
);
