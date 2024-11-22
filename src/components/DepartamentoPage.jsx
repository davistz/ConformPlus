import { useState, useEffect } from "react";

import { FaPlus, FaTrash, FaBuilding, FaLaptopCode } from "react-icons/fa";
import { GiHumanPyramid, GiTakeMyMoney } from "react-icons/gi";
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
                Adicionar Departamento <FaPlus className="ml-2" />
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
    </s.Container>
  );
}

export default DepartamentosPage;
