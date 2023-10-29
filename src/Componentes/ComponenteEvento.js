function ComponenteEvento({ evento }) {
  return (
    <div className="Componente-Evento ItemAgenda">
      <span className="ItemAgenda-cabeçalho">
        {evento.titulo}
        <span className="ItemAgenda-X">X</span>
      </span>
      <span className="ItemAgenda-horario">
        {evento.horarioInicio + " - " + evento.horarioFim}
      </span>
    </div>
  );
}

export default ComponenteEvento;
