import { useState } from "react";

function ComponenteCriarItem() {
  const [tipo, setTipo] = useState("Evento");

  return (
    <div className="Modal">
      <div className="Modal-overlay">
        <div className="Modal-conteudo">
          <h2>Criar novo item na agenda</h2>
          <form action="/my-handling-htmlForm-page" method="post">
            <ul>
              <li>
                <label htmlFor="selectTipo">Tipo: </label>
                <select
                  name="selectTipo"
                  value={tipo}
                  onChange={(event) => {
                    setTipo(event.target.value);
                    console.log(tipo);
                  }}
                >
                  <option value="Alarme">Alarme</option>
                  <option value="Evento">Evento</option>
                </select>
              </li>
              <li>
                <label htmlFor="titulo">Título: </label>
                <input type="text" id="titulo" name="titulo" />
              </li>
              {tipo === "Evento" ? (
                <>
                  <li>
                    <label htmlFor="horarioInicio">Início:</label>
                    <input
                      type="time"
                      id="horarioInicio"
                      name="horarioInicio"
                    />
                  </li>
                  <li>
                    <label htmlFor="horarioFim">Fim:</label>
                    <input type="time" id="horarioFim" name="horarioFim" />
                  </li>
                </>
              ) : (
                <li>
                  <label htmlFor="horario">Horário:</label>
                  <input type="time" id="horario" name="horario" />
                </li>
              )}
              <li>
                <label htmlFor="selectDia">Dia:</label>
                <select name="selectDia" defaultValue={"segunda"}>
                  <option value="segunda">Segunda</option>
                  <option value="terca">Terça</option>
                  <option value="quarta">Quarta</option>
                  <option value="quinta">Quinta</option>
                  <option value="sexta">Sexta</option>
                </select>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ComponenteCriarItem;
