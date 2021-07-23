// controller.js
// Logic behind the functionalities
const data = require("./data");

class Controller {
    async getInterfaces() {
        return new Promise((resolve, _) => resolve(data));
    }

    async getInterface(id) {
        return new Promise((resolve, reject) => {
            let intf = data.find((intf) => intf.id === parseInt(id));
            if (intf) {
                resolve(intf);
            } else {
                // return an error
                reject(`intf with id ${id} not found `);
            }
        });
    }

    async updateInterface(id,alias) {
        return new Promise((resolve, reject) => {
            let intf = data.find((intf) => intf.id === parseInt(id));
            if (!intf) {
                reject(`No intf with id ${id} found`);
            }
            intf["alias"] = alias;
            resolve(intf);
        });
    }

    async deleteInterface(id) {
        return new Promise((resolve, reject) => {
            var index = data.map(x => {
                return x.id;
              }).indexOf(id);
              
              data.splice(index, 1);
            resolve(data);
        });
    }

}
module.exports = Controller;