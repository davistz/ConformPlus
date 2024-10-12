import { useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import Logo from "../img/logo.png";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { AiFillDashboard } from "react-icons/ai";
import { IoIosGitNetwork, IoMdClose } from "react-icons/io";
import { PiUsersLight } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import { toast } from "sonner";

const Header = ({ className }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Deslogado com sucesso!");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  const handleHome = () => {
    navigate("/home");
  };
  const handleUsers = () => {
    navigate("/users");
  };

  const handleDepartament = () => {
    navigate("/departamentos");
  };

  const handleConformidades = () => {
    navigate("/conformidades");
  };

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 755);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const isSmall = window.innerWidth <= 1024;

      setIsSmallScreen(isSmall);
    };

    window.addEventListener("resize", checkScreenSize);
    checkScreenSize();

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div
        className={`w-screen flex items-center bg-[#164095] py-5 ${className}`}
      >
        {isSmallScreen ? (
          <div className="flex ml-3">
            <HiMenu
              className="text-2xl cursor-pointer w-10 h-10 text-white"
              onClick={toggleSidebar}
            />
          </div>
        ) : (
          <div className="flex justify-center sm:justify-start w-1/2 sm:w-1/3">
            <img
              className="w-[120px] sm:w-[150px] md:w-[250px] lg:w-[330px] cursor-pointer"
              src={Logo}
              alt="Logo"
              onClick={handleHome}
            />
          </div>
        )}

        <div className="flex justify-end ml-auto mr-5">
          {user ? (
            <div
              className="flex items-center cursor-pointer"
              onClick={handleUsers}
            >
              <div
                className={`flex-shrink-0 bg-[#0E5EBA] mr-2 text-white w-[50px] sm:w-[60px] md:w-[70px] h-[50px] sm:h-[60px] md:h-[70px] rounded-full text-2xl sm:text-3xl flex items-center justify-center`}
              >
                {initials}
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

      <div
        className={`fixed top-0 left-0 md:hidden h-full bg-[#164095] text-white w-[260px] z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <IoMdClose
          className="absolute top-4 right-4 w-6 h-6 cursor-pointer bg-red-600"
          onClick={() => setIsSidebarOpen(false)}
        />
        <div className="h-full flex flex-col justify-between">
          <div className="p-5">
            <div className="mb-10 flex">
              <h2 className="text-xs font-bold">
                Fundação Parreiras Horta - FPH
              </h2>
            </div>
            <div className="pt-5">
              <ul className="flex flex-col">
                <li
                  className="mb-2 cursor-pointer flex items-center"
                  onClick={() => navigate("/home")}
                >
                  Dashboard
                  <RiDashboardHorizontalFill className="ml-2 w-5 h-5" />
                </li>
                <li
                  className="mb-2 cursor-pointer flex items-center"
                  onClick={handleConformidades}
                >
                  Não Conformidades
                  <AiFillDashboard className="ml-2 w-5 h-5" />
                </li>
                <li
                  className="mb-2 cursor-pointer flex items-center"
                  onClick={handleDepartament}
                >
                  Departamentos
                  <IoIosGitNetwork className="ml-2 w-5 h-5" />
                </li>
                <li
                  className="mb-2 cursor-pointer flex items-center"
                  onClick={() => navigate("/users")}
                >
                  Usuários
                  <PiUsersLight className="ml-2 w-5 h-5" />
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-10">
            <hr className="border-t border-gray-300 mb-4" />
            <ul>
              <li
                className="cursor-pointer items-center flex ml-5"
                onClick={handleLogout}
              >
                Deslogar Usuário
                <MdLogout className="ml-2 w-5 h-5" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
