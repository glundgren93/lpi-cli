const open = require("open");
const { getData } = require("../model");

class Service {
  static async send() {
    const data = getData();
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;

    for (const user of data) {
      await open(
        `https://wa.me/${user[1]}?text=Oi, ${user[0]}. Fechamento da semana em ${today}. Valor da cota R$ . Total disponivel de sua aplicação: R$ `
      );
    }
  }
}
module.exports = Service;
