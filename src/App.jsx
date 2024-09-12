import { Toaster } from "sonner";

import BarraLateral from "./components/BarraLateral";
import Header from "./components/Header";
import Home from "./components/Home";

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
      <div>
        <Header />
        <div className="flex">
          <BarraLateral className="" />
          <Home />
        </div>
      </div>
    </>
  );
}

export default App;
