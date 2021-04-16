const { Command, flags } = require("@oclif/command");
const inquirer = require("inquirer");

const Model = require("./model");
const Dashboard = require("./view");
const Service = require("./service");

const { SHARE_DAILY_VALUE_KEY } = require("./util/constants");
const {
  userPrompt,
  saveUserPrompt,
  deleteDataPrompt,
  deleteUserPrompt,
  deleteSpecificUserPrompt,
  sharePrompt,
} = require("./prompts");

class LpiCommand extends Command {
  async lpiPrompt() {
    let responses = await inquirer.prompt(userPrompt);
    let deletedUser, user, toDelete, share;

    switch (responses.user) {
      case "Atualizar cota":
        share = await inquirer.prompt(sharePrompt);

        if (share && share.value) {
          Model.set(SHARE_DAILY_VALUE_KEY, share.value); // atualiza valor da cota
          console.log("Valor da cota: ", share.value);
        }
        this.lpiPrompt(); // reinicia prompt
        break;
      case "Cadastrar/Atualizar cliente":
        user = await inquirer.prompt(saveUserPrompt);

        if (user) {
          Model.setUser(user.name, user); // salva usuario
        }
        this.lpiPrompt(); // reinicia prompt
        break;
      case "Visualizar clientes":
        let dashboard = new Dashboard();
        dashboard.render();
        break;
      case "Resultado semanal":
        Service.send(); // envia mensagem whatsapp

        this.lpiPrompt(); // reinicia prompt
        break;
      case "Deletar cliente":
        deletedUser = await inquirer.prompt(deleteSpecificUserPrompt);
        toDelete = await inquirer.prompt(deleteUserPrompt);

        if (toDelete.toBeDeleted) {
          Model.delete(`user.${deletedUser.user}`); // user.userKey
        }

        this.lpiPrompt(); // reinicia prompt
        break;
      case "Deletar todos dados":
        toDelete = await inquirer.prompt(deleteDataPrompt);

        if (toDelete.toBeDeleted) {
          Model.clearData();
        }

        this.lpiPrompt(); // reinicia prompt
        break;

      default:
        break;
    }
  }

  async run() {
    this.lpiPrompt();
  }
}

LpiCommand.description = `Describe the command here
...
Extra documentation goes here
`;

module.exports = LpiCommand;
