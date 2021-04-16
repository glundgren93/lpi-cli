const open = require("open");
const Model = require("../model");
const { getTodayDate } = require("../util/helper");
const { SHARE_DAILY_VALUE_KEY } = require("../util/constants");

class Service {
  static async send() {
    const data = Model.getData();

    for (const user of data) {
      await open(
        `https://wa.me/${user[1]}?text=Oi, ${
          user[0]
        }. Fechamento da semana em ${getTodayDate()}. Valor da cota R$ ${Model.retrieve(
          SHARE_DAILY_VALUE_KEY
        )}. Total disponível de sua aplicação: R$ ${user[3]}`
      );
    }
    console.log("Resultado semanal enviado");
  }
}
module.exports = Service;
