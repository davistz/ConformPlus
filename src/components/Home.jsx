import BarraPesquisa from "./BarraPesquisa.jsx";
import Botao from "./Botao.jsx";
import Conformidades from "./Conformidades.jsx";
import Filtro from "./Filtro.jsx";
import { IoMdAdd } from "react-icons/io";

const Home = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex mobile:flex-col flex-row items-start space-x-4 px-4 mt-[55px]">
        <BarraPesquisa className="desktop:w-[450px] laptop:w-[280px] mobile:w-[280px]" />
        <Filtro className="desktop:w-[100px] laptop:w-[95px]" />
        <Botao
          className="desktop:text-xs justify-center desktop:w-[255px] desktop:ml-[630px] laptop:w-[280px] mobile:w-[280px] mb-10"
          select="btn_add"
        >
          Adicionar Não Conformidade
          <IoMdAdd className="h-5 w-5 ml-2" />
        </Botao>
      </div>
      <div className="ml-[50px] px-4 ">
        <Conformidades />
      </div>
    </div>
  );
};

export default Home;
