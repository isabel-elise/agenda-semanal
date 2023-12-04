import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver import ActionChains

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

    def test_create_event(self):
            
        self.driver.maximize_window()
        self.driver.get(self.get_url())

        dia = "Quarta"
        nome = "Festa de Aniversário"
        hora_inicio = "18:30"
        hora_fim = "21:45"

        element = self.driver.find_element(By.XPATH, "/html/body/div/div/header/span/button[2]")
        element.click()
        
        select_type = self.driver.find_element(By.NAME, 'selectTipo')
        select_event = Select(select_type)
        select_event.select_by_visible_text("Evento")
    
        select_day = self.driver.find_element(By.NAME, 'selectDia')
        select_week_day = Select(select_day)
        select_week_day.select_by_visible_text(dia)
    
        title_field = self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/form/ul/li[2]/input")
        title_field.send_keys(nome)
    
        begin_field = self.driver.find_element(By.NAME, 'horarioInicio')
        begin_field.send_keys(hora_inicio)
    
        end_field = self.driver.find_element(By.NAME, 'horarioFim')
        end_field.send_keys(hora_fim)
    
        create_event =  self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/form/button").click()
        
        title_event = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div[3]/div/div/span[1]").text
        time_event = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div[3]/div/div/span[2]").text
        day_event = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div[3]/span").text
        
        assert title_event.split("\n")[0] == "Festa de Aniversário"
        assert time_event == "18:30 - 21:45"
        assert day_event == "Quarta"

    def test_remove_event(self):
    
        self.driver.maximize_window()
        self.driver.get("http://localhost:3000/")
            
        dia = "Quarta"
        nome = "Festa de Aniversário"
        hora_inicio = "18:30"
        hora_fim = "21:45"
    
        element = self.driver.find_element(By.XPATH, "/html/body/div/div/header/span/button[2]")
        element.click()
        
        select_type = self.driver.find_element(By.NAME, 'selectTipo')
        select_event = Select(select_type)
        select_event.select_by_visible_text("Evento")
    
        select_day = self.driver.find_element(By.NAME, 'selectDia')
        select_week_day = Select(select_day)
        select_week_day.select_by_visible_text(dia)
    
        title_field = self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/form/ul/li[2]/input")
        title_field.send_keys(nome)
    
        begin_field = self.driver.find_element(By.NAME, 'horarioInicio')
        begin_field.send_keys(hora_inicio)
    
        end_field = self.driver.find_element(By.NAME, 'horarioFim')
        end_field.send_keys(hora_fim)
    
        create_event =  self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/form/button").click()
        
        remove_field = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div[3]/div/div/span[1]/span").click()
        
        title_event = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div[3]/div/div/span[1]").text
        time_event = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div[3]/div/div/span[2]").text
        day_event = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div[3]/span").text

    def test_alert_appears_when_setting_alarm_over_event(self):

        driver.maximize_window()
        driver.get("http://localhost:3000/")

        dia = "Quarta"
        nome = "Festa de Aniversário"
        hora_inicio = "18:30"
        hora_fim = "21:45"
        
        element = self.driver.find_element(By.XPATH, "/html/body/div/div/header/span/button[2]")
        element.click()
        
        select_type = self.driver.find_element(By.NAME, 'selectTipo')
        select_event = Select(select_type)
        select_event.select_by_visible_text("Evento")
    
        select_day = self.driver.find_element(By.NAME, 'selectDia')
        select_week_day = Select(select_day)
        select_week_day.select_by_visible_text(dia)
    
        title_field = self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/form/ul/li[2]/input")
        title_field.send_keys(nome)
    
        begin_field = self.driver.find_element(By.NAME, 'horarioInicio')
        begin_field.send_keys(hora_inicio)
    
        end_field = self.driver.find_element(By.NAME, 'horarioFim')
        end_field.send_keys(hora_fim)
    
        create_event =  self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/form/button").click()

        dia = "Quarta"
        nome = "Jogo de futebol"
        horario = "19:30"
        
        element = self.driver.find_element(By.XPATH, "/html/body/div/div/header/span/button[2]")
        element.click()
    
        select_type = self.driver.find_element(By.NAME, 'selectTipo')
        select_event = Select(select_type)
        select_event.select_by_visible_text("Alarme")
    
        select_day = self.driver.find_element(By.NAME, 'selectDia')
        select_week_day = Select(select_day)
        select_week_day.select_by_visible_text(dia)
    
        title_field = self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/form/ul/li[2]/input")
        title_field.send_keys(nome)
    
        begin_field = self.driver.find_element(By.NAME, 'horario')
        begin_field.send_keys(horario)
    
        create_alarm =  self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/form/button").click()
        
        alert = self.driver.switch_to.alert
        alert_text = alert.text
        alert.accept()
        
        assert alert_text == "Um alarme foi adicionado durante um evento!"
