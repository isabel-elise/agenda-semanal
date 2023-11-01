import ComponenteDiaDaSemana from "./ComponenteDiaDaSemana.js";
import { useContext, useEffect } from "react";
import { AgendaContext } from "../App.js";

const DIAS_DA_SEMANA = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

function ComponenteSemana() {
  const { alarmesDaSemana, eventosDaSemana } = useContext(AgendaContext);

  useEffect(() => {
    console.log("Semana:", alarmesDaSemana);
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
            key={dia}
          ></ComponenteDiaDaSemana>
        </AgendaContext.Provider>
      ))}
    </div>
  );
}

export default ComponenteSemana;
