import { browser, by, element, ElementFinder, ExpectedConditions, protractor } from 'protractor';
import { Helper } from '../Share/helper';
export class NoteBook {

    public async Navigate(): Promise<void> {
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('notebook', 'navi_icon'));
        await browser.sleep(Helper.domStablizationTimeout);
    }

    public async Hoveron(element: string, morebtn: string): Promise<void> {
        let elementItem: ElementFinder = await Helper.locateElementWithXpath(element);
        await browser.actions().mouseMove(elementItem).perform();
        await browser.sleep(Helper.domStablizationTimeout);
        await Helper.clickElementWhenClickable('xpath', morebtn);
        await browser.sleep(Helper.domStablizationTimeout);
    }

    public async RefreshNotebook(): Promise<void> {
        await this.Hoveron(await Helper.readJson('notebook', 'notebook_menu'), await Helper.readJson('notebook', 'more_btn'));
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('notebook', 'refresh_btn'));
        await browser.sleep(Helper.domStablizationTimeout);
    }

    public async CreateNotebook(): Promise<void> {
        await this.Hoveron(await Helper.readJson('notebook', 'notebook_menu'), await Helper.readJson('notebook', 'more_btn'));
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('notebook', 'create_btn'));
        await browser.sleep(Helper.domStablizationTimeout);
    }

    public async FillInput(nbookName: string): Promise<void> {
        let divname = await Helper.locateElementWithXpath(await Helper.readJson('notebook', 'name_input'));
        await browser.actions().doubleClick(divname).perform();
        await browser.actions().sendKeys(nbookName).perform();
        await browser.sleep(Helper.domStablizationTimeout);
    }

    public async PressEnter(): Promise<void> {
        await browser.actions().sendKeys(protractor.Key.ENTER).perform();
        await browser.sleep(5000);
    }

    public async OpenNotebook(): Promise<void> {
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('notebook', 'notebook_item'));
        await browser.sleep(Helper.domStablizationTimeout);
    }

    public async RenameNotebook(name: string): Promise<void> {
        await this.Hoveron(await Helper.readJson('notebook', 'notebook_n_item_parent'), await Helper.readJson('notebook', 'notebook_n_item_more_btn'));
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('notebook', 'rename_btn'));
        await browser.sleep(Helper.domStablizationTimeout);
        let divname = await Helper.locateElementWithXpath(await Helper.readJson('notebook', 'name_input'));
        await browser.actions().doubleClick(divname).perform();
        await browser.actions().sendKeys(name).perform();
        await this.PressEnter();
    }

    public async Addcell(): Promise<void> {
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('notebook', 'addcell_btn'));
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('notebook', 'code'));
    }

    public async Addmarkdown(): Promise<void> {
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('notebook', 'addcell_btn'));
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('notebook', 'markdown'));
    }

    public async InputContentIntoMarkdown(): Promise<void> {
        let markdownEditor = await Helper.locateElementWithXpath(await Helper.readJson('notebook', 'markdown_editor'));
        await browser.actions().click(markdownEditor).perform();
        await browser.actions().sendKeys('e2etest').perform();
    }

    public async ClickSave(): Promise<void> {
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('notebook', 'save_btn'));
    }

    public async CloseNotebook(): Promise<void> {
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('notebook', 'close_notebook_item'));
    }

    public async ExtendNotebook(): Promise<void> {
        await Helper.clickElementWhenClickable('xpath', await Helper.readJson('notebook', 'extend_notebook'));
    }

    // if yyangNbook1 exist then delete it 
    public async DeleteNotebook(): Promise<void> {
        let nbookNameList: string;
        nbookNameList = await Helper.locateElementsWithXpath(await Helper.readJson('notebook', 'notebook_list')).getAttribute('innerHTML');
        if (Array.from(nbookNameList).some(name => name.indexOf('yyangNbook1') !== -1)) {
            await this.Hoveron(await Helper.readJson('notebook', 'notebook_n_item_parent'), await Helper.readJson('notebook', 'notebook_n_item_more_btn'));
            await Helper.clickElementWhenClickable('xpath', await Helper.readJson('notebook', 'delete_btn'));
        }
        if (Array.from(nbookNameList).some(name => name.indexOf('Renametest') !== -1)) {
            await this.Hoveron(await Helper.readJson('notebook', 'notebook_r_item_parent'), await Helper.readJson('notebook', 'notebook_r_item_more_btn'));
            await Helper.clickElementWhenClickable('xpath', await Helper.readJson('notebook', 'delete_btn'));
        }
        await browser.sleep(Helper.elementWaitTimeout);
    }
}
