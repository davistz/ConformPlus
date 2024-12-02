import * as S from "./KanbanColumn.styled";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useTheme } from "../../ThemeContext";
import { FaTrashAlt } from "react-icons/fa";
import userImg from "../../img/img_users/lucas.png";
import { CiCircleInfo } from "react-icons/ci";

const KanbanColumn = ({
  title,
  droppableId,
  tasks,
  onDeleteTask,
  openModal,
}) => {
  const { isDarkMode } = useTheme();

  const getColumnColors = () => {
    switch (title) {
      case "Em Aberta":
        return {
          backgroundColorLight: "#e4e3e3",
          backgroundColorDark: "#333",
          backgroundColorLightTitle: "#9b9b9b",
          backgroundColorDarkTitle: "#444",
          backgroundColorTaskLight: "#bababa",
          backgroundColorTaskDark: "#535353",
        };
      case "Em Andamento":
        return {
          backgroundColorLight: "#f1e0a0",
          backgroundColorDark: "#b38f25",
          backgroundColorLightTitle: "#e7be45",
          backgroundColorDarkTitle: "#895e1a",
          backgroundColorTaskLight: "#f1e0a0",
          backgroundColorTaskDark: "#cda100",
        };
      case "Concluídas":
        return {
          backgroundColorLight: "#23f0ecaa",
          backgroundColorDark: "#1e7c7b",
          backgroundColorLightTitle: "#46bab8",
          backgroundColorDarkTitle: "#0c4d4c",
          backgroundColorTaskLight: "#46bab8",
          backgroundColorTaskDark: "#0c4d4c",
        };
      default:
        return {
          backgroundColorLight: "#e4e3e3",
          backgroundColorDark: "#333",
          backgroundColorLightTitle: "#bababa",
          backgroundColorDarkTitle: "#444",
          backgroundColorTaskLight: "#f1e0a0",
          backgroundColorTaskDark: "#333",
        };
    }
  };

  const handleDelete = (id) => {
    onDeleteTask(id);
  };

  const columnColors = getColumnColors();

  return (
    <S.Column
      isDarkMode={isDarkMode}
      backgroundColorLight={columnColors.backgroundColorLight}
      backgroundColorDark={columnColors.backgroundColorDark}
    >
      <S.ColumnTitle
        isDarkMode={isDarkMode}
        backgroundColorLightTitle={columnColors.backgroundColorLightTitle}
        backgroundColorDarkTitle={columnColors.backgroundColorDarkTitle}
      >
        {title}
      </S.ColumnTitle>
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
                    isDarkMode={isDarkMode}
                    backgroundColorLight={columnColors.backgroundColorTaskLight}
                    backgroundColorDark={columnColors.backgroundColorTaskDark}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="flex justify-between">
                      <S.TitleProcesso>{conformidade.titulo}</S.TitleProcesso>
                      <div className="flex items-center gap-2 mr-[-40px]">
                        <img
                          className="w-10 rounded-full"
                          src={userImg}
                          alt=""
                        />
                        <h1 className="font-semibold">
                          {conformidade.createdBy}
                        </h1>
                      </div>
                    </div>
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
                    <div>
                      <div className="flex justify-end">
                        <CiCircleInfo
                          onClick={() => openModal(conformidade)}
                          className="info-icon"
                        />
                        <FaTrashAlt
                          className="trash-icon"
                          onClick={() => handleDelete(conformidade.id)}
                        />
                      </div>
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
