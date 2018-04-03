



import { InitOption, TrackEventOption, PropertyOption, CrashesListener, AnalyticsListener } from './app-center.common';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import { setActivityCallbacks, AndroidActivityCallbacks } from "tns-core-modules/ui/frame";
import * as application from "tns-core-modules/application";


import { ErrorReport } from './Models';
const utils = require("tns-core-modules/utils/utils");
import * as frame from "tns-core-modules/ui/frame";

declare const MSAppCenter: any;
declare const MSAnalytics: any;
declare const MSCrashes, MSCrashesDelegate, MSErrorReport: any;
declare const MSDistribute: any;
declare const MSPush: any;

declare var UIResponder: any;
declare var UIStatusBarStyle: any;
declare var UIApplication: any;
declare var UIApplicationDelegate: any;



export class AppCenter {

    private appCenter: any;
    private classes: Array<any>;

    constructor() {
        // this.appCenter = new MSAppCenter();
    }

    start(option: InitOption): void {

        let AppDelegate = UIResponder.extend({
            applicationDidFinishLaunchingWithOptions: function (application, launchOptions) {

                MSCrashes.setDelegate(this);

                const classes = NSMutableArray.alloc().init();

                if (option.analytics) {
                    classes.addObject(MSAnalytics);
                }

                if (option.crashes) {
                    classes.addObject(MSCrashes);
                }

                if (option.distribute) {
                    classes.addObject(MSDistribute);
                }

                if (option.push) {
                    classes.addObject(MSPush);
                }

                MSAppCenter.startWithServices(option.appSecret, classes);

                return true;
            },
            shouldProcessErrorReport: (crashes, errorReport) => {
                console.log('Process');

                return true;
            }
        }, {
                name: "AppDelegate",
                protocols: [UIApplicationDelegate, MSCrashesDelegate],

                exposedMethods: {
                    // Declare the signature of the aboutTap. We can not infer it, since it is not inherited from base class or protocol.
                    aboutTap: { returns: interop.types.bool, params: [MSErrorReport] }
                }
            });


        application.ios.delegate = AppDelegate;


    }

    // analytics methods

    getAna(): any {
        return MSAnalytics;
    }

    trackEvent(eventName: string, properties?: Array<PropertyOption>): void {

        if (properties) {
            let _properties = NSMutableDictionary.alloc().init();

            properties.forEach(property => {
                _properties.setValueForKey(property.key, property.value);
            });

            MSAnalytics.trackEventWithProperties(eventName, _properties);
        } else {
            MSAnalytics.trackEvent(eventName);
        }
    }

    // isAnalyticsEnabled(callback: (enabled: boolean) => void): void {
    //     //     return new Promise((resolve, reject) => {
    //     MSAnalytics.isEnabled().thenAccept(new com.microsoft.appcenter.utils.async.AppCenterConsumer({
    //         accept(enabled: boolean) {
    //             callback(enabled);
    //         }
    //     }));
    //     // });
    // }

