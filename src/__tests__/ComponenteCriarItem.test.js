import Alarme from "../Classes/Alarme";
import Evento from "../Classes/Evento";
import {
  converterHorarioParaMinutos,
  verificarAlarmeEmEvento,
  verificarEventoSobreAlarme,
} from "../Componentes/ComponenteCriarItem";

describe("verificarEventoSobreAlarme", () => {
  test("identifica evento sobre alarme quase imediatamente antes", () => {
    const evento = new Evento(0, "Evento", "segunda", "10:00", "11:00");
    const alarme = new Alarme(1, "Alarme", "segunda", "10:00");

    expect(verificarEventoSobreAlarme(evento, [alarme])).toBeTruthy();
  });

  test("identifica evento sobre alarme quase imediatamente depois", () => {
    const evento = new Evento(0, "Evento", "terca", "14:00", "15:00");
    const alarme = new Alarme(1, "Alarme", "terca", "15:00");

    expect(verificarEventoSobreAlarme(evento, [alarme])).toBeTruthy();
  });

  test("identifica evento com um alarme no interior de seu intervalo", () => {
    const evento = new Evento(0, "Evento", "quarta", "19:00", "21:00");
    const alarme = new Alarme(1, "Alarme", "quarta", "20:00");

    expect(verificarEventoSobreAlarme(evento, [alarme])).toBeTruthy();
  });

  test("identifica que não há interseção entre o evento e algum alarme", () => {
    const evento = new Evento(0, "Evento", "quinta", "22:00", "23:00");
    const alarme1 = new Alarme(1, "Alarme 1", "quinta", "10:30");
    const alarme2 = new Alarme(2, "Alarme 2", "quinta", "16:10");

    expect(verificarEventoSobreAlarme(evento, [alarme1, alarme2])).toBeFalsy();
  });
});

describe("verificarAlarmeEmEvento", () => {
  test("identifica alarme em evento quase imediatamente antes", () => {
    const alarme = new Alarme(0, "Alarme", "sexta", "07:30");
    const evento = new Evento(1, "Evento", "sexta", "06:30", "07:30");

    expect(verificarAlarmeEmEvento(alarme, [evento])).toBeTruthy();
  });

  test("identifica alarme em evento quase imediatamente depois", () => {
    const alarme = new Alarme(0, "Alarme", "quinta", "09:40");
    const evento = new Evento(1, "Evento", "quinta", "09:40", "10:20");

    expect(verificarAlarmeEmEvento(alarme, [evento])).toBeTruthy();
  });

  test("identifica alarme dentro do intervalo de um evento", () => {
    const alarme = new Alarme(0, "Alarme", "quarta", "12:30");
    const evento = new Evento(1, "Evento", "quarta", "11:00", "13:00");

    expect(verificarAlarmeEmEvento(alarme, [evento])).toBeTruthy();
  });

  test("identifica que não há interseção entre o alarme e algum evento", () => {
    const alarme = new Alarme(0, "Alarme", "terca", "15:50");
    const evento1 = new Evento(1, "Evento 1", "terca", "10:30", "11:20");
    const evento2 = new Evento(2, "Evento 2", "terca", "16:15", "18:30");

    expect(verificarAlarmeEmEvento(alarme, [evento1, evento2])).toBeFalsy();
  });
});

describe("converterHorarioParaMinutos", () => {
  test("converte 0 horas em minutos", () => {
    expect(converterHorarioParaMinutos("00:00")).toBe(0);
  });
  test("converte menos de 1 hora em minutos", () => {
    expect(converterHorarioParaMinutos("00:25")).toBe(25);
  });
  test("converte exatamente 1 hora em minutos", () => {
    expect(converterHorarioParaMinutos("01:00")).toBe(60);
  });
  test("converte horários com horas e minutos para minutos", () => {
    expect(converterHorarioParaMinutos("02:30")).toBe(150);
  });
});
