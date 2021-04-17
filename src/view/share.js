const blessed = require("blessed");
const contrib = require("blessed-contrib");
const chalk = require("chalk");

const Model = require("../model");
const { SHARE_DAILY_VALUE_KEY } = require("../util/constants");

class Share {
  screen = blessed.screen();

  grid = new contrib.grid({ rows: 12, cols: 12, screen: this.screen });

  //grid.set(row, col, rowSpan, colSpan, obj, opts)
  table = this.grid.set(0, 0, 12, 12, blessed.ListTable, this.createTable());

  render() {
    this.generateTable();

    this.screen.key(["escape", "q", "C-c"], function (ch, key) {
      return process.exit(0);
    });
    this.screen.render();
  }

  generateTable() {
    this.table.focus();
    //allow control the table with the keyboard
    let data = [["Valor", "Data"]];

    let shares = Model.retrieve(SHARE_DAILY_VALUE_KEY);
    if (shares && shares.length > 0) {
      shares.forEach((element) => {
        let row = [];
        row.push(element.value);
        row.push(element.formattedDate);
        data.push(row);
      });
    }
    this.table.setData(data);
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

module.exports = Share;
