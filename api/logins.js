// api/logins.js
export default function handler(req, res) {
  // Cabeçalhos CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permitir qualquer origem (para todos os domínios)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Métodos permitidos
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Cabeçalhos permitidos

  // Se a requisição for do tipo OPTIONS, retorne uma resposta sem processamento adicional
  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Resposta vazia para requisição OPTIONS
  }

  // Dados de logins
  const logins = [
    {
      id: "1",
      name: "Davi Souza",
      email: "davi@gmail.com",
      telefone: "(79) 99983-6358",
      password: "1234",
      permission: "Admin",
      status: "active",
      department: "Marketing",
      manager: "Juliana Oliveira",
      photo: "../src/img/img_users/davi.png",
      userPermission: "Admin",
    },
    {
      id: "2",
      name: "Felipe Melo",
      email: "felipe@gmail.com",
      telefone: "(79) 99513-6432",
      password: "1234",
      permission: "Gestor",
      status: "active",
      department: "RH - Recursos Humanos",
      manager: "Carlos Alberto",
      photo: "../src/img/img_users/davi.png",
    },
    {
      id: "3",
      name: "Lucas Melo",
      email: "lucas@gmail.com",
      telefone: "(79) 99874-4432",
      password: "1234",
      permission: "Usuário",
      status: "active",
      department: "Financeiro",
      manager: "Douglas Abilio",
      photo: "../src/img/img_users/davi.png",
      userPermission: "Usuário",
    },
  ];

  // Retorna os logins
  res.status(200).json(logins);
}
