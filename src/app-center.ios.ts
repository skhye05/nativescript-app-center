



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

                MSAppCenter.startWithServices(option.appSecret, classes);

                return true;
            }
        }, {
                name: "AppDelegate",
                protocols: [UIApplicationDelegate],
            }
        );


        application.ios.delegate = AppDelegate;


    }

    // analytics methods

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

    // Crashes methods

    testCraches(): void {
        MSCrashes.generateTestCrash();
    }

    isCrashedEnabled(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(MSCrashes.isEnabled());
        });
    }

    isCrashedEnabledSync(): boolean {
        return MSCrashes.isEnabled();
    }

    setCrashesEnabled(arg: boolean): void {
        MSCrashes.setEnabled(arg);
    }
}

