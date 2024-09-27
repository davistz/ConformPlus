import PropTypes from "prop-types";
import Input from "./Input";
// import Selector from "./Selector";
import Botao from "./Botao";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { useState } from "react";

const AddConformidadeDialog = ({
  isOpen,
  handleClose,
  addConformidadeFunction,
}) => {
  // const optionDeparmento = ["Laboratorio", "Clinica"];
  // const optionStatus = ["Aberto", "Fechado"];
  // const optionGrau = ["Alto", "Baixo"];

  const [title, setTitle] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSaveClick = () => {
    if (!title.trim() || !descricao.trim()) {
      return alert("Preencha todos os campos");
    }

    addConformidadeFunction({
      id: 4,
      title,
      descricao,
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
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            {/* <Input
              label="Setor de Destino"
              placeholder="Insira o setor de destino"
              labelClass="ml-5 text-2xl"
              className="w-[520px] h-[40px] rounded-[20px] pl-5 bg-[#F1F4F9] text-black border border-[#000000]"
              value={setorDestino}
              onChange={(e) => setSetorDestino(e.target.value)}
            /> */}
          </div>

          <div className="flex flex-col ml-[50px] mt-[25px] gap-[30px]">
            <div>
              {/* <Selector
              <h1 className="text-2xl font-bold mb-[15px]">Departamento</h1>
                options={optionDeparmento}
                placeholder="Escolha o Departamento"
                onChange={(e) => setDepartamento(e.target.value)}
              /> */}
            </div>
            <div>
              {/* <h1 className="text-2xl font-bold mb-[15px]">Status</h1>
              <Selector options={optionStatus} placeholder="Escolha o Status" /> */}
            </div>
            <div className="mt-[120px]">
              <h1 className="text-2xl font-bold mb-[15px]">
                Grau de Severidade
              </h1>
              {/* <Selector
                options={optionGrau}
                placeholder="Escolha o Grau De Severidade"
                onChange={(e) => setGrauSeveridade(e.target.value)}
              /> */}
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
