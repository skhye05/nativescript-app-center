import "./bundle-config";
import * as application from 'tns-core-modules/application';

import { AppCenter } from 'nativescript-app-center';

let appCenter = new AppCenter();

appCenter.start({
    analytics: true,
    crashes: true,
    push: false,
    distribute: false,
    appSecret: 'e1a7ad44-4054-4f96-b0ed-875c970bafc7'
});

application.start({ moduleName: "main-page" });
