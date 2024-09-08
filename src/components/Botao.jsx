import PropTypes from "prop-types";
import { tv } from "tailwind-variants";

const Botao = ({ children, select, ...rest }) => {
  const botao = tv({
    base: "flex font-bold items-center",
    variants: {
      select: {
        not: "text-white border-l-0 ml-[25px] w-[210px] h-[50px] px-[15px]",
        yes: "bg-white rounded-xl text-[#164095] w-[210px] h-[50px] px-[15px]",
        btn: "bg-[#4880FF] text-white py-3px-6 font-bold w-[288px] h-[50px] justify-center hover:bg-blue-700 transition duration-300",
        btn_add:
          "bg-[#164095] w-[210px] h-[50px] text-white rounded-lg hover:bg-blue-700 transition duration-300",
        conformidade_aberta:
          "w-[130px] text-sm font-normal bg-[#b1b1b1] text-[#3a3a3a] h-[35px] justify-center rounded-[10px]",
        conformidade_andamento:
          "w-[130px] text-sm font-normal bg-[#b1b1b1] text-[#3a3a3a] h-[35px] justify-center rounded-[10px]",
        conformidade_concluida:
          "w-[130px] text-sm font-normal bg-[#b1b1b1] text-[#3a3a3a] h-[35px] justify-center rounded-[10px]",
      },
      type: {},
    },
  });

  return (
    <div className="flex items-center">
      {select === "yes" && (
        <div className="border-l-4 rounded-r-xl border-white pl-6 h-[50px]"></div>
      )}
      <button href="#" className={botao({ select, ...rest })}>
        {children}
      </button>
    </div>
  );
};

Botao.propTypes = {
  children: PropTypes.node.isRequired,
  select: PropTypes.oneOf(["not", "yes", "btn", "btn_add"]).isRequired,
};

export default Botao;
