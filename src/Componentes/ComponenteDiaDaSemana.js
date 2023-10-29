import { useContext, useEffect } from "react";
import { useState } from "react";
import { AgendaContext } from "./ComponenteSemana";

import Alarme from "../Classes/Alarme";
import Evento from "../Classes/Evento";
import ComponenteEvento from "./ComponenteEvento";
import ComponenteAlarme from "./ComponenteAlarme";

function ComponenteDiaDaSemana({ diaDaSemana }) {
  const [agendaDoDia, setAgendaDoDia] = useState([]);

  const { alarmes, eventos } = useContext(AgendaContext);

  useEffect(() => {
    if (alarmes !== undefined && eventos !== undefined) {
      if (diaDaSemana === "Segunda") {
        eventos.push(
          new Evento(10, "Evento Teste", "segunda", "10:00", "11:00")
        );
        alarmes.push(new Alarme(11, "Alarme Teste", "segunda", "12:00"));
      }
      setAgendaDoDia([...alarmes, ...eventos]);
    }
  }, [alarmes, eventos]);

  console.log(diaDaSemana);
  console.log(agendaDoDia);

  return (
    <div className="Componente-DiaDaSemana">
      <div className="Componente-DiaDaSemana-areaDeEventos">
        {agendaDoDia.map((itemAgenda) => {
          if (itemAgenda instanceof Evento) {
            return (
              <ComponenteEvento
                evento={itemAgenda}
                key={itemAgenda.id}
              ></ComponenteEvento>
            );
          } else if (itemAgenda instanceof Alarme) {
            return (
              <ComponenteAlarme
                alarme={itemAgenda}
                key={itemAgenda.id}
              ></ComponenteAlarme>
            );
          }
        })}
      </div>
      <span className="Componente-DiaDaSemana-dia">{diaDaSemana}</span>
    </div>
  );
}

// Função para adicionar um evento
function adicionarEvento(evento, alarmesDoDia, eventosDoDia) {
  // const alarmesDaSemanaArmazenados = JSON.parse(localStorage.getItem('alarmesDaSemana'));
  // const eventosDaSemanaArmazenados = JSON.parse(localStorage.getItem('eventosDaSemana'));
  // const alarmesDoDia = alarmesDaSemanaArmazenados[evento.diaSemana];

  const eventoHorarioInicio = evento.horarioInicio;
  const eventoHorarioFim = evento.horarioFim;

  let alarmeProgramadoDuranteEvento = false;

  for (const alarme of alarmesDoDia) {
    if (alarme instanceof Alarme) {
      let alarmeHorario = alarme.horario;

      if (
        alarmeHorario >= eventoHorarioInicio &&
        alarmeHorario <= eventoHorarioFim
      ) {
        alarmeProgramadoDuranteEvento = true;
        break; // Um alarme foi adicionado durante um evento, não é necessário continuar a verificação.
      }
    }
  }

  if (alarmeProgramadoDuranteEvento) {
    alert(
      "Há um alarme programado para tocar durante o evento que você que adicionar"
    );
  }

  eventosDoDia.push(evento);

  /*
  eventosDaSemanaArmazenados[evento.diaSemana].push(evento);

  localStorage.setItem(
    "eventosDaSemana",
    JSON.stringify(eventosDaSemanaArmazenados)
  );
  */
}

// Função para adicionar um alarme
function adicionarAlarme(alarme, alarmesDoDia, eventosDoDia) {
  //const alarmesDaSemanaArmazenados = JSON.parse(localStorage.getItem("alarmesDaSemana"));
  //const eventosDaSemanaArmazenados = JSON.parse(localStorage.getItem("eventosDaSemana"));
  //const eventosDoDia = eventosDaSemanaArmazenados[alarme.diaSemana];

  const alarmeHorario = alarme.horario;
  let alarmeAdicionadoDuranteEvento = false;

  for (const evento of eventosDoDia) {
    if (evento instanceof Evento) {
      const eventoHorarioInicio = evento.horarioInicio;
      const eventoHorarioFim = evento.horarioFim;

      if (
        alarmeHorario >= eventoHorarioInicio &&
        alarmeHorario <= eventoHorarioFim
      ) {
        alarmeAdicionadoDuranteEvento = true;
        break; // Um alarme foi adicionado durante um evento, não é necessário continuar a verificação.
      }
    }
  }

  if (alarmeAdicionadoDuranteEvento) {
    alert("Um alarme foi adicionado durante um evento!");
  }

  alarmesDoDia.push(alarme);

  /*
  alarmesDaSemanaArmazenados[alarme.diaSemana].push(alarme);

  localStorage.setItem(
    "alarmesDaSemana",
    JSON.stringify(alarmesDaSemanaArmazenados)
  );
  */
}

export default ComponenteDiaDaSemana;
