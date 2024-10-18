import PropTypes from "prop-types";
import Input from "./Input";
import Botao from "./Botao";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

const AddConformidadeDialog = ({
  isOpen,
  handleClose,
  addConformidadeFunction,
}) => {
  const [title, setTitle] = useState("");
  const [origem, setOrigem] = useState("Processos / Insumos");
  const [descricao, setDescricao] = useState("");
  const [enquadramento, setEnquadramento] = useState("");
  const [acao_imediata, setAcaoImediata] = useState("");
  const [investigacao, setInvestigacao] = useState("");
  const [grau_severidade, setgrauSeveridade] = useState("Baixo");

  const handleSaveClick = () => {
    const dataAtual = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    addConformidadeFunction({
      title,
      origem,
      descricao,
      enquadramento,
      acao_imediata,
      investigacao,
      grau_severidade,
      data: dataAtual,
      status: "aberto",
    });

    // Reset dos campos
    setTitle("");
    setOrigem("Processos / Insumos");
    setDescricao("");
    setEnquadramento("");
    setAcaoImediata("");
    setInvestigacao("");
    setgrauSeveridade("Baixo");
  };

  const nodeRef = useRef();

  if (!isOpen) return null;

  return (
    <CSSTransition in={isOpen} timeout={500} classNames="fade" unmountOnExit>
      <div ref={nodeRef}>
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="relative bg-white flex-col p-6 justify-center rounded-[20px] w-[900px] h-[800px] shadow-lg overflow-y-auto">
            <IoMdClose
              className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-600 hover:text-gray-800"
              onClick={handleClose}
            />
            <div className="flex flex-col items-center">
              <h1 className="font-bold text-2xl">Adicionar Não Conformidade</h1>
              <p>Insira as informações abaixo</p>
            </div>
            <div className="flex flex-wrap mt-6 gap-6 justify-between">
              <div className="w-full lg:w-[48%]">
                <Input
                  label="Título"
                  placeholder="Insira um título"
                  labelClass="ml-5 text-2xl"
                  className="w-full h-[40px] rounded-[20px] pl-5 bg-[#F1F4F9] text-black border border-[#000000]"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="w-full  lg:w-[48%]">
                <label className="ml-5  text-2xl">Origem</label>
                <select
                  value={origem}
                  onChange={(e) => setOrigem(e.target.value)}
                  className="w-full mt-[14px] h-[40px] rounded-[20px] pl-5 bg-[#F1F4F9] text-black border border-[#000000]"
                >
                  <option>Processos / Insumos</option>
                  <option>Auditoria Interna</option>
                  <option>Auditoria Externa</option>
                  <option>Análise Crítica do Sistema</option>
                  <option>Reclamação de Cliente</option>
                  <option>Produto não conforme</option>
                  <option>Acidente / Incidente</option>
                  <option>Oportunidade de melhoria</option>
                </select>
              </div>

              <div className="w-full">
                <Input
                  label="Descrição da Não Conformidade"
                  placeholder="Descreva a não conformidade"
                  labelClass="ml-5 text-2xl"
                  isTextarea={true}
                  className="w-full h-[166px] rounded-[20px] p-5 bg-[#F1F4F9] text-black border border-[#000000] resize-none"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>
              <div className="w-full lg:w-[100%]">
                <label className="pl-5 text-2xl ">
                  Anexar a evidência da não conformidade
                  <input
                    type="file"
                    name="anexo"
                    id="anexo"
                    className="block mt-[14px] w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:cursor-pointer file:text-white hover:file:bg-blue-600"
                    multiple
                  />
                </label>
              </div>
              <div className="w-full lg:w-[48%]">
                <label className="ml-5  text-2xl">Enquadramento</label>
                <select
                  value={enquadramento}
                  onChange={(e) => setEnquadramento(e.target.value)}
                  className="w-full h-[40px] mt-[14px] rounded-[20px] pl-5 bg-[#F1F4F9] text-black border border-[#000000]"
                >
                  <option>ABNT NBR ISO 15189:2015</option>
                  <option>ABNT NBR ISO 9001:2015</option>
                  <option>ABNT NBR ISO/IEC 17025:2017</option>
                  <option>PORTARIA DE CONSOLIDAÇÃO</option>
                  <option>RDC Nº 34:2014</option>
                  <option>RDC Nº 399:2020</option>
                </select>
              </div>

              <div className="w-full lg:w-[48%]">
                <Input
                  label="Ação Imediata"
                  placeholder="Descreva a ação imediata tomada"
                  labelClass="ml-5 text-2xl"
                  className="w-full h-[40px] rounded-[20px] pl-5 bg-[#F1F4F9] text-black border border-[#000000]"
                  value={acao_imediata}
                  onChange={(e) => setAcaoImediata(e.target.value)}
                />
              </div>

              <div className="w-full">
                <Input
                  label="Investigação e Identificação de Causas"
                  placeholder="Explique a investigação e causas"
                  labelClass="ml-5 text-2xl"
                  isTextarea={true}
                  className="w-full h-[166px] rounded-[20px] p-5 bg-[#F1F4F9] text-black border border-[#000000] resize-none"
                  value={investigacao}
                  onChange={(e) => setInvestigacao(e.target.value)}
                />
              </div>
            </div>

            <div className="flex w-full mt-2">
              <Botao
                className="desktop:text-xl justify-center desktop:w-[400px] mr-5 desktop:ml-auto laptop:w-[280px] mobile:w-[280px] mt-7"
                select="btn_cancel"
                onClick={handleSaveClick}
              >
                Cancelar
              </Botao>
              <Botao
                className="desktop:text-xl justify-center desktop:w-[400px] desktop:ml-auto laptop:w-[280px] mobile:w-[280px] mt-7"
                select="btn_add"
                onClick={handleSaveClick}
              >
                Adicionar Não Conformidade
                <IoMdAdd className="h-5 w-5 ml-2" />
              </Botao>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

AddConformidadeDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  addConformidadeFunction: PropTypes.func,
};

export default AddConformidadeDialog;
