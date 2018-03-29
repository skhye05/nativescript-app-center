import { Observable } from 'tns-core-modules/data/observable';
import { AppCenter } from 'nativescript-app-center';

export class HelloWorldModel extends Observable {
  public message: string;
  private appCenter: AppCenter;

  constructor() {
    super();

    this.appCenter = new AppCenter();
    this.message = this.appCenter.message;
  }
}
