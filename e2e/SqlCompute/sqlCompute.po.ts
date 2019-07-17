import { browser, ElementFinder, protractor } from 'protractor';
import { Helper } from '../Share/helper';

export class SqlCompute {

    public async navigate(): Promise<void> {
        await browser.sleep(Helper.domStablizationTimeout);
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('sqlCompute', 'Date_button'));
        await browser.sleep(Helper.domStablizationTimeout);
    }

    public async clickButton(locator: string): Promise<void> {
        await Helper.clickElementWhenClickable('xpath', locator);
        await browser.sleep(Helper.domStablizationTimeout);
    }

    public async RefreshSqlCompute(): Promise<void> {
        await Helper.Hoveron(await Helper.readJson('sqlCompute', 'sql_queries'), await Helper.readJson('sqlCompute', 'sql_queries_more'));
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('sqlCompute', 'refresh_button'));
        await browser.sleep(Helper.domStablizationTimeout);
    }

    public async newEmptyScript(): Promise<void> {
        await Helper.Hoveron(await Helper.readJson('sqlCompute', 'SqlCompute_Tables_Person'), await Helper.readJson('sqlCompute', 'app-folder-menu'));
        await Helper.Hoveron(await Helper.readJson('sqlCompute', 'new_sql_script'), await Helper.readJson('sqlCompute', 'select_top_1000'));
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('sqlCompute', 'tab_close_button'));
    }
}
