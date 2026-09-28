import { test, expect } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

const EMAIL = 's1a112232@gmail.com';
const PASSWORD = 'Password@123';


async function loginAndGoToBooking(page) {
    await page.goto(`${BASE_URL}/login`);

    await page.getByPlaceholder('you@email.com').fill(EMAIL);
    await page.getByLabel('Password').fill(PASSWORD);

    await page.locator('#login-btn').click();

    // Confirm login was successful
    await expect(page.getByText('Browse Events →')).toBeVisible();

    await page.goto(`${BASE_URL}/events`);
}


// Helper to complete the customer form
async function fillBookingForm(page) {
    await page.getByLabel('Full Name').fill('Santosh');
    await page.locator('#customer-email').fill(EMAIL);
    await page.getByPlaceholder('+91 98765 43210').fill('+91 98765 43210');
}


// Helper to check refund eligibility
async function checkRefundEligibility(page) {

    await page.getByRole('button', {
        name:'Check eligibility for refund?'}).click();

    // Spinner should appear immediately
    await expect(page.locator('#refund-spinner')).toBeVisible();

    // Spinner should disappear within 6 seconds
    await expect(page.locator('#refund-spinner')).toBeHidden({
        timeout: 6000
    });

    // Result should be displayed
    const refundResult = page.locator('#refund-result');

    await expect(refundResult).toBeVisible();
    console.log("refundResult", refundResult)
    return refundResult;
}


test.describe('Refund Eligibility', () => {

    test('Single ticket booking is eligible for refund', async ({ page }) => {

        // Step 1 - Login
        await loginAndGoToBooking(page);

        // Step 2 - Book first event with 1 ticket
        const firstEvent = page
            .locator('[data-testid="event-card"]')
            .first();

        await firstEvent
            .locator('[data-testid="book-now-btn"]')
            .click();

        await fillBookingForm(page);

        await page.locator('.confirm-booking-btn').click();

        // Step 3 - Navigate to booking detail
        await page.getByText('View My Bookings').click();

        await expect(page).toHaveURL(/\/bookings$/);

        await page
            .getByRole('button', { name: 'View Details' })
            .first()
            .click();

        await expect(
            page.getByText('Booking Information')
        ).toBeVisible();

        // Step 4 - Validate booking reference
        const bookingRef = (
            await page.locator('.font-mono').nth(1).textContent()
        ).trim();

        const eventTitle = (
            await page.locator('h1').textContent()
        ).trim();

        console.log('Booking Ref:', bookingRef);
        console.log('Event Title:', eventTitle);

        // First character of booking ref = first character of event title
        expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

        // Step 5 - Check refund eligibility
        const refundResult = await checkRefundEligibility(page);

        // Step 6 - Validate result
        await expect(refundResult).toContainText(
            'Eligible for refund'
        );

        await expect(refundResult).toContainText(
            'Single-ticket bookings qualify for a full refund'
        );
    });


    test('Group ticket booking is NOT eligible for refund', async ({ page }) => {

        // Step 1 - Login
        await loginAndGoToBooking(page);

        // Step 2 - Book first event with 3 tickets
        const firstEvent = page
            .locator('[data-testid="event-card"]')
            .first();

        await firstEvent
            .locator('[data-testid="book-now-btn"]')
            .click();

        // Increase quantity from 1 → 3
        const incrementButton = page.locator('button:has-text("+")');

        await incrementButton.click();
        await incrementButton.click();

        await fillBookingForm(page);

        await page.locator('.confirm-booking-btn').click();

        // Step 3 - Navigate to booking detail
        await page.getByText('View My Bookings').click();

        await expect(page).toHaveURL(/\/bookings$/);

        await page
            .getByRole('button', { name: 'View Details' })
            .first()
            .click();

        await expect(
            page.getByText('Booking Information')
        ).toBeVisible();

        // Step 4 - Validate booking reference
        const bookingRef = (
            await page.locator('.font-mono').nth(1).textContent()
        ).trim();

        const eventTitle = (
            await page.locator('h1').textContent()
        ).trim();

        console.log('Booking Ref:', bookingRef);
        console.log('Event Title:', eventTitle);

        expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

        // Step 5 - Check refund eligibility
        const refundResult = await checkRefundEligibility(page);

        // Step 6 - Validate result
        await expect(refundResult).toContainText(
            'Not eligible for refund'
        );

        await expect(refundResult).toContainText(
            'Group bookings (3 tickets) are non-refundable'
        );
    });

});