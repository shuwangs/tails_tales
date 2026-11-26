import { By, until } from 'selenium-webdriver';
import { originalDiary, updatedDiary } from '../fixtures/diaryData.mjs';

const baseUrl = 'http://localhost:5173';
const waitMs = 5000;

export async function signIn(driver, email, password) {
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

export async function getDiaryFields(driver) {
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

export async function restoreDiary(driver, { titleInput, storyInput }, selectAll) {
    const currentTitle = await titleInput.getProperty('value');
    const currentStory = await storyInput.getProperty('value');

    if (currentTitle === updatedDiary.title && currentStory === updatedDiary.story) {
        await titleInput.sendKeys(selectAll, originalDiary.title);
        await storyInput.sendKeys(selectAll, originalDiary.story);
        await saveDiary(driver);
    }
}