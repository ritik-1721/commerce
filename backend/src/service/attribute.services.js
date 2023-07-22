const db = require("../models/index");

// 👇️ Models Use
const AttributeMaster = db.attributeMaster;

const CreateAttribute = async (info) => {
  try {
    const result = await AttributeMaster.create(info);
    return result instanceof AttributeMaster ? result.toJSON() : false;
  } catch (err) {
    return false;
  }
};

const QueryAttributeByAttributeName = async (attribute_name) => {
  try {
    const result = await AttributeMaster.findOne({
      where: {
        attribute_name,
        isDelete: false,
      },
    });
    return result === null ? false : result.toJSON();
  } catch (err) {
    return false;
  }
};

const QueryListOfAttributes = async () => {
  try {
    const result = await AttributeMaster.findAll({
      where: {
        isDelete: false,
      },
    });
    return result === null ? false : result;
  } catch (err) {
    return false;
  }
};

const UpdateAttributeById = async (attribute_id, info) => {
  try {
    const result = await AttributeMaster.update(
      { ...info },
      { where: { attribute_id: Number(attribute_id), isDelete: false } }
    );
    return result[0] > 0 ? true : false;
  } catch (err) {
    return false;
  }
};

const QueryListOfAttributeWithValues = async () => {
  try {
    const result = await db.sequelize.query(
      `
      SELECT t1.attribute_id, t1.attribute_name , t1.attribute_value_type , 
      concat(
        '[', 
        group_concat(
          JSON_OBJECT('attribute_value_id', t2.attribute_value_id, 'attribute_value', t2.attribute_value,'attribute_value_description',t2.attribute_value_description) 
          order by t2.attribute_value_id separator ','
          ), 
        ']') as attribute_values 
      FROM attribute_masters t1 
      JOIN attribute_value_masters t2 ON t1.attribute_id = t2.attribute_id AND t2.isDelete=0 
      WHERE t1.isDelete=0 
      GROUP BY t1.attribute_id`,
      { type: db.QueryTypes.SELECT }
    );
    return result.length > 0 ? result : false;
  } catch (error) {
    return false;
  }
};

module.exports = {
  CreateAttribute,
  QueryAttributeByAttributeName,
  UpdateAttributeById,
  QueryListOfAttributes,
  QueryListOfAttributeWithValues,
};
