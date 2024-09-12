import { IoMdAdd } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import Id from "./Id";
import { useState } from "react";
import CONFORMIDADES from "../../src/constants/nao_conformidades";
import ConformidadeItem from "./ConformidadeItem";

const Conformidades = () => {
  const [conformidades, setConformidades] = useState(CONFORMIDADES);

  const conformidadesAberto = conformidades.filter(
    (conformidade) => conformidade.status == "aberto"
  );
  const conformidadesAndamento = conformidades.filter(
    (conformidade) => conformidade.status == "andamento"
  );
  const conformidadesConcluida = conformidades.filter(
    (conformidade) => conformidade.status == "concluida"
  );

  const alterarStatusConformidade = (conformidadeId) => {
    const novasConformidades = conformidades.map((conformidade) => {
      if (conformidade.id != conformidadeId) {
        return conformidade;
      }

      if (conformidade.status == "aberto") {
        return { ...conformidades, status: "andamento" };
      }
      if (conformidade.status == "andamento") {
        return { ...conformidades, status: "concluida" };
      }
      if (conformidade.status == "concluida") {
        return { ...conformidades, status: "aberto" };
      }
    });
    setConformidades(novasConformidades);
  };

  return (
    <div className="w-full h-full ">
      <div className="bg-white rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="py-[20px] pl-[20px] text-2xl font-bold ">Em Aberto</h1>
          <div className="flex items-center gap-5 pr-[30px]">
            <a href="#">
              <IoMdAdd className="w-7 h-7 hover:scale-110 transition-all duration-300" />
            </a>
            <a href="#">
              <GiHamburgerMenu className="w-5 h-5 hover:scale-110 transition-all duration-300" />
            </a>
          </div>
        </div>
        <Id className="ml-[140px]" />
        <div className="pb-4">
          {conformidadesAberto.map((conformidade) => (
            <ConformidadeItem
              key={conformidade.id}
              conformidade={conformidade}
              btn_status="Em aberto"
              color="bg-[#b1b1b1] text-[#3a3a3a]"
              alterarStatusConformidade={alterarStatusConformidade}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 bg-[#ffe589] rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="py-[20px] pl-[20px] text-2xl font-bold ">
            Em Andamento
          </h1>
          <div className="flex items-center gap-5 pr-[30px]">
            <a href="#">
              <IoMdAdd className="w-7 h-7 hover:scale-110 transition-all duration-300" />
            </a>
            <a href="#">
              <GiHamburgerMenu className="w-5 h-5 hover:scale-110 transition-all duration-300" />
            </a>
          </div>
        </div>
        <Id className="ml-[140px]" />
        <div className="pb-4">
          {conformidadesAndamento.map((conformidade) => (
            <ConformidadeItem
              key={conformidade.id}
              conformidade={conformidade}
              btn_status="Em andamento"
              color="bg-[#FFAA04] text-[#3d331d]"
              alterarStatusConformidade={alterarStatusConformidade}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 bg-[#00969e64] rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="py-[20px] pl-[20px] text-2xl font-bold ">
            Concluídas
          </h1>
          <div className="flex items-center gap-5 pr-[30px]">
            <a href="#">
              <IoMdAdd className="w-7 h-7 hover:scale-110 transition-all duration-300" />
            </a>
            <a href="#">
              <GiHamburgerMenu className="w-5 h-5 hover:scale-110 transition-all duration-300" />
            </a>
          </div>
        </div>
        <Id className="ml-[140px]" />
        <div className="pb-4">
          {conformidadesConcluida.map((conformidade) => (
            <ConformidadeItem
              key={conformidade.id}
              conformidade={conformidade}
              btn_status="Concluída"
              color="bg-[#00ADB5] text-black"
              alterarStatusConformidade={alterarStatusConformidade}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Conformidades;
