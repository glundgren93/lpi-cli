const open = require("open");
const Model = require("../model");
const { getTodayDate } = require("../util/helper");

const TAX_PERCENTAGE = 0.001;

class Service {
  static async send() {
    const data = Model.getData();

    for (const user of data) {
      await open(
        `https://wa.me/${user[1]}?text=Oi, ${
          user[0]
        }. Fechamento da semana em ${getTodayDate()}. Valor da cota R$ ${Model.retrieveCurrentShareValue()}. Total disponível de sua aplicação: R$ ${
          user[3]
        }`
      );
    }
    console.log("Resultado semanal enviado");
  }

  static async sendAdministrationFee() {
    const data = Model.getData();

    const totalValue = data
      .map((user) => parseFloat(user[3]))
      .reduce((prev, current) => prev + current, 0);

    for (const user of data) {
      const taxFee = (user[3] * TAX_PERCENTAGE).toFixed(2);

      await open(
        `https://wa.me/${user[1]}?text=Oi, ${
          user[0]
        }. Em ${getTodayDate()}, o valor de mercado da LPI Investimentos alcançou o total de R$ ${totalValue}. Será descontada a Taxa de Administração de 0,1% sobre o total, abatendo da sua conta o valor que lhe corresponde de R$ ${taxFee}.`,
        
      );
    }
    console.log("Taxa de administração enviado");
  }
}
module.exports = Service;
