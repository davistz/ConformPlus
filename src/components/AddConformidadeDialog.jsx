import PropTypes from "prop-types";
import Input from "./Input";
import Botao from "./Botao";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { useState } from "react";

const AddConformidadeDialog = ({
  isOpen,
  handleClose,
  addConformidadeFunction,
}) => {
  const [title, setTitle] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [departamento_destino, setDepartamentoDestino] = useState("");
  const [grau_severidade, setgrauSeveridade] = useState("");

  const handleSaveClick = () => {
    // Coletando a data atual
    const dataAtual = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    addConformidadeFunction({
      id: 4,
      departamento,
      departamento_destino,
      grau_severidade,
      data: dataAtual, // Adicionando a data atual aqui
      status: "aberto",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="relative bg-white flex-col p-6 justify-center rounded-[20px] w-[917px] h-[660px] shadow-lg">
        <IoMdClose
          className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-600 hover:text-gray-800"
          onClick={handleClose}
        />
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-2xl">Adicionar Não Conformidade</h1>
          <p>Insira as informações abaixo</p>
        </div>
        <div className="flex">
          <div className="flex flex-col items-start mt-6 space-y-6">
            <Input
              label="Título"
              placeholder="Insira um título"
              labelClass="ml-5 text-2xl"
              className="w-[520px] h-[40px] rounded-[20px] pl-5 bg-[#F1F4F9] text-black border border-[#000000]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              label="Descrição"
              placeholder="Insira uma descrição"
              labelClass="ml-5 text-2xl"
              isTextarea={true}
              className="w-[520px] h-[166px] rounded-[20px] p-5 bg-[#F1F4F9] text-black border border-[#000000] resize-none"
            />
            <Input
              label="Setor de Destino"
              placeholder="Insira o setor de destino"
              labelClass="ml-5 text-2xl"
              className="w-[520px] h-[40px] rounded-[20px] pl-5 bg-[#F1F4F9] text-black border border-[#000000]"
              value={departamento_destino}
              onChange={(e) => setDepartamentoDestino(e.target.value)}
            />
          </div>

          <div className="flex flex-col ml-[50px] mt-[25px] gap-[30px]">
            <div>
              <Input
                label="Departamento"
                placeholder="Insira o Departamento"
                labelClass="ml-5 text-2xl"
                className="w-[300px] h-[40px] rounded-[20px] pl-5 bg-[#F1F4F9] text-black border border-[#000000]"
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
              />
            </div>
            <div className="mt-[235px]">
              <Input
                label="Grau de Severidade"
                placeholder="Insira o Grau de Severidade"
                labelClass="ml-5 text-2xl"
                className="w-[300px] h-[40px] rounded-[20px] pl-5 bg-[#F1F4F9] text-black border border-[#000000]"
                value={grau_severidade}
                onChange={(e) => setgrauSeveridade(e.target.value)}
              />
            </div>
          </div>
        </div>
        <Botao
          className="desktop:text-xs justify-center desktop:w-[255px] desktop:ml-[630px] laptop:w-[280px] mobile:w-[280px] mt-7"
          select="btn_add"
          onClick={handleSaveClick}
        >
          Adicionar Não Conformidade
          <IoMdAdd className="h-5 w-5 ml-2" />
        </Botao>
      </div>
    </div>
  );
};

AddConformidadeDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  addConformidadeFunction: PropTypes.func,
};

export default AddConformidadeDialog;
