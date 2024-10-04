import PropTypes from "prop-types";

const Id = ({ className }) => {
  return (
    <div
      className={`${className} grid grid-cols-[100px_220px_220px_150px_200px] gap-x-8 w-full font-bold`}
    >
      <h1>Id</h1>
      <h1>Departamento</h1>
      <h1>Setor Destino</h1>
      <h1>Data</h1>
      <h1>Grau de Severidade</h1>
    </div>
  );
};

Id.propTypes = {
  className: PropTypes.node,
};

export default Id;
