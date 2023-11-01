import { useContext } from "react";
import { ItemContext } from "../App";

function ComponenteAlarme({ alarme }) {
  const onRemoverItem = useContext(ItemContext);

  return (
    <div className="Componente-Alarme ItemAgenda">
      <span className="ItemAgenda-cabeçalho">
        {alarme.titulo}
        <span
          className="Componente-Alarme-X"
          onClick={() => onRemoverItem(removerAlarme(alarme), "Alarme")}
        >
          X
        </span>
      </span>
      <span className="ItemAgenda-horario">{alarme.horario}</span>
    </div>
  );
}

export default ComponenteAlarme;

function removerEvento(id) {
  const eventosDaSemanaArmazenados = JSON.parse(
    localStorage.getItem("eventosDaSemana")
  );

  localStorage.setItem(
    "eventosDaSemana",
    JSON.stringify(
      eventosDaSemanaArmazenados.filter((evento) => evento.id !== id)
    )
  );

  const eventosAtualizados = JSON.parse(
    localStorage.getItem("eventosDaSemana")
  );
  return eventosAtualizados;
}

function removerAlarme(alarme) {
  const alarmesDaSemanaArmazenados = JSON.parse(
    localStorage.getItem("alarmesDaSemana")
  );

  alarmesDaSemanaArmazenados[alarme.diaSemana] = alarmesDaSemanaArmazenados[
    alarme.diaSemana
  ].filter((alarmeDoDia) => alarmeDoDia.id !== alarme.id);

  console.log(
    alarmesDaSemanaArmazenados[alarme.diaSemana].filter(
      (alarmeDoDia) => alarmeDoDia.id !== alarme.id
    )
  );

  localStorage.setItem(
    "alarmesDaSemana",
    JSON.stringify(alarmesDaSemanaArmazenados)
  );

  const alarmesAtualizados = JSON.parse(
    localStorage.getItem("alarmesDaSemana")
  );
  return alarmesAtualizados;
}
