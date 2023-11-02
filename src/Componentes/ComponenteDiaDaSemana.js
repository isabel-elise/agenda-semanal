import { useState, useContext, useEffect } from "react";
import { AgendaContext } from "../App.js";
import ComponenteEvento from "./ComponenteEvento";
import ComponenteAlarme from "./ComponenteAlarme";

function ComponenteDiaDaSemana({ diaDaSemana }) {
  const [agendaDoDia, setAgendaDoDia] = useState([]);

  const { alarmes, eventos } = useContext(AgendaContext);

  useEffect(() => {
    if (alarmes !== undefined && eventos !== undefined) {
      let listaDeItens = [...alarmes, ...eventos];
      ordenarPorHorarioDeInicio(listaDeItens);
      setAgendaDoDia(listaDeItens);
    }
  }, [alarmes, eventos]);

  return (
    <div className="Componente-DiaDaSemana">
      <div className="Componente-DiaDaSemana-areaDeEventos">
        {agendaDoDia.map((itemAgenda) => {
          let tipo = itemAgenda.horario ? "Alarme" : "Evento";
          if (tipo === "Evento") {
            return (
              <ComponenteEvento
                evento={itemAgenda}
                key={itemAgenda.id}
              ></ComponenteEvento>
            );
          } else if (tipo === "Alarme") {
            return (
              <ComponenteAlarme
                alarme={itemAgenda}
                key={itemAgenda.id}
              ></ComponenteAlarme>
            );
          } else {
            console.log(itemAgenda);
            return null;
          }
        })}
      </div>
      <span className="Componente-DiaDaSemana-dia">{diaDaSemana}</span>
    </div>
  );
}

function ordenarPorHorarioDeInicio(lista) {
  lista.sort(function (a, b) {
    let horarioA, horarioB;

    if (a.horario) {
      const alarmeHorario = a.horario;
      const partes = alarmeHorario.split(":"); // Divide a string em partes: horas e minutos
      const horas = parseInt(partes[0], 10); // Converte as horas em um número inteiro
      const minutos = parseInt(partes[1], 10); // Converte os minutos em um número inteiro
      horarioA = horas * 60 + minutos;
    } else {
      const eventoHorario = a.horarioInicio;
      const partes = eventoHorario.split(":"); // Divide a string em partes: horas e minutos
      const horas = parseInt(partes[0], 10); // Converte as horas em um número inteiro
      const minutos = parseInt(partes[1], 10); // Converte os minutos em um número inteiro
      horarioA = horas * 60 + minutos;
    }
    if (b.horario) {
      const alarmeHorario = b.horario;
      const partes = alarmeHorario.split(":"); // Divide a string em partes: horas e minutos
      const horas = parseInt(partes[0], 10); // Converte as horas em um número inteiro
      const minutos = parseInt(partes[1], 10); // Converte os minutos em um número inteiro
      horarioB = horas * 60 + minutos;
    } else {
      const eventoHorario = b.horarioInicio;
      const partes = eventoHorario.split(":"); // Divide a string em partes: horas e minutos
      const horas = parseInt(partes[0], 10); // Converte as horas em um número inteiro
      const minutos = parseInt(partes[1], 10); // Converte os minutos em um número inteiro
      horarioB = horas * 60 + minutos;
    }

    return horarioA - horarioB;
  });
}

export default ComponenteDiaDaSemana;
