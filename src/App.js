import { useState } from "react";
import "./App.css";
import ComponenteSemana from "./Componentes/ComponenteSemana";
import ComponenteCriarItem from "./Componentes/ComponenteCriarItem";

function App() {
  const [criandoItem, setCriandoItem] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-name">Programação da semana</h1>
        <button className="App-button">x</button>
        <button className="App-button">+</button>
      </header>
      <ComponenteSemana></ComponenteSemana>
      {criandoItem && <ComponenteCriarItem></ComponenteCriarItem>}
    </div>
  );
}

export default App;
