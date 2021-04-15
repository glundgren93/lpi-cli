const { Command, flags } = require("@oclif/command");
const Service = require("../service");

class MsgCommand extends Command {
  async run() {
    Service.send();
  }
  async catch(error) {
    // do something or
    // re-throw to be handled globally
    throw error;
  }
}

module.exports = MsgCommand;
