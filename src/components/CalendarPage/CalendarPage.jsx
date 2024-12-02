import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import CONFORMIDADES from "../../constants/nao_conformidades";
import * as s from "./CalendarPage.styled";
import { IoMdClose } from "react-icons/io";
import { useTheme } from "../../ThemeContext.jsx";
import userImg from "../../img/img_users/lucas.png";

const MyCalendar = () => {
  const { isDarkMode } = useTheme();

  const locales = {
    "pt-BR": ptBR,
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const eventStyleGetter = (event) => {
    let backgroundColor;

    switch (event.grau_severidade) {
      case "Alto":
        backgroundColor = isDarkMode ? "darkred" : "red";
        break;
      case "Médio":
        backgroundColor = isDarkMode ? "darkorange" : "orange";
        break;
      case "Baixo":
        backgroundColor = isDarkMode ? "darkgreen" : "green";
        break;
      default:
        backgroundColor = isDarkMode ? "darkblue" : "blue";
    }

    return {
      style: {
        backgroundColor,
        color: isDarkMode ? "white" : "black",
        borderRadius: "5px",
        border: "none",
      },
    };
  };

  const events = CONFORMIDADES.map((conformidade) => ({
    title: conformidade.titulo,
    start: parse(conformidade.data, "dd 'de' MMM. 'de' yyyy", new Date(), {
      locale: ptBR,
    }),
    end: parse(conformidade.prazo, "dd 'de' MMM. 'de' yyyy", new Date(), {
      locale: ptBR,
    }),
    description: conformidade.descricao,
    grau_severidade: conformidade.grau_severidade,
    origem: conformidade.origem,
    createdBy: conformidade.createdBy,
  }));

  const [eventDetails, setEventDetails] = useState(null);

  const handleEventSelect = (event) => {
    setEventDetails(event);
  };

  const handleCloseModal = () => {
    setEventDetails(null);
  };

  const formatDate = (date) => {
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  const messages = {
    month: "Mês",
    week: "Semana",
    day: "Dia",
    agenda: "Agenda",
    today: "Hoje",
    previous: "Anterior",
    next: "Próximo",
    allDay: "Dia todo",
    date: "Data",
  };

  const CustomToolbar = ({ onNavigate, label }) => {
    const { isDarkMode } = useTheme();

    return (
      <div
        style={{
          backgroundColor: isDarkMode ? "#565656" : "#d6d5d5",
          color: isDarkMode ? "#fff" : "#000",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        <button onClick={() => onNavigate("PREV")}>{"<"}</button>
        <span>{label}</span>
        <button onClick={() => onNavigate("NEXT")}>{">"}</button>
      </div>
    );
  };

  return (
    <div
      className={`w-full mt-[160px] ml-[350px] mr-10 max-sm:ml-0 max-sm:mt-[140px] max-sm:w-full `}
    >
      <div>
        <div className="flex items-end justify-between">
          <h1
            className={`text-4xl font-semibold mb-2 max-sm:text-2xl max-sm:ml-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Conferir Prazos
          </h1>
          <div className="flex max-sm:ml-[0px] max-sm:flex-col gap-8 max-sm:gap-0 items-center">
            <div className="flex items-center max-sm:w-[80px] max-sm:mr-[20px] gap-1">
              <div className="h-4 w-4 max-sm:w-3 max-sm:h-3 rounded-full bg-green-500"></div>
              <p className="max-sm:text-[12px]">Baixo</p>
            </div>

            <div className="flex items-center max-sm:w-[100px] gap-1">
              <div className="h-4 w-4 max-sm:w-3 max-sm:h-3 rounded-full bg-yellow-500"></div>
              <p className="max-sm:text-[12px]">Médio</p>
            </div>

            <div className="flex items-center max-sm:w-[100px] gap-1">
              <div className="h-4 w-4 max-sm:w-3 max-sm:h-3 rounded-full bg-red-600"></div>
              <p className="max-sm:text-[12px]">Alto</p>
            </div>
          </div>
        </div>
        <s.DividerMain />
      </div>
      <div
        className={`mx-4 h-[600px] rounded-[20px] max-sm:h-[600px] mb-10 ${
          isDarkMode ? "bg-[#333] text-white" : "bg-[#fff] text-black"
        }`}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleEventSelect}
          culture="pt-BR"
          messages={messages}
          components={{
            toolbar: CustomToolbar,
          }}
          dayPropGetter={(date) => ({
            style: {
              backgroundColor: isDarkMode ? "#2d2d2d" : "#fff",
              color: isDarkMode ? "#fff" : "#000",
            },
          })}
          style={{
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        />
      </div>

      {eventDetails && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
          <div
            className={`${
              isDarkMode ? "bg-[#2d2d2d]" : "bg-[#dadada]"
            } p-8 rounded-lg flex flex-col gap-3 shadow-lg max-w-md w-full max-sm:mx-4`}
          >
            <div className="flex justify-between mb-4">
              <h1 className="text-3xl font-bold">Detalhes</h1>
              <button
                onClick={handleCloseModal}
                className="mb-2 text-2xl text-black"
              >
                <IoMdClose
                  className={`${isDarkMode ? "text-[#fff]" : "text-black"}`}
                />
              </button>
            </div>
            <div className="flex justify-between">
              <p>
                <strong>Título:</strong> {eventDetails.title}
              </p>
            </div>

            <p>
              <strong>Origem:</strong> {eventDetails.origem}
            </p>

            <p>
              <strong>Descrição:</strong> {eventDetails.description}
            </p>
            <p className="flex items-center">
              <strong>Criado por:</strong>
              <img
                src={userImg}
                alt="User Icon"
                className="w-8 mr-[5px] ml-3 rounded-full"
              />
              {eventDetails.createdBy}
            </p>
            <p>
              <strong>Data de Início:</strong> {formatDate(eventDetails.start)}
            </p>
            <p>
              <strong>Prazo:</strong> {formatDate(eventDetails.end)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
