# Nativescript-App-Center

## Prerequisites / Requirements
Go to  [https://appcenter.ms](https://appcenter.ms) sign in and create your app (it could either be android or ios). 

You will need the App Secret key in order to start the plugin. The App Secret can be found on the Getting Started page or Settings page on the App Center portal.

## Installation

```javascript
tns plugin add nativescript-app-center
```

## Usage 

### Using the plugin in Android

Add code in your view model or component (Make sure you have replaced **{Your App Secret}** in the code sample above with your App Secret.):

#### TypeScript

```TypeScript
    import { AppCenter } from 'nativescript-app-center';
    
    let appCenter = new AppCenter();

    // To Analytics Callbacks

    appCenter.onAnalyticsListener({
      onBeforeSending: (report: any) => {
        console.log('before');
      },
      onSendingFailed: (log: any) => {
        console.log('failed');
      },
      onSendingSucceeded: (log: any) => {
        console.log('success');
      }
    });

    // To Add Crashes Callbacks

    appCenter.onCrashesListener({
      shouldProcess: (report: ErrorReport) => {
        console.log('should Process');
        return true;
      },
      shouldAwaitUserConfirmation: () => {
        console.log('Confirm');
        return false;
      },
      getErrorAttachments: (report: ErrorReport) => {
        return null;
      },
      onBeforeSending: (report: ErrorReport) => {
        console.log('before');
      },
      onSendingFailed: (report: ErrorReport, e: any) => {
        console.log('failed');
      },
      onSendingSucceeded: (report: ErrorReport) => {
        console.log('success');
      }
    });

    // Start App Center

    appCenter.start({
      analytics: true,
      crashes: true,
      appSecret: '{Your App Secret}'
    });


    // To Track Event Add

    trackEvent(): void {
        let property: Array<PropertyOption> = new Array<PropertyOption>();

        property.push({ key: "firstname", value: "john" }, { key: "surname", value: "doe" });
        appCenter.trackEvent('Clicked', property);
    }

    // To Test Crashes
    testCrash(): void {
        appCenter.testCraches();
    }
```

#### Javascript

```Javascript
    var appCenter = require("nativescript-app-center");

    var appCenter = new AppCenter();

    // To Analytics Callbacks

    appCenter.onAnalyticsListener({
      onBeforeSending: (report: any) => {
        console.log('before');
      },
      onSendingFailed: (log: any) => {
        console.log('failed');
      },
      onSendingSucceeded: (log: any) => {
        console.log('success');
      }
    });

    // To Add Crashes Callbacks

    appCenter.onCrashesListener({
      shouldProcess: (report: ErrorReport) => {
        console.log('should Process');
        return true;
      },
      shouldAwaitUserConfirmation: () => {
        console.log('Confirm');
        return false;
      },
      getErrorAttachments: (report: ErrorReport) => {
        return null;
      },
      onBeforeSending: (report: ErrorReport) => {
        console.log('before');
      },
      onSendingFailed: (report: ErrorReport, e: any) => {
        console.log('failed');
      },
      onSendingSucceeded: (report: ErrorReport) => {
        console.log('success');
      }
    });

    // Start App Center

    appCenter.start({
      analytics: true,
      crashes: true,
      push: false,
      distribute: false,
      appSecret: '{Your App Secret}'
    });


    // To Track Event Add

    exports.trackEvent = function() {
        var property = [];

        property.push({ key: "firstname", value: "john" }, { key: "surname", value: "doe" });
        appCenter.trackEvent('Clicked', property);
    }

    // To Test Crashes
    exports.testCrash = function() {
        appCenter.testCraches();
    }
```

- Run the app on the phone or emulator:
    ```bash
    tns run android
    ```


## API

### Properties

#### InitOption
    
| Property  | Type      | Description                                                                                 |
| --------- | --------- | ------------------------------------------------------------------------------------------- |
| analytics | `boolean` | Set to `true` to add App Center Analytics to your app                                       |
| crashes   | `boolean` | Set to `true` to add App Center Crashes to generate a crash log every time your app crashes |
| appSecret | `string`  | This refer to your application App Center value                                             |

#### PropertyOption
    
| Property | Type     | Description           |
| -------- | -------- | --------------------- |
| key      | `string` | Property identifier   |
| value    | `string` | Property actual value |


#### AnalyticsListener (Android Only) 
    
| Property           | Type                | Description                                                                                                |
| ------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------- |
| onBeforeSending    | `Callback Function` | Called right before sending a log. The callback can be invoked multiple times based on the number of logs. |
| onSendingFailed    | `Callback Function` | Called when sending a log failed.                                                                          |
| onSendingSucceeded | Callback Function   | Called when a log is sent successfully.                                                                    |

#### CrashesListener (Android Only)
    
| Property                    | Type                | Description                                                                                                                                                                                                             |
| --------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shouldProcess               | `Callback Function` | Called to determine whether it should wait for user confirmation before sending crash reports (return true if the crash report should be processed, otherwise false).                                                   |
| shouldAwaitUserConfirmation | `Callback Function` | Called to determine whether it should wait for user confirmation before sending crash reports (Return true if you just built a UI for user consent and are waiting for user input on that custom UI, otherwise false.). |
| getErrorAttachments         | `Callback Function` | Called to get additional information to be sent as separate ErrorAttachmentLog logs.                                                                                                                                    |
| onBeforeSending             | `Callback Function` | Called right before sending a crash report. The callback can be invoked multiple times based on the number of crash reports.                                                                                            |
| onSendingFailed             | `Callback Function` | Called when sending a crash report failed.                                                                                                                                                                              |
| onSendingSucceeded          | `Callback Function` | Called when a crash report is sent successfully.                                                                                                                                                                        |

### Methods

| Methods | Type   | Argument       | Description                                                                                                          |
| ------- | ------ | -------------- | -------------------------------------------------------------------------------------------------------------------- |
| start() | `void` | `(InitOption)` | Configure the SDK with the list of services to start. This may be called only once per application process lifetime. |

#### Analytics Methods

| Methods                | Type               | Argument                                                    | Description                                                             |
| ---------------------- | ------------------ | ----------------------------------------------------------- | ----------------------------------------------------------------------- |
| trackEvent()           | `void`             | `(eventName: string`, `poperty: PropertyOption (optional))` | Track a custom event with name.                                         |
| isAnalyticsEnabled     | `Promise<boolean>` | none                                                        | Check whether Analytics service is enabled or not. (`return a boolean`) |
| isAnalyticsEnabledSync | `boolean`          | none                                                        | Check whether Analytics service is enabled or not. `return a boolean`   |
| setAnalyticsEnabled    | `void`             | `(value: boolean)`                                          | Enable or disable Analytics service.                                    |
| onAnalyticsListener    | `void`             | `(callbacks: AnalyticsListener`)                            | Sets an analytics callback listener. (Android Only)                     |

