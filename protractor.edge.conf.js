const { SpecReporter } = require('jasmine-spec-reporter');

let Login_password = process.env.A365e2etest_password;

exports.config = {
    allScriptsTimeout: 10*1000,
    specs: [
        './e2e/SelectArcadiaInstance/selectArcadia.spec.ts',
        './e2e/Notebook/notebook.spec.ts',
        './e2e/SqlScripts/sqlScripts.spec.ts',
        './e2e/SqlCompute/sqlCompute.spec.ts'
    ],
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        'browserName': 'MicrosoftEdge',
        elementScrollBehavior: 1,
        nativeEvents: false 
    },
    directConnect: false,
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 60*1000,
        print: function () { }
    },
    params: {
        login: {
            email: 'a365-e2e@microsoft.com',
            password: ''
        }
    },
    plugins: [{
        package: 'jasmine2-protractor-utils',
        disableHTMLReport: false,
        htmlReportDir: './e2e/testResult/htmlReports/',
        disableScreenshot: false,
        screenshotOnExpectFailure: true,
        screenshotOnSpecFailure: true,
        screenshotPath: './e2e/testResult/screenshots/'
    }],
    onPrepare() {
        // making the browser window large enough that it shouldn't effect tests

        require('ts-node').register({
            project: 'e2e/tsconfig.e2e.json'
        });
        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));

        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './e2e/testResult/xmlReports',
            filePrefix: 'e2e-xmloutput-edge'
        }));


        // navigate to microsoft online login


        browser.ignoreSynchronization = true;
        browser.driver.get(browser.baseUrl);
        browser.driver.findElement(by.id('i0116')).sendKeys(browser.params.login.email).then(() => {
            // click sign in button
            browser.driver.findElement(by.id('idSIButton9')).click();

            // wait until finished loading next page
            browser.driver.wait(() => {
                return browser.isElementPresent(by.className('actionLink'));
            }).then(() => {
                const loginUrl = browser.driver.getCurrentUrl();

                // have to ensure synchronization isn't on yet or protractor may fail
                browser.ignoreSynchronization = true;

                // click "use password to log in"
                browser.driver.findElement(by.css('#loginMessage > a')).click();

                // send password
                browser.driver.findElement(by.id('passwordInput')).sendKeys(Login_password);

                // click submit
                browser.driver.findElement(by.id('submitButton')).click();

                browser.driver.wait(() => {
                    return browser.driver.getCurrentUrl() != loginUrl;
                }).then(() => {
                    // After login, navigate to the landing page explicitly in case AAD redirects us to some other page.
                    browser.driver.get(browser.baseUrl);
                });
            });
        }, () => {
            // User is already logged in. Do nothing.
            console.log("success");
        });
    },
    onComplete() {
        browser.driver.quit();
    }
};
