import { test, expect, Page } from '@playwright/test';



test.describe('login and addproduct tocart', () => {

    ;
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });
    test.afterEach(async ({ }, testInfo) => {

        console.log("Test:", testInfo.title);
        console.log("Status:", testInfo.status);
        const timestamp = new Date()
            .toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            })
            .replace(/[/:,\s]/g, '_');

        if (testInfo.status !== testInfo.expectedStatus) {
            const screenshot = await page.screenshot({
                path: `screenshots/${testInfo.title}${timestamp}.png`
            });
            //   await testInfo.attach('Failed Screenshot', {
            //     body: screenshot,
            //     contentType: 'image/png'
            // });
        }
    });


    test('login test', async () => {

        await page.goto("https://www.saucedemo.com/?utm_source=chatgpt.com");
        await page.locator('//input[@id="user-name"]').fill("standard_user");
        await page.locator('//input[@id="password"]').fill("secret_sauce");
        await page.locator('//input[@id="login-button"]').click();
    }
    )


    test('add product to cart', async () => {
        await page.locator('//select[@class="product_sort_container"]').selectOption("hilo");
        await page.locator('//div/div/div/div[1]/div[2]/div[2]/button').click();
        await expect(
            page.locator('//div/div/div/div[1]/div[2]/div[2]/button')
        ).toHaveText('Remove');

    })

})

