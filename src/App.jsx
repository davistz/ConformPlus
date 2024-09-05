import BarraLateral from "./components/BarraLateral";
import Header from "./components/Header";
import TelaConformidade from "./components/TelaConformidade";

function App() {
  return (
    <>
      <div className="w-full h-full">
        <Header />
        <div className="flex">
          <BarraLateral />
          <TelaConformidade />
        </div>
      </div>
    </>
  );
}

export default App;
