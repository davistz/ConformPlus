import { useState } from "react";

const UsuariosComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userDepartment, setUserDepartment] = useState("");
  const [userManager, setUserManager] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const updateManager = () => {
    switch (userDepartment) {
      case "RH":
        setUserManager("Gestor RH");
        break;
      case "TI":
        setUserManager("Gestor TI");
        break;
      case "Marketing":
        setUserManager("Gestor Marketing");
        break;
      case "Financeiro":
        setUserManager("Gestor Financeiro");
        break;
      default:
        setUserManager("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    closeModal();
  };

  return (
    <div className="flex">
      <main className="flex-1 p-8">
        <section className="flex justify-between items-center">
          <div className="relative">
            <input
              type="text"
              id="busca"
              className="border border-gray-300 p-2 rounded-md w-64"
              placeholder="Procurar"
            />
            <i className="bi bi-search absolute right-2 top-2 text-gray-500"></i>
          </div>
          <div className="space-x-4">
            <button className="p-2 bg-gray-100 rounded-full">
              <i className="bi bi-bell"></i>
            </button>
            <button className="p-2 bg-gray-100 rounded-full">
              <i className="bi bi-envelope"></i>
            </button>
          </div>
        </section>

        <hr className="my-4" />

        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">Perfis</div>
          <button
            className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={openModal}
          >
            <i className="fas fa-user-plus mr-2"></i> Novo Perfil
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8" id="profilesGrid"></div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Adicionar Perfil</h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={closeModal}
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label htmlFor="userName" className="block text-gray-700">
                    Nome do Usuário
                  </label>
                  <input
                    type="text"
                    id="userName"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="userDepartment"
                    className="block text-gray-700"
                  >
                    Setor
                  </label>
                  <select
                    id="userDepartment"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={userDepartment}
                    onChange={(e) => {
                      setUserDepartment(e.target.value);
                      updateManager();
                    }}
                    required
                  >
                    <option value="">Selecione um setor</option>
                    <option value="RH">Recursos Humanos</option>
                    <option value="TI">Tecnologia da Informação</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Financeiro">Financeiro</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="userManager" className="block text-gray-700">
                    Gestor
                  </label>
                  <input
                    type="text"
                    id="userManager"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={userManager}
                    disabled
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-2 rounded-md"
                >
                  Adicionar
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UsuariosComponent;
