const db = require("../models/index");

// 👇️ Models Use
const AddressMaster = db.addressMaster;

const CreateAddress = async (info) => {
  try {
    const newAddress = await AddressMaster.create(info);
    return newAddress instanceof AddressMaster ? newAddress.toJSON() : false;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

module.exports = {
  CreateAddress,
};
