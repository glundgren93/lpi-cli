const { Command, flags } = require("@oclif/command");
const { cli } = require("cli-ux");

const Model = require("../model");
const Dashboard = require("../view");

class UserCommand extends Command {
  async run() {
    const { flags } = this.parse(UserCommand);

    if (flags.clear) {
      // yes/no confirmation
      await cli.confirm("Continue?");
      Model.clearData();
      return;
    }

    // if (!flags.name || !flags.share) {
    //   this.error("Você precisa informar o nome e a quantidade de cotas!");
    // }

    if (flags.name) {
      Model.setUser(flags.name, {
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
  clear: flags.boolean({ char: "c" }),
  name: flags.string({ char: "n", description: "name to print" }),
  phone: flags.string({ char: "p", description: "phone to print" }),
  share: flags.string({ char: "s", description: "share amount" }),
};

module.exports = UserCommand;
