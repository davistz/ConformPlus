import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import { FaCheck, FaTrashAlt } from "react-icons/fa";

const NaoConformidadeCheck = ({
  isOpen,
  handleClose,
  conformidadesPendentes,
  alterarStatusConformidade,
  deletarNaoConformidade,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="relative bg-white flex-col p-6 justify-center rounded-[20px] w-[950px] h-[660px] shadow-lg overflow-y-auto">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-2xl">Não Conformidades Pendentes</h1>
          <p>Autorize as Não Conformidades Abaixo</p>
        </div>
        <IoMdClose
          className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-600 hover:text-gray-800"
          onClick={handleClose}
        />
        {conformidadesPendentes.length > 0 ? (
          <div className="mt-10 ml-2">
            <div
              className={`grid grid-cols-[130px_230px_260px_170px] ml-4 mb-2 w-full font-bold`}
            >
              <h1 className="pl-2">Id</h1>
              <h1>Origem</h1>
              <h1>Enquadramento</h1>

              <h1>Grau de Severidade</h1>
            </div>
            <ul className="w-full">
              {conformidadesPendentes.map((conformidade, index) => (
                <li
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-[#C9C9C9]" : "bg-[#E6E6E6]"
                  }
                ${index === 0 ? "rounded-t-lg" : ""} ${
                    index === conformidadesPendentes.length - 1
                      ? "rounded-b-lg"
                      : ""
                  } py-4  flex items-center`}
                >
                  <div className=" ml-4 text-[15px] grid grid-cols-[80px_250px_340px_120px]">
                    <p className="pl-2">{conformidade.id}</p>
                    <p>{conformidade.origem}</p>
                    <p>{conformidade.enquadramento}</p>

                    <p>{conformidade.grau_severidade}</p>
                  </div>
                  <div className="ml-3">
                    <button
                      className="text-green-500"
                      onClick={() => alterarStatusConformidade(conformidade.id)}
                    >
                      <FaCheck className="w-6 h-6" />
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => deletarNaoConformidade(conformidade.id)}
                    >
                      <FaTrashAlt className="w-6 h-6 ml-3" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

NaoConformidadeCheck.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  conformidadesPendentes: PropTypes.array.isRequired,
  alterarStatusConformidade: PropTypes.func.isRequired,
  deletarNaoConformidade: PropTypes.func.isRequired,
};

export default NaoConformidadeCheck;
