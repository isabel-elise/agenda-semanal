import pytest

@pytest.mark.usefixtures("setup")
class TestSystem:
    def test_form_appears_proprely(self):
        
        self.driver.get("http://localhost:3000/")
        element = self.driver.find_element(By.XPATH, "/html/body/div/div/header/span/button[2]")
        element.click()
        
        button_type = self.driver.find_element(By.NAME, 'selectTipo')
        button_day = self.driver.find_element(By.NAME, 'selectDia')
        title = self.driver.find_element(By.NAME, 'titulo')
        button_begin = self.driver.find_element(By.NAME, 'horarioInicio')
        button_end = self.driver.find_element(By.NAME, 'horarioFim')
