function ComponenteAlarme({ alarme }) {
  return (
    <div className="Componente-Alarme ItemAgenda">
      <span className="ItemAgenda-cabeçalho">
        {alarme.titulo}
        <span className="Componente-Alarme-X">X</span>
      </span>
      <span className="ItemAgenda-horario">{alarme.horario}</span>
    </div>
  );
}

export default ComponenteAlarme;
