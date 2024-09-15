import Logo from "../img/logo.png";
import { BiSolidUserCircle } from "react-icons/bi";

const Header = () => {
  // Recupera os dados do usuário do localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const getPermissionColor = (permission) => {
    switch (permission) {
      case "Admin":
        return "text-red-500";
      case "Gestor":
        return "text-[#ff9f2a]";
      case "Usuario":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="w-full grid grid-cols-1 tablet:grid-cols-3 items-center bg-[#164095] px-4 py-5">
      <div className="flex justify-center tablet:justify-start col-span-1 tablet:col-span-2">
        <img className="w-[150px] tablet:w-[330px]" src={Logo} alt="Logo" />
      </div>
      <div className="flex justify-center mr-6 tablet:justify-end">
        {user ? (
          <div className="flex items-center">
            <BiSolidUserCircle className="w-[60px] h-[60px] mr-1 text-white" />
            <div>
              <p className="font-medium text-white ">{user.name}</p>
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
