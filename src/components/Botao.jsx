import PropTypes from "prop-types";
import { tv } from "tailwind-variants";

const Botao = ({ children, select, ...rest }) => {
  const botao = tv({
    base: "flex font-bold items-center mt-2 rounded-lg w-[210px] h-[50px] px-[15px]",
    variants: {
      select: {
        not: "text-white border-l-0 ml-[25px]",
        yes: "bg-white text-[#164095] ",
      },
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
  select: PropTypes.oneOf(["not", "yes"]).isRequired,
};

export default Botao;
