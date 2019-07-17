import 'jasmine';
import { browser } from 'protractor';
import { Helper } from '../Share/helper';
import { SqlScript} from './sqlScripts.po';

describe('Sql Scripts test', () => {
    var sqlScript = new SqlScript();
    beforeAll(async () => {
        await sqlScript.Navigate();
        let sparkclusterName = await Helper.locateElementsWithXpath(await Helper.readJson('sqlScripts', 'sql_scripts_list')).getText();
        if (sparkclusterName.indexOf('v-qionwu') !== -1) {
            await sqlScript.DeleteSqlScript();
        }
        await browser.sleep(5000);
    });

    it('Refresh Sql Scripts', async () => {
        await sqlScript.RefreshSqlscripts();
        // TODO:need to add assertion
    });

    it('Create Sql Script', async () => {
        await browser.sleep(Helper.domStablizationTimeout);
        let sparkclusterName = await Helper.locateElementsWithXpath(await Helper.readJson('sqlScripts', 'sql_scripts_list')).getText();
        await browser.sleep(Helper.domStablizationTimeout);
        await sqlScript.CreateSqlScript();
        let newsparkclusterName = await Helper.locateElementsWithXpath(await Helper.readJson('sqlScripts', 'sql_scripts_list')).getText();
        expect(newsparkclusterName.length - sparkclusterName.length).toEqual(1);
    });

    it('Rename Sql Script', async () => {
        await sqlScript.RenameSqlScript('v-qionwu');
        let sqlScriptName = await Helper.locateElementsWithXpath(await Helper.readJson('sqlScripts', 'sql_scripts_list')).getText();
        expect(sqlScriptName).toContain('v-qionwu');
    });

    it('Open Sql Script', async () => {
        await sqlScript.OpenSqlScript();
        let menuitem = await Helper.locateElementsWithXpath(await Helper.readJson('sqlScripts', 'menu_list')).getAttribute('title');
        expect(menuitem).toContain('v-qionwu');
    });

    it('Save Sql Script', async () => {
        await sqlScript.SaveSqlScript('Select * from Persons', await Helper.readJson('sqlScripts', 'editor'));
        let sqlscripts = await Helper.locateElementsWithXpath(await Helper.readJson('sqlScripts', 'first_tab_editor_content')).getText();
        expect(sqlscripts).toContain('Select * from Persons');
    });

    it('Run Sql Script', async () => {
        await sqlScript.RunSqlScript();
        await browser.sleep(5000);
        let result = await Helper.locateElementWithXpath(await Helper.readJson('sqlScripts', 'run_result')).getText();
        expect(result).not.toBeNull();
    });

    it('Open more tabs on the same time', async () => {
        await sqlScript.CloseAllTabs();
        await sqlScript.OpenSqlScript();
        await sqlScript.CreateSqlScript();
        await sqlScript.RenameSqlScript('second_test_tab');
        await sqlScript.SwitchTabs(await Helper.readJson('sqlScripts', 'second_tab'));
        await sqlScript.SaveSecondSqlScript('Sql Script in second tabs', await Helper.readJson('sqlScripts', 'editor_second_tab'));
        await sqlScript.SwitchTabs(await Helper.readJson('sqlScripts', 'first_tab'));
        let fisrtSqlscriptDisplay = await Helper.locateElementWithXpath(await Helper.readJson('sqlScripts', 'first_tab_editor_content')).isDisplayed();
        expect(fisrtSqlscriptDisplay).toEqual(true);
        await sqlScript.SwitchTabs(await Helper.readJson('sqlScripts', 'second_tab'));
        let secondSqlScriptDisplay = await Helper.locateElementWithXpath(await Helper.readJson('sqlScripts', 'second_tab_editor_content')).isDisplayed();
        expect(secondSqlScriptDisplay).toEqual(true);
    });

    it('Delete Sql Script', async () => {
        await sqlScript.DeleteSqlScript();
        let sqlScriptName = await Helper.locateElementsWithXpath(await Helper.readJson('sqlScripts', 'sql_scripts_list')).getText();
        expect(sqlScriptName).not.toContain('v-qionwu');
    });
});
