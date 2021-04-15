const blessed = require("blessed"),
  contrib = require("blessed-contrib"),
  { getData, retrieve } = require("../model");

class Dashboard {
  screen = blessed.screen();
  //grid = new contrib.grid({ rows: 4, cols: 12, screen: this.screen });
  // table = this.grid.set(
  //   0,
  //   0,
  //   6,
  //   4,
  //   blessed.ListTable,
  //   this.createListTable("left", 0, true)
  // );

  render() {
    this.generateTable();

    this.screen.key(["escape", "q", "C-c"], function (ch, key) {
      return process.exit(0);
    });
    this.screen.render();
  }

  generateTable() {
    var table = contrib.table({
      keys: true,
      vi: true,
      fg: "white",
      selectedFg: "black",
      selectedBg: "#f5f26c",
      interactive: true,
      label: "Active Processes",
      width: "30%",
      height: "30%",
      border: { type: "line", fg: "cyan" },
      columnSpacing: 10,
      columnWidth: [16, 12, 10, 10],
    });

    table.focus();
    //allow control the table with the keyboard

    this.screen.append(table);
    table.setData({
      headers: ["Name", "Phone", "Share", "ShareValue"],
      data: getData(),
    });
  }

  generateMarkdown() {
    const markdown = contrib.markdown();
    markdown.setMarkdown(`Valor da cota \n ${retrieve("shareDailyValue")}`);
  }

  createListTable(alignment, padding = 0, isInteractive = false) {
    return {
      keys: true,
      align: alignment,
      selectedFg: "white",
      selectedBg: "blue",
      interactive: isInteractive, // Makes the list table scrollable
      padding: padding,
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
      columnSpacing: 1,
    };
  }
}

module.exports = Dashboard;
