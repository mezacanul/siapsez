import React from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "dayjs/locale/es";
import "./calendario.css";
import tinycolor from "tinycolor2";
dayjs.locale("es");

const Calendario = (props) => {
  const {
    semanaLunesAViernes,
    vistaMensual,
    vistaSemanal,
    horario = [],
    diasFestivos = [],
    fechaInicio,
    fechaFin,
  } = props;
  const localizer = dayjsLocalizer(dayjs);
  const inicio = dayjs(fechaInicio);
  const fin = dayjs(fechaFin);

  const vistas = [];
  if (vistaMensual) vistas.push("month");
  if (vistaSemanal) vistas.push("week");

  let defaultView = "";
  if (vistaSemanal && vistaMensual) {
    defaultView = "week";
  } else if (vistaMensual) {
    defaultView = "month";
  } else if (vistaSemanal) {
    defaultView = "week";
  }

  // Lista de colores predefinidos
  const coloresDisponibles = [
    "#FF5733",
    "#33FFA7",
    "#3357FF",
    "#FF33A1",
    "#FFC300",
    "#33FFF5",
    "#FF5733",
    "#DAF7A6",
    "#900C3F",
    "#581845",
  ];

  const obtenerColorEvento = (indice) => {
    return coloresDisponibles[indice % coloresDisponibles.length];
  };

  const esDiaFestivo = (fecha) => {
    return diasFestivos.some((festivo) =>
      dayjs(festivo.start).isSame(fecha, "day")
    );
  };

  // Función para generar eventos recurrentes
  const generarEventosRecurrentes = (inicio, fin, config, color) => {
    const eventos = [];
    config.horario.forEach((horario) => {
      let currentDate = inicio;
      while (currentDate.isBefore(fin)) {
        if (
          currentDate.day() === horario.diaSemana &&
          !esDiaFestivo(currentDate)
        ) {
          const start = currentDate
            .hour(horario.horaInicio)
            .minute(0)
            .second(0);
          const end = start.add(horario.duracionHoras, "hours");
          eventos.push({
            start: start.toDate(),
            end: end.toDate(),
            title: config.titulo,
            color,
          });
        }
        currentDate = currentDate.add(1, "day");
      }
    });
    return eventos;
  };

  const eventosReales = horario.flatMap((config, index) => {
    const color = obtenerColorEvento(index);
    if (config.tipo === "recurrente") {
      return generarEventosRecurrentes(inicio, fin, config, color);
    }
    return [];
  });

  // Añadir propiedad isHoliday a los días festivos
  const eventosFestivos = diasFestivos.map((festivo) => ({
    ...festivo,
    isHoliday: true,
  }));

  const eventosFinales = [...eventosReales, ...eventosFestivos];

  const components = {
    event: (props) => {
      const { color, title, start, end, isHoliday } = props.event;
      const horaInicio = dayjs(start).format("HH:mm");
      const horaFin = dayjs(end).format("HH:mm");

      const colorTenue = tinycolor(color).desaturate(30).lighten(20).toString();
      const colorIntenso = tinycolor(color).darken(10).toString();

      // Si el evento es un día festivo, solo mostrar "Día Festivo"
      if (isHoliday) {
        return (
          <div style={{ background: colorTenue }} className="container-event">
            <p style={{ background: colorIntenso }} className="event-title">
              Día Festivo
            </p>
            <p>{title}</p>
          </div>
        );
      }

      return (
        <div style={{ background: colorTenue }} className="container-event">
          <p style={{ background: colorIntenso }} className="event-title">
            {horaInicio} - {horaFin}
          </p>
          <p>{title}</p>
        </div>
      );
    },
  };

  return (
    <div
      className={`calendario-container ${
        semanaLunesAViernes ? "semana-lunes-viernes" : ""
      }`}
    >
      <Calendar
        localizer={localizer}
        events={eventosFinales}
        views={vistas}
        messages={{
          next: <FaChevronRight />,
          previous: <FaChevronLeft />,
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
        }}
        components={components}
        defaultView={defaultView}
      />
    </div>
  );
};

export default Calendario;