#### Crashes Methods

| Methods                                   | Type               | Argument                         | Description                                                                                     |
| ----------------------------------------- | ------------------ | -------------------------------- | ----------------------------------------------------------------------------------------------- |
| testCrash()                               | `void`             | none                             | Generate crash test.                                                                            |
| hasCrashedInLastSession()                 | `Promise<boolean>` | none                             | Check whether the app crashed in its last session.(`return a boolean`). (Android Only)          |
| hasCrashedInLastSessionSync()             | `boolean`          | none                             | Check whether the app crashed in its last session. `return a boolean`. (Android Only)           |
| isCrashedEnabledSync()                    | `Promise<boolean>` | none                             | Check whether Crashes service is enabled or not. (`return a boolean`)                           |
| isCrashedEnabled()                        | `boolean`          | none                             | Check whether Analytics Crashes is enabled or not. `return a boolean`                           |
| setCrashesEnabled()                       | `void`             | `(value: boolean)`               | Enable or disable Crashes service.                                                              |
| onCrashesListener()                       | `void`             | `(callbacks: AnalyticsListener)` | Sets an Crashes callback listener. (Android Only)                                               |
| crashesNotifyUserConfirmationDontSend()   | `void`             | none                             | Notifies Plugins with a confirmation to not send and  handle the crash report. (Android Only)   |
| crashesNotifyUserConfirmationSend()       | `void`             | none                             | Notifies Plugins with a confirmation to send and handle the crash report.  (Android Only)       |
| crashesNotifyUserConfirmationAlwaysSend() | `void`             | none                             | Notifies Plugins with a confirmation to always send and handle the crash report. (Android Only) |


## Future Works

- Add App Center Distritube Service
- Add App Center Push Service
- Add App Center and App Center Services Other Method
    
## License

Apache License Version 2.0, January 2004
