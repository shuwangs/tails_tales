import assert from 'node:assert/strict';
import { By, Key, until } from 'selenium-webdriver';
import { originalDiary, updatedDiary } from '../fixtures/diaryData.mjs';
import { createDriver } from '../support/browser.mjs';
import { clickSave, getDiaryFields, restoreDiary, saveDiary, signIn } from '../support/diary.mjs';

const waitMs = 5000;
const failureMessage = 'Simulated save failure';
const saveAlert = By.css('#edit-entry-form [role="alert"]');

async function failNextDiarySave(driver, updatePath) {
    await driver.executeScript((path, message) => {
        const originalFetch = window.fetch;
        const updateUrl = new URL(path, window.location.origin).href;

        window.fetch = function (input, options) {
            const url = new URL(input instanceof Request ? input.url : input, window.location.href);
            const method = options?.method ?? (input instanceof Request ? input.method : 'GET');

            if (url.href === updateUrl && method.toUpperCase() === 'PUT') {
                window.fetch = originalFetch;
                return Promise.resolve(new Response(JSON.stringify({ message }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' },
                }));
            }

            return originalFetch.call(window, input, options);
        };
    }, updatePath, failureMessage);
}

async function verifyDiarySaveRecovery() {
    const { E2E_EMAIL, E2E_PASSWORD } = process.env;
    assert.ok(E2E_EMAIL, 'Missing E2E_EMAIL');
    assert.ok(E2E_PASSWORD, 'Missing E2E_PASSWORD');

    const driver = await createDriver();
    const selectAll = Key.chord(process.platform === 'darwin' ? Key.COMMAND : Key.CONTROL, 'a');
    let saveAttempted = false;

    try {
        await signIn(driver, E2E_EMAIL, E2E_PASSWORD);
        const diaryLink = await driver.wait(
            until.elementLocated(By.partialLinkText(originalDiary.title)),
            waitMs,
            `Expected to find "${originalDiary.title}" in the diary list`,
        );
        await diaryLink.click();

        const fields = await getDiaryFields(driver);
        await restoreDiary(driver, fields, selectAll);
        const { titleInput, storyInput } = fields;

        assert.equal(await titleInput.getProperty('value'), originalDiary.title);
        assert.equal(await storyInput.getProperty('value'), originalDiary.story);

        await titleInput.sendKeys(selectAll, updatedDiary.title);
        await storyInput.sendKeys(selectAll, updatedDiary.story);
        assert.equal(await titleInput.getProperty('value'), updatedDiary.title);
        assert.equal(await storyInput.getProperty('value'), updatedDiary.story);

        const { pathname } = new URL(await driver.getCurrentUrl());
        assert.match(pathname, /^\/entries\/\d+$/);
        await failNextDiarySave(driver, `/api${pathname}`);

        saveAttempted = true;
        await clickSave(driver);
        const alert = await driver.wait(
            until.elementLocated(saveAlert),
            waitMs,
            'Expected the failed save to show an error',
        );
        assert.equal(await alert.getText(), failureMessage);
        assert.equal(await titleInput.getProperty('value'), updatedDiary.title);
        assert.equal(await storyInput.getProperty('value'), updatedDiary.story);

        // Retry with the same draft, using the real API.
        await saveDiary(driver);
        assert.equal((await driver.findElements(saveAlert)).length, 0);

        await driver.navigate().refresh();
        const reloaded = await getDiaryFields(driver);
        assert.equal(await reloaded.titleInput.getProperty('value'), updatedDiary.title);
        assert.equal(await reloaded.storyInput.getProperty('value'), updatedDiary.story);
    } finally {
        try {
            if (saveAttempted) {
                await driver.navigate().refresh();
                await restoreDiary(driver, await getDiaryFields(driver), selectAll);

                await driver.navigate().refresh();
                const restored = await getDiaryFields(driver);
                assert.equal(await restored.titleInput.getProperty('value'), originalDiary.title);
                assert.equal(await restored.storyInput.getProperty('value'), originalDiary.story);
            }
        } finally {
            await driver.quit();
        }
    }

    console.log('UI-08 passed: the draft survived a failed save and persisted after retry.');
}

await verifyDiarySaveRecovery();
