const Conf = require("conf");
const { SHARE_DAILY_VALUE_KEY } = require("../util/constants");

const config = new Conf();

class Model {
  static clearData() {
    config.clear();
    console.log("Todos dados foram apagados.");
  }

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

  static updateUsers() {
    for (const user in config.store.user) {
      const obj = {
        name: config.store.user[user].name,
        phone: config.store.user[user].phone,
        share: config.store.user[user].share,
        totalValue: (
          config.store.user[user].share * this.retrieve(SHARE_DAILY_VALUE_KEY)
        ).toFixed(2),
      };

      config.set(`user.${user}`, obj);
    }
  }

  static retrieve(key) {
    return config.get(key);
  }

  static setUser(key, newObj) {
    const old = config.get(`user.${key}`);

    const share = newObj.share || old.share;
    const totalValue = (share * this.retrieve(SHARE_DAILY_VALUE_KEY)).toFixed(
      2
    );

    const obj = {
      name: newObj.name || old.name,
      phone: newObj.phone || old.phone,
      share,
      totalValue,
    };
    config.set(`user.${key}`, obj);

    console.log(
      `Cliente ${key} atualizado com sucesso. Ele possui ${obj.share} cotas. Seu telefone é ${obj.phone}`
    );
  }

  static set(key, value) {
    config.set(key, value);
    if (key === SHARE_DAILY_VALUE_KEY) this.updateUsers();
  }
}

module.exports = Model;
