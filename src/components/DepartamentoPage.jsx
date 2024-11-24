import { useState, useEffect } from "react";

import { FaPlus, FaTrash, FaBuilding, FaLaptopCode } from "react-icons/fa";
import { GiHumanPyramid, GiTakeMyMoney } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Botao from "./Botao";
import axios from "axios";
import { toast } from "sonner";
import Input from "./Input";
import miniLogo from "../img/mini_logo.png";
import { useTheme } from "../ThemeContext";
import * as s from "./DepartamentoPage.styled";

function DepartamentosPage() {
  const { isDarkMode } = useTheme();

  const [departments, setDepartments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [departamento, setDepartamento] = useState("");
  const [gestor, setGestor] = useState("");
  const [status, setStatus] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [personState, setPersonState] = useState(null);

  useEffect(() => {
    const storedPerson = localStorage.getItem("person");

    if (storedPerson) {
      setPersonState(JSON.parse(storedPerson));
    }
  }, []);
  const canChangeDepartament = personState?.permission === "Admin";

  const openEditModal = (dept) => {
    setEditingDepartment(dept);
    setDepartamento(dept.name);
    setGestor(dept.manager);
    setStatus(dept.status);
    setIsEditMode(true);
  };

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

  const editDepartment = async (event) => {
    event.preventDefault();

    if (!editingDepartment) {
      console.error("Departamento para edição não encontrado.");
      toast.error("Erro ao editar departamento: Dados inválidos.");
      return;
    }

    setIsEditMode(true);

    try {
      const updatedDepartment = {
        id: editingDepartment.id,
        name: departamento,
        manager: gestor,
        status: status,
      };

      const response = await axios.put(
        `http://localhost:3001/departamentos/${editingDepartment.id}`,
        updatedDepartment
      );

      setDepartments((prevDepartments) =>
        prevDepartments.map((dept) =>
          dept.id === editingDepartment.id ? response.data : dept
        )
      );

      toast.success("Departamento Editado com Sucesso!");
      setIsEditMode(false);
      setEditingDepartment(null);
    } catch (error) {
      console.error("Erro ao editar departamento:", error);
      toast.error("Erro ao editar departamento. Tente novamente.");
    }
  };

  const addDepartment = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get("http://localhost:3001/departamentos");
      const departmentsList = response.data;

      const lastDepartment = departmentsList[departmentsList.length - 1];
      const newId = lastDepartment
        ? (parseInt(lastDepartment.id) + 1).toString()
        : "1";

      const newDepartment = {
        id: newId,
        name: departamento,
        manager: gestor,
        status: "active",
      };

      const postResponse = await axios.post(
        "http://localhost:3001/departamentos",
        newDepartment
      );

      setDepartments((prevDepartments) => [
        ...prevDepartments,
        postResponse.data,
      ]);

      toast.success("Departamento Adicionado com Sucesso!");

      closeModal();
      setDepartamento("");
      setGestor("");
    } catch (error) {
      console.error("Erro ao adicionar departamento:", error);
      toast.error("Erro ao adicionar departamento. Tente novamente.");
    }
  };

  const removeDepartment = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/departamentos/${id}`);

      setDepartments((prevDepartments) =>
        prevDepartments.filter((dept) => dept.id !== id)
      );

      toast.success("Departamento Removido com Sucesso!");
    } catch (error) {
      console.error("Erro ao remover departamento:", error);
      toast.error("Erro ao remover departamento. Tente novamente.");
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(1024 >= window.innerWidth);
    };

    window.addEventListener("resize", checkScreenSize);

    checkScreenSize();

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <s.Container isDarkMode={isDarkMode}>
      <s.Main>
        <s.Header>
          {isSmallScreen ? (
            <s.Title>Departamentos</s.Title>
          ) : (
            <s.Title>Gerenciamento de Departamentos</s.Title>
          )}
          <div>
            {!canChangeDepartament ? (
              <s.MiniLogoWrapper>
                <p>Fundação Parreiras Horta, 2024</p>
                <img src={miniLogo} alt="logo do FPH" />
              </s.MiniLogoWrapper>
            ) : (
              <s.Botao onClick={openModal}>
                Adicionar Departamento <FaPlus className="max-sm:hidden ml-2" />
              </s.Botao>
            )}
          </div>
        </s.Header>
        <s.DividerMain isDarkMode={isDarkMode} />
        <s.DepartmentsGrid>
          {departments.map((dept) => (
            <s.DepartmentCard key={dept.id} isDarkMode={isDarkMode}>
              <s.DepartmentHeader>
                <h3>
                  {dept.name}{" "}
                  {dept.name === "Recursos Humanos" && <GiHumanPyramid />}
                  {dept.name === "Financeiro" && <GiTakeMyMoney />}
                  {dept.name === "Tecnologia da Informação" && <FaLaptopCode />}
                  {![
                    "Recursos Humanos",
                    "Financeiro",
                    "Tecnologia da Informação",
                  ].includes(dept.name) && <FaBuilding />}
                </h3>
                <div>
                  <s.StatusBadge status={dept.status}>
                    {dept.status === "active" ? "Ativo" : "Bloqueado"}
                  </s.StatusBadge>
                </div>
              </s.DepartmentHeader>
              <div>
                {canChangeDepartament && (
                  <div className="flex gap-4">
                    <s.EditButton
                      onClick={() => openEditModal(dept)}
                      isDarkMode={isDarkMode}
                    >
                      Editar
                    </s.EditButton>

                    <button
                      className="text-lg text-red-600 hover:text-red-800"
                      onClick={() => removeDepartment(dept.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
                <s.Divider isDarkMode={isDarkMode} />
                <s.ManagerInfo isDarkMode={isDarkMode}>
                  <div className="avatar">
                    {dept.manager
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className="info">
                    <div className="name">{dept.manager}</div>
                    <div className="role">Gestor</div>
                  </div>
                </s.ManagerInfo>
              </div>
            </s.DepartmentCard>
          ))}
        </s.DepartmentsGrid>
      </s.Main>
      {isModalOpen && (
        <>
          <s.ModalOverlay onClick={closeModal} />
          <s.Modal isDarkMode={isDarkMode}>
            <s.ModalTitle isDarkMode={isDarkMode}>
              Adicionar Departamento
            </s.ModalTitle>
            <IoMdClose
              className={`absolute max-sm:text-lg top-4 right-4 text-2xl cursor-pointer text-gray-600 hover:text-gray-800 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
              onClick={closeModal}
            />
            <form onSubmit={addDepartment}>
              <s.InputWrapper isDarkMode={isDarkMode}>
                <label htmlFor="departamento">Nome do Departamento</label>
                <input
                  id="departamento"
                  type="text"
                  placeholder="Digite o nome do departamento"
                  value={departamento}
                  onChange={(e) => setDepartamento(e.target.value)}
                  required
                />
              </s.InputWrapper>
              <s.InputWrapper isDarkMode={isDarkMode}>
                <label className="mt-5" htmlFor="gestor">
                  Nome do Gestor
                </label>
                <input
                  id="gestor"
                  type="text"
                  placeholder="Digite o nome do gestor"
                  value={gestor}
                  onChange={(e) => setGestor(e.target.value)}
                  required
                />
              </s.InputWrapper>
              <s.ButtonsWrapper>
                <s.BotaoCancel type="button" onClick={closeModal} secondary>
                  Cancelar
                </s.BotaoCancel>
                <s.Botao type="submit">Salvar</s.Botao>
              </s.ButtonsWrapper>
            </form>
          </s.Modal>
        </>
      )}
      {isEditMode && (
        <>
          <s.ModalOverlay onClick={() => setIsEditMode(false)} />
          <s.Modal isDarkMode={isDarkMode}>
            <s.ModalTitle isDarkMode={isDarkMode}>
              Editar Departamento
            </s.ModalTitle>
            <IoMdClose
              className={`absolute max-sm:text-lg top-4 right-4 text-2xl cursor-pointer text-gray-600 hover:text-gray-800 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
              onClick={() => setIsEditMode(false)}
            />
            <form onSubmit={editDepartment}>
              <s.InputWrapper isDarkMode={isDarkMode}>
                <label htmlFor="departamento">Nome do Departamento</label>
                <input
                  id="departamento"
                  type="text"
                  placeholder="Digite o nome do departamento"
                  value={departamento}
                  onChange={(e) => setDepartamento(e.target.value)}
                  required
                />
              </s.InputWrapper>
              <s.InputWrapper isDarkMode={isDarkMode}>
                <label className="mt-5" htmlFor="gestor">
                  Nome do Gestor
                </label>
                <input
                  id="gestor"
                  type="text"
                  placeholder="Digite o nome do gestor"
                  value={gestor}
                  onChange={(e) => setGestor(e.target.value)}
                  required
                />
              </s.InputWrapper>
              <s.ButtonsWrapper>
                <s.BotaoCancel
                  type="button"
                  onClick={() => setIsEditMode(false)}
                  secondary
                >
                  Cancelar
                </s.BotaoCancel>
                <s.Botao type="submit">Salvar</s.Botao>
              </s.ButtonsWrapper>
            </form>
          </s.Modal>
        </>
      )}
    </s.Container>
  );
}

export default DepartamentosPage;
