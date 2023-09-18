const db = require("../models/index");

// 👇️ Models Use
const PincodeMaster = db.pincodeMaster;

const QueryPincodeDetailsByPincode = async (pincode) => {
  try {
    const result = await PincodeMaster.findOne({
      where: {
        pincode,
        isDelete: false,
      },
    });
    return result === null ? false : result.toJSON();
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  QueryPincodeDetailsByPincode,
};
