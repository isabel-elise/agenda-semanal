import "./App.css";
import { useState, useEffect, createContext } from "react";
import ComponenteSemana from "./Componentes/ComponenteSemana";
import ComponenteCriarItem from "./Componentes/ComponenteCriarItem";

import Alarme from "./Classes/Alarme";
import Evento from "./Classes/Evento";

const agendaVazia = {
  segunda: [],
  terca: [],
  quarta: [],
  quinta: [],
  sexta: [],
};

const AgendaContext = createContext();
const ItemContext = createContext();

function App() {
  const [alarmesDaSemana, setAlarmesDaSemana] = useState(agendaVazia);
  const [eventosDaSemana, setEventosDaSemana] = useState(agendaVazia);
  const [criandoItem, setCriandoItem] = useState(false);

  function setAgendaDaSemana(agenda, tipo) {
    if (tipo === "Alarme") {
      console.log("Modificando Alarmes");
      setAlarmesDaSemana(agenda);
    }
    if (tipo === "Evento") {
      setEventosDaSemana(agenda);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("alarmesDaSemana")) {
      setAlarmesDaSemana(JSON.parse(localStorage.getItem("alarmesDaSemana")));
    } else {
      localStorage.setItem("alarmesDaSemana", JSON.stringify(alarmesDaSemana));
    }
    if (localStorage.getItem("eventosDaSemana")) {
      setEventosDaSemana(JSON.parse(localStorage.getItem("eventosDaSemana")));
    } else {
      localStorage.setItem("eventosDaSemana", JSON.stringify(eventosDaSemana));
    }
  }, []);

  useEffect(() => {
    console.log(alarmesDaSemana);
  }, [alarmesDaSemana]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-name">Programação da semana</h1>
        <button className="App-button">x</button>
        <button className="App-button" onClick={() => setCriandoItem(true)}>
          +
        </button>
      </header>
      <AgendaContext.Provider value={{ alarmesDaSemana, eventosDaSemana }}>
        <ItemContext.Provider value={setAgendaDaSemana}>
          <ComponenteSemana></ComponenteSemana>
        </ItemContext.Provider>
      </AgendaContext.Provider>
      {criandoItem && (
        <ComponenteCriarItem
          onItemCriado={(agenda, tipo) => {
            setAgendaDaSemana(agenda, tipo);
            setCriandoItem(false);
          }}
        ></ComponenteCriarItem>
      )}
    </div>
  );
}

export { AgendaContext, ItemContext };
export default App;
