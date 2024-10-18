import PropTypes from "prop-types";

const Id = ({ className }) => {
  return (
    <div
      className={`${className} grid grid-cols-[140px_210px_320px_150px_170px] gap-x-8 mb-1 font-bold`}
    >
      <h1>Id</h1>
      <h1>Origem</h1>
      <h1>Enquadramento</h1>
      <h1>Data</h1>
      <h1>Grau de Severidade</h1>
    </div>
  );
};

Id.propTypes = {
  className: PropTypes.node,
};

export default Id;
