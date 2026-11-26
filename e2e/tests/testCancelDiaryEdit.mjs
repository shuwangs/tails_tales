import assert from 'node:assert/strict';
import { By, Key, until } from 'selenium-webdriver';
import { createDriver } from '../support/browser.mjs';
import { originalDiary, updatedDiary } from '../fixtures/diaryData.mjs';
import { signIn, getDiaryFields, restoreDiary } from '../support/diary.mjs';

const baseUrl = 'http://localhost:5173';
const waitMs = 5000;


async function cancelDiaryEdit() {
    const { E2E_EMAIL, E2E_PASSWORD } = process.env;
    assert.ok(E2E_EMAIL, 'Missing E2E_EMAIL');
    assert.ok(E2E_PASSWORD, 'Missing E2E_PASSWORD');

    const driver = await createDriver();
    const selectAll = Key.chord(Key.COMMAND, 'a');

    try {
        // Arrange: sign in and open the prepared diary.
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

        // Change both fields and confirm that the draft took effect.
        await titleInput.sendKeys(selectAll, updatedDiary.title);
        await storyInput.sendKeys(selectAll, updatedDiary.story);
        assert.equal(await titleInput.getProperty('value'), updatedDiary.title);
        assert.equal(await storyInput.getProperty('value'), updatedDiary.story);

        const cancelButton = await driver.findElement(
            By.xpath('//button[normalize-space()="Cancel"]'),
        );
        await driver.wait(until.elementIsEnabled(cancelButton), waitMs);
        await cancelButton.click();

        // Verify Cancel restored both fields before refreshing the page.
        assert.equal(await titleInput.getProperty('value'), originalDiary.title);
        assert.equal(await storyInput.getProperty('value'), originalDiary.story);

        // Confirm the original values are still present after reloading.
        await driver.navigate().refresh();
        const reloaded = await getDiaryFields(driver);
        assert.equal(await reloaded.titleInput.getProperty('value'), originalDiary.title);
        assert.equal(await reloaded.storyInput.getProperty('value'), originalDiary.story);
    } finally {
        await driver.quit();
    }

    console.log('UI-07 passed: Cancel restored the original title and story before and after refresh.');
}

await cancelDiaryEdit();
