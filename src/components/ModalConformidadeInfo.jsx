/* eslint-disable react-hooks/rules-of-hooks */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { IoMdClose } from "react-icons/io";
import userImg from "../img/img_users/lucas.png";

const ModalConformidadeInfo = ({ isOpen, onClose, conformidade, onSave }) => {
  if (!isOpen) return null;

  const [editConformidade, setEditConformidade] = useState(
    () => conformidade || {}
  );
  const [fileEvidencia, setFileEvidencia] = useState([]);

  useEffect(() => {
    setEditConformidade(conformidade || {});
  }, [conformidade]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditConformidade((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editConformidade);
    onClose();
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = fileEvidencia.filter((_, i) => i !== index);
    setFileEvidencia(updatedFiles);
  };

  const handlePreviewFile = (file) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFileEvidencia((prev) => [...prev, ...files]);
  };

  const { isDarkMode } = useTheme();

  return (
    <div
      className={`fixed z-10 inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center`}
    >
      <div
        className={`absolute max-sm:w-[390px] max-sm:h-[580px] max-sm:mt-[120px] w-[650px] h-[720px] p-6 rounded-lg shadow-lg flex flex-col z-50 ${
          isDarkMode ? "bg-[#2D2D2D] text-white" : "bg-white text-black"
        }`}
      >
        <div className="w-full">
          <h2
            className={`text-2xl ml-[100px] max-sm:ml-[30px] max-sm:text-lg font-bold mb-6 ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Detalhes da Não Conformidade
          </h2>
          <IoMdClose
            className={`absolute max-sm:text-lg top-4 right-4 text-2xl cursor-pointer text-gray-600 hover:text-gray-800 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
            onClick={onClose}
          />
          <div className="space-y-4 max-sm:space-y-0">
            <div className="flex flex-col max-sm:mb-2">
              <label
                className={`font-medium max-sm:text-sm text-lg ${
                  isDarkMode ? "text-white" : "text-gray-700"
                }`}
              >
                Titulo
              </label>
              <input
                type="text"
                name="titulo"
                value={editConformidade.titulo || ""}
                onChange={handleChange}
                className={`w-full mt-[10px] max-sm:mb-2 max-sm:mt-0 max-sm:h-[30px] h-[40px] rounded-md pl-5 ${
                  isDarkMode
                    ? "bg-[#00000021] text-[#dfdfdf] border border-gray-600"
                    : "bg-[#F1F4F9] text-black border border-[#000000]"
                }`}
              />
            </div>
            <div className="flex flex-col max-sm:mb-2">
              <label
                className={`font-medium max-sm:text-sm text-lg ${
                  isDarkMode ? "text-white" : "text-gray-700"
                }`}
              >
                Departamento de Origem:
              </label>
              <select
                name="origem"
                value={editConformidade.origem || ""}
                onChange={handleChange}
                className={`w-full mt-[10px] max-sm:mb-2 max-sm:mt-0 max-sm:h-[37px] h-[40px] rounded-md pl-5 ${
                  isDarkMode
                    ? "bg-[#00000021] text-[#dfdfdf]  border border-gray-600"
                    : "bg-[#F1F4F9] text-black border border-[#000000]"
                }`}
              >
                <option
                  className={`${
                    isDarkMode ? "bg-zinc-800" : "bg-[#00000021] "
                  }`}
                >
                  Laboratorio
                </option>
                <option
                  className={`${
                    isDarkMode ? "bg-zinc-800" : "bg-[#00000021] "
                  }`}
                >
                  Recursos Humanos
                </option>
                <option
                  className={`${
                    isDarkMode ? "bg-zinc-800" : "bg-[#00000021] "
                  }`}
                >
                  Financeiro
                </option>
                <option
                  className={`${
                    isDarkMode ? "bg-zinc-800" : "bg-[#00000021] "
                  }`}
                >
                  TI
                </option>
                <option
                  className={`${
                    isDarkMode ? "bg-zinc-800" : "bg-[#00000021] "
                  }`}
                >
                  Coleta de Sangue
                </option>
              </select>
            </div>
            <div className="flex flex-col max-sm:mb-2">
              <label
                className={`font-medium max-sm:text-sm text-lg ${
                  isDarkMode ? "text-white" : "text-gray-700"
                }`}
              >
                Enquadramento
              </label>
              <select
                name="enquadramento"
                value={editConformidade.enquadramento || ""}
                onChange={handleChange}
                className={`w-full h-[40px] mt-[10px] max-sm:mt-0 max-sm:mb-2 max-sm:h-[35px] rounded-md pl-5 ${
                  isDarkMode
                    ? "bg-[#00000021] text-[#dfdfdf]  border border-gray-600"
                    : "bg-[#F1F4F9] text-black border border-[#000000]"
                }`}
              >
                <option
                  className={`${
                    isDarkMode ? "bg-zinc-800" : "bg-[#00000021] "
                  }`}
                >
                  ABNT NBR ISO 15189:2015
                </option>
                <option
                  className={`${
                    isDarkMode ? "bg-zinc-800" : "bg-[#00000021] "
                  }`}
                >
                  ABNT NBR ISO 9001:2015
                </option>
                <option
                  className={`${
                    isDarkMode ? "bg-zinc-800" : "bg-[#00000021] "
                  }`}
                >
                  ABNT NBR ISO/IEC 17025:2017
                </option>
                <option
                  className={`${
                    isDarkMode ? "bg-zinc-800" : "bg-[#00000021] "
                  }`}
                >
                  Portaria de Consolidação
                </option>
                <option
                  className={`${
                    isDarkMode ? "bg-zinc-800" : "bg-[#00000021] "
                  }`}
                >
                  RDC Nº 34:2014
                </option>
                <option
                  className={`${
                    isDarkMode ? "bg-zinc-800" : "bg-[#00000021] "
                  }`}
                >
                  RDC Nº 399:2020
                </option>
              </select>
            </div>
            <div className="flex flex-col max-sm:mb-2">
              <div className="relative w-full mt-[10px]  max-sm:mb-2 max-sm:mt-0">
                <label
                  className={`font-medium max-sm:text-sm text-lg ${
                    isDarkMode ? "text-white" : "text-gray-700"
                  }`}
                >
                  Responsável
                </label>
                <div className="relative flex ">
                  <img
                    src={userImg}
                    alt="Ícone"
                    className="absolute top-1/2 left-3 transform mt-[6px] max-sm:mt-0 -translate-y-1/2 w-5 h-5  rounded-full"
                  />
                  <select
                    name="responsavel"
                    value={editConformidade.createdBy || ""}
                    onChange={handleChange}
                    className={`w-full h-[40px] mt-[10px]  max-sm:mt-0 max-sm:mb-2 max-sm:h-[40px] rounded-md pl-10 ${
                      isDarkMode
                        ? "bg-[#00000021] text-[#dfdfdf]  border border-gray-600"
                        : "bg-[#F1F4F9] text-black border border-[#000000]"
                    }`}
                  >
                    <option
                      className={`${
                        isDarkMode ? "bg-zinc-800" : "bg-[#00000021] "
                      }`}
                    >
                      <img
                        src={userImg}
                        alt="Ícone"
                        className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5"
                      />
                      {editConformidade.createdBy}
                    </option>
                    <option
                      className={`${
                        isDarkMode ? "bg-zinc-800" : "bg-[#00000021] "
                      }`}
                    >
                      Davi Souza
                    </option>
                    <option
                      className={`${
                        isDarkMode ? "bg-zinc-800" : "bg-[#00000021] "
                      }`}
                    >
                      Felipe Moura
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col max-sm:mb-2">
              <label
                className={`font-medium max-sm:text-sm text-lg ${
                  isDarkMode ? "text-white" : "text-gray-700"
                }`}
              >
                Grau de Severidade:
              </label>
              <select
                name="grau_severidade"
                value={editConformidade.grau_severidade || ""}
                onChange={handleChange}
                className={`w-full h-[40px] mt-[10px] max-sm:mt-0 max-sm:mb-2 max-sm:h-[35px] rounded-md pl-5 ${
                  isDarkMode
                    ? "bg-[#00000021] text-[#dfdfdf]  border border-gray-600"
                    : "bg-[#F1F4F9] text-black border border-[#000000]"
                }`}
              >
                <option
                  className={`${
                    isDarkMode ? "bg-zinc-800" : "bg-[#00000021] "
                  }`}
                >
                  Baixo
                </option>
                <option
                  className={`${
                    isDarkMode ? "bg-zinc-800" : "bg-[#00000021] "
                  }`}
                >
                  Médio
                </option>
                <option
                  className={`${
                    isDarkMode ? "bg-zinc-800" : "bg-[#00000021] "
                  }`}
                >
                  Alto
                </option>
              </select>
            </div>

            <div className="flex flex-col max-sm:mb-2">
              <label
                className={`font-medium max-sm:text-sm text-lg ${
                  isDarkMode ? "text-white" : "text-gray-700"
                }`}
              >
                Anexar Arquivos:
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className={`mt-[10px] max-sm:p-0 file:border-[#000000]  max-sm:mt-0 max-sm:mb-2 max-sm:h-[35px] border border-[#000000] rounded-md  ${
                  isDarkMode
                    ? "bg-[#00000021] file:bg-[#234575] file:text-[#dfdfdf] "
                    : "bg-[#F1F4F9] file:bg-blue-500 text-black"
                }`}
              />
              {fileEvidencia.length > 0 && (
                <div className="mt-4">
                  <h3
                    className={`font-medium text-lg ${
                      isDarkMode ? "text-white" : "text-gray-700"
                    }`}
                  >
                    Arquivos Anexados:
                  </h3>
                  <table className="min-w-full mt-2 border border-gray-300">
                    <thead>
                      <tr>
                        <th
                          className={`border border-gray-300 p-2 ${
                            isDarkMode ? "text-white" : "text-gray-700"
                          }`}
                        >
                          Arquivo
                        </th>
                        <th
                          className={`border border-gray-300 p-2 ${
                            isDarkMode ? "text-white" : "text-gray-700"
                          }`}
                        >
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fileEvidencia.map((file, index) => (
                        <tr key={index}>
                          <td
                            className={`border border-gray-300 p-2 ${
                              isDarkMode ? "text-white" : "text-gray-700"
                            }`}
                          >
                            {file.name}
                          </td>
                          <td
                            className={`border border-gray-300 p-2 ${
                              isDarkMode ? "text-white" : "text-gray-700"
                            }`}
                          >
                            <button
                              onClick={() => handlePreviewFile(file)}
                              className={`text-blue-500 hover:underline mr-2 ${
                                isDarkMode ? "text-blue-300" : ""
                              }`}
                            >
                              Visualizar
                            </button>
                            <button
                              onClick={() => handleRemoveFile(index)}
                              className={`text-red-500 hover:underline ${
                                isDarkMode ? "text-red-300" : ""
                              }`}
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full items-center gap-2 flex mt-6">
          <button
            onClick={onClose}
            className="bg-gray-400 w-full text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-300 shadow-md"
          >
            Fechar
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 h-10 text-white w-full px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

ModalConformidadeInfo.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  conformidade: PropTypes.shape({
    id: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    origem: PropTypes.string.isRequired,
    enquadramento: PropTypes.string.isRequired,
    grau_severidade: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ModalConformidadeInfo;
