import ComponenteDiaDaSemana from "./ComponenteDiaDaSemana.js";

const DIAS_DA_SEMANA = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

function ComponenteSemana() {
  return (
    <div className="Componente-Semana">
      {DIAS_DA_SEMANA.map((dia) => (
        <ComponenteDiaDaSemana diaDaSemana={dia}></ComponenteDiaDaSemana>
      ))}
    </div>
  );
}

export default ComponenteSemana;
