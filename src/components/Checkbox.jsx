import PropTypes from "prop-types";
import { tv } from "tailwind-variants";

const Checkbox = ({ label, name, id, type }) => {
  const checkbox = tv({
    base: "",
    variants: {
      type: {
        login:
          "mr-2 w-6 h-6 rounded-md appearance-none border border-gray-300 bg-gray-200 checked:bg-[#164095] checked:border-transparent checked:after:content-['✔'] checked:after:text-white checked:after:text-sm checked:after:block checked:after:text-center",
        conformidade: `w-7 h-7  appearance-none border rounded-xl checked:bg-[#164095] cursor-pointer `,
      },
    },
  });
  return (
    <div className={`flex items-center`}>
      <input
        type="checkbox"
        name={name}
        id={id}
        className={checkbox({ type })}
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
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.oneOf(["login", "conformidade"]).isRequired,
};

export default Checkbox;
