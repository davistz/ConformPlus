import { useState, useEffect } from "react";

import { FaPlus, FaTrash, FaBuilding, FaLaptopCode } from "react-icons/fa";
import { GiHumanPyramid, GiTakeMyMoney } from "react-icons/gi";
import Botao from "./Botao";
import axios from "axios";
import { toast } from "sonner";
import Input from "./Input";
import miniLogo from "../img/mini_logo.png";
import { useTheme } from "../ThemeContext";

function DepartamentosPage() {
  const { isDarkMode } = useTheme(); // Obtém o estado do tema

  const [departments, setDepartments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [departamento, setDepartamento] = useState("");
  const [gestor, setGestor] = useState("");
  const [status, setStatus] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const canChangeDepartament = user?.permission === "Admin";

  useEffect(() => {
    axios
      .get("http://localhost:3001/departamentos")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar departamentos:", error);
        toast.error("Erro ao carregar departamentos");
      });
  }, []);

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
    <div
      className={`flex mt-[130px] ml-3 ${
        isDarkMode ? " text-white" : "text-black"
      }`}
    >
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
              className={`w-[300px] text-base flex items-center justify-center ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-[#2755b3] "
              }`}
              select="btn_add"
            >
              Adicionar Departamento
              <FaPlus className="h-5 w-5 ml-2" />
            </Botao>
          )}
        </div>
        <div
          className={`border-b mb-[60px] ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          }`}
        ></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className={`p-4 w-full h-[250px] ${
                isDarkMode
                  ? "bg-[#2c2c2c] text-white"
                  : "bg-gray-100 text-black"
              } hover:scale-[1.02] transform transition-transform flex flex-col justify-between border rounded shadow-lg`}
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
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="justify-end flex flex-col">
                {canChangeDepartament && (
                  <button
                    onClick={() => openEditModal(dept)}
                    className={`ml-auto font-medium text-lg hover:scale-[1.05] transition ${
                      isDarkMode ? "text-blue-300" : "text-blue-600"
                    }`}
                  >
                    Editar
                  </button>
                )}
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div
                      className={`border-b-[1px] mb-5 ${
                        isDarkMode ? "border-gray-600" : "border-gray-300"
                      }`}
                    ></div>
                    <div className="flex items-center mt-2">
                      <div
                        className={`rounded-full w-14 h-14 flex items-center justify-center ${
                          isDarkMode
                            ? "bg-gray-700 text-white"
                            : "bg-gray-300 text-black"
                        }`}
                      >
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
      </main>
    </div>
  );
}

export default DepartamentosPage;
