import PropTypes from "prop-types";

const Selector = ({ id, options = [], placeholder }) => {
  return (
    <div className="">
      <select id={id} className="bg-[#F1F4F9] w-[240px] h-[45px] rounded-2xl">
        <option value="" disabled selected>
          {placeholder}
        </option>
        {options.length > 0 ? (
          options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))
        ) : (
          <option value="">Nenhuma opção disponível</option>
        )}
      </select>
    </div>
  );
};

Selector.propTypes = {
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Selector;
