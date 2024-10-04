const data = new Date().toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const CONFORMIDADES = [
  {
    id: "3",
    departamento: "Laboratorio",
    departamento_destino: "Clinica",
    data: data,
    grau_severidade: "Alto",
    status: "aberto",
  },
  {
    id: "2",
    departamento: "Clinica",
    departamento_destino: "Clinica",
    data: data,
    grau_severidade: "Alto",
    status: "andamento",
  },
  {
    id: "1",
    departamento: "Hospital",
    departamento_destino: "Clinica",
    data: data,
    grau_severidade: "Alto",
    status: "concluida",
  },
];
export default CONFORMIDADES;
