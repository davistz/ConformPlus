import BarraLateral from "../components/BarraLateral";
import Header from "../components/Header";
import Home from "../components/Home";

const NaoConformidadePage = () => {
  return (
    <div className="flex-col relative">
      {/* Header fixo no topo */}
      <Header className="" />

      {/* Container para o conteúdo principal */}
      <div className="flex relative">
        {/* Barra lateral fixa à esquerda */}
        <BarraLateral className="hidden lg:flex" />

        {/* Conteúdo de Users com padding-top para compensar o header */}
        <div className="">
          <Home />
        </div>
      </div>
    </div>
  );
};

export default NaoConformidadePage;
