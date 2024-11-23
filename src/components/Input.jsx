import PropTypes from "prop-types";

const Input = ({ type, label, labelClass, isTextarea, ...rest }) => {
  return (
    <div>
      <h1 className={`mb-[4px] ${labelClass} font-[500] text-[#000000] `}>
        {label}
      </h1>
      {isTextarea ? (
        <textarea
          {...rest}
          className={`${rest.className} placeholder-black  resize-none`}
        />
      ) : (
        <input
          type={type}
          {...rest}
          className={`${rest.className} placeholder-[#878787]`}
        />
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  labelClass: PropTypes.string,
  type: PropTypes.string,
  isTextarea: PropTypes.bool,
};

export default Input;
