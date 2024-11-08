import styled from "styled-components";

export const KanbanBoard = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 20px;
`;

export const Column = styled.div`
  background-color: ${(props) => props.backgroundColor || "#e4e3e3bc"};
  border-radius: 5px;
  width: 500px;

  @media (max-width: 768px) {
    height: 100%;
  }
`;

export const ColumnTitle = styled.h3`
  padding: 10px;
  font-weight: 600;
  background-color: ${(props) => {
    if (props.backgroundColor === "#e4e3e3") return "#bababa";
    if (props.backgroundColor === "#f1e0a0") return "#e7be45";
    if (props.backgroundColor === "#46bab8") return "#1e7c7b";
    return "#bababa";
  }};
  color: white;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const TaskList = styled.div`
  padding: 10px;
`;

export const TaskItem = styled.div`
  background-color: ${(props) => {
    if (props.backgroundColor === "#e4e3e3") return "#bababa";
    if (props.backgroundColor === "#f1e0a0") return "#e7bf45a8";
    if (props.backgroundColor === "#46bab8") return "#1e7c7a8f";
    return "#f55b5b";
  }};
  border-radius: 5px;
  padding: 10px;
  padding-right: 50px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  position: relative;
`;

export const TitleProcesso = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

export const ProcessoStatus = styled.span`
  position: absolute;
  top: 8px;
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
