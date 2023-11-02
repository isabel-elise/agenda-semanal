import { useState, useContext, useEffect } from "react";
import { AgendaContext } from "../App.js";
import ComponenteEvento from "./ComponenteEvento";
import ComponenteAlarme from "./ComponenteAlarme";

import { converterHorarioParaMinutos } from "./ComponenteCriarItem.js";

function ComponenteDiaDaSemana({ diaDaSemana, diaAtual }) {
  const [agendaDoDia, setAgendaDoDia] = useState([]);

  const { alarmes, eventos } = useContext(AgendaContext);

  useEffect(() => {
    if (alarmes !== undefined && eventos !== undefined) {
      let listaDeItens = [...alarmes, ...eventos];
      ordenarPorHorarioDeInicio(listaDeItens);
      setAgendaDoDia(listaDeItens);
    }
  }, [alarmes, eventos]);

  return (
    <div className="Componente-DiaDaSemana">
      <div className="Componente-DiaDaSemana-areaDeEventos">
        {agendaDoDia.map((itemAgenda) => {
          let tipo = itemAgenda.horario ? "Alarme" : "Evento";
          if (tipo === "Evento") {
            return (
              <ComponenteEvento
                evento={itemAgenda}
                key={itemAgenda.id}
              ></ComponenteEvento>
            );
          } else if (tipo === "Alarme") {
            return (
              <ComponenteAlarme
                alarme={itemAgenda}
                key={itemAgenda.id}
              ></ComponenteAlarme>
            );
          } else {
            return null;
          }
        })}
      </div>
      <span
        className="Componente-DiaDaSemana-dia"
        style={diaAtual ? { backgroundColor: "#C9D1D3", color: "#748C96" } : {}}
      >
        {diaDaSemana}
      </span>
    </div>
  );
}

function ordenarPorHorarioDeInicio(lista) {
  lista.sort(function (a, b) {
    let horarioA, horarioB;

    if (a.horario) {
      const alarmeHorario = a.horario;
      horarioA = converterHorarioParaMinutos(alarmeHorario);
    } else {
      const eventoHorario = a.horarioInicio;
      horarioA = converterHorarioParaMinutos(eventoHorario);
    }

    if (b.horario) {
      const alarmeHorario = b.horario;
      horarioB = converterHorarioParaMinutos(alarmeHorario);
    } else {
      const eventoHorario = b.horarioInicio;
      horarioB = converterHorarioParaMinutos(eventoHorario);
    }

    return horarioA - horarioB;
  });
}

export default ComponenteDiaDaSemana;
