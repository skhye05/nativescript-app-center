var AppCenter = require("nativescript-app-center").AppCenter;
var appCenter = new AppCenter();

describe("greet function", function() {
    it("exists", function() {
        expect(appCenter.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(appCenter.greet()).toEqual("Hello, NS");
    });
});