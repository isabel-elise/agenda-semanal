import { useState } from "react";
import Alarme from "../Classes/Alarme";
import Evento from "../Classes/Evento";

function ComponenteCriarItem({ onItemCriado }) {
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
                  onChange={(event) => setTipo(event.target.value)}
                >
                  <option value="Alarme">Alarme</option>
                  <option value="Evento">Evento</option>
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
                  </li>
                  <li>
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
              <li>
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
            </ul>
            <button onClick={criarItem}>Concluir</button>
          </form>
        </div>
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

  const partes1 = eventoHorarioInicio.split(":"); // Divide a string em partes: horas e minutos
  const horas1 = parseInt(partes1[0], 10); // Converte as horas em um número inteiro
  const minutos1 = parseInt(partes1[1], 10); // Converte os minutos em um número inteiro
  const inicioMinutos = horas1 * 60 + minutos1;

  const partes2 = eventoHorarioFim.split(":"); // Divide a string em partes: horas e minutos
  const horas2 = parseInt(partes2[0], 10); // Converte as horas em um número inteiro
  const minutos2 = parseInt(partes2[1], 10); // Converte os minutos em um número inteiro
  const fimMinutos = horas2 * 60 + minutos2;

  for (const alarme of alarmesDoDia) {
    const alarmeHorario = alarme.horario;

    const partes3 = alarmeHorario.split(":"); // Divide a string em partes: horas e minutos
    const horas3 = parseInt(partes3[0], 10); // Converte as horas em um número inteiro
    const minutos3 = parseInt(partes3[1], 10); // Converte os minutos em um número inteiro
    const alarmeMinutos = horas3 * 60 + minutos3;

    if (alarmeMinutos >= inicioMinutos && alarmeMinutos <= fimMinutos) {
      alarmeProgramadoDuranteEvento = true;
      break; // Um alarme foi adicionado durante um evento, não é necessário continuar a verificação.
    }
  }

  if (alarmeProgramadoDuranteEvento) {
    alert(
      "Há um alarme programado para tocar durante o evento que você que adicionar"
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

  const partes1 = alarmeHorario.split(":"); // Divide a string em partes: horas e minutos
  const horas1 = parseInt(partes1[0], 10); // Converte as horas em um número inteiro
  const minutos1 = parseInt(partes1[1], 10); // Converte os minutos em um número inteiro
  const alarmeMinutos = horas1 * 60 + minutos1;

  for (const evento of eventosDoDia) {
    const eventoHorarioInicio = evento.horarioInicio;
    const eventoHorarioFim = evento.horarioFim;

    const partes2 = eventoHorarioInicio.split(":"); // Divide a string em partes: horas e minutos
    const horas2 = parseInt(partes2[0], 10); // Converte as horas em um número inteiro
    const minutos2 = parseInt(partes2[1], 10); // Converte os minutos em um número inteiro
    const inicioMinutos = horas2 * 60 + minutos2;

    const partes3 = eventoHorarioFim.split(":"); // Divide a string em partes: horas e minutos
    const horas3 = parseInt(partes3[0], 10); // Converte as horas em um número inteiro
    const minutos3 = parseInt(partes3[1], 10); // Converte os minutos em um número inteiro
    const fimMinutos = horas3 * 60 + minutos3;

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

export default ComponenteCriarItem;
