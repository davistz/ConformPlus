import PropTypes from "prop-types";

const Checkbox = ({ label, name, id }) => {
  return (
    <div className={`flex items-center mb-[26px]`}>
      <input
        type="checkbox"
        name={name}
        id={id}
        className="mr-2 w-6 h-6 rounded-md appearance-none border border-gray-300 bg-gray-200 checked:bg-[#164095] checked:border-transparent checked:after:content-['✔'] checked:after:text-white checked:after:text-sm checked:after:block checked:after:text-center"
      />
      <label
        htmlFor={id}
        className="text-lg font-bold md:text-base text-[#2022249b]"
      >
        {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Checkbox;
