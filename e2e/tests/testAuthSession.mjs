import assert from 'node:assert/strict';
import { By, until } from 'selenium-webdriver';
import { createDriver } from '../support/browser.mjs';
import { signIn } from '../support/diary.mjs';

async function verifyAuthSessionLifecycle() {
    const { E2E_EMAIL, E2E_PASSWORD } = process.env;
    assert.ok(E2E_EMAIL, 'Missing E2E_EMAIL');
    assert.ok(E2E_PASSWORD, 'Missing E2E_PASSWORD');

    const driver = await createDriver();
    const waitMs = 5000;
    const diaryList = By.css('section[aria-label="Diary entries"]');
    // Implementation for verifying the authentication session lifecycle

    try {
        // start the chrome and login 
        await signIn(driver, E2E_EMAIL, E2E_PASSWORD);
        const entriesUrl = await driver.getCurrentUrl();
        const loginUrl = new URL('/login', entriesUrl).href;

        const list = await driver.wait(
            until.elementLocated(diaryList),
            waitMs,
            `Expected to find diary list after login`,
        );

        await driver.wait(until.elementIsVisible(list), waitMs);

        // refersh the page and check if the session is still valid
        await driver.navigate().refresh();
        const reloadedList = await driver.wait(
            until.elementLocated(diaryList),
            waitMs,
            `Expected to find diary list after refresh`,
        );

        await driver.wait(until.elementIsVisible(reloadedList), waitMs);

        // logout and check if the session is invalidated

        const logoutButton = await driver.findElement(By.xpath('//button[normalize-space()="Log out"]'));
        await logoutButton.click();

        await driver.wait(until.urlIs(loginUrl), waitMs, 'Expected logout to open login');

        await driver.get(entriesUrl);
        await driver.wait(
            until.urlIs(loginUrl),
            waitMs,
            'Expected the protected route to redirect after logout',
        );
        const emailInput = await driver.wait(
            until.elementLocated(By.name('email')),
            waitMs,
        );
        await driver.wait(until.elementIsVisible(emailInput), waitMs);

        // close the browser and cleanup
    } finally {
        // Ensure the browser is closed even if an error occurs
        await driver.quit()
    }

};


await verifyAuthSessionLifecycle();

console.log('UI-01 passed: the session survived refresh and protected access ended after logout.');