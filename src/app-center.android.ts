
import { InitOption, TrackEventOption, PropertyOption, CrashesListener, AnalyticsListener } from './app-center.common';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import * as application from "tns-core-modules/application";
import { ErrorReport } from './Models';
const utils = require("tns-core-modules/utils/utils");
declare const com: any;
declare const android: any;

export class AppCenter {

    private appCenter: any;
    private classes: Array<any>;

    constructor() {
        this.appCenter = new com.microsoft.appcenter.AppCenter();
    }

    start(option: InitOption): void {

        this.classes = new Array<any>();

        if (option.analytics) {
            this.classes.push(com.microsoft.appcenter.analytics.Analytics.class);
        }

        if (option.crashes) {
            this.classes.push(com.microsoft.appcenter.crashes.Crashes.class);
        }

        if (option.distribute) {
            this.classes.push(com.microsoft.appcenter.distribute.Distribute.class);
        }

        if (option.push) {
            this.classes.push(com.microsoft.appcenter.push.Push.class);
        }

        setTimeout(() => {
            com.microsoft.appcenter.AppCenter.start(utils.ad.getApplication(), option.appSecret, this.classes);
        }, 200);
    }

    // analytics methods

    trackEvent(eventName: string, properties?: Array<PropertyOption>): void {

        if (properties) {

            let _properties: any = new java.util.HashMap();

            properties.forEach(property => {
                _properties.put(property.key, property.value);
            });

            com.microsoft.appcenter.analytics.Analytics.trackEvent(eventName, _properties);
        } else {
            com.microsoft.appcenter.analytics.Analytics.trackEvent(eventName);
        }
    }

    // isAnalyticsEnabled(callback: (enabled: boolean) => void): void {
    //     //     return new Promise((resolve, reject) => {
    //     com.microsoft.appcenter.analytics.Analytics.isEnabled().thenAccept(new com.microsoft.appcenter.utils.async.AppCenterConsumer({
    //         accept(enabled: boolean) {
    //             callback(enabled);
    //         }
    //     }));
    //     // });
    // }

    isAnalyticsEnabled(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(com.microsoft.appcenter.analytics.Analytics.isEnabled().get());
        });
    }

    isAnalyticsEnabledSync(): boolean {
        return com.microsoft.appcenter.analytics.Analytics.isEnabled().get();
    }

    setAnalyticsEnabled(arg: boolean): void {
        com.microsoft.appcenter.analytics.Analytics.setEnabled(arg);
    }

    setAnalyticsEnabledSync(arg: boolean): void {
        com.microsoft.appcenter.analytics.Analytics.setEnabled(arg);
    }


    onAnalyticsListener(callbacks: AnalyticsListener): void {
        com.microsoft.appcenter.analytics.Analytics.setListener(new com.microsoft.appcenter.analytics.channel.AnalyticsListener({
            onBeforeSending: callbacks.onBeforeSending,
            onSendingFailed: callbacks.onSendingFailed,
            onSendingSucceeded: callbacks.onSendingSucceeded
        }));
    }

    // Crashes methods

    testCraches(): void {
        com.microsoft.appcenter.crashes.Crashes.generateTestCrash();
    }

    hasCrashedInLastSession(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(com.microsoft.appcenter.crashes.Crashes.isEnabled().get());
        });
    }

    hasCrashedInLastSessionSync(): boolean {
        return com.microsoft.appcenter.crashes.Crashes.isEnabled().get();
    }

    onCrashesListener(callbacks: CrashesListener): void {

        let abstractListener = com.microsoft.appcenter.crashes.AbstractCrashesListener.extend({
            shouldProcess: (r) => {
                console.log('should Process');
                return true;
            },
            shouldAwaitUserConfirmation: () => {
                console.log('Confirm');
                dialogs.alert(`Confirm`).then(() => console.log(`Dialog closed.`));
                return false;
            },
            getErrorAttachments: () => { },
            onBeforeSending: (r) => {
                dialogs.alert(`Before`).then(() => console.log(`Dialog closed.`));
            },
            onSendingFailed: (r, e) => {
                dialogs.alert(`failed`).then(() => console.log(`Dialog closed.`));
            },
            onSendingSucceeded: (r) => {
                dialogs.alert(`succed`).then(() => console.log(`Dialog closed.`));
            }
        });

        com.microsoft.appcenter.crashes.Crashes.setListener(new abstractListener());
    }

}



