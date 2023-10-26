import "./App.css";
import ComponenteSemana from "./Componentes/ComponenteSemana";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-name">Programação da semana</h1>
        <button className="App-button">x</button>
        <button className="App-button">+</button>
      </header>
      <ComponenteSemana></ComponenteSemana>
    </div>
  );
}

export default App;
