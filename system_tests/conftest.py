import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver import ActionChains


@pytest.fixture()
def setup(request):

    chrome_options = Options()
    options = [
    "--headless",
    "--disable-gpu",
    "--window-size=1920,1200",
    "--ignore-certificate-errors",
    "--disable-extensions",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--disable-notifications",
    "--disable-popup-blocking",
    "--disable-web-security"
]
    for option in options:
        chrome_options.add_argument(option)

    request.cls.driver = webdriver.Chrome(options=chrome_options)

    url = "http://localhost:3000/"

    yield request.cls.driver
    request.cls.driver.close()
