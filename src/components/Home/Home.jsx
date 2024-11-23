import { useEffect, useState } from "react";

import { IoMdAdd, IoMdSearch } from "react-icons/io";

import * as s from "./Home.styled.jsx";
import ConformidadeItem from "../ConformidadeItem/ConformidadeItem.jsx";
import { toast } from "sonner";
import axios from "axios";
import AddConformidadeDialog from "../AddConformidadeDialog.jsx";
import NaoConformidadeCheck from "../ConformidadesCheck/NaoConformidadeCheck.jsx";
import Id from "../Id/Id.jsx";
import KanbanBoard from "../KanbanBoard/KanbanBoard.jsx";
import ModalConformidadeInfo from "../ModalConformidadeInfo.jsx";
import { useTheme } from "../../ThemeContext.jsx";
import ConformidadeFilter from "../ConformidadeFilter/ConformidadeFilter.jsx";

const NaoConformidades = () => {
  const [conformidades, setConformidades] = useState([]);
  const [filteredConformidades, setFilteredConformidades] = useState([]); // Lista filtrada
  const [searchQuery, setSearchQuery] = useState(""); // Estado para pesquisa
  const [isFilter, setIsFilter] = useState(true); // Controla se está filtrando

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

  const { isDarkMode } = useTheme(); // Obtém o estado do tema

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(1024 >= window.innerWidth);
    };

    window.addEventListener("resize", checkScreenSize);
    checkScreenSize();

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const fetchConformidades = async () => {
      try {
        const response = await axios.get("http://localhost:3001/conformidades");
        const data = Array.isArray(response.data) ? response.data : [];
        setConformidades(data);
        setFilteredConformidades(data); // Inicialmente, todas as conformidades são exibidas
      } catch (error) {
        toast.error("Erro ao carregar as não conformidades.");
        console.error(error);
      }
    };

    fetchConformidades();
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

  const deletarNaoConformidade = async (conformidadeId) => {
    const conformidadeIdStr = String(conformidadeId);
    console.log("Deletando conformidade com ID:", conformidadeIdStr);

    try {
      await axios.delete(
        `http://localhost:3001/conformidades/${conformidadeIdStr}`
      );
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

      if (conformidade.status === "pendente") {
        toast.success("Não conformidade alterada para em andamento!");
        return { ...conformidade, status: "aberto" };
      }
      if (conformidade.status === "aberto") {
        toast.success("Não conformidade alterada para em andamento!");
        return { ...conformidade, status: "andamento" };
      }
      if (conformidade.status === "concluida") {
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
    <s.Container>
      <s.Row>
        <s.DivSelector isDarkMode={isDarkMode}>
          <div className="flex w-[800px] items-center">
            <p className="font-semibold max-sm:text-[14px] mr-4">
              Escolher modo de Visualizar
            </p>
            <select name="" id="" onChange={handleChangeViewMode}>
              <option value="Lista">Lista</option>
              <option value="Quadro">Quadro</option>
            </select>
          </div>
          <div className="relative ml-[-15px] w-full">
            {/* Campo de Pesquisa com ícone de lupa */}
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
              onBlur={handleClearSearch}
            />
            {/* Ícone de lupa posicionado */}
            <IoMdSearch
              className={`absolute right-3 top-[20px] transform -translate-y-1/2 text-gray-500 ${
                isDarkMode ? "text-[#b4b4b4]" : "text-[#4e4e4e]"
              }`}
              size={20}
            />
          </div>
        </s.DivSelector>
        <s.ButtonGroup>
          {canViewConformidadesPendente && (
            <s.BtnCheck
              onClick={() => setCheckNaoConformidadeDialogIsOpen(true)}
            >
              Conformidades Pendentes{" "}
              {conformidadesPendentes.length > 0
                ? conformidadesPendentes.length
                : ""}
            </s.BtnCheck>
          )}
          <s.BtnAdd onClick={() => setAddConformidadeDialogIsOpen(true)}>
            Adicionar Não Conformidade
            <IoMdAdd
              className="max-sm:hidden"
              style={{ marginLeft: "8px", width: "20px", height: "20px" }}
            />
          </s.BtnAdd>
        </s.ButtonGroup>
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
            conformidades={filteredConformidades} // Passa a lista filtrada para o Kanban
            onStatusChange={alterarStatusConformidade}
            onInfoClick={handleInfoClick}
            onEditConformidadeSubmit={handleEditConformidadeSubmit}
          />
        ) : (
          <div>
            {isFilter ? (
              <div>
                <h1 className="text-2xl font-[500] mb-2">
                  Todas as não conformidades
                </h1>
                <s.DividerMain isDarkMode={isDarkMode} />

                {/* Verificação de conformidades filtradas */}
                {filteredConformidades.length === 0 ? (
                  <p className="mt-2 text-xl text-gray-500">
                    Não existe nenhuma conformidade chamada "{searchQuery}"
                  </p>
                ) : (
                  <ul>
                    {filteredConformidades.map((conformidade) => (
                      <li key={conformidade.id}>
                        <ConformidadeFilter conformidade={conformidade} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <div>
                {/* Exibe a lista de conformidades com status */}
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

                {/* Seções: Em Andamento e Concluídas */}
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

                {/* Seção Concluídas */}
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
              </div>
            )}
          </div>
        )}
      </s.Panel>
    </s.Container>
  );
};

// {isFilter ? (
//   <ul>
//     {filteredConformidades.map((conformidade) => (
//       <li key={conformidade.id}>
//         <ConformidadeItem conformidade={conformidade} />
//       </li>
//     ))}
//   </ul>
// ) : (
//   <div>

//   </div>
// )}

export default NaoConformidades;
