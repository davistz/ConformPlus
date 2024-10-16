import { AiFillDashboard } from "react-icons/ai";
import { IoIosGitNetwork } from "react-icons/io";
import { PiUsersLight } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import { RiDashboardHorizontalFill } from "react-icons/ri";

import PropTypes from "prop-types";
import Botao from "./Botao";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, Toaster } from "sonner";

const BarraLateral = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    toast.success("Deslogado com sucesso!");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleDashboard = () => {
    navigate("/home");
  };
  const handleDepartament = () => {
    navigate("/departamentos");
  };
  const handleUsuario = () => {
    navigate("/users");
  };
  const handleConformidades = () => {
    navigate("/conformidades");
  };

  const getButtonSelectState = (path) => {
    return location.pathname === path ? "yes" : "not";
  };

  return (
    <div
      id="geral"
      className={`${className} bg-[#164095] flex flex-col justify-between  h-screen`}
    >
      <div className="flex flex-col pr-3">
        <Botao
          onClick={handleDashboard}
          className="w-full sm:w-[160px] md:w-[200px] lg:w-[240px]"
          select={getButtonSelectState("/home")}
        >
          <RiDashboardHorizontalFill className="mr-2" />
          Dashboard
        </Botao>
        <Botao
          onClick={handleConformidades}
          className="w-full sm:w-[160px] md:w-[200px] lg:w-[240px]"
          select={getButtonSelectState("/conformidades")}
        >
          <AiFillDashboard className="mr-2" />
          Não Conformidades
        </Botao>
        <Botao
          onClick={handleDepartament}
          className="w-full sm:w-[160px] md:w-[200px] lg:w-[240px]"
          select={getButtonSelectState("/departamentos")}
        >
          <IoIosGitNetwork className="mr-2" />
          Departamentos
        </Botao>
        <Botao
          onClick={handleUsuario}
          className="w-full sm:w-[160px] md:w-[200px] lg:w-[240px]"
          select={getButtonSelectState("/users")}
        >
          <PiUsersLight className="mr-2" />
          Usuários
        </Botao>
      </div>

      <Toaster
        toastOptions={{
          style: {
            color: "black",
          },
        }}
      />

      <div className="mt-auto flex flex-col items-center">
        <div className="border-gray-50 w-full border-b-2"></div>
        <Botao
          onClick={handleLogout}
          className="mt-3 w-full sm:w-[160px] md:w-[200px] lg:w-[240px]"
          select="not"
        >
          <MdLogout className="mr-2" />
          Sair
        </Botao>
      </div>
    </div>
  );
};

BarraLateral.propTypes = {
  className: PropTypes.string,
};

export default BarraLateral;
