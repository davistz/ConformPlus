import { useEffect, useState } from "react";
import Botao from "./Botao.jsx";
import { IoMdAdd } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import CONFORMIDADES from "../../src/constants/nao_conformidades";
import ConformidadeItem from "./ConformidadeItem";
import { toast } from "sonner";
import AddConformidadeDialog from "./AddConformidadeDialog";
import NaoConformidadeCheck from "./NaoConformidadeCheck.jsx";
import Id from "./Id";

const NaoConformidades = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [conformidades, setConformidades] = useState(CONFORMIDADES);
  const [
    checkNaoConformidadeDialogIsOpen,
    setCheckNaoConformidadeDialogIsOpen,
  ] = useState(false);
  const [addConformidadeDialogIsOpen, setAddConformidadeDialogIsOpen] =
    useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(1024 >= window.innerWidth);
    };

    window.addEventListener("resize", checkScreenSize);

    checkScreenSize();

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const canViewConformidadesPendente =
    user?.permission === "Admin" || user?.permission === "Gestor";

  const conformidadesPendentes = conformidades.filter(
    (conformidade) => conformidade.status === "pendente"
  );
  const conformidadesAberto = conformidades.filter(
    (conformidade) => conformidade.status === "aberto"
  );
  const conformidadesAndamento = conformidades.filter(
    (conformidade) => conformidade.status === "andamento"
  );
  const conformidadesConcluida = conformidades.filter(
    (conformidade) => conformidade.status === "concluida"
  );

  const deletarNaoConformidade = (conformidadeId) => {
    const novasConformidades = conformidades.filter(
      (conformidade) => conformidade.id !== conformidadeId
    );
    setConformidades(novasConformidades);
    toast.success("Não conformidade removida com sucesso!");
  };

  const handleAddConformidadeSubmit = (novaConformidade) => {
    const ultimoId =
      conformidades.length > 0
        ? Math.max(...conformidades.map((c) => parseInt(c.id)))
        : 0;

    const novaConformidadeComId = {
      ...novaConformidade,
      id: (ultimoId + 1).toString(),
      status: "pendente",
    };
    setConformidades([...conformidades, novaConformidadeComId]);
    toast.success("Não conformidade pendente adicionada com sucesso!");
    setAddConformidadeDialogIsOpen(false);
  };

  const alterarStatusConformidade = (conformidadeId) => {
    const novasConformidades = conformidades.map((conformidade) => {
      if (conformidade.id !== conformidadeId || !conformidade.status) {
        return conformidade;
      }

      if (conformidade.status === "aberto") {
        toast.success("Não conformidade alterada para em andamento!");
        return { ...conformidade, status: "andamento" };
      }
      if (conformidade.status === "pendente") {
        toast.success("Não conformidade alterada para em andamento!");
        setCheckNaoConformidadeDialogIsOpen(false);
        return { ...conformidade, status: "aberto" };
      }
      if (conformidade.status === "andamento") {
        toast.success("Não conformidade alterada para concluída!");
        return { ...conformidade, status: "concluida" };
      }
      return conformidade;
    });
    setConformidades(novasConformidades);
  };

  return (
    <div className="flex flex-col desktop:h-[829px]">
      <div className="flex ml-12 mobile:flex-col flex-row px-4 mt-[25px]">
        <div className="flex mb-10 gap-4 max-sm:w-full xl:w-full justify-end">
          {canViewConformidadesPendente && (
            <Botao
              select="btn_check"
              onClick={() => setCheckNaoConformidadeDialogIsOpen(true)}
              className="hover:scale-[1.05] transition"
            >
              Conformidades Pendentes{" "}
              {conformidadesPendentes.length > 0
                ? conformidadesPendentes.length
                : ""}
            </Botao>
          )}
          <Botao
            onClick={() => setAddConformidadeDialogIsOpen(true)}
            select="btn_add"
            className="hover:scale-[1.05] transition"
          >
            Adicionar Não Conformidade
            <IoMdAdd className="h-5 w-5 ml-2" />
          </Botao>
        </div>
      </div>

      <AddConformidadeDialog
        isOpen={addConformidadeDialogIsOpen}
        handleClose={() => setAddConformidadeDialogIsOpen(false)}
        addConformidadeFunction={handleAddConformidadeSubmit}
      />
      <NaoConformidadeCheck
        isOpen={checkNaoConformidadeDialogIsOpen}
        handleClose={() => setCheckNaoConformidadeDialogIsOpen(false)}
        conformidadesPendentes={conformidadesPendentes}
        alterarStatusConformidade={alterarStatusConformidade}
        deletarNaoConformidade={deletarNaoConformidade}
      />

      {/* Conteúdo principal */}
      <div className="pl-[50px] max-sm:pl-[20px]">
        <div className="bg-[#e1e1e1] rounded-xl xl:w-[1480px] sm:w-[540px] md:w-[650px] lg:w-[640px] max-sm:w-full">
          {/* Diálogos de conformidades */}

          {/* Seção: Em Aberto */}
          <div className="flex items-center justify-between  max-sm:flex-col  max-sm:w-full">
            <h1 className="py-[20px] pl-[20px] text-2xl font-bold">
              Em Aberto
            </h1>
            <div className="flex items-center gap-5 pr-[30px]">
              <a onClick={() => setAddConformidadeDialogIsOpen(true)} href="#">
                <IoMdAdd className="w-7 h-7 hover:scale-110 transition-all duration-300" />
              </a>
              <a href="#">
                <GiHamburgerMenu className="w-5 h-5 hover:scale-110 transition-all duration-300" />
              </a>
            </div>
          </div>

          {/* Colunas e itens de conformidade */}
          {isSmallScreen ? (
            <div className="font-bold mb-1 flex text-xs gap-[100px] ml-[150px] md:ml-[120px] md:gap-[50px]">
              <h1>Departamento</h1>
              <h1>Setor Destino</h1>
              <h1>Grau de Severidade</h1>
            </div>
          ) : (
            <Id className="ml-[140px]" />
          )}

          <div className="pb-4 pr-4">
            {conformidadesAberto.map((conformidade) => (
              <ConformidadeItem
                key={conformidade.id}
                conformidade={conformidade}
                btn_status="Em aberto"
                color="bg-[#b1b1b1] text-[#3a3a3a]"
                alterarStatusConformidade={alterarStatusConformidade}
                deletarNaoConformidade={deletarNaoConformidade}
              />
            ))}
          </div>
        </div>

        {/* Seção: Em Andamento */}
        <div className="mt-6 bg-[#ffe589] sm:w-[540px]  xl:w-[1480px] md:w-[650px] lg:w-[640px] max-sm:w-full rounded-xl">
          <div className="flex items-center justify-between">
            <h1 className="py-[20px] pl-[20px] text-2xl font-bold">
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

          {isSmallScreen ? (
            <div className="font-bold mb-1 flex text-xs gap-[100px] ml-[150px] md:ml-[120px] md:gap-[50px]">
              <h1>Departamento</h1>
              <h1>Setor Destino</h1>
              <h1>Grau de Severidade</h1>
            </div>
          ) : (
            <Id className="ml-[140px]" />
          )}

          <div className="pb-4">
            {conformidadesAndamento.map((conformidade) => (
              <ConformidadeItem
                key={conformidade.id}
                conformidade={conformidade}
                btn_status="Em andamento"
                color="bg-[#FFAA04] text-[#3d331d]"
                alterarStatusConformidade={alterarStatusConformidade}
                deletarNaoConformidade={deletarNaoConformidade}
              />
            ))}
          </div>
        </div>

        {/* Seção: Concluídas */}
        <div className="mt-6 bg-[#00969e64] lg:w-[640px] xl:w-[1480px]  sm:w-[540px] md:w-[650px] max-sm:w-full rounded-xl">
          <div className="flex items-center justify-between">
            <h1 className="py-[20px] pl-[20px] text-2xl font-bold">
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

          {isSmallScreen ? (
            <div className="font-bold mb-1 flex text-xs gap-[100px] ml-[150px] md:ml-[120px] md:gap-[50px]">
              <h1>Departamento</h1>
              <h1>Setor Destino</h1>
              <h1>Grau de Severidade</h1>
            </div>
          ) : (
            <Id className="ml-[140px]" />
          )}

          <div className="pb-4">
            {conformidadesConcluida.map((conformidade) => (
              <ConformidadeItem
                key={conformidade.id}
                conformidade={conformidade}
                btn_status="Concluída"
                color="bg-[#00ADB5] text-black"
                alterarStatusConformidade={alterarStatusConformidade}
                deletarNaoConformidade={deletarNaoConformidade}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NaoConformidades;
