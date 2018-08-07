from org.openqa.selenium.remote import DesiredCapabilities

username = ''
apiKey = ''
kobitonServerUrl = 'https://' + username + ':' + apiKey + '@api.kobiton.com/wd/hub'

# 100 seconds
session_timeout = 100

capabilities_web = DesiredCapabilities()
capabilities_web.setCapability("sessionName", "Automation test session")
capabilities_web.setCapability("sessionDescription", "")
capabilities_web.setCapability("deviceOrientation", "portrait")
capabilities_web.setCapability("browserName", "chrome")
capabilities_web.setCapability("deviceGroup", "KOBITON")
capabilities_web.setCapability("deviceName", "Galaxy J2 Prime")
capabilities_web.setCapability("platformVersion", "6.0.1")
capabilities_web.setCapability("platformName", "Android")

capabilities_android_app = DesiredCapabilities()
capabilities_android_app.setCapability("sessionName", "Automation test session")
capabilities_android_app.setCapability("sessionDescription", "")
capabilities_android_app.setCapability("deviceOrientation", "portrait")
capabilities_android_app.setCapability("browserName", "chrome")
capabilities_android_app.setCapability("deviceGroup", "KOBITON")
capabilities_android_app.setCapability("deviceName", "Galaxy J2 Prime")
capabilities_android_app.setCapability("platformVersion", "6.0.1")
capabilities_android_app.setCapability("platformName", "Android")
capabilities_android_app.setCapability("app", "kobiton-store:9701")
capabilities_android_app.setCapability("appPackage", "com.facebook.f8")
capabilities_android_app.setCapability("appActivity", "com.facebook.f8.MainActivity")
capabilities_android_app.setCapability("waitAppPackage", "com.facebook.f8")

capabilities_ios_app = DesiredCapabilities()
capabilities_ios_app.setCapability("sessionName", "Automation test session")
capabilities_ios_app.setCapability("sessionDescription", "")
capabilities_ios_app.setCapability("deviceOrientation", "portrait")
capabilities_ios_app.setCapability("browserName", "safari")
capabilities_ios_app.setCapability("deviceGroup", "KOBITON")
capabilities_ios_app.setCapability("deviceName", "iPhone 6")
capabilities_ios_app.setCapability("platformVersion", "11.4")
capabilities_ios_app.setCapability("platformName", "iOS")
capabilities_ios_app.setCapability("app", "kobiton-store:v5649")
