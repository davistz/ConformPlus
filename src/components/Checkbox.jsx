import PropTypes from "prop-types";

const Checkbox = ({ label, name, id }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        name={name}
        id={id}
        className="mr-2 w-6 h-6 rounded-xl"
      />
      <label htmlFor={id} className="text-lg">
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
