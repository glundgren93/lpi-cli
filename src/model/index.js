const Conf = require("conf");
const { SHARE_DAILY_VALUE_KEY } = require("../util/constants");
const { getTodayDate, getTodayPeriod } = require("../util/helper");

const config = new Conf();

class Model {
  // limpa todos dados da base
  static clearData() {
    config.clear();
    console.log("Todos dados foram apagados.");
  }

  // busca dados do usuário em lista
  // const obj = {
  //   name,
  //   phone,
  //   share,
  //   totalValue,
  // };
  static getData() {
    const data = [];

    for (const property in config.store.user) {
      data.push(
        Object.keys(config.store.user[property]).map(
          (key) => config.store.user[property][key]
        )
      );
    }
    return data;
  }

  // atualiza usuários com valor da cota atual
  static updateUsers() {
    for (const user in config.store.user) {
      const obj = {
        name: config.store.user[user].name,
        phone: config.store.user[user].phone,
        share: config.store.user[user].share,
        totalValue: (
          config.store.user[user].share * this.retrieveCurrentShareValue()
        ).toFixed(2),
      };

      config.set(`user.${user}`, obj);
    }
  }

  // retorna um valor por chave
  static retrieve(key) {
    return config.get(key);
  }

  static retrieveCurrentShareValue() {
    const shares = this.retrieve(SHARE_DAILY_VALUE_KEY);
    if (shares && shares.length > 0) return shares[shares.length - 1].value;
  }

  // salva usuario
  static setUser(key, newObj) {
    const old = config.get(`user.${key}`);

    // cria usuários com novo valor ou valores antigos
    const name = newObj.name || old.name;
    const phone = newObj.phone || old.phone;
    const share = newObj.share || old.share;
    const totalValue = (share * this.retrieveCurrentShareValue()).toFixed(2);

    const obj = {
      name,
      phone,
      share,
      totalValue,
    };
    config.set(`user.${key}`, obj);

    console.log(
      `Cliente ${key} atualizado com sucesso. Ele possui ${obj.share} cotas. Seu telefone é ${obj.phone}`
    );
  }

  // seta valor na base
  static set(key, value) {
    config.set(key, value);
  }

  // seta valor de cota na base
  static setShare(value) {
    let shares = config.get(SHARE_DAILY_VALUE_KEY) || [];

    shares.push({
      value,
      formattedDate: getTodayDate(),
      period: getTodayPeriod(),
    });

    this.set(SHARE_DAILY_VALUE_KEY, shares);
    this.updateUsers();
  }

  // retorna lista de nome de usuarios
  static getUsersByProperty(property) {
    const data = [];
    for (const key in config.store.user) {
      data.push(config.store.user[key][property]);
    }
    return data;
  }

  static delete(key) {
    const user = config.get(key);
    config.delete(key);
    console.log(`${user.name} foi deletado com sucesso`);
  }
}

module.exports = Model;
