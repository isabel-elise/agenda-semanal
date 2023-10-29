import ComponenteDiaDaSemana from "./ComponenteDiaDaSemana.js";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import Evento from "../Classes/Evento.js";

const DIAS_DA_SEMANA = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

const agendaVazia = {
  segunda: [],
  terca: [],
  quarta: [],
  quinta: [],
  sexta: [],
  sabado: [],
  domingo: [],
};

const AgendaContext = createContext();

function ComponenteSemana() {
  const [alarmesDaSemana, setAlarmesDaSemana] = useState({});
  const [eventosDaSemana, setEventosDaSemana] = useState({});

  useEffect(() => {
    localStorage.setItem("alarmesDaSemana", JSON.stringify(agendaVazia));
    localStorage.setItem("eventosDaSemana", JSON.stringify(agendaVazia));

    if (localStorage.getItem("alarmesDaSemana")) {
      setAlarmesDaSemana(JSON.parse(localStorage.getItem("alarmesDaSemana")));
    }
    if (localStorage.getItem("eventosDaSemana")) {
      setEventosDaSemana(JSON.parse(localStorage.getItem("eventosDaSemana")));
    }
  }, []);

  console.log();

  return (
    <div className="Componente-Semana">
      {DIAS_DA_SEMANA.map((dia) => (
        <AgendaContext.Provider
          key={dia}
          value={{
            alarmes:
              alarmesDaSemana[
                dia
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase()
              ],
            eventos:
              eventosDaSemana[
                dia
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase()
              ],
          }}
        >
          <ComponenteDiaDaSemana
            diaDaSemana={dia}
            key={dia}
          ></ComponenteDiaDaSemana>
        </AgendaContext.Provider>
      ))}
    </div>
  );
}

export { AgendaContext };
export default ComponenteSemana;
