import { browser, ElementFinder, protractor } from 'protractor';
import { Helper } from '../Share/helper';

export class SqlScript {

    public async Navigate(): Promise<void> {
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('sqlScripts', 'analyze_button'));
        await Helper.clickElementWhenClickable('xpath', "//div[@aria-label='Sql Scripts. Press Alt+P to open menu.']/div");
        await browser.sleep(Helper.domStablizationTimeout);
    }

    public async RefreshSqlscripts(): Promise<void> {
        Helper.Hoveron(await Helper.readJson('sqlScripts', 'sql_scripts'), await Helper.readJson('sqlScripts', 'sql_scripts_more'));
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('sqlScripts', 'refresh_button'));
        await browser.sleep(Helper.domStablizationTimeout);
    }

    public async CreateSqlScript(): Promise<void> {
        Helper.Hoveron(await Helper.readJson('sqlScripts', 'sql_scripts'), await Helper.readJson('sqlScripts', 'sql_scripts_more'));
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('sqlScripts', 'create_button'));
        await browser.sleep(Helper.domStablizationTimeout);
    }

    public async PressEnter(): Promise<void> {
        await browser.actions().sendKeys(protractor.Key.ENTER).perform();
        await browser.sleep(Helper.domStablizationTimeout);
    }

    public async OpenSqlScript(): Promise<void> {
        await Helper.Hoveron(await Helper.readJson('sqlScripts', 'new_sql_script'), await Helper.readJson('sqlScripts', 'new_sql_script_more'));
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('sqlScripts', 'open_button'));
        await browser.sleep(Helper.domStablizationTimeout);
    }

    public async RenameSqlScript(text: string): Promise<void> {
        await Helper.Hoveron(await Helper.readJson('sqlScripts', 'sql_scripts_list'), await Helper.readJson('sqlScripts', 'sql_scripts_list_more'));
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('sqlScripts', 'rename_button'));
        await browser.sleep(Helper.domStablizationTimeout);
        let elementItem = await Helper.locateElementWithXpath(await Helper.readJson('sqlScripts', 'first_sql_script'));
        await browser.actions().doubleClick(elementItem).sendKeys(text).perform();
        await this.PressEnter();
    }
    
    public async SaveSqlScript(text: string, selector: string, from?: number): Promise<void> {
        await this.FillEditor(text, selector);
        await browser.sleep(3000);
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('sqlScripts', 'save_button'));
        await browser.sleep(3000);
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('sqlScripts', 'tab_close_button'));
        await this.OpenSqlScript();
        await browser.sleep(Helper.domStablizationTimeout);
    }

    public async SaveSecondSqlScript(text: string, selector: string): Promise<void> {
        await this.FillEditor(text, selector);
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('sqlScripts', 'save_button_second_tab'));
        await browser.sleep(Helper.domStablizationTimeout);
    }

    public async FillEditor(text: string, selector: string): Promise<void> {
        let elementItem = await Helper.locateElementWithXpath(selector);
        await browser.actions().click(elementItem).perform();
        await this.PressEnter();
        await browser.actions().sendKeys(text).perform();
    }

    public async RunSqlScript(): Promise<void> {
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('sqlScripts', 'tab_close_button'));
        await this.OpenSqlScript();
        await browser.sleep(5000);
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('sqlScripts', 'connect_to'));
        await browser.sleep(Helper.domStablizationTimeout);
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('sqlScripts', 'connnect_list'));
        await browser.sleep(Helper.domStablizationTimeout);
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('sqlScripts', 'run_button'));
        await browser.sleep(3000);
    }

    public async SwitchTabs(tablocator: string): Promise<void> {
        await Helper.clickElementWhenClickable('xpath', tablocator);
    }

    public async CloseAllTabs(): Promise<void> {
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('sqlScripts', 'tab_container_more_btn'));
        await Helper.clickButton('Close all tabs');
    }

    public async DeleteSqlScript(): Promise<void> {
        await Helper.Hoveron(await Helper.readJson('sqlScripts', 'rename_sql_script'), await Helper.readJson('sqlScripts', 'rename_sql_script_more'));
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('sqlScripts', 'delete_button'));
        await browser.sleep(Helper.domStablizationTimeout);
        let sparkclusterName = await Helper.locateElementsWithXpath(await Helper.readJson('sqlScripts', 'sql_scripts_list')).getText();
        if (sparkclusterName.indexOf('second_test_tab') !== -1) {
            await Helper.Hoveron(await Helper.readJson('sqlScripts', 'rename_second_test_tab'), await Helper.readJson('sqlScripts', 'rename_second_test_tab_more'));
            await Helper.clickElementWhenClickable('xpath', await Helper.readJson('sqlScripts', 'delete_button'));
            await browser.sleep(Helper.domStablizationTimeout);
        }
    }
}
