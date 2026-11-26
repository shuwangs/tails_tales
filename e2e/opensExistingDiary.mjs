import assert from 'node:assert/strict'
import { By, Builder, Browser, Key, until } from 'selenium-webdriver';

const baseUrl = 'http://localhost:5173';
const waitMs = 5000;

const originalDiary = {
    title: 'Selenium edit fixture',
    story: 'TestDog went for a walk.',
};

const updatedDiary = {
    title: 'Selenium edit fixture — updated',
    story: 'TestDog went for a walk and played fetch.',
};

async function signIn(driver, email, password) {
    await driver.get(`${baseUrl}/login`);

    const emailInput = await driver.wait(
        until.elementLocated(By.name('email')),
        waitMs,
        'Expected the login form to load',
    );

    await emailInput.sendKeys(email);

    await driver.findElement(By.name('password')).sendKeys(password);
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(
        until.urlIs(`${baseUrl}/entries`),
        waitMs,
        'Expected sign-in to open the diary list',
    );
}

async function getDiaryFields(driver) {
    const titleInput = await driver.wait(
        until.elementLocated(By.id('entry-title')),
        waitMs,
        'Expected the diary edit form to load',
    );
    const storyInput = await driver.findElement(By.id('entry-content'));

    return { titleInput, storyInput };
}

async function saveDiary(driver) {
    const saveButton = await driver.findElement(
        By.css('button[form="edit-entry-form"]'),
    );
    await driver.wait(until.elementIsEnabled(saveButton), waitMs);
    await saveButton.click();

    await driver.wait(
        until.elementLocated(
            By.xpath('//*[@role="status" and normalize-space()="Changes saved."]'),
        ),
        15000,
        'Expected the diary to show "Changes saved."',
    );
}

async function restoreDiary(driver, { titleInput, storyInput }, selectAll) {
    const currentTitle = await titleInput.getProperty('value');
    const currentStory = await storyInput.getProperty('value');

    if (currentTitle === updatedDiary.title && currentStory === updatedDiary.story) {
        await titleInput.sendKeys(selectAll, originalDiary.title);
        await storyInput.sendKeys(selectAll, originalDiary.story);
        await saveDiary(driver);
    }
}

async function verifyDiaryEditPersists() {
    const { E2E_EMAIL, E2E_PASSWORD } = process.env;
    assert.ok(E2E_EMAIL, 'Missing E2E_EMAIL');
    assert.ok(E2E_PASSWORD, 'Missing E2E_PASSWORD');

    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    const selectAll = Key.chord(Key.COMMAND, 'a');
    let editSaveAttempted = false;

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
