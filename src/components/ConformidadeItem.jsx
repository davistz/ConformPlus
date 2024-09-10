import PropTypes from "prop-types";
import Checkbox from "./Checkbox";
import Botao from "./Botao";
import { CiCircleInfo } from "react-icons/ci";

const ConformidadeItem = ({ conformidade, btn_status, color }) => {
  const getStatusClasses = () => {
    if (conformidade.status === "aberto") {
      return "bg-[#dbdbdb] text-[#202224]";
    }
    if (conformidade.status === "andamento") {
      return "bg-[#f5d872] text-[#202224]";
    }
    if (conformidade.status === "concluida") {
      return "bg-[#27aeb564] text-[#202224]";
    }
  };

  return (
    <li
      className={`${getStatusClasses()} flex w-[1440px] h-[60px] items-center ml-[27px] rounded-[10px] mb-4`}
    >
      <div className="w-full items-center ml-[30px] flex">
        <Checkbox type="conformidade" />
        <ul className="grid grid-cols-[100px_auto_auto_auto_auto] w-full ml-[55px] text-base font-normal list-none">
          <li className="mr-[150px]">{conformidade.id}</li>
          <li className="mr-[150px]">{conformidade.departament}</li>
          <li className="mr-[150px]">{conformidade.departament_destino}</li>
          <li className="mr-[150px]">{conformidade.data}</li>
          <li>{conformidade.grau_severidade}</li>
        </ul>
        <div className="flex items-center">
          <Botao className={`ml-8 ${color}`} select="conformidade">
            {btn_status}
          </Botao>
          <CiCircleInfo className="h-[35px] w-[35px] mx-3" />
        </div>
      </div>
    </li>
  );
};

ConformidadeItem.propTypes = {
  conformidade: PropTypes.object.isRequired,
  btn_status: PropTypes.string,
  color: PropTypes.string,
};

export default ConformidadeItem;
