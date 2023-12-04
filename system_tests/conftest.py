import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager


@pytest.fixture()
def setup(request):

    chrome_options = Options()
    options = [
    "--headless",
    "--disable-notifications",
    "--disable-popup-blocking",
    "--disable-web-security"
]
    for option in options:
        chrome_options.add_argument(option)

    request.cls.driver = webdriver.Chrome(options=chrome_options)

    def get_url():
        return "http://localhost:3000/"

    yield request.cls.driver
    request.cls.driver.close()
