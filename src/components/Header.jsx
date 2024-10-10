import { useNavigate } from "react-router-dom";
import Logo from "../img/logo.png";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/home");
  };
  const handleUsers = () => {
    navigate("/users");
  };

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

  const initials = user.name
    .split(" ")
    .slice(0, 2) // Pega apenas os 2 primeiros nomes
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="xl:w-screen 2xl:w-screen lg:w-screen grid grid-cols-1 sm:grid-cols-3 max-sm:flex max-sm:justify-between items-center bg-[#164095] px-4 py-5">
      <div className="flex justify-center tablet:justify-start col-span-1 tablet:col-span-2">
        <img
          className="w-[150px] tablet:w-[330px] cursor-pointer"
          src={Logo}
          alt="Logo"
          onClick={handleHome}
        />
      </div>
      <div className="flex justify-center mr-6 tablet:justify-end">
        {user ? (
          <div
            className="flex items-center cursor-pointer"
            onClick={handleUsers}
          >
            <div
              className={`flex-shrink-0 bg-[#0E5EBA] mr-2 text-white w-[70px] h-[70px] rounded-full text-3xl flex items-center justify-center`}
            >
              {initials} {/* Exibir as iniciais aqui */}
            </div>

            <div>
              <p className="font-medium text-white">{user.name}</p>
              <p className={`${getPermissionColor(user.permission)} text-sm`}>
                {user.permission}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-white">Usuário</p>
        )}
      </div>
    </div>
  );
};

export default Header;
