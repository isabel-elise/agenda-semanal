import "./App.css";
import { useState, useEffect, createContext } from "react";
import ComponenteSemana from "./Componentes/ComponenteSemana";
import ComponenteCriarItem from "./Componentes/ComponenteCriarItem";
import IconeCalendario from "./Classes/Icones/IconeCalendario";
import IconeRemover from "./Classes/Icones/IconeRemover";
import IconeAdicionar from "./Classes/Icones/IconeAdicionar";

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
      setAlarmesDaSemana(agenda);
    }
    if (tipo === "Evento") {
      setEventosDaSemana(agenda);
    }
  }

  function limparAgenda() {
    localStorage.setItem("alarmesDaSemana", JSON.stringify(agendaVazia));
    localStorage.setItem("eventosDaSemana", JSON.stringify(agendaVazia));

    setAgendaDaSemana(agendaVazia, "Alarme");
    setAgendaDaSemana(agendaVazia, "Evento");
  }

  useEffect(() => {
    if (localStorage.getItem("alarmesDaSemana")) {
      setAlarmesDaSemana(JSON.parse(localStorage.getItem("alarmesDaSemana")));
    } else {
      localStorage.setItem("alarmesDaSemana", JSON.stringify(agendaVazia));
    }
    if (localStorage.getItem("eventosDaSemana")) {
      setEventosDaSemana(JSON.parse(localStorage.getItem("eventosDaSemana")));
    } else {
      localStorage.setItem("eventosDaSemana", JSON.stringify(agendaVazia));
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <IconeCalendario></IconeCalendario>
        <h1 className="App-name">Programação da semana</h1>
        <span className="ÁreaDeBotões">
          <button
            className="App-button BotaoMedio Botao-LimparAgenda"
            onClick={() => limparAgenda()}
          >
            <IconeRemover></IconeRemover>
          </button>
          <button
            className="App-button BotaoMedio Botao-CriarItem"
            onClick={() => setCriandoItem(true)}
          >
            <IconeAdicionar></IconeAdicionar>
          </button>
        </span>
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
          onDesistirDaCriacao={() => setCriandoItem(false)}
        ></ComponenteCriarItem>
      )}
    </div>
  );
}

export { AgendaContext, ItemContext };
export default App;
