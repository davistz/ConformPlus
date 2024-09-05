import BarraPesquisa from "./BarraPesquisa.jsx";
import Botao from "./Botao.jsx";
import Filtro from "./Filtro.jsx";
import { IoMdAdd } from "react-icons/io";

const TelaConformidade = () => {
  return (
    <div className="flex-row mt-[55px]">
      <div className="flex items-start space-x-4">
        <BarraPesquisa />
        <Filtro />
        <div className="mb-10">
          <Botao className="ml-[480px] items-center" select="btn_add">
            Adicionar Não Conformidade
            <IoMdAdd className="h-5 w-5 ml-2 items-center" />
          </Botao>
        </div>
      </div>
    </div>
  );
};

export default TelaConformidade;
