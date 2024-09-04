import PropTypes from "prop-types";

const Input = ({ type, label, ...rest }) => {
  return (
    <div>
      <h1 className="mb-[15px] text-[#454545] text-xl font-bold">{label}</h1>
      <input type={type} {...rest} />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Input;
