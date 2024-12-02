// api/departamentos.js
export default function handler(req, res) {
  const departamentos = [
    {
      id: "1",
      name: "Recursos Humanos",
      manager: "Davi Souza",
      status: "active",
    },
    {
      id: "2",
      name: "Tecnologia da Informação",
      manager: "João Almeida",
      status: "active",
    },
    {
      id: "3",
      name: "Financeiro",
      manager: "Douglas Abilio",
      status: "active",
    },
  ];

  res.status(200).json(departamentos); // Retorna os departamentos
}
