import { FaTableList } from "react-icons/fa6";
import { IoIosGitNetwork } from "react-icons/io";
import { PiUsersLight } from "react-icons/pi";

import { MdLogout } from "react-icons/md";
import PropTypes from "prop-types";

import Botao from "./Botao";

const BarraLateral = ({ className }) => {
  return (
    <div
      id="geral"
      className={`${className} bg-[#164095] box-border flex flex-col justify-between  tablet:h-screen desktop:h-[877px]`}
    >
      <div className="mr-3">
        <Botao className="w-[240px]" select="yes">
          <FaTableList className="mr-[10px]" />
          Não conformidades
        </Botao>
        <Botao className="w-[240px]" select="not">
          <IoIosGitNetwork className="mr-[10px]" />
          Departamentos
        </Botao>
        <Botao className="w-[240px]" select="not">
          <PiUsersLight className="mr-[12px]" />
          Usuários
        </Botao>
      </div>
      <div className="mb-[50px]">
        <hr />
        <Botao select="not">
          <MdLogout className="mr-[10px]" />
          Sair
        </Botao>
      </div>
    </div>
  );
};

BarraLateral.propTypes = {
  className: PropTypes.node,
};

export default BarraLateral;
