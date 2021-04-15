const { Command, flags } = require("@oclif/command");
const { set, retrieve, getData } = require("../model");

class ShareCommand extends Command {
  async run() {
    const { flags } = this.parse(ShareCommand);

    if (flags.value) {
      set("shareDailyValue", flags.value);
      console.log("Valor da cota: ", retrieve("shareDailyValue"));
    }
  }
  async catch(error) {
    console.log(error);

    // do something or
    // re-throw to be handled globally
    throw error;
  }
}

ShareCommand.flags = {
  // add --help flag to show CLI version
  help: flags.help({ char: "h" }),
  value: flags.string({ char: "v", description: "share value" }),
};

module.exports = ShareCommand;
