import { Observable } from 'tns-core-modules/data/observable';
import { AppCenter } from 'nativescript-app-center';
import { InitOption, PropertyOption, CrashesListener } from 'nativescript-app-center/app-center.common';
import { ErrorReport } from 'nativescript-app-center/Models';
import * as dialogs from 'tns-core-modules/ui/dialogs';

export class HelloWorldModel extends Observable {
  public message: string;
  private appCenter: AppCenter;

  constructor() {
    super();

    this.appCenter = new AppCenter();
    this.message = "Tap Button";

    this.appCenter.onCrashesListener({
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

    this.appCenter.start({
      analytics: true,
      crashes: true,
      push: false,
      distribute: false,
      appSecret: '8b214e43-1faa-4027-aecf-850c2a16434c'
    });

  }

  trackEvent(): void {
    let property: Array<PropertyOption> = new Array<PropertyOption>();
    property.push({ key: "name", value: "mayunga2" }, { key: "Surname", value: "Jonathan" });
    this.appCenter.trackEvent('Clicked', property);
  }

  testCrash(): void {
    this.appCenter.testCraches();
  }
}
