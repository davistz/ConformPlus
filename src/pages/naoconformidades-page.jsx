import BarraLateral from "../components/BarraLateral";
import Header from "../components/Header";
import Home from "../components/Home";

const NaoConformidadePage = () => {
  return (
    <div className="flex-col">
      <Header />
      <div className="flex">
        <BarraLateral className="h-[877px]" />
        <Home />
      </div>
    </div>
  );
};

export default NaoConformidadePage;
