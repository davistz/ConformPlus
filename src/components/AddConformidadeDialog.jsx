import PropTypes from "prop-types";
import Input from "./Input";
import Botao from "./Botao";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import { useTheme } from "../ThemeContext";
import { createPortal } from "react-dom";

const AddConformidadeDialog = ({
  isOpen,
  handleClose,
  addConformidadeFunction,
}) => {
  const [title, setTitle] = useState("");
  const [origem, setOrigem] = useState("Processos / Insumos");
  const [departamento, setDepartamento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [departamento_destino, setDepartamentoDestino] = useState("");
  const [enquadramento, setEnquadramento] = useState("");
  const [acao_imediata, setAcaoImediata] = useState("");
  const [investigacao, setInvestigacao] = useState("");
  const [grau_severidade, setgrauSeveridade] = useState("Baixo");
  const [fileEvidencia, setFileEvidencia] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setFileEvidencia(files);
  };

  const handleSaveClick = async () => {
    const dataAtual = new Date().toISOString();

    try {
      const responseGet = await axios.get(
        "http://localhost:3001/conformidades"
      );
      const conformidades = responseGet.data;

      const ultimoId = conformidades.reduce(
        (max, item) => Math.max(max, parseInt(item.id, 10)),
        0
      );
      const novoId = (ultimoId + 1).toString();

      const naoConformidadeData = {
        id: novoId,
        titulo: title,
        origem,
        descricao,
        enquadramento,
        acao_imediata,
        investigacao,
        departamento,
        departamento_destino,
        data: dataAtual,
        grau_severidade,
        status: "aberto",
      };

      const responsePost = await axios.post(
        "http://localhost:3001/conformidades",
        naoConformidadeData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Não conformidade criada:", responsePost.data);
      addConformidadeFunction(responsePost.data);
      handleClose();
    } catch (error) {
      console.error("Erro ao criar a não conformidade:", error);
    }

    setTitle("");
    setOrigem("Processos / Insumos");
    setDescricao("");
    setDepartamento("");
    setDepartamentoDestino("");
    setEnquadramento("");
    setAcaoImediata("");
    setInvestigacao("");
    setgrauSeveridade("Baixo");
  };

  const nodeRef = useRef();

  if (!isOpen) return null;

  const { isDarkMode } = useTheme();

  return createPortal(
    <div ref={nodeRef}>
      <div className="fixed inset-0 z-50 flex items-center mt-20 justify-center backdrop-blur-sm">
        <div
          className={`relative flex-col p-6 justify-center rounded-[20px] max-sm:w-[350px] max-sm:h-[550px] w-[900px] h-[800px] shadow-lg overflow-y-auto ${
            isDarkMode ? "bg-[#2D2D2D] text-white" : "bg-white text-black"
          }`}
        >
          <IoMdClose
            className={`absolute max-sm:text-lg top-4 right-4 text-2xl cursor-pointer text-gray-600 hover:text-gray-800 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
            onClick={handleClose}
          />
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-2xl max-sm:mt-2 max-sm:text-[18px]">
              Adicionar Não Conformidade
            </h1>
            <p className="max-sm:hidden">Insira as informações abaixo</p>
          </div>
          <div className="flex flex-wrap mt-6 gap-[14px] justify-between">
            <div className="w-full lg:w-[48%]">
              <Input
                label="Título"
                placeholder="Insira um título"
                labelClass={`max-sm:text-sm ml-3 text-[22px] ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
                className={`max-sm:h-[35px] max-sm:placeholder:text-sm w-full mt-[4px] h-[40px] rounded-[20px] pl-5 border ${
                  isDarkMode
                    ? "bg-[#00000021] text-[#f1f4f9b9] border-[#555555]"
                    : "bg-[#F1F4F9] text-black border-[#000000]"
                }`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="w-full  lg:w-[48%]">
              <label
                className={`max-sm:text-sm ml-3  text-[22px] font-[500] ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Origem
              </label>
              <select
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                className={`max-sm:text-sm w-full mt-[7px] h-[40px] rounded-[20px] pl-5 border ${
                  isDarkMode
                    ? "bg-[#00000021] text-[#f1f4f9b9] border-[#555555]"
                    : "bg-[#F1F4F9] text-black border-[#000000]"
                }`}
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
                labelClass={`max-sm:text-sm ml-3 text-[22px] ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
                isTextarea={true}
                className={`max-sm:h-[100px] max-sm:placeholder:text-sm  w-full h-[100px] rounded-[20px] p-4 bg-[#F1F4F9] text-black border border-[#000000] resize-none ${
                  isDarkMode
                    ? "bg-[#00000021] border-[#555555] placeholder:text-[#f1f4f9b9]"
                    : "bg-[#F1F4F9] placeholder:text-[#000000b9]"
                }`}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
            <div className="w-full max-sm:flex-col flex lg:w-[100%]">
              <div className="max-sm:w-[100%] w-[50%] pr-4">
                <label className="max-sm:text-sm ml-3 text-[22px] font-[500]">
                  Anexar uma evidência
                  <input
                    type="file"
                    name="anexo"
                    id="anexo"
                    onChange={handleFileChange}
                    className={`${
                      isDarkMode
                        ? "text-[#f1f4f9da] bg-[#00000021] file:bg-[#234575] border-[#555555] file:text-[#ffffff]"
                        : "text-black border-[#555555]"
                    } block mt-[4px] w-full text-sm text-gray-900 border 
                        rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 
                        focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                        file:text-sm file:font-semibold file:bg-blue-500 file:cursor-pointer file:text-white hover:file:bg-blue-600`}
                    multiple
                  />
                </label>
              </div>
              <div className="max-sm:w-[100%] max-sm:pl-0 max-sm:mt-4 w-[50%] pl-4">
                <label className="max-sm:text-sm  ml-3 text-[22px] font-[500]">
                  Departamento de Origem
                </label>
                <select
                  value={departamento_destino}
                  onChange={(e) => setDepartamentoDestino(e.target.value)}
                  className={`max-sm:text-sm w-full mt-[4px] h-[40px] rounded-[20px] pl-5 border ${
                    isDarkMode
                      ? "bg-[#00000021] text-[#f1f4f9b9] border-[#555555]"
                      : "bg-[#F1F4F9] text-black border-[#000000]"
                  }`}
                >
                  <option>Laboratório</option>
                  <option>Recursos Humanos</option>
                  <option>Financeiro</option>
                  <option>TI</option>
                  <option>Coleta de Sangue</option>
                </select>
              </div>
            </div>
            <div className="w-full lg:w-[48%]">
              <label className="max-sm:text-sm ml-3 text-[22px] font-[500]">
                Enquadramento
              </label>
              <select
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                className={`max-sm:text-sm w-full mt-[4px] h-[40px] rounded-[20px] pl-5 border ${
                  isDarkMode
                    ? "bg-[#00000021] text-[#f1f4f9b9] border-[#555555]"
                    : "bg-[#F1F4F9] text-black border-[#000000]"
                }`}
              >
                <option>ABNT NBR ISO 15189:2015</option>
                <option>ABNT NBR ISO 9001:2015</option>
                <option>ABNT NBR ISO/IEC 17025:2017</option>
                <option>Portaria de Consolidação</option>
                <option>RDC Nº 34:2014</option>
                <option>RDC Nº 399:2020</option>
              </select>
            </div>

            <div className="w-full lg:w-[48%]">
              <Input
                label="Ação Imediata"
                placeholder="Descreva a ação imediata tomada"
                labelClass={`max-sm:text-sm  ml-3 text-[22px] ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
                className={`w-full h-[40px] max-sm:text-sm rounded-[20px] p-4 bg-[#F1F4F9] text-black border border-[#000000] resize-none ${
                  isDarkMode
                    ? "bg-[#00000021] border-[#555555] placeholder:text-[#f1f4f9b9]"
                    : "bg-[#F1F4F9] placeholder:text-[#000000b9]"
                }`}
                value={acao_imediata}
                onChange={(e) => setAcaoImediata(e.target.value)}
              />
            </div>

            <div className="w-full">
              <Input
                label="Investigação e Identificação de Causas"
                placeholder="Explique a investigação e causas"
                labelClass={`max-sm:text-sm max-sm:mb-2 ml-3 text-[22px] ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
                isTextarea={true}
                className={`w-full max-sm:text-sm h-[100px] rounded-[20px] p-4 bg-[#F1F4F9] text-black border border-[#000000] resize-none ${
                  isDarkMode
                    ? "bg-[#00000021] border-[#555555] placeholder:text-[#f1f4f9b9]"
                    : "bg-[#F1F4F9] placeholder:text-[#000000b9]"
                }`}
                value={investigacao}
                onChange={(e) => setInvestigacao(e.target.value)}
              />
            </div>
          </div>

          <div className="max-sm:w-[10%] flex w-full">
            <Botao
              className="max-sm:w-[140px]  max-sm:h-[45px] max-sm:mr-4 desktop:text-xl justify-center desktop:w-[400px] mr-6 desktop:ml-auto laptop:w-[280px] mobile:w-[280px] mt-7"
              select="btn_cancel"
              onClick={handleClose}
            >
              Cancelar
            </Botao>
            <Botao
              className={`max-sm:w-[140px] max-sm:h-[45px] justify-center desktop:w-[420px] desktop:ml-auto laptop:w-[280px] mobile:w-[280px] mt-7`}
              select="btn_add"
              onClick={handleSaveClick}
            >
              <span className="hidden max-sm:inline">Adicionar</span>
              <span className="max-sm:hidden">Adicionar Não Conformidade</span>
              <IoMdAdd className="max-sm:hidden h-5 w-5 ml-2" />
            </Botao>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("root") || document.body
  );
};

AddConformidadeDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  addConformidadeFunction: PropTypes.func,
};

export default AddConformidadeDialog;
