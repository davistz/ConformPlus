import React, { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import axios from "axios";
import * as S from "./KanbanBoard.styled";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard = () => {
  const [conformidadesPendentes, setConformidadesPendentes] = useState([]);
  const [conformidadesAndamento, setConformidadesAndamento] = useState([]);
  const [conformidadesConcluida, setConformidadesConcluida] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedConformidade, setDraggedConformidade] = useState(null);

  const fetchConformidades = async () => {
    try {
      const response = await axios.get("http://localhost:3001/conformidades");
      const conformidades = response.data;

      setConformidadesPendentes(
        conformidades.filter((conformidade) => conformidade.status === "aberto")
      );
      setConformidadesAndamento(
        conformidades.filter(
          (conformidade) => conformidade.status === "andamento"
        )
      );
      setConformidadesConcluida(
        conformidades.filter(
          (conformidade) => conformidade.status === "concluida"
        )
      );
    } catch (error) {
      console.error("Erro ao buscar as conformidades:", error);
    }
  };

  useEffect(() => {
    fetchConformidades();
  }, []);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragStart = (start) => {
    setIsDragging(true);
    const draggedItem = getList(start.source.droppableId)[start.source.index];
    setDraggedConformidade(draggedItem);
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) {
      setIsDragging(false);
      setDraggedConformidade(null);
      return;
    }

    if (destination.droppableId === "delete") {
      await handleDeleteTask(draggedConformidade.id);
    } else {
      const sourceList = getList(source.droppableId);
      const destinationList = getList(destination.droppableId);
      const [movedConformidade] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, movedConformidade);

      const updatedStatus = getStatusByDroppableId(destination.droppableId);
      await updateConformidadeStatus(movedConformidade.id, updatedStatus);

      setList(source.droppableId, sourceList);
      setList(destination.droppableId, destinationList);
    }

    setIsDragging(false);
    setDraggedConformidade(null);
  };

  const getStatusByDroppableId = (droppableId) => {
    switch (droppableId) {
      case "aberta":
        return "aberto";
      case "andamento":
        return "andamento";
      case "concluida":
        return "concluida";
      default:
        return "aberto";
    }
  };

  const updateConformidadeStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:3001/conformidades/${id}`, {
        status,
      });
      fetchConformidades();
    } catch (error) {
      console.error("Erro ao atualizar o status da conformidade:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/conformidades/${id}`);
      fetchConformidades();
    } catch (error) {
      console.error("Erro ao deletar a conformidade:", error);
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
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <S.KanbanContainer>
          <KanbanColumn
            title="Em Aberta"
            droppableId="aberta"
            tasks={conformidadesPendentes}
            onDeleteTask={handleDeleteTask}
          />
          <KanbanColumn
            title="Em Andamento"
            droppableId="andamento"
            tasks={conformidadesAndamento}
            onDeleteTask={handleDeleteTask}
          />
          <KanbanColumn
            title="Concluídas"
            droppableId="concluida"
            tasks={conformidadesConcluida}
            onDeleteTask={handleDeleteTask}
          />
        </S.KanbanContainer>
      </DragDropContext>
    </S.Container>
  );
};

export default KanbanBoard;
