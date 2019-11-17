# Azure Data Studio Demo Mode extension README


## Features

All this extension does is toggle the editor font size between your font and a larger font size.  This is intended to help presenters while demoing in Azure Data Studio without zooming the whole interface.

![Demo Mode Demo](/images/enable_disable.gif)

## Extension Settings

This extension contributes the following settings:

* `demomode.originalFontSize`: stores your original font size when enabling/disabling demo mode
* `demomode.demoFontSize`: the larger font size to increase to when demo mode is enabled
* `demomode.telemetry`: enables anonymous usage data to be sent to an online service

## Your Privacy
The extension telemetry sends usage data anonymously to an Application Insights instance. Machine information, such as operating system or general location, may be shared with the general public in aggregate. Your information will not be sold to any third parties.  For more on the collection of telemtry in this extension, read more [here](https://www.drewsk.tech/decision:-adding-telemetry-to-azure-data-studio-extensions) or ask questions [here](https://github.com/dzsquared/demo-mode). 

## Release Notes

### 1.1.0
Adds generic telemetry for extension utilization.

### 1.0.0
Completed in the PASS Community zone, thanks for the chair!
