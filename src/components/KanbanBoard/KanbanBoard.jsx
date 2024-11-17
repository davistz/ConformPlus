import React, { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import axios from "axios";
import * as S from "./KanbanBoard.styled";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard = () => {
  const [conformidadesPendentes, setConformidadesPendentes] = useState([]);
  const [conformidadesAndamento, setConformidadesAndamento] = useState([]);
  const [conformidadesConcluida, setConformidadesConcluida] = useState([]);
  const [isDragging, setIsDragging] = useState(false); // Para controlar se está arrastando
  const [draggedConformidade, setDraggedConformidade] = useState(null); // Para armazenar o item sendo arrastado

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
    setDraggedConformidade(draggedItem); // Armazena o item que está sendo arrastado
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      setIsDragging(false); // Caso o arraste não tenha destino, esconder a área de deletação
      setDraggedConformidade(null); // Limpar item arrastado
      return;
    }

    if (destination.droppableId === "delete") {
      // Deletar item quando solto na área de deletação
      deleteConformidade(draggedConformidade.id);
    }

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
    setIsDragging(false); // Após o drag terminar, esconder a área de deletação
    setDraggedConformidade(null); // Limpar item arrastado
  };

  const deleteConformidade = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/conformidades/${id}`);
      fetchConformidades(); // Recarrega as conformidades
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
        {isDragging && (
          <S.DeleteArea droppableId="delete">
            <S.DeleteAreaText>Solte aqui para deletar</S.DeleteAreaText>
          </S.DeleteArea>
        )}
      </DragDropContext>
    </S.Container>
  );
};

export default KanbanBoard;
