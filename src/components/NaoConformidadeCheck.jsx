import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";

const NaoConformidadeCheck = ({ isOpen, handleClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="relative bg-white flex-col p-6 justify-center rounded-[20px] w-[917px] h-[660px] shadow-lg">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-2xl">Não Conformidades Pedentes</h1>
          <p>Autorize as Não Conformidades Abaixo</p>
        </div>
        <IoMdClose
          className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-600 hover:text-gray-800"
          onClick={handleClose}
        />
      </div>
    </div>
  );
};

NaoConformidadeCheck.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  addConformidadeFunction: PropTypes.func,
};

export default NaoConformidadeCheck;
