import PropTypes from "prop-types";
import * as s from "./Id.styled";

const Id = ({ className }) => {
  return (
    <s.StyledId className={className}>
      <h1>Id</h1>
      <h1>Origem</h1>
      <h1>Enquadramento</h1>
      <h1>Data</h1>
      <h1>Grau de Severidade</h1>
    </s.StyledId>
  );
};

Id.propTypes = {
  className: PropTypes.node,
};

export default Id;
