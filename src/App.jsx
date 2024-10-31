import { Toaster } from "sonner";

import Header from "./components/Header/Header";
import GraficosDetalhados from "./components/Graficos/Graficos";

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
      <div className="flex">
        <Header />
        <GraficosDetalhados />
      </div>
    </>
  );
}

export default App;
