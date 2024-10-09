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
      <div className="">
        <Header />
        <div className="flex">
          <BarraLateral className="h-[877px] max-sm:hidden" />
          <Home />
        </div>
      </div>
    </>
  );
}

export default App;
