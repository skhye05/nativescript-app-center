import "./bundle-config";
import * as application from 'tns-core-modules/application';

import { AppCenter } from 'nativescript-app-center';

let appCenter = new AppCenter();

appCenter.start({
    analytics: true,
    crashes: true,
    appSecret: 'app-secret'
});

application.start({ moduleName: "main-page" });
