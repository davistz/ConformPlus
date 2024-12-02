import React, { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import axios from "axios";
import * as S from "./KanbanBoard.styled";
import KanbanColumn from "./KanbanColumn";
import CONFORMIDADES from "../../constants/nao_conformidades.js";
import ModalConformidadeInfo from "../ModalConformidadeInfo.jsx";

const KanbanBoard = () => {
  const [conformidadesPendentes, setConformidadesPendentes] = useState([]);
  const [conformidadesAndamento, setConformidadesAndamento] = useState([]);
  const [conformidadesConcluida, setConformidadesConcluida] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedConformidade, setDraggedConformidade] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConformidade, setModalConformidade] = useState(null);

  const openModal = (conformidade) => {
    setModalConformidade(conformidade);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalConformidade(null);
  };

  useEffect(() => {
    const conformidades = CONFORMIDADES;

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
  }, []);

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

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      setIsDragging(false);
      setDraggedConformidade(null);
      return;
    }

    const sourceList = getList(source.droppableId);
    const destinationList = getList(destination.droppableId);
    const [movedConformidade] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, movedConformidade);

    const updatedStatus = getStatusByDroppableId(destination.droppableId);
    movedConformidade.status = updatedStatus;

    setList(source.droppableId, sourceList);
    setList(destination.droppableId, destinationList);

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

  const handleSaveConformidade = (updatedConformidade) => {
    setConformidades((prev) =>
      prev.map((item) =>
        item.id === updatedConformidade.id ? updatedConformidade : item
      )
    );
  };

  const handleDeleteTask = (id) => {
    try {
      const newPendentes = conformidadesPendentes.filter(
        (conformidade) => conformidade.id !== id
      );
      const newAndamento = conformidadesAndamento.filter(
        (conformidade) => conformidade.id !== id
      );
      const newConcluida = conformidadesConcluida.filter(
        (conformidade) => conformidade.id !== id
      );

      setConformidadesPendentes(newPendentes);
      setConformidadesAndamento(newAndamento);
      setConformidadesConcluida(newConcluida);

      console.log(`Conformidade com ID ${id} deletada com sucesso.`);
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
            openModal={openModal}
          />
          <KanbanColumn
            title="Em Andamento"
            droppableId="andamento"
            tasks={conformidadesAndamento}
            onDeleteTask={handleDeleteTask}
            openModal={openModal}
          />
          <KanbanColumn
            title="Concluídas"
            droppableId="concluida"
            tasks={conformidadesConcluida}
            onDeleteTask={handleDeleteTask}
            openModal={openModal}
          />
        </S.KanbanContainer>
      </DragDropContext>
      {isModalOpen && (
        <ModalConformidadeInfo
          isOpen={isModalOpen}
          conformidade={modalConformidade}
          onClose={closeModal}
          onSave={handleSaveConformidade}
        />
      )}
    </S.Container>
  );
};

export default KanbanBoard;
