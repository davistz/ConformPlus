import { useState, useEffect } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { IoMdAdd, IoMdClose } from "react-icons/io";

import Cookies from "js-cookie";
import Input from "./Input";
import axios from "axios";
import { toast } from "sonner";
import miniLogo from "../img/mini_logo.png";
import { useTheme } from "../ThemeContext";

const UsuariosComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [userName, setUserName] = useState("");
  const [userDepartment, setUserDepartment] = useState("");
  const [userManager, setUserManager] = useState("");
  const [userPermission, setUserPermission] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);

  const [profiles, setProfiles] = useState([]);

  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:3001/logins");
        setProfiles(response.data);
      } catch (error) {
        console.error("Erro ao buscar logins:", error);
      }
    };

    fetchProfiles();
  }, []);

  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-orange-500",
  ];

  const departments = {
    RH: "Ana Costa",
    TI: "Carlos Santos",
    Marketing: "Juliana Oliveira",
    Financeiro: "Roberto Silva",
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentProfile(null);
  };

  const openModal = (profile = null) => {
    if (profile) {
      setIsEditMode(true);
      setCurrentProfile(profile);
      setUserName(profile.name);
      setUserDepartment(profile.department);
      setUserManager(profile.manager);
      setUserPhoto(profile.photo);
      setUserPermission(profile.userPermission);
      setUserPermission(profile.userPermission);
    } else {
      setIsEditMode(false);
      setUserName("");
      setUserDepartment("");
      setUserManager("");
      setUserPhoto(null);
      setUserPermission("");
    }
    setIsModalOpen(true);
  };

  const [personState, setPersonState] = useState({
    name: "",
    telefone: "",
    email: "",
    department: "",
    permission: "",
  });

  const [isPersonStateLoaded, setIsPersonStateLoaded] = useState(false);

  const personAtual = personState;

  useEffect(() => {
    const storedPerson = localStorage.getItem("person");
    if (storedPerson) {
      const personData = JSON.parse(storedPerson);
      setPersonState(personData);
      setIsPersonStateLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (currentProfile) {
      const updatedPerson = {
        name: currentProfile.name,
        telefone: currentProfile.telefone,
        email: currentProfile.email,
        department: currentProfile.department,
        permission: currentProfile.permission,
      };
      setPersonState(updatedPerson);
      setIsPersonStateLoaded(true);
    }
  }, [currentProfile]);

  if (!personState) {
    return <p>Carregando informações do usuário...</p>;
  }

  const canAddUser = personState?.permission === "Admin";

  const getPermissionColor = (permission) => {
    switch (permission) {
      case "Admin":
        return "text-red-500";
      case "Gestor":
        return "text-[#ff9f2a]";
      case "Usuario":
        return "text-[#919191]";
      default:
        return "text-[#919191]";
    }
  };

  const updateManager = (department) => {
    setUserManager(departments[department] || "");
  };

  const handlePermissionChange = (e) => {
    setUserPermission(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isEditMode && currentProfile) {
      try {
        const updatedProfile = {
          ...currentProfile,
          name: userName,
          department: userDepartment,
          manager: userManager,
          photo: userPhoto,
          userPermission: userPermission,
        };

        await axios.patch(
          `http://localhost:3001/logins/${currentProfile.id}`,
          updatedProfile
        );

        setProfiles((prevProfiles) =>
          prevProfiles.map((profile) =>
            profile.id === currentProfile.id ? updatedProfile : profile
          )
        );

        toast.success("Usuário atualizado com sucesso!");
        closeModal();
      } catch (error) {
        console.error("Erro ao atualizar o usuário:", error);
        toast.error("Erro ao atualizar o usuário.");
      }
    }
  };

  const toggleProfileStatus = async (id) => {
    try {
      const profile = profiles.find((profile) => profile.id === id);
      const updatedStatus = profile.status === "active" ? "blocked" : "active";

      await axios.patch(`http://localhost:3001/logins/${id}`, {
        status: updatedStatus,
      });

      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile.id === id ? { ...profile, status: updatedStatus } : profile
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
    }
  };

  const removeProfile = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/logins/${id}`);
      setProfiles((prevProfiles) =>
        prevProfiles.filter((profile) => profile.id !== id)
      );
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nome") {
      setPersonState((prevState) => ({ ...prevState, name: value }));
    }
  };

  return (
    <div className="flex mt-[120px] ml-[21rem] max-sm:ml-0 flex-col">
      <div
        className={`flex ml-[30px] ${
          isDarkMode ? "bg-[#050c1a]" : "bg-[#2051b3]"
        } max-sm:hidden w-[1500px] h-[350px] justify-start mt-[30px] rounded-xl relative`}
      >
        <div className="bg-[#10254f] flex justify-center items-center rounded-tl-xl rounded-bl-xl p-6">
          <div className="flex flex-col items-center gap-4">
            <div
              className={`flex ${
                isDarkMode ? "bg-[#10254f]" : "bg-[#10254f]"
              } rounded-t-xl h-[135px] w-full items-center justify-center text-xl`}
            >
              <div className="flex flex-col items-center">
                <div className="bg-[#0E5EBA] text-white w-[200px] h-[200px] rounded-full text-3xl flex items-center justify-center">
                  {personState?.name
                    ? personState.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : ""}
                </div>

                <div className="text-center mt-4">
                  <h1 className="font-bold text-white">{personState?.name}</h1>
                  <p className={`text-[#cacaca] text-sm`}>
                    {personState.department}
                  </p>
                  <p
                    className={`${getPermissionColor(
                      personState.permission
                    )} text-base`}
                  >
                    {personState.permission}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl w-full">
          <h1 className="text-xl text-white mb-6">Suas Informações</h1>
          {isPersonStateLoaded ?? <h1>teste</h1>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/** Campos de Input */}
            <div>
              <label
                htmlFor="nome"
                className={`block text-sm font-medium text-gray-300`}
              >
                Nome Completo
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={personAtual.name}
                className={`${
                  isDarkMode ? "bg-[#10254f] " : "bg-[#26447f] text-white"
                } mt-1 block w-full placeholder:text-[#cbcbcb] p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 `}
              />
              {/* ${
                  isDarkMode ? "text-gray-300 " : "text-black"
                } */}
            </div>

            <div>
              <label
                htmlFor="telefone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Telefone
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={personState.telefone}
                className={`${
                  isDarkMode ? "bg-[#10254f] " : "bg-[#26447f] text-white"
                } mt-1 block w-full placeholder:text-[#cbcbcb] p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 `}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={personState.email}
                className={`${
                  isDarkMode ? "bg-[#10254f] " : "bg-[#26447f] text-white"
                } mt-1 block w-full placeholder:text-[#cbcbcb] p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 `}
              />
            </div>

            <div>
              <label
                htmlFor="departamento"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Departamento
              </label>
              <input
                type="text"
                id="departamento"
                name="departamento"
                value={personState.department}
                onChange={handleChange}
                className={`${
                  isDarkMode ? "bg-[#10254f] " : "bg-[#26447f] text-[#e3e3e3]"
                } mt-1 block w-full placeholder:text-[#cbcbcb] p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 `}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="ml-10 max-sm:mt-5 max-sm:ml-0 ">
        <div className="flex max-sm:w-screen justify-between items-center mt-6">
          <h1 className="text-2xl ml-4 font-semibold max-sm:text-[16px] max-sm:ml-5 sm:text-lg md:text-xl lg:text-2xl">
            Usuários Existentes
          </h1>
          <div className="flex justify-between">
            {!canAddUser && (
              <div className="flex items-center gap-2">
                <p className="mt-0 text-sm">Fundação Parreiras Horta, 2024 </p>
                <img src={miniLogo} alt="logo do FPH" className="w-8 h-auto" />
              </div>
            )}
          </div>
          {canAddUser && (
            <button
              onClick={() => openModal()}
              className="
            bg-[#164095] 
            flex items-center justify-center 
            font-semibold 
            w-[290px] h-[42px] px-2 
            text-base text-white 
            rounded-lg 
            hover:bg-blue-700 
            transition duration-500
            max-sm:w-[170px] max-sm:font-medium  max-sm:mr-6 max-sm:h-[30px] max-sm:text-sm max-sm:px-1 ma
            sm:w-[230px] sm:h-[40px] sm:text-base sm:px-2
            md:w-[260px] md:h-[42px] md:text-base md:px-3
            lg:w-[290px] lg:h-[42px] lg:text-lg lg:px-4
            xl:w-[320px] xl:h-[44px] xl:text-lg xl:px-5
            hover:scale-[1.03]
          "
            >
              Adicionar Usuário
              <IoMdAdd className="max-sm:hiddenh-6 w-6 ml-2" />
            </button>
          )}
        </div>
        <div className="border-b pb-1 ml-[-10px] max-sm:w-[430px] border-[#bdbdbd] ">
          {" "}
        </div>
      </div>

      <div className="grid grid-cols-1 max-sm:ml-[80px] max-sm:mr-0 max-sm:mb-10 md:mr-10 md:grid-cols-3 gap-4 mt-8 sm:ml-[40px] max-sm:w-[340px]">
        {profiles.map((profile, index) => {
          const initials = profile.name
            .split(" ")
            .slice(0, 2)
            .map((n) => n[0])
            .join("")
            .toUpperCase();
          const colorClass = colors[index % colors.length];

          return (
            <div
              key={profile.id}
              className={`${
                isDarkMode
                  ? "bg-[#2c2c2c] text-white"
                  : "bg-[#e6e5e5] hover:bg-[#d9d8d8] text-black"
              } max-sm:ml-[-45px] cursor-pointer hover:scale-[1.02] 2xl:ml-4 transform transition-transform shadow-lg rounded-lg p-4 flex flex-col relative w-full`}
            >
              <div className="flex justify-between items-start w-full">
                <div
                  className={`flex-shrink-0 ${colorClass} text-white w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] rounded-full text-xl sm:text-2xl md:text-3xl flex items-center justify-center`}
                >
                  {initials}
                </div>
                <button
                  onClick={() => openModal(profile)}
                  className={`${
                    isDarkMode
                      ? "text-[#bfc9df8b] hover:text-gray-100"
                      : "text-[#565656] hover:text-[#232323]"
                  } transform transition-transform hover:scale-[1.02] justify-end items-end`}
                >
                  {canAddUser && (
                    <CiCircleInfo className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10" />
                  )}
                </button>
              </div>
              <div className="flex flex-col ml-2 mt-2 sm:ml-4">
                <h3
                  className={`text-base sm:text-lg font-semibold ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {profile.name}
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-800"
                  }`}
                >
                  {profile.department}
                </p>
                <p
                  className={`text-xs sm:text-sm ${
                    isDarkMode ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  {profile.manager}
                </p>
                <div className="flex gap-2 mt-2">
                  <p
                    className={`permission-text font-semibold border-r-[1px] pr-2 ${
                      isDarkMode ? "border-gray-600" : "border-gray-400"
                    } ${getPermissionColor(
                      profile.permission || profile.userPermission
                    )}`}
                  >
                    {profile.permission || profile.userPermission}
                  </p>
                  <span
                    className={`status-badge ${
                      profile.status === "active"
                        ? isDarkMode
                          ? "text-green-400"
                          : "text-green-500"
                        : isDarkMode
                        ? "text-red-400"
                        : "text-red-500"
                    }`}
                  >
                    {profile.status === "active" ? "Ativo" : "Bloqueado"}
                  </span>
                </div>
              </div>
              {canAddUser && (
                <div className="flex mt-2 space-x-2 ml-auto">
                  <button
                    onClick={() => toggleProfileStatus(profile.id)}
                    className={`${
                      isDarkMode
                        ? "text-blue-400 hover:text-blue-300"
                        : "text-blue-500 hover:text-blue-700"
                    }`}
                  >
                    {profile.status === "active" ? "Bloquear" : "Desbloquear"}
                  </button>
                  <button
                    onClick={() => removeProfile(profile.id)}
                    className={`${
                      isDarkMode
                        ? "text-red-400 hover:text-red-300"
                        : "text-red-500 hover:text-red-700"
                    }`}
                  >
                    Remover
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div
          className={`fixed inset-0 ${
            isDarkMode
              ? "bg-[#000000] bg-opacity-70"
              : "bg-[#000000] bg-opacity-50"
          } flex items-center justify-center`}
        >
          <div
            className={`${
              isDarkMode ? "bg-[#2D2D2D] text-white" : "bg-white text-black"
            } rounded-lg p-6 w-96 shadow-lg`}
          >
            <div className="flex justify-between">
              <h2 className="text-xl ml-[68px] font-[700] mb-6 flex justify-center items-center">
                {isEditMode ? "Editar Usuário" : "Adicionar Usuário"}
              </h2>
              <IoMdClose
                className={`max-sm:text-lg text-xl cursor-pointer text-gray-600 hover:text-gray-800 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
                onClick={closeModal}
              />
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <Input
                  type="text"
                  label="Nome Completo"
                  value={userName}
                  className={`w-full px-4 py-2 border ${
                    isDarkMode
                      ? "border-[#555555] bg-[#00000021] text-white"
                      : "border-gray-300 bg-white text-gray-800"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                  labelClass={`text-sm font-[500] ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="department"
                  className={`block text-sm mb-2 font-[500] ${
                    isDarkMode ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  Departamento:
                </label>
                <select
                  id="department"
                  value={userDepartment}
                  onChange={(e) => {
                    setUserDepartment(e.target.value);
                    updateManager(e.target.value);
                  }}
                  className={`w-full px-4 py-2 border ${
                    isDarkMode
                      ? "border-[#555555] bg-[#00000021] text-white"
                      : "border-gray-300 bg-white text-gray-800"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                >
                  {Object.keys(departments).map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="manager"
                  className={`block text-sm mb-2 font-[500] ${
                    isDarkMode ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  Gestor:
                </label>
                <input
                  type="text"
                  id="manager"
                  value={userManager}
                  onChange={(e) => setUserManager(e.target.value)}
                  disabled
                  className={`w-full px-4 py-2 border ${
                    isDarkMode
                      ? "border-[#555555] bg-[#00000021] text-white"
                      : "border-gray-300 bg-gray-200 text-gray-800"
                  } rounded-lg`}
                />
                <label
                  htmlFor="permission"
                  className={`block text-sm mt-4 font-[500] ${
                    isDarkMode ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  Permissão:
                </label>
                <select
                  id="permission"
                  name="permission"
                  className={`block w-full p-2 mt-1 border ${
                    isDarkMode
                      ? "border-gray-600 bg-[#00000021] text-white"
                      : "border-gray-300 bg-white text-gray-800"
                  } rounded-md focus:outline-none focus:ring-blue-500`}
                  value={userPermission}
                  onChange={handlePermissionChange}
                >
                  <option value="">Selecione uma permissão</option>
                  <option value="Admin">Admin</option>
                  <option value="Usuário">Usuário</option>
                  <option value="Gestor">Gestor</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className={`px-4 py-2 w-full rounded-lg ${
                    isDarkMode
                      ? "bg-gray-600 text-white hover:bg-gray-500"
                      : "bg-gray-400 text-white hover:bg-gray-500"
                  }`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 w-full rounded-lg ${
                    isDarkMode
                      ? "bg-[#112a54] text-white hover:bg-[#0e2347]"
                      : "bg-[#164095] text-white hover:bg-blue-700"
                  }`}
                >
                  {isEditMode ? "Salvar" : "Adicionar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditMode ?? (
        <div
          className={`fixed inset-0 ${
            isDarkMode
              ? "bg-[#000000] bg-opacity-70"
              : "bg-[#000000] bg-opacity-50"
          } flex items-center justify-center`}
        >
          <div
            className={`${
              isDarkMode ? "bg-[#2D2D2D] text-white" : "bg-white text-black"
            } rounded-lg p-6 w-96 shadow-lg`}
          >
            <div className="flex justify-between">
              <h2 className="text-xl ml-[68px] font-[700] mb-6 flex justify-center items-center">
                {isEditMode ? "Editar Usuário" : "Adicionar Usuário"}
              </h2>
              <IoMdClose
                className={`max-sm:text-lg text-xl cursor-pointer text-gray-600 hover:text-gray-800 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
                onClick={closeModal}
              />
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <Input
                  type="text"
                  label="Nome Completo"
                  value={userName}
                  className={`w-full px-4 py-2 border ${
                    isDarkMode
                      ? "border-[#555555] bg-[#00000021] text-white"
                      : "border-gray-300 bg-white text-gray-800"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                  labelClass={`text-sm font-[500] ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="department"
                  className={`block text-sm mb-2 font-[500] ${
                    isDarkMode ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  Departamento:
                </label>
                <select
                  id="department"
                  value={userDepartment}
                  onChange={(e) => {
                    setUserDepartment(e.target.value);
                    updateManager(e.target.value);
                  }}
                  className={`w-full px-4 py-2 border ${
                    isDarkMode
                      ? "border-[#555555] bg-[#00000021] text-white"
                      : "border-gray-300 bg-white text-gray-800"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                >
                  {Object.keys(departments).map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="manager"
                  className={`block text-sm mb-2 font-[500] ${
                    isDarkMode ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  Gestor:
                </label>
                <input
                  type="text"
                  id="manager"
                  value={userManager}
                  onChange={(e) => setUserManager(e.target.value)}
                  disabled
                  className={`w-full px-4 py-2 border ${
                    isDarkMode
                      ? "border-[#555555] bg-[#00000021] text-white"
                      : "border-gray-300 bg-gray-200 text-gray-800"
                  } rounded-lg`}
                />
                <label
                  htmlFor="permission"
                  className={`block text-sm mt-4 font-[500] ${
                    isDarkMode ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  Permissawdwão:
                </label>
                <select
                  id="permission"
                  name="permission"
                  className={`block w-full p-2 mt-1 border ${
                    isDarkMode
                      ? "border-gray-600 bg-[#00000021] text-white"
                      : "border-gray-300 bg-white text-gray-800"
                  } rounded-md focus:outline-none focus:ring-blue-500`}
                  value={userPermission}
                  onChange={handlePermissionChange}
                >
                  <option value="">Selecione uma permissão</option>
                  <option value="Admin">Admin</option>
                  <option value="Usuário">Usuário</option>
                  <option value="Gestor">Gestor</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className={`px-4 py-2 w-full rounded-lg ${
                    isDarkMode
                      ? "bg-gray-600 text-white hover:bg-gray-500"
                      : "bg-gray-400 text-white hover:bg-gray-500"
                  }`}
                >
                  Cancawdawdelar
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 w-full rounded-lg ${
                    isDarkMode
                      ? "bg-[#112a54] text-white hover:bg-[#0e2347]"
                      : "bg-[#164095] text-white hover:bg-blue-700"
                  }`}
                >
                  {isEditMode ? "Salvar" : "Adicionar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsuariosComponent;
