const Conf = require("conf");

const config = new Conf();

function retrieve(key) {
  return config.get(key);
}

function setUser(key, newObj) {
  const old = config.get(key);
  
  const obj = {
    name: newObj.name || old.name,
    phone: newObj.phone || old.phone,
    share: newObj.share || old.share,
    shareValue: newObj.shareValue || old.shareValue,
  };
  config.set(`user.${key}`, obj);
  console.log(config.get("user"));
}

function set(key, value) {
  config.set(key, value);
}

function getData() {
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

module.exports.getData = getData;
module.exports.retrieve = retrieve;
module.exports.set = set;
module.exports.setUser = setUser;
