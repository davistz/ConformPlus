import * as S from "./KanbanColumn.styled";
import { Droppable, Draggable } from "@hello-pangea/dnd";

const KanbanColumn = ({ title, droppableId, tasks }) => {
  const getColumnColor = () => {
    if (title === "Em Aberta") return "#e4e3e3";
    if (title === "Em Andamento") return "#f1e0a0";
    if (title === "Concluídas") return "#46bab8";

    return "#46bab8";
  };

  const columnColor = getColumnColor();

  return (
    <S.Column backgroundColor={columnColor}>
      <S.ColumnTitle backgroundColor={columnColor}>{title}</S.ColumnTitle>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <S.TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((conformidade, index) => (
              <Draggable
                key={conformidade.id}
                draggableId={conformidade.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <S.TaskItem
                    backgroundColor={snapshot.isDragging || columnColor}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <S.TitleProcesso>{conformidade.titulo}</S.TitleProcesso>
                    <S.ProcessoStatus prioridade={conformidade.grau_severidade}>
                      {conformidade.grau_severidade}
                    </S.ProcessoStatus>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ display: "flex" }}>
                        <p style={{ fontWeight: "600", marginRight: "5px" }}>
                          Origem:
                        </p>
                        {conformidade.origem}
                      </span>
                    </div>
                    <div>
                      <p style={{ fontWeight: "600", marginRight: "5px" }}>
                        Descrição:
                      </p>
                      {conformidade.descricao}
                    </div>
                    <div style={{ display: "flex" }}>
                      <p style={{ fontWeight: "600", marginRight: "5px" }}>
                        Enquadramento:
                      </p>
                      {conformidade.enquadramento}
                    </div>
                    <div style={{ display: "flex" }}>
                      <p style={{ fontWeight: "600", marginRight: "5px" }}>
                        Abertura:
                      </p>
                      {conformidade.data}
                    </div>
                  </S.TaskItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </S.TaskList>
        )}
      </Droppable>
    </S.Column>
  );
};

export default KanbanColumn;