    isAnalyticsEnabled(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(MSAnalytics.isEnabled());
        });
    }

    isAnalyticsEnabledSync(): boolean {
        return MSAnalytics.isEnabled();
    }

    setAnalyticsEnabled(arg: boolean): void {
        MSAnalytics.setEnabled(arg);
    }

    setAnalyticsEnabledSync(arg: boolean): void {
        MSAnalytics.setEnabled(arg);
    }


    onAnalyticsListener(callbacks: AnalyticsListener): void {

        // MSAnalytics.setListener(new com.microsoft.appcenter.analytics.channel.AnalyticsListener({
        //     onBeforeSending: callbacks.onBeforeSending,
        //     onSendingFailed: callbacks.onSendingFailed,
        //     onSendingSucceeded: callbacks.onSendingSucceeded
        // }));
    }

    // Crashes methods

    testCraches(): void {
        MSCrashes.generateTestCrash();
    }

    hasCrashedInLastSession(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(MSCrashes.hasCrashedInLastSession().get());
        });
    }

    hasCrashedInLastSessionSync(): boolean {
        return MSCrashes.hasCrashedInLastSession().get();
    }

    isCrashedEnabled(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(MSCrashes.isEnabled());
        });
    }

    isCrashedEnabledSync(): boolean {
        return MSCrashes.isEnabled();
    }

    onCrashesListener(callbacks: CrashesListener): void {

        // let abstractListener = com.microsoft.appcenter.crashes.AbstractCrashesListener.extend({
        //     shouldProcess: callbacks.shouldProcess,
        //     shouldAwaitUserConfirmation: callbacks.shouldAwaitUserConfirmation,
        //     getErrorAttachments: callbacks.getErrorAttachments,
        //     onBeforeSending: callbacks.onBeforeSending,
        //     onSendingFailed: callbacks.onSendingFailed,
        //     onSendingSucceeded: callbacks.onSendingSucceeded
        // });

        // MSCrashes.setListener(new abstractListener());
    }

    setCrashesEnabled(arg: boolean): void {
        MSCrashes.setEnabled(arg);
    }

    setCrashesEnabledSync(arg: boolean): void {
        MSCrashes.setEnabled(arg);
    }

    crashesNotifyUserConfirmationDontSend(): void {
        MSCrashes.notifyUserConfirmation(MSCrashes.DONT_SEND);
    }

    crashesNotifyUserConfirmationSend(): void {
        MSCrashes.notifyUserConfirmation(MSCrashes.SEND);
    }

    crashesNotifyUserConfirmationAlwaysSend(): void {
        MSCrashes.notifyUserConfirmation(MSCrashes.ALWAYS_SEND);
    }

    // Distribute

    isDistributeEnabled(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(MSDistribute.isEnabled().get());
        });
    }

    isDistributeEnabledSync(): boolean {
        return MSDistribute.isEnabled().get();
    }

    onDistribute(onReleaseAvailable?: (activity, releaseDetails) => boolean): void {
        // let customerListener = new MSDistributeListener.extend({
        //     onReleaseAvailable: onReleaseAvailable
        // });

        // MSDistribute.setListener(new customerListener());
    }

    setDistributeEnabled(arg: boolean): void {
        MSDistribute.setEnabled(arg);
    }

    // Push


}

// @JavaProxy("com.tns.NativeScriptActivity")
// class Activity extends android.app.Activity {
//     private _callbacks: AndroidActivityCallbacks;

//     protected onCreate(savedInstanceState: android.os.Bundle): void {
//         if (!this._callbacks) {
//             setActivityCallbacks(this);
//         }
//         this._callbacks.onCreate(this, savedInstanceState, super.onCreate);

//         console.info(`MainActivity.onStart`);
//     }

//     protected onSaveInstanceState(outState: android.os.Bundle): void {
//         this._callbacks.onSaveInstanceState(this, outState, super.onSaveInstanceState);
//     }

//     protected onStart(): void {
//         this._callbacks.onStart(this, super.onStart);
//         console.info(`MainActivity.onStart`);
//     }

//     protected onStop(): void {
//         this._callbacks.onStop(this, super.onStop);
//     }

//     protected onDestroy(): void {
//         this._callbacks.onDestroy(this, super.onDestroy);
//     }

//     public onBackPressed(): void {
//         console.log('start');
//         this._callbacks.onBackPressed(this, super.onBackPressed);
//     }

//     public onRequestPermissionsResult(requestCode: number, permissions: Array<String>, grantResults: Array<number>): void {
//         this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined /*TODO: Enable if needed*/);
//     }

//     protected onActivityResult(requestCode: number, resultCode: number, data: android.content.Intent): void {
//         this._callbacks.onActivityResult(this, requestCode, resultCode, data, super.onActivityResult);
//     }

//     onNewIntent(intent: android.content.Intent): void {
//         super.onNewIntent(intent);
//         // const activity = application.android.foregroundActivity || application.android.startActivity;
//         // if (activity) {
//         //   activity.setIntent(intent);
//         //   nfcIntentHandler.savedIntent = intent;
//         //   nfcIntentHandler.parseMessage();
//         // }
//     }

// }



