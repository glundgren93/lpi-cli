const { Command, flags } = require("@oclif/command");
const { setUser, retrieve, getData } = require("../model");
const Dashboard = require("../view");

class UserCommand extends Command {
  async run() {
    const { flags } = this.parse(UserCommand);

    if (!flags.name || !flags.share) {
      this.error("Você precisa informar o nome e a quantidade de cotas!");
    }

    if (flags.name) {
      setUser(flags.name, {
        name: flags.name,
        phone: flags.phone,
        share: flags.share,
      });
    }

    let dashboard = new Dashboard();
    dashboard.render();
  }
}

UserCommand.description = `Describe the command here
...
Extra documentation goes here
`;

UserCommand.flags = {
  // add --help flag to show CLI version
  help: flags.help({ char: "h" }),
  name: flags.string({ char: "n", description: "name to print" }),
  phone: flags.string({ char: "p", description: "phone to print" }),
  share: flags.string({ char: "s", description: "share amount" }),
};

module.exports = UserCommand;
