import assert from 'node:assert/strict'
import { By, Builder, Browser, until } from 'selenium-webdriver';

const baseUrl = 'http://localhost:5173';
const diaryTitle = 'Selenium edit fixture';
const diaryStory = 'TestDog went for a walk.';


(async function opensExistingDiary() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build()
    try {
        // open the login page
        await driver.get(`${baseUrl}/login`)

        let emailInput = await driver.wait(
            until.elementLocated(By.name('email')),
            5000,
        );
        await driver.wait(until.elementIsVisible(emailInput))
        assert.ok(await emailInput.isDisplayed())

        await emailInput.sendKeys(process.env.E2E_EMAIL)

        await driver.findElement(By.name('password')).sendKeys(process.env.E2E_PASSWORD)

        await driver.findElement(By.css('button[type="submit"]')).click()

        await driver.wait(until.urlIs(`${baseUrl}/entries`), 5000)

        // check that the entries page is displayed
        const diaryLink = await driver.wait(
            until.elementLocated(By.partialLinkText(diaryTitle)),
            5000,
            'Expected the diary detail form to open',
        );

        await diaryLink.click()

        const titleInput = await driver.wait(
            until.elementLocated(By.id('entry-title')),
            5000,
            'Expected the diary detail form to open',
        )
        const storyInput = await driver.findElement(By.id('entry-content'));

        assert.equal(await titleInput.getProperty('value'), diaryTitle)
        assert.equal(await storyInput.getProperty('value'), diaryStory)

        console.log('Opened the expected diary and verified its title and story.')

    } finally {
        await driver.quit()
    }
})()