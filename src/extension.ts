'use strict';
import * as vscode from 'vscode';
import { StatusBarToggle } from './statusBarToggle';

export function activate(context: vscode.ExtensionContext) {

    const statusBarToggle = new StatusBarToggle();

    context.subscriptions.push(vscode.commands.registerCommand('dsk.enableDemoMode', () => {
        var theSettings = vscode.workspace.getConfiguration();

        let oldFontSize = theSettings.get('editor.fontSize');
        let newFontSize = theSettings.get('demomode.demoFontSize');
        theSettings.update('editor.fontSize', newFontSize, vscode.ConfigurationTarget.Global);
        theSettings.update('demomode.originalFontSize', oldFontSize, vscode.ConfigurationTarget.Global);
        
        statusBarToggle.toggle(true);
    }));

    
    context.subscriptions.push(vscode.commands.registerCommand('dsk.disableDemoMode', () => {

        const workbenchConfig = vscode.workspace.getConfiguration('demomode');
        let newFontSize = workbenchConfig.get('originalFontSize');
        
        var theSettings = vscode.workspace.getConfiguration();
        theSettings.update('editor.fontSize', newFontSize, vscode.ConfigurationTarget.Global);

        statusBarToggle.toggle(false);
    }));

}


export function deactivate() {
    
}