import { useContext } from "react";
import { ItemContext } from "../App";

function ComponenteEvento({ evento }) {
  const onRemoverItem = useContext(ItemContext);

  return (
    <div className="Componente-Evento ItemAgenda">
      <span className="ItemAgenda-cabeçalho">
        {evento.titulo}
        <span
          className="App-button ItemAgenda-X Componente-Evento-X"
          onClick={() => onRemoverItem(removerEvento(evento), "Evento")}
        >
          X
        </span>
      </span>
      <span className="ItemAgenda-horario">
        {evento.horarioInicio + " - " + evento.horarioFim}
      </span>
    </div>
  );
}

function removerEvento(evento) {
  const eventosDaSemanaArmazenados = JSON.parse(
    localStorage.getItem("eventosDaSemana")
  );

  eventosDaSemanaArmazenados[evento.diaSemana] = eventosDaSemanaArmazenados[
    evento.diaSemana
  ].filter((eventoDoDia) => eventoDoDia.id !== evento.id);

  localStorage.setItem(
    "eventosDaSemana",
    JSON.stringify(eventosDaSemanaArmazenados)
  );

  const eventosAtualizados = JSON.parse(
    localStorage.getItem("eventosDaSemana")
  );
  return eventosAtualizados;
}

export default ComponenteEvento;
