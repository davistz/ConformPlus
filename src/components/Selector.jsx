const Selector = ({ value, onChange }) => {
  return (
    <div>
      <h1 className="mb-4 ml-5 font-bold text-2xl">Grau de Severidade</h1>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#F1F4F9] w-[300px] h-[40px] rounded-[20px] text-black border border-[#000000]"
      >
        <option value="Baixo">Baixo</option>
        <option value="Médio">Médio</option>
        <option value="Alto">Alto</option>
      </select>
    </div>
  );
};

Selector.propTypes;

export default Selector;
