import { browser, by } from 'protractor';
import { Helper } from '../Share/helper';
import { NoteBook } from './notebook.po';

describe('notebook test', () => {

    var nbookpo = new NoteBook();
    beforeAll(async () => {
        await nbookpo.Navigate();
        await browser.sleep(5000);
    });
    afterAll(async () => {
        await nbookpo.DeleteNotebook();
    });

    it('Refresh notebook', async () => {
        await nbookpo.RefreshNotebook();
        // TODO:need to add assertion
    });

    it('Create Notebook', async () => {
        await nbookpo.ExtendNotebook();
        await nbookpo.DeleteNotebook();
        await nbookpo.CreateNotebook();
        await nbookpo.FillInput('yyangNbook1');
        await nbookpo.PressEnter();
        await nbookpo.ClickSave();
        let notebookList = await Helper.locateElementWithXpath(await Helper.readJson('notebook', 'notebook_list')).getAttribute('innerHTML');
        expect(notebookList).toContain('yyangNbook1');
    });

    it('Open Notebook', async () => {
        await nbookpo.OpenNotebook();
        let menuitem = await Helper.locateElementWithXpath(await Helper.readJson('notebook', 'editing_area')).getAttribute('title');
        expect(menuitem).toContain('yyangNbook1');
    });

    it('Add cell', async () => {
        await nbookpo.Addcell();
        let cellNum = await Helper.locateElementsWithXpath(await Helper.readJson('notebook', 'cell_num'));
        expect<any>(cellNum.length).toEqual(2);
    });

    it('Add Markdown', async () => {
        await nbookpo.Addmarkdown();
        let cellNum = await Helper.locateElementsWithXpath(await Helper.readJson('notebook', 'markdown_num'));
        expect<any>(cellNum.length).toEqual(1);
    });

    it('Save current notebook', async () => {
        await nbookpo.InputContentIntoMarkdown();
        await nbookpo.ClickSave();
        await browser.sleep(3000);
        await nbookpo.CloseNotebook();
        await nbookpo.OpenNotebook();
        let markdownOutput = await Helper.locateElementWithXpath(await Helper.readJson('notebook', 'markdown_output')).getText();
        expect(markdownOutput).toEqual('e2etest');
    });

    it('Rename Notebook', async () => {
        await nbookpo.RenameNotebook('Renametest');
        let sparkclusterName = await Helper.locateElementWithXpath(await Helper.readJson('notebook', 'notebook_list')).getText();
        expect(sparkclusterName).toContain('Renametest');
    });

});
