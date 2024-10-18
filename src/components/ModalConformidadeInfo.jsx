/* eslint-disable react-hooks/rules-of-hooks */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const ModalConformidadeInfo = ({ isOpen, onClose, conformidade, onSave }) => {
  if (!isOpen) return null;

  const [editConformidade, setEditConformidade] = useState(
    () => conformidade || {}
  );

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

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white w-[650px] h-[600px] p-6 rounded-lg shadow-lg flex flex-col">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-700">
            Detalhes da Não Conformidade
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="font-medium text-lg">Título:</label>
              <input
                type="text"
                name="titulo"
                value={editConformidade.titulo || ""}
                onChange={handleChange}
                className="w-full mt-[14px] h-[40px] rounded-md pl-5 bg-[#F1F4F9] text-black border border-[#000000]"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-lg">Departamento:</label>
              <select
                name="origem"
                value={editConformidade.origem || ""}
                onChange={handleChange}
                className="w-full mt-[14px] h-[40px] rounded-md pl-5 bg-[#F1F4F9] text-black border border-[#000000]"
              >
                <option>Laboratorio</option>
                <option>Recursos Humanos</option>
                <option>Financeiro</option>
                <option>TI</option>
                <option>Coleta de Sangue</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-lg">Enquadramento</label>
              <select
                name="enquadramento"
                value={editConformidade.enquadramento || ""}
                onChange={handleChange}
                className="w-full h-[40px] mt-[14px] rounded-md pl-5 bg-[#F1F4F9] text-black border border-[#000000]"
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
              <label className="font-medium text-lg">Grau de Severidade:</label>
              <select
                name="grau_severidade"
                value={editConformidade.grau_severidade || ""}
                onChange={handleChange}
                className="w-full h-[40px] mt-[14px] rounded-md pl-5 bg-[#F1F4F9] text-black border border-[#000000]"
              >
                <option>Baixo</option>
                <option>Médio</option>
                <option>Alto</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full mt-6">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white w-full px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
          >
            Salvar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 w-full mt-3 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-300 shadow-md"
          >
            Fechar
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
