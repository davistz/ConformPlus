const data = new Date().toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const CONFORMIDADES = [
  {
    id: "1",
    titulo: "Não conformidade no processo de calibração",
    origem: "Laboratório",
    descricao: "Falha no processo de calibração do equipamento XYZ.",
    enquadramento: "ABNT/NBR/300",
    acao_imediata: "Recalibrar o equipamento imediatamente.",
    investigacao:
      "A falha foi identificada após análise detalhada do processo de calibração.",
    departamento: "Laboratório",
    data: data,
    grau_severidade: "Alto",
    status: "aberto",
  },
  {
    id: "2",
    titulo: "Auditoria interna - não conformidade na documentação",
    origem: "Administração",
    descricao: "Documentação incompleta em processos críticos.",
    enquadramento: "ABNT/NBR/400",
    acao_imediata: "Atualizar toda a documentação pendente.",
    investigacao: "Auditoria interna identificou inconsistências.",

    data: data,
    grau_severidade: "Médio",
    status: "andamento",
  },
  {
    id: "3",
    titulo: "Não conformidade no ensaio de laboratório",
    descricao:
      "O ensaio de amostras não atendeu aos critérios de qualidade estabelecidos.",
    acao_imediata: "Repetir o ensaio com controle rigoroso.",
    investigacao: "Foi detectada uma falha no protocolo de ensaio.",
    origem: "Laboratório",
    enquadramento: "ABNT/NBR/500",
    data: data,
    grau_severidade: "Alto",
    status: "concluida",
  },
];

export default CONFORMIDADES;
