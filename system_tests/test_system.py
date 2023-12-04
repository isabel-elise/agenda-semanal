from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver import ActionChains
from selenium.common.exceptions import NoSuchElementException

import pytest
import time
import numpy as np
from PIL import Image

def add_event(driver, dia, nome, hora_inicio, hora_fim):
    
    element = driver.find_element(By.XPATH, "/html/body/div/div/header/span/button[2]")
    element.click()
    
    select_type = driver.find_element(By.NAME, 'selectTipo')
    select_event = Select(select_type)
    select_event.select_by_visible_text("Evento")

    select_day = driver.find_element(By.NAME, 'selectDia')
    select_week_day = Select(select_day)
    select_week_day.select_by_visible_text(dia)

    title_field = driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/form/ul/li[2]/input")
    title_field.send_keys(nome)

    begin_field = driver.find_element(By.NAME, 'horarioInicio')
    begin_field.send_keys(hora_inicio)

    end_field = driver.find_element(By.NAME, 'horarioFim')
    end_field.send_keys(hora_fim)

    time.sleep(1)
    
    create_event =  driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/form/button").click()

def add_alarm(driver, dia, nome, horario):
    
    element = driver.find_element(By.XPATH, "/html/body/div/div/header/span/button[2]")
    element.click()

    select_type = driver.find_element(By.NAME, 'selectTipo')
    select_event = Select(select_type)
    select_event.select_by_visible_text("Alarme")

    select_day = driver.find_element(By.NAME, 'selectDia')
    select_week_day = Select(select_day)
    select_week_day.select_by_visible_text(dia)

    title_field = driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/form/ul/li[2]/input")
    title_field.send_keys(nome)

    begin_field = driver.find_element(By.NAME, 'horario')
    begin_field.send_keys(horario)


    create_alarm =  driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/form/button").click()

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
        self.driver.get("http://localhost:3000/")

        add_event(self.driver, "Quarta", "Festa de Aniversário", "18:30", "21:45")
        
        title_event = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div[3]/div/div/span[1]").text
        time_event = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div[3]/div/div/span[2]").text
        day_event = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div[3]/span").text
        
        assert title_event.split("\n")[0] == "Festa de Aniversário"
        assert time_event == "18:30 - 21:45"
        assert day_event == "Quarta"

    def test_remove_event(self):
    
        self.driver.maximize_window()
        self.driver.get("http://localhost:3000/")
            
        add_event(self.driver, "Quarta", "Festa de Aniversário", "18:30", "21:45")
        
        remove_field = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div[3]/div/div/span[1]/span").click()

        with pytest.raises(NoSuchElementException):
            title_event = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div[3]/div/div/span[1]").text
            time_event = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div[3]/div/div/span[2]").text
            day_event = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div[3]/span").text

    def test_alert_appears_when_setting_alarm_over_event(self):

        self.driver.maximize_window()
        self.driver.get("http://localhost:3000/")

        add_event(self.driver, "Quarta", "Festa de Aniversário", "18:30", "21:45")
        add_alarm(self.driver, "Quarta", "Jogo de futebol", "19:30")
        
        alert = self.driver.switch_to.alert
        alert_text = alert.text
        alert.accept()
        
        assert alert_text == "Um alarme foi adicionado durante um evento!"

    def test_clear_board(self):
    
        self.driver.maximize_window()
        self.driver.get("http://localhost:3000/")
        
        time.sleep(2)
        self.driver.save_screenshot("initial_page.png")
            
        add_event(self.driver, "Segunda", "Aula", "17:00", "18:40")
        add_event(self.driver, "Terça", "Academia", "20:00", "21:30")
        add_event(self.driver, "Quarta", "Festa de Aniversário", "18:30", "21:45")
        add_event(self.driver, "Quinta", "Aula", "9:35", "11:05")
        
        add_alarm(self.driver, "Terça", "Acordar", "8:00")
        add_alarm(self.driver, "Quinta", "Acordar", "8:00")
        add_alarm(self.driver, "Quarta", "Ver jogo de futebol", "22:00")
        add_alarm(self.driver, "Sexta", "Terminar código", "16:00")
        
        clean_board = self.driver.find_element(By.XPATH, "/html/body/div/div/header/span/button[1]").click()
    
        ActionChains(self.driver).move_by_offset( 20, 0).perform()
        
        self.driver.save_screenshot("clean_board.png")
        
        initial_screenshot = np.array(Image.open("initial_page.png"))
        final_screenshot = np.array(Image.open("clean_board.png"))
        pixels_difference = np.sum(initial_screenshot - final_screenshot)
        
        assert pixels_difference == 0
