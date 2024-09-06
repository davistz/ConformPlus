import { FaTableList } from "react-icons/fa6";
import { IoIosGitNetwork } from "react-icons/io";
import { PiUsersLight } from "react-icons/pi";
import { FaGear } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

import Botao from "./Botao";

const BarraLateral = () => {
  return (
    <div
      id="geral"
      className="bg-[#164095] box-border flex flex-col justify-between md:h-screen sm:h-screen lg:h-[877px]"
    >
      <div className="mr-3">
        <Botao select="yes">
          <FaTableList className="mr-[10px]" />
          Não conformidades
        </Botao>
        <Botao select="not">
          <IoIosGitNetwork className="mr-[10px]" />
          Departamentos
        </Botao>
        <Botao select="not">
          <PiUsersLight className="mr-[12px]" />
          Usuários
        </Botao>
      </div>
      <div className="mb-[50px]">
        <hr />
        <Botao select="not">
          <FaGear className="mr-[10px]" />
          Configurações
        </Botao>
        <Botao select="not">
          <MdLogout className="mr-[10px]" />
          Sair
        </Botao>
      </div>
    </div>
  );
};

export default BarraLateral;
