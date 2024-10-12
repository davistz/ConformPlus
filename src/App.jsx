import { Toaster } from "sonner";

import BarraLateral from "./components/BarraLateral";
import Header from "./components/Header";
import GraficosDetalhados from "./components/Graficos";

function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            color: "black",
          },
        }}
      />
      <div className="">
        <Header />
        <div className="flex">
          <BarraLateral className="hidden lg:flex" />
          <div className="">
            <GraficosDetalhados />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
