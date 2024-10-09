import BarraLateral from "../components/BarraLateral";
import GraficosDetalhados from "../components/Graficos";
import Header from "../components/Header";

const GraficoPage = () => {
  return (
    <div className="flex-col">
      <Header />
      <div className="flex">
        <BarraLateral className="h-[877px]" />
        <GraficosDetalhados />
      </div>
    </div>
  );
};

export default GraficoPage;
