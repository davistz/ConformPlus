import styled from "styled-components";

export const KanbanBoard = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 20px;
`;

export const Column = styled.div`
  background-color: ${(props) =>
    props.isDarkMode
      ? props.backgroundColorDark || "#333"
      : props.backgroundColorLight || "#e4e3e3"};
  border-radius: 5px;
  width: 500px;
  display: flex;
  flex-direction: column;
  height: auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ColumnTitle = styled.h3`
  padding: 10px;
  font-weight: 600;
  background-color: ${(props) =>
    props.isDarkMode
      ? props.backgroundColorDarkTitle || "#444"
      : props.backgroundColorLightTitle || "#bababa"};
  color: ${(props) => (props.isDarkMode ? "white" : "black")};

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const TaskItem = styled.div`
  background-color: ${(props) =>
    props.isDarkMode
      ? props.backgroundColorDark || "#333"
      : props.backgroundColorLight || "#f1e0a0"};
  border-radius: 5px;
  padding: 10px;
  padding-right: 50px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  position: relative;

  .trash-icon {
    position: absolute;
    bottom: 10px;
    right: 45px;
    cursor: pointer;
    color: #ff4848;
    width: 20px;
    height: 20px;

    &:hover {
      transition: 0.4s;
      color: #ff0000;
    }
  }

  .info-icon {
    position: absolute;
    bottom: 7px;
    right: 10px;
    cursor: pointer;
    color: #cccccc;
    width: 25px;
    height: 25px;

    &:hover {
      transition: 0.4s;
      color: #5f5f5f;
    }
  }
`;

export const TaskList = styled.div`
  padding: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TitleProcesso = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

export const ProcessoStatus = styled.span`
  position: absolute;
  top: 48px;
  right: 8px;
  padding: 3px 10px;
  background-color: ${(props) => {
    if (props.prioridade === "Baixo") return "#2ecc71";
    if (props.prioridade === "Médio") return "#f8ab05";
    if (props.prioridade === "Alto") return "#e74c3c";
    return "#f8ab05";
  }};
  color: white;
  border-radius: 5px;
  font-size: 0.7rem;
`;
