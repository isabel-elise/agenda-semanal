function ComponenteDiaDaSemana({ diaDaSemana }) {
  return (
    <div className="Componente-DiaDaSemana">
      <div className="Componente-DiaDaSemana-areaDeEventos"></div>
      <span className="Componente-DiaDaSemana-dia">{diaDaSemana}</span>
    </div>
  );
}

export default ComponenteDiaDaSemana;
