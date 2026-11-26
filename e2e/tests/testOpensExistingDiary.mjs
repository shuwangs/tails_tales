import assert from 'node:assert/strict'
import { By, Key, until } from 'selenium-webdriver';
import { createDriver } from '../support/browser.mjs';
import { signIn, getDiaryFields, restoreDiary, saveDiary } from '../support/diary.mjs';
import { originalDiary, updatedDiary } from '../fixtures/diaryData.mjs';

const waitMs = 5000;

async function verifyDiaryEditPersists() {
    const { E2E_EMAIL, E2E_PASSWORD } = process.env;
    assert.ok(E2E_EMAIL, 'Missing E2E_EMAIL');
    assert.ok(E2E_PASSWORD, 'Missing E2E_PASSWORD');

    const selectAll = Key.chord(Key.COMMAND, 'a');
    let editSaveAttempted = false;
    const driver = await createDriver();

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

        // Act: replace both fields and save.
        await titleInput.sendKeys(selectAll, updatedDiary.title);
        await storyInput.sendKeys(selectAll, updatedDiary.story);

        editSaveAttempted = true;
        await saveDiary(driver);

        // Assert: reload and find the fields again before checking their values.
        await driver.navigate().refresh();
        const reloaded = await getDiaryFields(driver);

        assert.equal(await reloaded.titleInput.getProperty('value'), updatedDiary.title);
        assert.equal(await reloaded.storyInput.getProperty('value'), updatedDiary.story);

    } finally {
        try {
            if (editSaveAttempted) {
                // Reload to discard any unsaved draft before checking the fixture.
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

    console.log('UI-02a passed: title and story persisted after refresh.');
}

await verifyDiaryEditPersists();
