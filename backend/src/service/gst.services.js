const db = require("../models/index");

// 👇️ Models Use
const GSTMaster = db.gstMaster;
const AttributeMaster = db.attributeMaster;
const AttributeValueMaster = db.attributeValueMaster;

const QueryListOfGST = async () => {
  try {
    const result = await GSTMaster.findAll({
      where: {
        isDelete: false,
      },
    });
    return result === null ? false : result;
  } catch (err) {
    return false;
  }
};

const QueryTest = async () => {
  try {
    const r = await AttributeMaster.findAll({ include: AttributeValueMaster });
    console.log("r");
    console.log(r);
  } catch (e) {
    console.log("e");
    console.log(e);
  }
};

module.exports = {
  QueryListOfGST,
  QueryTest,
};
