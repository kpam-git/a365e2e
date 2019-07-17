import 'jasmine';
import { WorkspacePage } from './selectArcadia.po';

describe('workspace setting', () => {
    var workspaceinstance = new WorkspacePage();

    it('Select Arcadia Instance', async () => {
        await workspaceinstance.selectAAD();
        await workspaceinstance.selectSubscription();
        await workspaceinstance.selectInstanceName();
        await workspaceinstance.sendContinueBtn();
        expect(await workspaceinstance.currentName()).toContain('mandywtest0619');
    });
});

