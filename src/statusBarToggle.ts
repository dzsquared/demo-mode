import { Disposable, StatusBarItem, window } from 'vscode';
// implementation of status bar toggle borrowed with love
// from the sfdx vscode extensions
// https://github.com/forcedotcom/salesforcedx-vscode/

export class StatusBarToggle implements Disposable {
    private static readonly enableDemoModeCommand = 'dsk.enableDemoMode';
    private static readonly disableDemoModeCommand = 'dsk.disableDemoMode';
    private static readonly showIcon = '$(organization) Enable Demo Mode';
    private static readonly hideIcon = '$(person) Disable Demo Mode';
    private static readonly enableToolTip = 'Enable Demo Mode';
    private static readonly disableToolTip = 'Disable Demo Mode';
    private isEnabled: boolean;
    private statusBarItem: StatusBarItem;

    constructor() {
        this.statusBarItem = window.createStatusBarItem();
        this.statusBarItem.command = StatusBarToggle.enableDemoModeCommand;
        this.statusBarItem.text = StatusBarToggle.showIcon;
        this.statusBarItem.tooltip = StatusBarToggle.enableToolTip;
        this.statusBarItem.show();
        this.isEnabled = false;
    }

    public toggle(active: boolean) {
        if (active) {
            this.statusBarItem.text = StatusBarToggle.hideIcon;
            this.isEnabled = true;
            this.statusBarItem.command = StatusBarToggle.disableDemoModeCommand;
            this.statusBarItem.tooltip = StatusBarToggle.disableToolTip;
        } else {
            this.statusBarItem.text = StatusBarToggle.showIcon;
            this.isEnabled = false;
            this.statusBarItem.command = StatusBarToggle.enableDemoModeCommand;
            this.statusBarItem.tooltip = StatusBarToggle.enableToolTip;
        }
    }

    public dispose() {
        this.statusBarItem.dispose();
    }
}