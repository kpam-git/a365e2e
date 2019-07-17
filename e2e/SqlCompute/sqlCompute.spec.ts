import 'jasmine';
import { browser, by, element } from 'protractor';
import { Helper } from '../Share/helper';
import { SqlCompute } from './sqlCompute.po';

describe('Sql Compute test', () => {
    var sqlCompute = new SqlCompute();
    beforeAll(async () => {
        await sqlCompute.navigate();
    });

    it('get sql-compute-table-columns', async () => {
        await sqlCompute.clickButton(await Helper.readJson('sqlCompute', 'SqlCompute'));
        await sqlCompute.clickButton(await Helper.readJson('sqlCompute', 'SqlCompute_list'));
        await sqlCompute.clickButton(await Helper.readJson('sqlCompute', 'SqlCompute_Tables'));
        await sqlCompute.clickButton(await Helper.readJson('sqlCompute', 'SqlCompute_Tables_Person'));
        await sqlCompute.clickButton(await Helper.readJson('sqlCompute', 'SqlCompute_Tables_Column'));
        await browser.sleep(5000);
        let tableColumnsName = await element(by.xpath(await Helper.readJson('sqlCompute', 'SqlCompute_table_Columnlist')));
        expect(tableColumnsName.getAttribute('textContent')).toContain('Id_P (int, null)');
    });

    it('get sql-compute-view-columns', async () => {
        await sqlCompute.clickButton(await Helper.readJson('sqlCompute', 'SqlCompute_Views'));
        await sqlCompute.clickButton(await Helper.readJson('sqlCompute', 'SqlCompute_Views_Systemview'));
        await sqlCompute.clickButton(await Helper.readJson('sqlCompute', 'SqlCompute_Views_Systemview_information'));
        await sqlCompute.clickButton(await Helper.readJson('sqlCompute', 'SqlCompute_Views_Systemview_column'));
        await browser.sleep(5000);
        let viewColumnsName = await element(by.xpath(await Helper.readJson('sqlCompute', 'SqlCompute_view_Columnlist')));
        expect(viewColumnsName.getAttribute('textContent')).toContain('Id_P (int, null)');
    }); 

    it('new sql compute script to select top 1000', async () => {
        await sqlCompute.newEmptyScript();
        await browser.sleep(5000);
        let selectResult = await element(by.xpath(await Helper.readJson('sqlCompute', 'select_result')));
        expect(selectResult.getAttribute('textContent')).toContain('Id_P');
    });
});
