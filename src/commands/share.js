const { Command, flags } = require("@oclif/command");
const { SHARE_DAILY_VALUE_KEY } = require("../util/constants");
const Model = require("../model");

class ShareCommand extends Command {
  async run() {
    const { flags } = this.parse(ShareCommand);

    if (flags.value) {
      Model.set(SHARE_DAILY_VALUE_KEY, flags.value);
      console.log("Valor da cota: ", Model.retrieve(SHARE_DAILY_VALUE_KEY));
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
