import 'babel-polyfill'
import 'colors'
import wd from 'wd'
import fetch from 'node-fetch'

const ROOT_DIR = configs.ROOT_DIR 
const FILE_NAME = configs.FILE_NAME 
const APK_DIR = `${ROOT_DIR}/${FILE_NAME}`
const username = configs.USERNAME 
const apiKey = configs.API_KEY 

var another = require('./api-request.js')
const kobitonServerConfig = {
  protocol: 'https',
  host: 'api.kobiton.com',
  auth: `${username}:${apiKey}`
}

var desiredCaps = {
  sessionName:        'Automation test session',
  sessionDescription: '', 
  deviceOrientation:  'portrait',  
  captureScreenshots: true, 
  app:                '', 
  deviceGroup:        'KOBITON', 
  deviceName:         'Galaxy A8',
  platformVersion:    '5.1.1',
  platformName:       'Android' 
//   appPackage:         'com.facebook.f8',
//   appActivity:        'com.facebook.f8.MainActivity',
//   waitAppPackage:     'com.facebook.f8',
}

async function main() {
  another.data.generateUrl(async function (url, path) {
    desiredCaps.app= 'kobiton-store:' + str(await another.data.UploadToS3(url, path))
  })
}

await main()

let driver

describe('Android App sample', () => {

  before(async () => {
    driver = wd.promiseChainRemote(kobitonServerConfig)

    driver.on('status', (info) => {
      console.log(info.cyan)
    })
    driver.on('command', (meth, path, data) => {
      console.log(' > ' + meth.yellow, path.grey, data || '')
    })
    driver.on('http', (meth, path, data) => {
      console.log(' > ' + meth.magenta, path, (data || '').grey)
    })

    try {
      await driver.init(desiredCaps)
        .source()
        .sleep(2000)
    }
    catch (err) {
      if (err.data) {
        console.error(`init driver: ${err.data}`)
        console.log(" ")
        console.log("RESULT: Failed")
        console.log("MORE INFO")
        console.log("If the error was that 'the environment you requested was unavailable' make sure all current sessions on Kobiton are completed, wait a few moments for the device to become available, or try running the test on a different device.")
        console.log("Else, contact Kobiton support for more help with troubleshooting.")
        console.log(" ")
        console.log(" ")
      }
      throw err
    }
  })

  it('should do things in the app', async () => {
    await driver
    .elementById("com.alaskaairlines.android:id/empty_deck_booktrip")
    .click()
    .sleep(10000)
    // .elementByXPath("//android.view.View[@text='One-way']")
    // .click()
    // .sleep(1000)
    // .elementById("geo-from")
    // .click().sendKeys("Atlanta")
    // .sleep(3000)
    // .elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.ViewSwitcher/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View[2]/android.view.View/android.view.View[2]/android.widget.ListView/android.view.View")
    // .click()
    // .sleep(2000)
    // .elementById("geo-to")
    // .click().sendKeys("Dallas")
    // .sleep(2000)
    // .elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.ViewSwitcher/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.widget.ListView/android.view.View[1]")
    // .click()
    // .elementById("departure-date")
    // .click()
    // .elementByXPath("//android.view.View[@text='25']")
    // .click()
    // .elementById("btnDone")
    // .click()
    
    // .elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.ViewSwitcher/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View[2]/android.view.View/android.view.View[8]/android.widget.Button")
    // .click()
    // .sleep(6000)
    })

  after(async () => {
    if (driver != null) {
      try {
        const sessionCapabilities = await driver.sessionCapabilities()
        var sessionId = sessionCapabilities.kobitonSessionId
        console.log(" ")
        console.log(" ")
        console.log("SESSION INFORMATION")
        console.log("sessionName: " + sessionCapabilities.sessionName)
        console.log("sessionDescription: " + sessionCapabilities.sessionDescription)
        console.log("deviceOrientation: " + sessionCapabilities.deviceOrientation)
        console.log("deviceName: " + sessionCapabilities.desired.deviceName)
        console.log("platformName: " + sessionCapabilities.platformName)
        console.log("app: " + sessionCapabilities.app)
        console.log("kobitonSessionId: " + sessionId)
        console.log(" ")

        console.log("TEST OUTPUT")
        var basicAuth = "Basic " + new Buffer(username + ":" + apiKey).toString("base64");
        var response = await fetch(`https://api.kobiton.com/v1/sessions/${sessionId}`, {
          headers: { 'Authorization': basicAuth }
        })
        const body = await response.json()
        console.log(" ")

        console.log("App Version:")
        var appVersionId = body.executionData.desired.appVersionId
        var appVersionResponse = await fetch(`https://api.kobiton.com/v1/app/versions/${appVersionId}`, {
          headers: { 'Authorization': basicAuth }
        })
        var appVersionBody = await appVersionResponse.json()
        console.log(appVersionBody)

        console.log(" ")
        console.log("Commands:")
        var commandsResponse = await fetch(`https://api.kobiton.com/v1/sessions/${sessionId}/commands?page=2`, {
          headers: { 'Authorization': basicAuth }
        })
        console.log(commandsResponse)
        const commandsBody = await commandsResponse.json()
        console.log(commandsBody)

        console.log(" ")
        console.log("RESULT: Succeed")

        await driver.quit()
      }
      catch (err) {
        console.error(`quit driver: ${err}`)
      }
    }
  })
})
