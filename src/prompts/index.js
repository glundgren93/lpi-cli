const deleteUsersPrompt = {
  type: "confirm",
  name: "toBeDeleted",
  message: "Deseja deletar todos clientes?",
  default: false,
};

const userPrompt = {
  type: "list",
  name: "user",
  message: "O que você quer fazer?",
  choices: [
    "Atualizar cota",
    "Cadastrar cliente",
    "Visualizar clientes",
    "Resultado semanal",
    "Deletar clientes",
  ],
};

const sharePrompt = {
  type: "input",
  name: "value",
  message: "Qual valor da cota?",
};

const saveUserPrompt = [
  {
    type: "input",
    name: "name",
    message: "Qual nome do cliente?",
  },
  {
    type: "input",
    name: "share",
    message: "Quantas cotas ele possui?",
  },
  {
    type: "input",
    name: "phone",
    message: "Qual telefone do cliente?",
  },
];

module.exports = {
  userPrompt,
  saveUserPrompt,
  deleteUsersPrompt,
  sharePrompt,
};
