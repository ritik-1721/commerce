const db = require("../models/index");

// 👇️ Models Use
const AttributeValueMaster = db.attributeValueMaster;

const CreateAttributeValue = async (info) => {
  try {
    const result = await AttributeValueMaster.create(info);
    return result instanceof AttributeValueMaster ? result.toJSON() : false;
  } catch (err) {
    return false;
  }
};

const QueryAttributeValuesByAttributeIdAndValue = async (
  attribute_id,
  attribute_value
) => {
  try {
    const result = await AttributeValueMaster.findOne({
      where: {
        attribute_id,
        attribute_value,
        isDelete: false,
      },
    });
    return result === null ? false : result.toJSON();
  } catch (err) {
    return false;
  }
};

const UpdateAttributeValueById = async (attribute_value_id, info) => {
  try {
    const result = await AttributeValueMaster.update(
      { ...info },
      {
        where: {
          attribute_value_id: Number(attribute_value_id),
          isDelete: false,
        },
      }
    );
    return result[0] > 0 ? true : false;
  } catch (err) {
    return false;
  }
};

const QueryListOfAttributeValuesByAttrbuteId = async (id) => {
  try {
    const result = await AttributeValueMaster.findAll({
      where: {
        attribute_id: Number(id),
        isDelete: false,
      },
    });
    console.log(result);
    return result === null ? false : result.length > 0 ? result : false;
  } catch (err) {
    return false;
  }
};

const QueryAttributeValuesByID = async (id) => {
  try {
    const result = await AttributeValueMaster.findOne({
      where: {
        attribute_value_id: Number(id),
        isDelete: false,
      },
    });
    return result === null ? false : result.toJSON();
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  CreateAttributeValue,
  QueryAttributeValuesByAttributeIdAndValue,
  QueryListOfAttributeValuesByAttrbuteId,
  UpdateAttributeValueById,
  QueryAttributeValuesByID,
};
