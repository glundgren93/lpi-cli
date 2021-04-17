const Model = require("../model");

const deleteDataPrompt = {
  type: "confirm",
  name: "toBeDeleted",
  message: "Deseja deletar todos clientes?",
  default: false,
};

const deleteUserPrompt = {
  type: "confirm",
  name: "toBeDeleted",
  message: "Deseja deletar esse cliente?",
  default: false,
};

const deleteSpecificUserPrompt = {
  type: "list",
  name: "user",
  message: "O que você quer fazer?",
  choices: Model.getUsersByProperty("name"),
};

const userPrompt = {
  type: "list",
  name: "user",
  message: "O que você quer fazer?",
  choices: [
    "Atualizar cota",
    "Cadastrar/Atualizar cliente",
    "Visualizar clientes",
    "Visualizar cotas",
    "Resultado semanal",
    "Deletar cliente",
    "Deletar todos dados",
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
  deleteSpecificUserPrompt,
  deleteDataPrompt,
  deleteUserPrompt,
  sharePrompt,
};
