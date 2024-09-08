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

  return (
    <div className="w-full h-full xl:w-[1500px] ">
      <div className="bg-white rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="py-[20px] pl-[20px] text-2xl font-bold ">Em Aberto</h1>
          <div className="flex items-center gap-5 pr-[30px]">
            <IoMdAdd className="w-7 h-7" />
            <GiHamburgerMenu className="w-5 h-5" />
          </div>
        </div>
        <Id />
        <div className="pb-4">
          {conformidadesAberto.map((conformidade) => (
            <ConformidadeItem
              key={conformidade.id}
              conformidade={conformidade}
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
            <IoMdAdd className="w-7 h-7" />
            <GiHamburgerMenu className="w-5 h-5" />
          </div>
        </div>
        <Id />
        <div className="pb-4">
          {conformidadesAndamento.map((conformidade) => (
            <ConformidadeItem
              key={conformidade.id}
              conformidade={conformidade}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 bg-[#00969e64] rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="py-[20px] pl-[20px] text-2xl font-bold ">Concluida</h1>
          <div className="flex items-center gap-5 pr-[30px]">
            <IoMdAdd className="w-7 h-7" />
            <GiHamburgerMenu className="w-5 h-5" />
          </div>
        </div>
        <Id />
        <div className="pb-4">
          {conformidadesConcluida.map((conformidade) => (
            <ConformidadeItem
              key={conformidade.id}
              conformidade={conformidade}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Conformidades;
