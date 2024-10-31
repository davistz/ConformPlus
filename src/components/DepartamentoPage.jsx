import { useState } from "react";

import { FaPlus, FaTrash, FaBuilding, FaLaptopCode } from "react-icons/fa";
import { GiHumanPyramid, GiTakeMyMoney } from "react-icons/gi";
import Botao from "./Botao";
import { toast } from "sonner";
import Input from "./Input";
import miniLogo from "../img/mini_logo.png";

function DepartamentosPage() {
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Recursos Humanos",
      manager: "Davi Souza",
      status: "active",
    },
    {
      id: 2,
      name: "Tecnologia da Informação",
      manager: "João Almeida",
      status: "active",
    },
    {
      id: 3,
      name: "Financeiro",
      manager: "Felipe Barros",
      status: "blocked",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [departamento, setDepartamento] = useState("");
  const [gestor, setGestor] = useState("");
  const [status, setStatus] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const canChangeDepartament = user?.permission === "Admin";

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = (dept) => {
    setEditingDepartment(dept);
    setDepartamento(dept.name);
    setGestor(dept.manager);
    setStatus(dept.status);
    setIsModalOpen(true);
  };

  const saveEditDepartment = (event) => {
    event.preventDefault();

    setDepartments((prevDepartments) =>
      prevDepartments.map((dept) =>
        dept.id === editingDepartment.id
          ? { ...dept, name: departamento, manager: gestor, status }
          : dept
      )
    );

    toast.success("Departamento Editado com Sucesso!");
    closeModal();
    setEditingDepartment(null);
  };

  const addDepartment = (event) => {
    event.preventDefault();

    const newDepartment = {
      id: departments.length + 1,
      name: departamento,
      manager: gestor,
      status: "active",
    };

    setDepartments((prevDepartments) => [...prevDepartments, newDepartment]);

    toast.success("Departamento Adicionado com Sucesso!");
    closeModal();
    setDepartamento("");
    setGestor("");
  };

  const removeDepartment = (id) => {
    toast.success("Departamento Removido com Sucesso!");
    setDepartments((prevDepartments) =>
      prevDepartments.filter((dept) => dept.id !== id)
    );
  };

  return (
    <div className="flex mt-[130px] ml-[30px]">
      <main className="flex-1 p-8 w-[1550px]">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-4xl font-bold">Gerenciamento de Departamentos</h2>
          <div className="flex justify-between">
            {!canChangeDepartament && (
              <div className="flex items-center gap-2">
                <p className="mt-0 text-sm">Fundação Parreiras Horta, 2024 </p>
                <img src={miniLogo} alt="logo do FPH" className="w-8 h-auto" />
              </div>
            )}
          </div>
          {canChangeDepartament && (
            <Botao
              onClick={openModal}
              className="w-[300px] text-base flex items-center justify-center"
              select="btn_add"
            >
              Adicionar Departamento
              <FaPlus className="h-5 w-5 ml-2" />
            </Botao>
          )}
        </div>
        <div className="border-b   border-[#bdbdbd]  mb-[60px]"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="p-4 w-full h-[250px] bg-[#c3c3c3f] hover:scale-[1.02] transform transition-transform flex flex-col justify-between border rounded shadow-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">
                  {dept.name}{" "}
                  {dept.name === "Recursos Humanos" ? (
                    <GiHumanPyramid className="inline-block w-5 h-5 ml-2" />
                  ) : dept.name === "Financeiro" ? (
                    <GiTakeMyMoney className="inline-block w-5 h-5 ml-2" />
                  ) : dept.name === "Tecnologia da Informação" ? (
                    <FaLaptopCode className="inline-block w-5 h-5 ml-2" />
                  ) : (
                    <FaBuilding className="inline-block w-5 h-5 ml-2" />
                  )}
                </h3>

                <div className="flex gap-2">
                  <span
                    className={`inline-block px-2 py-1 rounded ${
                      dept.status === "active" ? "bg-green-500" : "bg-red-500"
                    } text-white`}
                  >
                    {dept.status === "active" ? "Ativo" : "Bloqueado"}
                  </span>
                  {canChangeDepartament && (
                    <div className="flex">
                      <button
                        onClick={() => removeDepartment(dept.id)}
                        className=""
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="justify-end  flex flex-col">
                {canChangeDepartament && (
                  <button
                    onClick={() => openEditModal(dept)}
                    className="ml-auto font-medium text-lg hover:scale-[1.05]  transition"
                  >
                    Editar
                  </button>
                )}
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="border-[#a7a7a7] border-b-[1px] mb-5"></div>
                    <div className="flex items-center mt-2">
                      <div className="bg-gray-300 rounded-full w-14 h-14 flex items-center justify-center">
                        {dept.manager
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-xl">
                          {dept.manager}
                        </div>
                        <div className="text-base text-gray-600">Gestor</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-6 w-[450px] rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold mx-auto">
                  {editingDepartment
                    ? "Editar Departamento"
                    : "Adicionar Departamento"}
                </h2>
                <button
                  className="text-2xl hover:scale-[1.05] transition hover:text-red-500"
                  onClick={closeModal}
                >
                  &times;
                </button>
              </div>

              <div>
                <form
                  onSubmit={
                    editingDepartment ? saveEditDepartment : addDepartment
                  }
                >
                  <div className="mb-4">
                    <Input
                      type="text"
                      label="Digite o Departamento"
                      value={departamento}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      labelClass="text-md font-medium"
                      onChange={(e) => setDepartamento(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      type="text"
                      label="Gestor Responsável"
                      value={gestor}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      labelClass="text-md font-medium"
                      onChange={(e) => setGestor(e.target.value)}
                    />
                  </div>

                  {editingDepartment && (
                    <div className="mb-4">
                      <label className="block text-md font-medium mb-2">
                        Status do Departamento
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="active">Ativo</option>
                        <option value="blocked">Bloqueado</option>
                      </select>
                    </div>
                  )}

                  <div className="w-full text-center mt-6">
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white py-2 rounded-lg"
                    >
                      {editingDepartment
                        ? "Salvar Alterações"
                        : "Adicionar Departamento"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default DepartamentosPage;
