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
            appSecret: 'app-secret'
        });
    }
}
