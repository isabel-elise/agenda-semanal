import pytest

@pytest.mark.usefixtures("setup")
class TestSystem:
    def test_form_appears_proprely(self):
        
        self.driver.get(url)
        element = driver.find_element(By.XPATH, "/html/body/div/div/header/span/button[2]")
        element.click()
        
        button_type = driver.find_element(By.NAME, 'selectTipo')
        button_day = driver.find_element(By.NAME, 'selectDia')
        title = driver.find_element(By.NAME, 'titulo')
        button_begin = driver.find_element(By.NAME, 'horarioInicio')
        button_end = driver.find_element(By.NAME, 'horarioFim')
