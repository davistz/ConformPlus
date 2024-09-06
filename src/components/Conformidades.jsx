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
    <div className="w-full h-full xl:w-[1500px] rounded-[10px] ">
      <div className="bg-white">
        <div className="flex items-center justify-between">
          <h1 className="py-[20px] pl-[20px] text-2xl font-bold ">Em aberto</h1>
          <div className="flex items-center gap-5 pr-[30px]">
            <IoMdAdd className="w-7 h-7" />
            <GiHamburgerMenu className="w-5 h-5" />
          </div>
        </div>
        <Id />
        <div>
          {conformidadesAberto.map((conformidade) => (
            <ConformidadeItem
              key={conformidade.id}
              conformidade={conformidade}
            />
          ))}
        </div>
      </div>

      <div className="mt-[100px] bg-[#FFF6D4]">
        <div className="flex items-center justify-between">
          <h1 className="py-[20px] pl-[20px] text-2xl font-bold ">Em aberto</h1>
          <div className="flex items-center gap-5 pr-[30px]">
            <IoMdAdd className="w-7 h-7" />
            <GiHamburgerMenu className="w-5 h-5" />
          </div>
        </div>
        <Id />
        <div>
          {conformidadesAndamento.map((conformidade) => (
            <p key={conformidade.id}>{conformidade.title}</p>
          ))}
        </div>
      </div>

      <div className="mt-[100px] bg-[#00969e64]">
        <div className="flex items-center justify-between">
          <h1 className="py-[20px] pl-[20px] text-2xl font-bold ">Em aberto</h1>
          <div className="flex items-center gap-5 pr-[30px]">
            <IoMdAdd className="w-7 h-7" />
            <GiHamburgerMenu className="w-5 h-5" />
          </div>
        </div>
        <Id />
        <div>
          {conformidadesConcluida.map((conformidade) => (
            <p key={conformidade.id}>{conformidade.title}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Conformidades;
