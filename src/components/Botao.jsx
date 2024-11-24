import PropTypes from "prop-types";
import { tv } from "tailwind-variants";

const Botao = ({ children, select, onClick, ...rest }) => {
  const botao = tv({
    base: "flex max-sm:text-sm font-bold items-center",
    variants: {
      select: {
        not: "text-white border-l-0 ml-[25px] w-[210px] h-[50px] px-[15px]",
        yes: "bg-white rounded-xl text-[#164095] w-[210px] h-[50px] px-[15px]",
        btn: "bg-[#4880FF] text-white py-3px-6 font-bold w-[288px] h-[50px] justify-center hover:bg-blue-700 transition duration-300",
        btn_add:
          "bg-[#164095] text-white w-[260px] h-[50px] px-2  text-lg max-sm:text-sm justify-center rounded-lg hover:bg-blue-700 transform hover:scale-[1.01] transition duration-300",
        btn_cancel:
          "bg-gray-400 w-[260px] h-[50px] text-white px-4 py-2 rounded-lg hover:bg-gray-500 transform hover:scale-[1.01] transition duration-300",
        btn_check:
          "bg-[#FFB74D] w-[220px] h-[50px] px-2 text-sm text-white rounded-lg hover:bg-[#ffa827] transition duration-300",
        conformidade:
          "w-[130px] text-sm font-normal  h-[35px] justify-center rounded-[10px]",
      },
      type: {},
    },
  });

  return (
    <div className="flex items-center">
      {select === "yes" && (
        <div className="border-l-4 rounded-r-xl border-white pl-6 h-[50px]"></div>
      )}
      <button href="#" onClick={onClick} className={botao({ select, ...rest })}>
        {children}
      </button>
    </div>
  );
};

Botao.propTypes = {
  children: PropTypes.node.isRequired,
  select: PropTypes.oneOf([
    "not",
    "yes",
    "btn",
    "btn_add",
    "btn_cancel",
    "btn_check",
    "conformidade",
  ]).isRequired,
  onClick: PropTypes.func,
};

export default Botao;
