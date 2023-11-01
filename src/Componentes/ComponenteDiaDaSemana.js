import { useState, useContext, useEffect } from "react";
import { AgendaContext } from "../App.js";
import ComponenteEvento from "./ComponenteEvento";
import ComponenteAlarme from "./ComponenteAlarme";

function ComponenteDiaDaSemana({ diaDaSemana }) {
  const [agendaDoDia, setAgendaDoDia] = useState([]);

  const { alarmes, eventos } = useContext(AgendaContext);

  useEffect(() => {
    if (alarmes !== undefined && eventos !== undefined) {
      setAgendaDoDia([...alarmes, ...eventos]);
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
            console.log(itemAgenda);
            return null;
          }
        })}
      </div>
      <span className="Componente-DiaDaSemana-dia">{diaDaSemana}</span>
    </div>
  );
}

export default ComponenteDiaDaSemana;
