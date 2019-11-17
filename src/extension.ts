'use strict';
import * as vscode from 'vscode';
import { StatusBarToggle } from './statusBarToggle';

import * as telemetryConnect from  './telemetryConnect';
let telemetryconnect: telemetryConnect.telemetryConnect = require('../telemetryConnect.json');

// extension telemetry
import TelemetryReporter from 'vscode-extension-telemetry';
const extensionId = 'demo-mode';
const extensionVersion = '1.1.0'; 
const key = telemetryconnect.token;  
let reporter;
var theSettings = vscode.workspace.getConfiguration();
const telemetryOn:boolean = ( theSettings.get('demomode.telemetry') && theSettings.get('telemetry.enableTelemetry') );

// toggle in the lower status bar
let statusBarToggle;

export function activate(context: vscode.ExtensionContext) {

    reporter = new TelemetryReporter(extensionId, extensionVersion, key);
    context.subscriptions.push(reporter);
    if ( telemetryOn ) {
        reporter.sendTelemetryEvent('activated', {}, { });
    }

    statusBarToggle = new StatusBarToggle();
    context.subscriptions.push(statusBarToggle);

    context.subscriptions.push(vscode.commands.registerCommand('dsk.enableDemoMode', () => {
        var theSettings = vscode.workspace.getConfiguration();

        let oldFontSize = theSettings.get('editor.fontSize');
        let newFontSize = theSettings.get('demomode.demoFontSize');
        theSettings.update('editor.fontSize', newFontSize, vscode.ConfigurationTarget.Global);
        theSettings.update('demomode.originalFontSize', oldFontSize, vscode.ConfigurationTarget.Global);
        
        if ( telemetryOn ) {
            reporter.sendTelemetryEvent('enabled', { }, { });
        }

        statusBarToggle.toggle(true);

    }));
    
    context.subscriptions.push(vscode.commands.registerCommand('dsk.disableDemoMode', () => {

        const workbenchConfig = vscode.workspace.getConfiguration('demomode');
        let newFontSize = workbenchConfig.get('originalFontSize');
        
        var theSettings = vscode.workspace.getConfiguration();
        theSettings.update('editor.fontSize', newFontSize, vscode.ConfigurationTarget.Global);
        
        if ( telemetryOn ) {
            reporter.sendTelemetryEvent('disabled', { }, { });
        }

        statusBarToggle.toggle(false);
    }));

}


export function deactivate() {
    reporter.dispose();
    statusBarToggle.dispose();
}