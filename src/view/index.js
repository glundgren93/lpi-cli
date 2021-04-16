const blessed = require("blessed");
const contrib = require("blessed-contrib");
const { SHARE_DAILY_VALUE_KEY } = require("../util/constants");

const Model = require("../model");

class Dashboard {
  screen = blessed.screen();

  grid = new contrib.grid({ rows: 12, cols: 12, screen: this.screen });

  //grid.set(row, col, rowSpan, colSpan, obj, opts)
  table = this.grid.set(0, 0, 10, 12, blessed.ListTable, this.createTable());

  markdown = this.grid.set(10, 0, 2, 2, blessed.text, {
    style: { border: { fg: "#6c97f5" } },
  });

  render() {
    this.generateTable();
    this.generateMarkdown();

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
      `Valor da cota \n ${Model.retrieve(SHARE_DAILY_VALUE_KEY)}`
    );
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
}

module.exports = Dashboard;
