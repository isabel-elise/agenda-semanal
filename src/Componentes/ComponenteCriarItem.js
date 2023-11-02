import { useState } from "react";
import Alarme from "../Classes/Alarme";
import Evento from "../Classes/Evento";

function ComponenteCriarItem({ onItemCriado, onDesistirDaCriacao }) {
  const [tipo, setTipo] = useState("Evento");
  const [titulo, setTitulo] = useState("");
  const [horarioInicio, setHorarioInicio] = useState("00:00");
  const [horarioFim, setHorarioFim] = useState("00:00");
  const [horario, setHorario] = useState("00:00");
  const [diaDaSemana, setDiaDaSemana] = useState("segunda");

  function criarItem(event) {
    event.preventDefault();

    if (tipo === "Alarme") {
      const alarme = new Alarme(
        Math.floor(Math.random() * 999),
        titulo,
        diaDaSemana,
        horario
      );
      let alarmesAtualizados = adicionarAlarme(alarme);
      onItemCriado(alarmesAtualizados, tipo);
    }
    if (tipo === "Evento") {
      const evento = new Evento(
        Math.floor(Math.random() * 999),
        titulo,
        diaDaSemana,
        horarioInicio,
        horarioFim
      );
      let eventosAtualizados = adicionarEvento(evento);
      onItemCriado(eventosAtualizados, tipo);
    }
  }

  return (
    <div className="Modal">
      <div
        className="Modal-overlay"
        onClick={() => onDesistirDaCriacao()}
      ></div>
      <div className="Modal-conteudo">
        <h2>Criar novo item na agenda</h2>
        <form action="/my-handling-htmlForm-page" method="post">
          <ul>
            <li>
              <label htmlFor="selectTipo">Tipo: </label>
              <select
                name="selectTipo"
                value={tipo}
                onChange={(event) => setTipo(event.target.value)}
              >
                <option value="Alarme">Alarme</option>
                <option value="Evento">Evento</option>
              </select>
              <label htmlFor="selectDia">Dia:</label>
              <select
                name="selectDia"
                value={diaDaSemana}
                onChange={(event) => setDiaDaSemana(event.target.value)}
              >
                <option value="segunda">Segunda</option>
                <option value="terca">Terça</option>
                <option value="quarta">Quarta</option>
                <option value="quinta">Quinta</option>
                <option value="sexta">Sexta</option>
              </select>
            </li>
            <li>
              <label htmlFor="titulo">Título: </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={titulo}
                onChange={(event) => setTitulo(event.target.value)}
              />
            </li>
            {tipo === "Evento" ? (
              <>
                <li>
                  <label htmlFor="horarioInicio">Início:</label>
                  <input
                    type="time"
                    id="horarioInicio"
                    name="horarioInicio"
                    value={horarioInicio}
                    onChange={(event) => setHorarioInicio(event.target.value)}
                  />
                  <label htmlFor="horarioFim">Fim:</label>
                  <input
                    type="time"
                    id="horarioFim"
                    name="horarioFim"
                    value={horarioFim}
                    onChange={(event) => setHorarioFim(event.target.value)}
                  />
                </li>
              </>
            ) : (
              <li>
                <label htmlFor="horario">Horário:</label>
                <input
                  type="time"
                  id="horario"
                  name="horario"
                  value={horario}
                  onChange={(event) => setHorario(event.target.value)}
                />
              </li>
            )}
            <li></li>
          </ul>
          <button
            className="App-button BotaoMedio Botao-Concluir"
            onClick={criarItem}
          >
            Concluir
          </button>
        </form>
      </div>
    </div>
  );
}

function adicionarEvento(evento) {
  const alarmesDaSemanaArmazenados = JSON.parse(
    localStorage.getItem("alarmesDaSemana")
  );
  const eventosDaSemanaArmazenados = JSON.parse(
    localStorage.getItem("eventosDaSemana")
  );
  const alarmesDoDia = alarmesDaSemanaArmazenados[evento.diaSemana];

  const eventoHorarioInicio = evento.horarioInicio;
  const eventoHorarioFim = evento.horarioFim;

  let alarmeProgramadoDuranteEvento = false;

  const inicioMinutos = converterHorarioParaMinutos(eventoHorarioInicio);
  const fimMinutos = converterHorarioParaMinutos(eventoHorarioFim);

  for (const alarme of alarmesDoDia) {
    const alarmeHorario = alarme.horario;

    const alarmeMinutos = converterHorarioParaMinutos(alarmeHorario);

    if (alarmeMinutos >= inicioMinutos && alarmeMinutos <= fimMinutos) {
      alarmeProgramadoDuranteEvento = true;
      break; // Um alarme foi adicionado durante um evento, não é necessário continuar a verificação.
    }
  }

  if (alarmeProgramadoDuranteEvento) {
    alert(
      "Há um alarme programado para tocar durante o evento que você quer adicionar!"
    );
  }

  eventosDaSemanaArmazenados[evento.diaSemana].push(evento);

  localStorage.setItem(
    "eventosDaSemana",
    JSON.stringify(eventosDaSemanaArmazenados)
  );

  const eventosAtualizados = JSON.parse(
    localStorage.getItem("eventosDaSemana")
  );

  return eventosAtualizados;
}

function adicionarAlarme(alarme) {
  const alarmesDaSemanaArmazenados = JSON.parse(
    localStorage.getItem("alarmesDaSemana")
  );
  const eventosDaSemanaArmazenados = JSON.parse(
    localStorage.getItem("eventosDaSemana")
  );

  const eventosDoDia = eventosDaSemanaArmazenados[alarme.diaSemana];

  const alarmeHorario = alarme.horario;
  let alarmeAdicionadoDuranteEvento = false;

  const alarmeMinutos = converterHorarioParaMinutos(alarmeHorario);

  for (const evento of eventosDoDia) {
    const eventoHorarioInicio = evento.horarioInicio;
    const eventoHorarioFim = evento.horarioFim;

    const inicioMinutos = converterHorarioParaMinutos(eventoHorarioInicio);
    const fimMinutos = converterHorarioParaMinutos(eventoHorarioFim);

    if (alarmeMinutos >= inicioMinutos && alarmeMinutos <= fimMinutos) {
      alarmeAdicionadoDuranteEvento = true;
      break; // Um alarme foi adicionado durante um evento, não é necessário continuar a verificação.
    }
  }

  if (alarmeAdicionadoDuranteEvento) {
    alert("Um alarme foi adicionado durante um evento!");
  }

  alarmesDaSemanaArmazenados[alarme.diaSemana].push(alarme);

  localStorage.setItem(
    "alarmesDaSemana",
    JSON.stringify(alarmesDaSemanaArmazenados)
  );

  const alarmesAtualizados = JSON.parse(
    localStorage.getItem("alarmesDaSemana")
  );

  return alarmesAtualizados;
}

function converterHorarioParaMinutos(horario) {
  const partes = horario.split(":"); // Divide a string em partes: horas e minutos
  const horas = parseInt(partes[0], 10); // Converte as horas em um número inteiro
  const minutos = parseInt(partes[1], 10); // Converte os minutos em um número inteiro
  return horas * 60 + minutos; // Calcula o total de minutos
}

export { converterHorarioParaMinutos };
export default ComponenteCriarItem;
