import BarraLateral from "../components/BarraLateral";
import Departamentos from "../components/DepartamentoPage";
import Header from "../components/Header";

const DepartamentoPage = () => {
  return (
    <div className="flex-col">
      <Header />
      <div className="flex">
        <BarraLateral />
        <Departamentos />
      </div>
    </div>
  );
};

export default DepartamentoPage;
