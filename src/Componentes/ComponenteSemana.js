import ComponenteDiaDaSemana from "./ComponenteDiaDaSemana.js";
import { useState, useContext, useEffect } from "react";
import { AgendaContext } from "../App.js";

const DIAS_DA_SEMANA = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

function ComponenteSemana() {
  const { alarmesDaSemana, eventosDaSemana } = useContext(AgendaContext);
  const [diaDeHoje, setDiaDeHoje] = useState("");

  useEffect(() => {
    let indiceDia = new Date().getDay();
    setDiaDeHoje(indiceDia < 5 ? DIAS_DA_SEMANA[(indiceDia - 1) % 5] : "");
  }, [alarmesDaSemana, eventosDaSemana]);

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
            diaAtual={dia === diaDeHoje}
            key={dia}
          ></ComponenteDiaDaSemana>
        </AgendaContext.Provider>
      ))}
    </div>
  );
}

export default ComponenteSemana;
