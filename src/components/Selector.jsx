import PropTypes from "prop-types";

const Selector = ({ className, title, options = [] }) => {
  return (
    <div className="relative w-[133px]">
      <select
        className={`${className} appearance-none h-[40px] w-[230px] bg-[#F1F4F9] text-[#000000] border border-[#000000] pl-[13px] pr-[40px] border-solid  rounded-2xl text-xs cursor-pointer`}
        defaultValue=""
      >
        <option value="" disabled>
          {title}
        </option>
        {options.length > 0 ? (
          options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))
        ) : (
          <option value="" disabled>
            Sem opções disponíveis
          </option>
        )}
      </select>
    </div>
  );
};

Selector.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default Selector;
