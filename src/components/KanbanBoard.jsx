import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    Aberta: [],
    "Em Análise": [],
    Autuado: [],
    "Em Andamento": [],
    Aguardando: [],
    Resolvido: [],
    Fechado: [],
  });

  const [newTask, setNewTask] = useState("");

  const generateId = () => `task-${Date.now()}`; // Função para gerar um ID único

  const addTask = () => {
    if (newTask.trim() === "") return;

    const id = generateId(); // gera um ID único
    setTasks((prevTasks) => ({
      ...prevTasks,
      Aberta: [...prevTasks.Aberta, { id, content: newTask }],
    }));
    setNewTask("");
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Verifica se o destino é nulo
    if (!destination) return;

    // Se a tarefa não mudar de lugar
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;

    const taskToMove = tasks[sourceColumn][source.index];

    const newSourceTasks = Array.from(tasks[sourceColumn]);
    newSourceTasks.splice(source.index, 1);

    const newDestTasks = Array.from(tasks[destColumn]);
    newDestTasks.splice(destination.index, 0, taskToMove);

    setTasks((prevTasks) => ({
      ...prevTasks,
      [sourceColumn]: newSourceTasks,
      [destColumn]: newDestTasks,
    }));
  };

  return (
    <div className="flex">
      <div className="flex-1 p-4 border-r">
        <h2 className="font-bold text-lg">Nova Tarefa</h2>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          Adicionar
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(tasks).map(([status]) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex-1 p-4 border-l"
              >
                <h2 className="font-bold text-lg">{status}</h2>
                <ul>
                  {tasks[status].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex justify-between items-center border-b p-2"
                        >
                          {task.content} {/* Acesse o conteúdo da tarefa */}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
