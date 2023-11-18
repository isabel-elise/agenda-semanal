import Alarme from "../Classes/Alarme";
import Evento from "../Classes/Evento";
import { ordenarPorHorarioDeInicio } from "../Componentes/ComponenteDiaDaSemana";

describe("ordenarPorHorarioDeInicio", () => {
  test("ordena lista somente com eventos pelo horário de início", () => {
    const evento2 = new Evento(2, "Evento 2", "segunda", "08:00", "08:40");
    const evento1 = new Evento(1, "Evento 1", "segunda", "06:00", "07:40");
    const evento3 = new Evento(3, "Evento 3", "segunda", "10:00", "12:30");
    const listaDeEventos = [evento2, evento1, evento3];
    ordenarPorHorarioDeInicio(listaDeEventos);
    expect(listaDeEventos).toEqual([evento1, evento2, evento3]);
  });

  test("ordena lista somente com alarmes pelo horário de início", () => {
    const alarme2 = new Alarme(2, "Alarme 2", "terca", "15:20");
    const alarme1 = new Alarme(1, "Alarme 1", "terca", "13:10");
    const alarme3 = new Alarme(3, "Alarme 3", "terca", "17:40");
    const listaDeAlarmes = [alarme2, alarme1, alarme3];
    ordenarPorHorarioDeInicio(listaDeAlarmes);
    expect(listaDeAlarmes).toEqual([alarme1, alarme2, alarme3]);
  });

  test("ordena lista com eventos e alarmes intercalados pelo horário de início", () => {
    const alarme2 = new Alarme(3, "Alarme 2", "quarta", "20:30");
    const alarme1 = new Alarme(1, "Alarme 1", "quarta", "16:00");
    const evento2 = new Evento(4, "Evento 2", "quarta", "21:00", "22:00");
    const evento1 = new Evento(2, "Evento 1", "quarta", "17:30", "18:30");

    const listaDeItens = [alarme2, alarme1, evento1, evento2];
    ordenarPorHorarioDeInicio(listaDeItens);
    expect(listaDeItens).toEqual([alarme1, evento1, alarme2, evento2]);
  });
});
