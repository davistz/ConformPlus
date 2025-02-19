import { useEffect, useState } from "react";

import { IoMdAdd, IoMdSearch } from "react-icons/io";

import * as s from "./Home.styled.jsx";
import ConformidadeItem from "../ConformidadeItem/ConformidadeItem.jsx";
import { toast } from "sonner";

import AddConformidadeDialog from "../AddConformidadeDialog.jsx";
import NaoConformidadeCheck from "../ConformidadesCheck/NaoConformidadeCheck.jsx";
import Id from "../Id/Id.jsx";
import imgAdd from "../../img/image-addconform.png";
import KanbanBoard from "../KanbanBoard/KanbanBoard.jsx";
import ModalConformidadeInfo from "../ModalConformidadeInfo.jsx";
import { useTheme } from "../../ThemeContext.jsx";
import ConformidadeFilter from "../ConformidadeFilter/ConformidadeFilter.jsx";
import CONFORMIDADES from "../../constants/nao_conformidades.js";

const NaoConformidades = () => {
  const [conformidades, setConformidades] = useState(CONFORMIDADES);
  const [filteredConformidades, setFilteredConformidades] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilter, setIsFilter] = useState(false);

  const [
    checkNaoConformidadeDialogIsOpen,
    setCheckNaoConformidadeDialogIsOpen,
  ] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConformidade, setSelectedConformidade] = useState(null);
  const [addConformidadeDialogIsOpen, setAddConformidadeDialogIsOpen] =
    useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [viewMode, setViewMode] = useState("Lista");

  const handleChangeViewMode = (event) => {
    setViewMode(event.target.value);
  };

  const { isDarkMode } = useTheme();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(1024 >= window.innerWidth);
    };

    window.addEventListener("resize", checkScreenSize);
    checkScreenSize();

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length > 0) {
      setIsFilter(true);
      const filtered = conformidades.filter(
        (conformidade) =>
          conformidade.titulo.toLowerCase().includes(query) ||
          conformidade.descricao.toLowerCase().includes(query)
      );
      setFilteredConformidades(filtered);
    } else {
      setIsFilter(false);
      setFilteredConformidades(conformidades);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsFilter(false);
    setFilteredConformidades(conformidades);
  };
  const handleInfoClick = (conformidade) => {
    setSelectedConformidade(conformidade);
    setIsModalOpen(true);
  };

  const handleEditConformidadeSubmit = (conformidadeEditada) => {
    setConformidades((prevConformidades) =>
      prevConformidades.map((conformidade) =>
        conformidade.id === conformidadeEditada.id
          ? { ...conformidade, ...conformidadeEditada }
          : conformidade
      )
    );
    toast.success("Não conformidade alterada com sucesso!");
    setIsModalOpen(false);
  };

  const [personState, setPersonState] = useState(null);

  useEffect(() => {
    const storedPerson = localStorage.getItem("person");

    if (storedPerson) {
      setPersonState(JSON.parse(storedPerson));
    }
  }, []);

  useEffect(() => {
    const fetchLoginsAndConformidades = async () => {
      if (!personState || !personState.name) {
        console.warn("Usuário não logado ou inválido.");
        return;
      }

      try {
        const currentUser = {
          name: personState.name,
        };

        const allConformidades = Array.isArray(CONFORMIDADES)
          ? CONFORMIDADES
          : [];

        allConformidades.forEach((conformidade) => {
          const createdByFormatted = conformidade.createdBy
            ? conformidade.createdBy.trim().toLowerCase().replace(" ", "")
            : "";
          const currentUserFormatted = currentUser.name
            .trim()
            .toLowerCase()
            .replace(" ", "");
        });

        const userConformidades = allConformidades.filter(
          (conformidade) =>
            conformidade.createdBy &&
            conformidade.createdBy.trim().toLowerCase().replace(" ", "") ===
              currentUser.name.trim().toLowerCase().replace(" ", "")
        );

        setConformidades(allConformidades);
        setUserConformidades(userConformidades);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        toast.error("Erro ao carregar as informações.");
      }
    };

    fetchLoginsAndConformidades();
  }, [personState]);

  const [userConformidades, setUserConformidades] = useState([]);

  const canViewConformidadesPendente =
    personState?.permission === "Admin" || personState?.permission === "Gestor";

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
    const conformidadeIdStr = String(conformidadeId);
    console.log("Deletando conformidade com ID:", conformidadeIdStr);

    try {
      const novasConformidades = conformidades.filter(
        (conformidade) => String(conformidade.id) !== conformidadeIdStr
      );

      setConformidades(novasConformidades);

      toast.success("Não conformidade removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover a não conformidade:", error);
      toast.error("Erro ao remover a não conformidade.");
    }
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

      let novoStatus;
      let mensagem;

      if (conformidade.status === "pendente") {
        novoStatus = "aberto";
        mensagem = "Não conformidade alterada para aberto!";
      } else if (conformidade.status === "aberto") {
        novoStatus = "andamento";
        mensagem = "Não conformidade alterada para andamento!";
      } else if (conformidade.status === "andamento") {
        novoStatus = "concluida";
        mensagem = "Não conformidade alterada para concluída!";
      } else if (conformidade.status === "concluida") {
        novoStatus = "aberto";
        mensagem = "Não conformidade alterada para aberto!";
        setCheckNaoConformidadeDialogIsOpen(false);
      }

      toast.success(mensagem);
      return { ...conformidade, status: novoStatus };
    });

    setConformidades(novasConformidades);
  };

  const [viewMyConformidade, setViewMyConformidade] = useState(true);

  return (
    <s.Container>
      <s.Row>
        {canViewConformidadesPendente && (
          <s.DivSelector isDarkMode={isDarkMode}>
            <div className="max-sm:hidden flex w-[800px] items-center">
              <p className="font-semibold max-sm:text-[14px] mr-4">
                Escolher modo de Visualizar
              </p>
              <select name="" id="" onChange={handleChangeViewMode}>
                <option value="Lista">Lista</option>
                <option value="Quadro">Quadro</option>
              </select>
            </div>
            <div className="relative max-sm:ml-2 max-sm:mt-[-50px] max-sm:mb-[-35px] ml-[-15px] w-full">
              <input
                type="text"
                placeholder="Pesquisar não conformidade"
                className={`w-full h-10 pl-5 rounded-xl ${
                  isDarkMode
                    ? "bg-[#4f4f4f] placeholder:text-[#b4b4b4] border-[#494949]"
                    : "bg-[#ffffff] border-[#909090] placeholder:text-[#262626]"
                }`}
                value={searchQuery}
                onChange={handleSearchChange}
              />

              <IoMdSearch
                className={`absolute right-3 top-[20px] transform -translate-y-1/2 text-gray-500 ${
                  isDarkMode ? "text-[#b4b4b4]" : "text-[#4e4e4e]"
                }`}
                size={20}
              />
            </div>
          </s.DivSelector>
        )}
        <div className="w-full ">
          {!canViewConformidadesPendente && (
            <div className="mb-[-40px]">
              <div className="ml-10 flex flex-col ">
                {!viewMyConformidade ? (
                  <div className="w-full ">
                    <div className="flex items-center justify-between">
                      <h1 className="text-4xl max-sm:text-lg font-bold mb-4">
                        Suas Não Conformidades
                      </h1>
                      <h1
                        onClick={() => setViewMyConformidade(true)}
                        className="text-lg max-sm:text-sm mr-4 font-bold text-gray-600 ml-2 hover:text-blue-600 cursor-pointer transition-colors duration-300"
                      >
                        Voltar
                      </h1>
                    </div>
                    <div className="max-sm:w-[400px]">
                      <s.DividerMain isDarkMode={isDarkMode} />
                    </div>
                    <div className="flex ml-[1050px] max-sm:ml-[110px] mt-[-10px] mb-4 gap-10 max-sm:gap-0 items-center">
                      <div className="flex items-center max-sm:w-[80px] gap-1">
                        <div className="h-4 w-4 max-sm:w-3 max-sm:h-3 rounded-full bg-gray-400"></div>{" "}
                        <p className="max-sm:text-[10px] max-sm:hidden">Em</p>
                        <p className="max-sm:text-[10px]">Aberto</p>
                      </div>

                      <div className="flex items-center max-sm:w-[100px] gap-1">
                        <div className="h-4 w-4 max-sm:w-3 max-sm:h-3 rounded-full bg-yellow-500"></div>{" "}
                        <p className="max-sm:text-[10px]  max-sm:hidden">Em</p>
                        <p className="max-sm:text-[10px]">Andamento</p>
                      </div>

                      <div className="flex items-center max-sm:w-[100px] gap-1">
                        <div className="h-4 w-4 max-sm:w-3 max-sm:h-3 rounded-full bg-[#26d2dbc0]"></div>{" "}
                        <p className="max-sm:text-[10px]">Concluídas</p>
                      </div>
                    </div>

                    {userConformidades.length > 0 ? (
                      <div>
                        <ul className="flex max-sm:flex-col max-sm:pb-4">
                          {userConformidades.map((conformidade) => {
                            let statusClasses = "";

                            if (conformidade.status === "aberto") {
                              statusClasses = isDarkMode
                                ? "bg-[#707070] text-[#c0c0c0]"
                                : "bg-[#c0c0c0] text-[#202224]";
                            } else if (conformidade.status === "andamento") {
                              statusClasses = isDarkMode
                                ? "bg-[#b68929] text-[#c0c0c0]"
                                : "bg-[#edc533] text-[#202224]";
                            } else if (conformidade.status === "concluida") {
                              statusClasses = isDarkMode
                                ? "bg-[#1d9299] text-[#c0c0c0]"
                                : "bg-[#26d2db64] text-[#202224]";
                            }

                            return (
                              <li key={conformidade.id} className="py-2">
                                <div className="flex justify-between max-sm:pb-0 items-center p-2 pb-10 rounded-lg">
                                  <div
                                    className={`flex flex-col max-sm:w-[350px] w-[400px] p-4 rounded-lg space-y-2 ${statusClasses}`}
                                  >
                                    {!isSmallScreen && (
                                      <div className="text-lg">
                                        <span className="font-bold">Id:</span>{" "}
                                        {conformidade.id}
                                      </div>
                                    )}

                                    <div className="text-lg max-sm:text-sm">
                                      <span className="font-bold">Título:</span>{" "}
                                      {conformidade.titulo}
                                    </div>

                                    <div className="text-lg max-sm:text-sm">
                                      <span className="font-bold">Origem:</span>{" "}
                                      {conformidade.origem}
                                    </div>

                                    <div className="text-lg max-sm:text-sm">
                                      <span className="font-bold">
                                        Departamento:
                                      </span>{" "}
                                      {conformidade.departamento}
                                    </div>

                                    <div className="text-lg max-sm:text-sm">
                                      <span className="font-bold">Grau:</span>{" "}
                                      {conformidade.grau_severidade}
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                        <s.BtnAdd
                          canViewConformidadesPendente={
                            canViewConformidadesPendente
                          }
                          onClick={() => setAddConformidadeDialogIsOpen(true)}
                        >
                          Adicionar Não Conformidade
                          <IoMdAdd className="max-sm:hidden ml-2" />
                        </s.BtnAdd>
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        Nenhuma não conformidade encontrada.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex w-full flex-col ">
                    <div className="flex items-center max-sm:w-full justify-between">
                      <h1 className="text-4xl max-sm:text-lg  font-bold mb-4">
                        Solicite sua conformidade
                        <br /> agora mesmo!
                      </h1>
                      <h1
                        onClick={() => setViewMyConformidade(false)}
                        className={`${
                          isDarkMode ? "text-[#858585]" : "text-[#434343]"
                        } text-lg max-sm:text-[12px] mr-4 max-sm:mr-0 font-bold  hover:text-blue-600 cursor-pointer transition-colors duration-300`}
                      >
                        <span className="hidden max-sm:block mr-4 max-sm:mr-0">
                          Visualizar
                        </span>
                        <span className="hidden sm:block">
                          Visualizar suas não conformidades
                        </span>
                      </h1>
                    </div>
                    <div className="max-sm:w-full max-sm:ml-8">
                      <s.DividerMain isDarkMode={isDarkMode} />
                    </div>

                    <p
                      className={`text-lg  ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      } mb-4 max-sm:text-sm`}
                    >
                      Nossa plataforma permite que você registre, acompanhe e
                      gerencie não conformidades de forma rápida e eficiente.
                      Com apenas alguns cliques, você pode adicionar novas
                      conformidades e acompanhar o progresso de cada uma delas.
                    </p>
                    <img
                      src={imgAdd}
                      className="w-[500px] ml-auto mr-auto h-auto max-sm:w-[400px]"
                    />
                  </div>
                )}
              </div>
              <s.ButtonGroup>
                <div className="flex max-sm:flex-col mr-2 max-sm:mr-0 gap-4">
                  <div className="max-sm:ml-0 mt-10">
                    <s.BtnAdd
                      canViewConformidadesPendente={
                        canViewConformidadesPendente
                      }
                      onClick={() => setAddConformidadeDialogIsOpen(true)}
                    >
                      Adicionar Não Conformidade
                      <IoMdAdd className="ml-2" />
                    </s.BtnAdd>
                  </div>
                </div>
              </s.ButtonGroup>
            </div>
          )}

          <s.ButtonGroup>
            {canViewConformidadesPendente && (
              <div className="flex max-sm:flex-col mr-2 max-sm:mr-0 gap-4">
                <s.BtnCheck
                  onClick={() => setCheckNaoConformidadeDialogIsOpen(true)}
                >
                  Conformidades Pendentes{" "}
                  {conformidadesPendentes.length > 0
                    ? conformidadesPendentes.length
                    : ""}
                </s.BtnCheck>
                <div className="max-sm:ml-0">
                  <s.BtnAdd
                    canViewConformidadesPendente={canViewConformidadesPendente}
                    onClick={() => setAddConformidadeDialogIsOpen(true)}
                  >
                    Adicionar Não Conformidade
                    <IoMdAdd className="max-sm:hidden ml-2" />
                  </s.BtnAdd>
                </div>
              </div>
            )}
          </s.ButtonGroup>
        </div>
      </s.Row>

      <ModalConformidadeInfo
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        conformidade={selectedConformidade || null}
        onSave={handleEditConformidadeSubmit}
      />
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

      <s.Panel>
        {viewMode === "Quadro" ? (
          <KanbanBoard
            viewMode={viewMode}
            conformidades={filteredConformidades}
            onStatusChange={alterarStatusConformidade}
            onInfoClick={handleInfoClick}
            onEditConformidadeSubmit={handleEditConformidadeSubmit}
          />
        ) : (
          <div>
            {isFilter ? (
              <div>
                <div className="flex justify-between">
                  <h1 className="text-2xl max-sm:text-sm max-sm:w-full font-[500] mb-2">
                    Todas as não conformidades
                  </h1>

                  <div className="flex gap-10 max-sm:gap-0 items-center">
                    <div className="flex items-center max-sm:w-[80px] gap-1">
                      <div className="h-4 w-4 max-sm:w-3 max-sm:h-3 rounded-full bg-gray-400"></div>{" "}
                      <p className="max-sm:text-[10px] max-sm:hidden">Em</p>
                      <p className="max-sm:text-[10px]">Aberto</p>
                    </div>

                    <div className="flex items-center max-sm:w-[100px] gap-1">
                      <div className="h-4 w-4 max-sm:w-3 max-sm:h-3 rounded-full bg-yellow-500"></div>{" "}
                      <p className="max-sm:text-[10px]  max-sm:hidden">Em</p>
                      <p className="max-sm:text-[10px]">Andamento</p>
                    </div>

                    <div className="flex items-center max-sm:w-[100px] gap-1">
                      <div className="h-4 w-4 max-sm:w-3 max-sm:h-3 rounded-full bg-[#26d2dbc0]"></div>{" "}
                      <p className="max-sm:text-[10px]">Concluídas</p>
                    </div>
                  </div>
                </div>
                <s.DividerMain isDarkMode={isDarkMode} />

                {filteredConformidades.length === 0 ? (
                  <p className="mt-2 max-sm:text-lg text-xl text-gray-500">
                    Não existe nenhuma conformidade chamada "{searchQuery}"
                  </p>
                ) : (
                  <ul>
                    <div className="grid grid-cols-[50px_240px_260px_260px_200px_240px] max-sm:grid-cols-[50px_120px_50px] max-sm:text-sm max-sm:ml-4 gap-4 ml-12 mb-2 font-bold text-center">
                      <h1 className="max-sm:hidden">Id</h1>
                      <h1>Titulo</h1>
                      <h1>Origem</h1>
                      <h1>Departamento</h1>
                      <h1 className="max-sm:hidden">Responsável</h1>
                      <h1 className="max-sm:hidden">Grau Severidade</h1>
                    </div>
                    {filteredConformidades.map((conformidade) => (
                      <li key={conformidade.id}>
                        <ConformidadeFilter
                          conformidade={conformidade}
                          deletarNaoConformidade={deletarNaoConformidade}
                          onInfoClick={handleInfoClick}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <div>
                {canViewConformidadesPendente && (
                  <s.Box section="aberto" isDarkMode={isDarkMode}>
                    <div className="flex items-center justify-between max-sm:mb-2 max-sm:w-full">
                      <s.SectionTitle>Em Aberto</s.SectionTitle>
                      <s.IconWrapper>
                        <a
                          onClick={() => setAddConformidadeDialogIsOpen(true)}
                          href="#"
                        >
                          <IoMdAdd className="w-7 h-7 hover:scale-110 transition-all duration-300" />
                        </a>
                      </s.IconWrapper>
                    </div>

                    {isSmallScreen ? (
                      <s.StatusHeader>
                        <h1>Departamento</h1>
                        <h1>Grau de Severidade</h1>
                      </s.StatusHeader>
                    ) : (
                      <Id className="ml-[140px]" />
                    )}
                    <div className="">
                      {conformidadesAberto.map((conformidade) => (
                        <ConformidadeItem
                          key={conformidade.id}
                          conformidade={conformidade}
                          alterarStatusConformidade={alterarStatusConformidade}
                          deletarNaoConformidade={deletarNaoConformidade}
                          onInfoClick={handleInfoClick}
                        />
                      ))}
                    </div>
                  </s.Box>
                )}

                {canViewConformidadesPendente && (
                  <s.Box
                    section="andamento"
                    isDarkMode={isDarkMode}
                    style={{ marginTop: "24px" }}
                  >
                    <div className="flex items-center justify-between">
                      <s.SectionTitle>Em Andamento</s.SectionTitle>
                    </div>

                    {isSmallScreen ? (
                      <s.StatusHeader>
                        <h1>Departamento</h1>
                        <h1>Grau de Severidade</h1>
                      </s.StatusHeader>
                    ) : (
                      <Id className="ml-[140px]" />
                    )}

                    <div className="pb-4">
                      {conformidadesAndamento.map((conformidade) => (
                        <ConformidadeItem
                          key={conformidade.id}
                          conformidade={conformidade}
                          alterarStatusConformidade={alterarStatusConformidade}
                          deletarNaoConformidade={deletarNaoConformidade}
                          onInfoClick={handleInfoClick}
                        />
                      ))}
                    </div>
                  </s.Box>
                )}

                {canViewConformidadesPendente && (
                  <s.Box
                    section="concluido"
                    isDarkMode={isDarkMode}
                    style={{ marginTop: "24px", marginBottom: "20px" }}
                  >
                    <div className="flex items-center justify-between">
                      <s.SectionTitle>Concluídas</s.SectionTitle>
                    </div>

                    {isSmallScreen ? (
                      <s.StatusHeader>
                        <h1>Departamento</h1>
                        <h1>Grau de Severidade</h1>
                      </s.StatusHeader>
                    ) : (
                      <Id className="ml-[140px]" />
                    )}

                    <div className="pb-4">
                      {conformidadesConcluida.map((conformidade) => (
                        <ConformidadeItem
                          key={conformidade.id}
                          conformidade={conformidade}
                          alterarStatusConformidade={alterarStatusConformidade}
                          deletarNaoConformidade={deletarNaoConformidade}
                          onInfoClick={handleInfoClick}
                        />
                      ))}
                    </div>
                  </s.Box>
                )}
              </div>
            )}
          </div>
        )}
      </s.Panel>
    </s.Container>
  );
};

export default NaoConformidades;
