



import { InitOption, TrackEventOption, PropertyOption, CrashesListener, AnalyticsListener } from './app-center.common';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import { setActivityCallbacks, AndroidActivityCallbacks } from "tns-core-modules/ui/frame";


import { ErrorReport } from './Models';
const utils = require("tns-core-modules/utils/utils");
import * as frame from "tns-core-modules/ui/frame";

declare const com: any;
declare const java: any;
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
            resolve(com.microsoft.appcenter.crashes.Crashes.hasCrashedInLastSession().get());
        });
    }

    hasCrashedInLastSessionSync(): boolean {
        return com.microsoft.appcenter.crashes.Crashes.hasCrashedInLastSession().get();
    }

    isCrashedEnabled(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(com.microsoft.appcenter.crashes.Crashes.isEnabled().get());
        });
    }

    isCrashedEnabledSync(): boolean {
        return com.microsoft.appcenter.crashes.Crashes.isEnabled().get();
    }

    onCrashesListener(callbacks: CrashesListener): void {

        let abstractListener = com.microsoft.appcenter.crashes.AbstractCrashesListener.extend({
            shouldProcess: callbacks.shouldProcess,
            shouldAwaitUserConfirmation: callbacks.shouldAwaitUserConfirmation,
            getErrorAttachments: callbacks.getErrorAttachments,
            onBeforeSending: callbacks.onBeforeSending,
            onSendingFailed: callbacks.onSendingFailed,
            onSendingSucceeded: callbacks.onSendingSucceeded
        });

        com.microsoft.appcenter.crashes.Crashes.setListener(new abstractListener());
    }

    setCrashesEnabled(arg: boolean): void {
        com.microsoft.appcenter.crashes.Crashes.setEnabled(arg);
    }

    setCrashesEnabledSync(arg: boolean): void {
        com.microsoft.appcenter.crashes.Crashes.setEnabled(arg);
    }

    crashesNotifyUserConfirmationDontSend(): void {
        com.microsoft.appcenter.crashes.Crashes.notifyUserConfirmation(com.microsoft.appcenter.crashes.Crashes.DONT_SEND);
    }

    crashesNotifyUserConfirmationSend(): void {
        com.microsoft.appcenter.crashes.Crashes.notifyUserConfirmation(com.microsoft.appcenter.crashes.Crashes.SEND);
    }

    crashesNotifyUserConfirmationAlwaysSend(): void {
        com.microsoft.appcenter.crashes.Crashes.notifyUserConfirmation(com.microsoft.appcenter.crashes.Crashes.ALWAYS_SEND);
    }
}
