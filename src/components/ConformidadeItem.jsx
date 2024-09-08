import PropTypes from "prop-types";
import Checkbox from "./Checkbox";
import Botao from "./Botao";
import { CiCircleInfo } from "react-icons/ci";

const ConformidadeItem = ({ conformidade }) => {
  const getStatusClasses = () => {
    if (conformidade.status == "aberto") {
      return "bg-[#dbdbdb] text-[#202224]";
    }
    if (conformidade.status == "andamento") {
      return "bg-[#f5d872] text-[#202224]";
    }
    if (conformidade.status == "concluida") {
      return "bg-[#27aeb564] text-[#202224]";
    }
  };

  return (
    <div
      className={`${getStatusClasses()} flex w-[1440px] h-[60px] items-center ml-[27px] rounded-[10px]`}
    >
      <div className="flex ml-[30px] ">
        <Checkbox type="conformidade" />
        <div className="flex ml-[65px] mt-2 text-base font-normal">
          <p className="mr-[165px]">{conformidade.id}</p>
          <p className="mr-[140px]">{conformidade.departament}</p>
          <p className="mr-[105px]">{conformidade.departament_destino}</p>
          <p className="mr-[175px]">{conformidade.data}</p>
          <p className="mr-[145px]">{conformidade.grau_severidade}</p>
        </div>
        <Botao className="ml-8" select="conformidade_aberta">
          Em aberto
        </Botao>
        <CiCircleInfo className="h-[35px] w-[35px] mx-3" />
      </div>
    </div>
  );
};

ConformidadeItem.propTypes = {
  conformidade: PropTypes.node.isRequired,
};

export default ConformidadeItem;
