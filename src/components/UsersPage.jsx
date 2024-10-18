import { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import Logo from "../img/logo.png";
import LOGINS from "../constants/logins";
import Input from "./Input";
import { toast } from "sonner";
import miniLogo from "../img/mini_logo.png";

const UsuariosComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [userName, setUserName] = useState("");
  const [userDepartment, setUserDepartment] = useState("");
  const [userManager, setUserManager] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);
  const [profiles, setProfiles] = useState(LOGINS);

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
    } else {
      setIsEditMode(false);
      setUserName("");
      setUserDepartment("");
      setUserManager("");
      setUserPhoto(null);
    }
    setIsModalOpen(true);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const canAddUser = user?.permission === "Admin";

  const getPermissionColor = (permission) => {
    switch (permission) {
      case "Admin":
        return "text-red-500";
      case "Gestor":
        return "text-[#ff9f2a]";
      case "Usuario":
        return "text-[#bebebe]";
      default:
        return "text-[#bebebe]";
    }
  };

  const updateManager = (department) => {
    setUserManager(departments[department] || "");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const initials = userName
      .split(" ")
      .map((n) => n[0])
      .join("");

    if (isEditMode && currentProfile) {
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile.id === currentProfile.id
            ? {
                ...profile,
                name: userName,
                department: userDepartment,
                manager: userManager,
                photo: userPhoto || profile.photo || initials,
              }
            : profile
        )
      );
    } else {
      const newProfile = {
        id: profiles.length + 1,
        name: userName,
        department: userDepartment,
        manager: userManager,
        status: "active",
        photo: userPhoto || initials,
      };
      setProfiles((prevProfiles) => [...prevProfiles, newProfile]);
      toast.success("Adicionado com sucesso");
    }
    closeModal();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleProfileStatus = (id) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === id
          ? {
              ...profile,
              status: profile.status === "active" ? "blocked" : "active",
            }
          : profile
      )
    );
  };

  const removeProfile = (id) => {
    setProfiles((prevProfiles) =>
      prevProfiles.filter((profile) => profile.id !== id)
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex bg-[#10254f] max-sm:hidden 2xl:w-[1500px] xl:w-[930px] lg:w-[690px] md:w-full max-lg:w-[100px] sm:w-[520px] max-sm:w-[450px] h-[250px] max-sm:ml-[25px] max-md:ml-[40px] ml-[60px] md:ml-[30px] justify-end mt-[30px] rounded-xl relative">
        <div className="w-full flex flex-col items-end gap-8">
          <div className="flex bg-[#164095] rounded-t-xl h-[135px] w-full items-center justify-between text-xl">
            <img
              className="hidden lg:block w-[400px] lg:w-[300px] cursor-pointer"
              src={Logo}
              alt="Logo"
            />

            <div className="mr-[60px] md:ml-[100px] max-sm:ml-[120px] flex items-center gap-3">
              <div
                className={`flex-shrink-0 bg-[#0E5EBA] text-white w-[70px] h-[70px] rounded-full text-3xl flex items-center justify-center`}
              >
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}{" "}
              </div>

              <div>
                <h1 className="font-bold text-white">{user.name}</h1>
                <p
                  className={`${getPermissionColor(user.permission)} text-base`}
                >
                  {user.permission}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="md:mr-[100px] sm:mr-6 lg:mr-3">
            <button className="bg-[#164095] hidden sm:block md:block justify-center items-center w-[200px] h-[40px] px-2 font-bold text-base text-white rounded-lg hover:bg-blue-700 transition duration-300">
              Editar Perfil
            </button>
          </div> */}
        </div>
      </div>

      <div className="ml-10 max-sm:mt-5 max-sm:ml-0 ">
        <div className="flex max-sm:w-screen justify-between items-center mt-6">
          <h1 className="text-2xl ml-4 font-semibold max-sm:text-xl max-sm:ml-5 sm:text-lg md:text-xl lg:text-2xl">
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
            max-sm:w-[190px] max-sm:mr-6 max-sm:h-[36px] max-sm:text-sm max-sm:px-1 ma
            sm:w-[230px] sm:h-[40px] sm:text-base sm:px-2
            md:w-[260px] md:h-[42px] md:text-base md:px-3
            lg:w-[290px] lg:h-[42px] lg:text-lg lg:px-4
            xl:w-[320px] xl:h-[44px] xl:text-lg xl:px-5
            hover:scale-[1.03]
          "
            >
              Adicionar Usuário
              <IoMdAdd className="h-6 w-6 ml-2" />
            </button>
          )}
        </div>
        <div className="border-b pb-1  border-[#bdbdbd] "> </div>
      </div>

      <div className="grid grid-cols-1 max-sm:ml-[60px]  md:mr-10 md:grid-cols-3 gap-4 mt-8 sm:ml-[40px]  max-sm:w-[385px]">
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
              className="bg-[#f1f1f1] max-sm:mr-30 cursor-pointer hover:scale-[1.02] 2xl:ml-4 transform transition-transform shadow-lg rounded-lg p-4 flex flex-col relative 
                   w-full"
            >
              <div className="flex justify-between items-start w-full">
                <div
                  className={`flex-shrink-0 ${colorClass} text-white w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] rounded-full text-xl sm:text-2xl md:text-3xl flex items-center justify-center`}
                >
                  {initials}
                </div>
                <button
                  onClick={() => openModal(profile)}
                  className="text-[#565656] hover:text-[#232323] transform transition-transform hover:scale-[1.02] justify-end items-end"
                >
                  {canAddUser && (
                    <CiCircleInfo className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10" />
                  )}
                </button>
              </div>
              <div className="flex flex-col ml-2 mt-2 sm:ml-4">
                <h3 className="text-base sm:text-lg font-semibold">
                  {profile.name}
                </h3>
                <p className="text-sm">{profile.department}</p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {profile.manager}
                </p>
                <span
                  className={`status-badge ${
                    profile.status === "active"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {profile.status === "active" ? "Ativo" : "Bloqueado"}
                </span>
              </div>
              {canAddUser && (
                <div className="flex mt-2 space-x-2 ml-auto">
                  <button
                    onClick={() => toggleProfileStatus(profile.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {profile.status === "active" ? "Bloquear" : "Desbloquear"}
                  </button>
                  <button
                    onClick={() => removeProfile(profile.id)}
                    className="text-red-500 hover:text-red-700"
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
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4 flex justify-center items-center">
              {isEditMode ? "Editar Usuário" : "Adicionar Usuário"}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <Input
                  type="text"
                  label="Nome Completo"
                  value={userName}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  labelClass="text-sm"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="department" className="block text-sm">
                  Departamento:
                </label>
                <select
                  id="department"
                  value={userDepartment}
                  onChange={(e) => {
                    setUserDepartment(e.target.value);
                    updateManager(e.target.value);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  {Object.keys(departments).map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="manager" className="block text-sm">
                  Gestor:
                </label>
                <input
                  type="text"
                  id="manager"
                  value={userManager}
                  onChange={(e) => setUserManager(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm">Foto do Usuário:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#164095] text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
