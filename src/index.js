const { Command, flags } = require("@oclif/command");
const inquirer = require("inquirer");

const Model = require("./model");
const Dashboard = require("./view");
const Service = require("./service");

const { SHARE_DAILY_VALUE_KEY } = require("./util/constants");
const {
  userPrompt,
  saveUserPrompt,
  deleteUsersPrompt,
  sharePrompt,
} = require("./prompts");

class LpiCommand extends Command {
  async lpiPrompt() {
    let responses = await inquirer.prompt(userPrompt);
    let user, toDelete, share;

    switch (responses.user) {
      case "Atualizar cota":
        share = await inquirer.prompt(sharePrompt);

        if (share && share.value) {
          Model.set(SHARE_DAILY_VALUE_KEY, share.value);
          console.log("Valor da cota: ", share.value);
        }
        this.lpiPrompt();
        break;
      case "Cadastrar cliente":
        user = await inquirer.prompt(saveUserPrompt);

        if (user) {
          Model.setUser(user.name, user);
        }
        this.lpiPrompt();
        break;
      case "Visualizar clientes":
        let dashboard = new Dashboard();
        dashboard.render();
        break;
      case "Resultado semanal":
        Service.send();
        this.lpiPrompt();
        break;
      case "Deletar clientes":
        toDelete = await inquirer.prompt(deleteUsersPrompt);

        if (toDelete.toBeDeleted) {
          Model.clearData();
        }
        this.lpiPrompt();
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
