import { browser, by, element, ElementFinder, ExpectedConditions } from 'protractor';
import { Helper } from '../Share/helper';
const INSTANCE = 'mandywtest0619';

export class WorkspacePage {

    // Azure Active Directory
    public async selectAAD(): Promise<void> {
        await Helper.clickElementWhenClickable('css', await Helper.readJson('Arcadia', 'aad_frame'));
        await Helper.clickElementWhenClickable('css', '.option-text', 'Microsoft');
    }

    // Subscription
    public async selectSubscription(): Promise<void> {
        await Helper.clickElementWhenClickable('css', await Helper.readJson('Arcadia', 'subscription_frame'));
        await Helper.clickElementWhenClickable('css', '.option-text', 'A365 Workspace Dev');
    }

    // Workspace Name
    public async selectInstanceName(): Promise<void> {
        await Helper.clickElementWhenClickable('css', await Helper.readJson('Arcadia', 'workspace_frame'));
        await Helper.clickElementWhenClickable('css', '.option-text', INSTANCE);
    }

    // continue button
    public async sendContinueBtn(): Promise<void> {
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('Arcadia', 'continue_btn'));
    }

    // Instance Name 
    public async currentName(): Promise<string> {
        let azureLabel = await Helper.locateElementWithXpath(await Helper.readJson('Arcadia', 'azureLabel'));
        await browser.wait(
            ExpectedConditions.visibilityOf(azureLabel),
            Helper.elementWaitTimeout,
            'loading page not finish');
        let curName = await Helper.locateElementWithXpath(await Helper.readJson('Arcadia', 'current_name')).getText();
        return curName;
    }
}
