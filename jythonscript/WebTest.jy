from java.util.concurrent import TimeUnit
from io.appium.java_client.android import AndroidDriver
from java.net import URL
import configs
import base64
import unittest

class WebTest(unittest.TestCase):
    driver = None
    def setUp(self):
        print(configs.kobitonServerUrl)
        url = URL(configs.kobitonServerUrl)
        print url
        self.driver = AndroidDriver(url, configs.capabilities_web)
        self.driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS)

    def tearDown(self):
        self.driver.quit()

    def test_android_app(self):
        print('should do things on the web')
        self.driver.get("https://wordpress.com/")


        # sessionId = self.driver.desired_capabilities.get('kobitonSessionId')

        userapi = configs.username + ":" + configs.apiKey
        base64EncodedBasicAuth = base64.b64encode(userapi.encode())
        basicAuth = 'Basic ' + base64EncodedBasicAuth.decode()
        # print(sessionId)


if __name__ == '__main__':
    suite = unittest.TestLoader().loadTestsFromTestCase(WebTest)
    unittest.TextTestRunner(verbosity=2).run(suite)
