const blessed = require("blessed");
const contrib = require("blessed-contrib");
const chalk = require("chalk");

const Model = require("../model");
const { SHARE_DAILY_VALUE_KEY } = require("../util/constants");

class Dashboard {
  screen = blessed.screen();

  grid = new contrib.grid({ rows: 12, cols: 12, screen: this.screen });

  //grid.set(row, col, rowSpan, colSpan, obj, opts)
  table = this.grid.set(0, 0, 8, 12, blessed.ListTable, this.createTable());

  markdown = this.grid.set(8, 10, 4, 2, blessed.text, {
    style: { border: { fg: "#6c97f5" } },
  });

  line = this.grid.set(8, 0, 4, 10, contrib.line, {
    style: { line: "yellow", text: "green", baseline: "black" },
    minY: 60,
    wholeNumbersOnly: false, //true=do not show fraction in y axis
    label: "Cotas",
  });

  render() {
    this.generateTable();
    this.generateMarkdown();
    this.generateLine();

    this.screen.key(["escape", "q", "C-c"], function (ch, key) {
      return process.exit(0);
    });
    this.screen.render();
  }

  generateTable() {
    this.table.focus();
    //allow control the table with the keyboard
    var data = [["Nome", "Telefone", "Cotas", "Valor Total"]];

    Model.getData().forEach((user) => {
      data.push(user);
    });

    this.table.setData(data);
  }

  generateMarkdown() {
    this.markdown.setContent(
      chalk.rgb(245, 243, 108).bold("Valor da cota: ") +
        chalk.rgb(66, 129, 245).bold("R$" + Model.retrieveCurrentShareValue()) +
        "\n" +
        chalk.rgb(245, 243, 108).bold("Valor total: ") +
        chalk.rgb(66, 129, 245).bold("R$" + this.calculateTotalValue())
    );
  }

  generateLine() {
    const shares = Model.retrieve(SHARE_DAILY_VALUE_KEY);
    if (shares && shares.length > 0) {
      const x = shares.map((x, i) => (i + 1).toString());
      const y = shares.map((share) => parseFloat(share.value));

      var series1 = {
        x,
        y,
      };
      this.line.setData([series1]);
    }
  }

  createTable() {
    return {
      keys: true,
      align: "left",
      selectedFg: "white",
      selectedBg: "blue",
      interactive: true, // Makes the list table scrollable
      padding: 0,
      style: {
        fg: "white",
        border: {
          fg: "#6c97f5",
        },
        cell: {
          selected: {
            fg: "black",
            bg: "#f5f26c",
          },
        },
        header: {
          fg: "#f5f26c",
          bold: true,
        },
      },
      columnSpacing: 0,
    };
  }

  calculateTotalValue() {
    const shares = Model.getUsersByProperty("share");

    let total =
      shares.map(parseFloat).reduce((a, b) => a + b, 0) *
      Model.retrieveCurrentShareValue();

    return total.toFixed(2);
  }
}

module.exports = Dashboard;
