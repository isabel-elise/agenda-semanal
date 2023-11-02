import { useContext } from "react";
import { ItemContext } from "../App";

function ComponenteAlarme({ alarme }) {
  const onRemoverItem = useContext(ItemContext);

  return (
    <div className="Componente-Alarme ItemAgenda">
      <span className="ItemAgenda-cabeçalho">
        {alarme.titulo}
        <button
          className="App-button ItemAgenda-X Componente-Alarme-X"
          onClick={() => onRemoverItem(removerAlarme(alarme), "Alarme")}
        >
          X
        </button>
      </span>
      <span className="ItemAgenda-horario">{alarme.horario}</span>
    </div>
  );
}

function removerAlarme(alarme) {
  const alarmesDaSemanaArmazenados = JSON.parse(
    localStorage.getItem("alarmesDaSemana")
  );

  alarmesDaSemanaArmazenados[alarme.diaSemana] = alarmesDaSemanaArmazenados[
    alarme.diaSemana
  ].filter((alarmeDoDia) => alarmeDoDia.id !== alarme.id);

  localStorage.setItem(
    "alarmesDaSemana",
    JSON.stringify(alarmesDaSemanaArmazenados)
  );

  const alarmesAtualizados = JSON.parse(
    localStorage.getItem("alarmesDaSemana")
  );
  return alarmesAtualizados;
}

export default ComponenteAlarme;
