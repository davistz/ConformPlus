/* eslint-disable react-hooks/rules-of-hooks */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

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
    window.open(fileURL); // Abre o arquivo em uma nova aba
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFileEvidencia((prev) => [...prev, ...files]);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white max-sm:w-[400px] max-sm:h-[500px] w-[650px] h-[640px] p-6 rounded-lg shadow-lg flex flex-col">
        <div className="w-full">
          <h2 className="text-2xl ml-[100px] max-sm:ml-[30px] max-sm:text-lg w-[300px]  font-bold mb-6 text-gray-700">
            Detalhes da Não Conformidade
          </h2>
          <div className="space-y-4 max-sm:space-y-0">
            <div className="flex flex-col">
              <label className="font-medium max-sm:text-sm text-lg">
                Descrição:
              </label>
              <input
                type="text"
                name="titulo"
                value={editConformidade.titulo || ""}
                onChange={handleChange}
                className="w-full mt-[14px] max-sm:mb-2 max-sm:mt-2 max-sm:h-[30px] h-[40px] rounded-md pl-5 bg-[#F1F4F9] text-black border border-[#000000]"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium max-sm:text-sm text-lg">
                Departamento de Origem:
              </label>
              <select
                name="origem"
                value={editConformidade.origem || ""}
                onChange={handleChange}
                className="w-full mt-[14px] max-sm:mb-2  max-sm:mt-2 max-sm:h-[37px] h-[40px] rounded-md pl-5 bg-[#F1F4F9] text-black border border-[#000000]"
              >
                <option>Laboratorio</option>
                <option>Recursos Humanos</option>
                <option>Financeiro</option>
                <option>TI</option>
                <option>Coleta de Sangue</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-medium max-sm:text-sm text-lg">
                Enquadramento
              </label>
              <select
                name="enquadramento"
                value={editConformidade.enquadramento || ""}
                onChange={handleChange}
                className="w-full h-[40px] mt-[14px] max-sm:mt-2 max-sm:mb-2 max-sm:h-[35px] rounded-md pl-5 bg-[#F1F4F9] text-black border border-[#000000]"
              >
                <option>ABNT NBR ISO 15189:2015</option>
                <option>ABNT NBR ISO 9001:2015</option>
                <option>ABNT NBR ISO/IEC 17025:2017</option>
                <option>Portaria de Consolidação</option>
                <option>RDC Nº 34:2014</option>
                <option>RDC Nº 399:2020</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-medium max-sm:text-sm text-lg">
                Grau de Severidade:
              </label>
              <select
                name="grau_severidade"
                value={editConformidade.grau_severidade || ""}
                onChange={handleChange}
                className="w-full h-[40px] mt-[14px] max-sm:mt-2 max-sm:mb-2 max-sm:h-[35px] rounded-md pl-5 bg-[#F1F4F9] text-black border border-[#000000]"
              >
                <option>Baixo</option>
                <option>Médio</option>
                <option>Alto</option>
              </select>
            </div>

            {/* Input para anexar arquivos */}
            <div className="flex flex-col">
              <label className="font-medium max-sm:text-sm text-lg">
                Anexar Arquivos:
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="mt-[14px] max-sm:mt-2 max-sm:mb-2 max-sm:h-[35px] border border-[#000000] rounded-md pl-2 bg-[#F1F4F9]"
              />
              {fileEvidencia.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium text-lg">Arquivos Anexados:</h3>
                  <table className="min-w-full mt-2 border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 p-2">Arquivo</th>
                        <th className="border border-gray-300 p-2">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fileEvidencia.map((file, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 p-2">
                            {file.name}
                          </td>
                          <td className="border border-gray-300 p-2">
                            <button
                              onClick={() => handlePreviewFile(file)}
                              className="text-blue-500 hover:underline mr-2"
                            >
                              Visualizar
                            </button>
                            <button
                              onClick={() => handleRemoveFile(index)}
                              className="text-red-500 hover:underline"
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
