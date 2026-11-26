// Start Chrome and configure headless mode
import { Builder, Browser } from 'selenium-webdriver';

export const createDriver = async () => {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    return driver;
};