import BarraPesquisa from "./BarraPesquisa.jsx";
import Botao from "./Botao.jsx";
import Conformidades from "./Conformidades.jsx";
import Filtro from "./Filtro.jsx";
import { IoMdAdd } from "react-icons/io";

const Home = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex flex-wrap items-start space-x-4 px-4 mt-[55px]">
        <BarraPesquisa />
        <Filtro />
        <div className="mb-10 w-full md:w-auto">
          <Botao className="ml-auto md:ml-[480px]" select="btn_add">
            Adicionar Não Conformidade
            <IoMdAdd className="h-5 w-5 ml-2" />
          </Botao>
        </div>
      </div>
      <div className="ml-[50px] px-4 w-full">
        <Conformidades title="Não Iniciado" />
      </div>
    </div>
  );
};

export default Home;
