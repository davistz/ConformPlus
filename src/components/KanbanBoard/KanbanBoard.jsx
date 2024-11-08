import React, { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import * as S from "./KanbanBoard.styled";
import KanbanColumn from "./KanbanColumn";
import CONFORMIDADES from "../../constants/nao_conformidades.js"; // importando as conformidades

const KanbanBoard = () => {
  const [conformidadesPendentes, setConformidadesPendentes] = useState(
    CONFORMIDADES.filter((conformidade) => conformidade.status === "aberto")
  );
  const [conformidadesAndamento, setConformidadesAndamento] = useState(
    CONFORMIDADES.filter((conformidade) => conformidade.status === "andamento")
  );
  const [conformidadesConcluida, setConformidadesConcluida] = useState(
    CONFORMIDADES.filter((conformidade) => conformidade.status === "concluida")
  );

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceList = getList(source.droppableId);
    const destinationList = getList(destination.droppableId);

    if (source.droppableId === destination.droppableId) {
      const reorderedConformidades = reorder(
        sourceList,
        source.index,
        destination.index
      );
      setList(source.droppableId, reorderedConformidades);
    } else {
      const [movedConformidade] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, movedConformidade);

      setList(source.droppableId, sourceList);
      setList(destination.droppableId, destinationList);
    }
  };

  const getList = (id) => {
    if (id === "aberta") return conformidadesPendentes;
    if (id === "andamento") return conformidadesAndamento;
    if (id === "concluida") return conformidadesConcluida;
  };

  const setList = (id, newList) => {
    if (id === "aberta") setConformidadesPendentes(newList);
    if (id === "andamento") setConformidadesAndamento(newList);
    if (id === "concluida") setConformidadesConcluida(newList);
  };

  return (
    <S.Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <S.KanbanContainer>
          <KanbanColumn
            title="Em Aberta"
            droppableId="aberta"
            tasks={conformidadesPendentes}
          />
          <KanbanColumn
            title="Em Andamento"
            droppableId="andamento"
            tasks={conformidadesAndamento}
          />
          <KanbanColumn
            title="Concluídas"
            droppableId="concluida"
            tasks={conformidadesConcluida}
          />
        </S.KanbanContainer>
      </DragDropContext>
    </S.Container>
  );
};

export default KanbanBoard;
