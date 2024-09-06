import BarraLateral from "./components/BarraLateral";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <>
      <div className="w-full h-full">
        <Header />
        <div className="flex">
          <BarraLateral />
          <Home />
        </div>
      </div>
    </>
  );
}

export default App;
