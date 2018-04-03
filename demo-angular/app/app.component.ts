import { Component } from "@angular/core";
import { AppCenter } from "nativescript-app-center";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {
    private appCenter = new AppCenter();
    constructor() {
        this.appCenter.start({
            analytics: true,
            crashes: true,
            push: false,
            distribute: false,
            appSecret: 'e1a7ad44-4054-4f96-b0ed-875c970bafc7'
        });
    }
}
