import BarraPesquisa from "./BarraPesquisa.jsx";
import Botao from "./Botao.jsx";
import Conformidades from "./Conformidades.jsx";
import { IoMdAdd } from "react-icons/io";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const canViewConformidadesPendente =
    user?.permission === "Admin" || user?.permission === "Gestor";

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex mobile:flex-col flex-row items-start space-x-4 px-4 mt-[55px] w-full">
        <BarraPesquisa className="desktop:w-[550px] laptop:w-[280px] mobile:w-[280px]" />
        <div className="flex mb-10 gap-4 w-full justify-end">
          {canViewConformidadesPendente && (
            <Botao select="btn_check">Conformidades Pendentes 3</Botao>
          )}
          <Botao className="" select="btn_add">
            Adicionar Não Conformidade
            <IoMdAdd className="h-5 w-5 ml-2" />
          </Botao>
        </div>
      </div>
      <div className="ml-[50px] px-4">
        <Conformidades />
      </div>
    </div>
  );
};

export default Home;
