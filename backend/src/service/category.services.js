const db = require("../models/index");

// 👇️ Models Use
const CategoryMaster = db.categoryMaster;

const CreateCategory = async (info) => {
  try {
    const result = await CategoryMaster.create(info);
    return result instanceof CategoryMaster ? result.toJSON() : false;
  } catch (err) {
    return false;
  }
};

const QueryCategoryByParentId = async (parent_id) => {
  try {
    const result = await CategoryMaster.findAll({
      where: {
        parent_id: Number(parent_id),
        isDelete: false,
      },
    });
    return result === null ? false : result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const QueryCategoryBySlug = async (category_slug) => {
  try {
    const result = await CategoryMaster.findOne({
      where: {
        category_slug,
        isDelete: false,
      },
    });
    return result === null ? false : result.toJSON();
  } catch (err) {
    return false;
  }
};

const QueryCategoryById = async (category_id) => {
  try {
    const result = await CategoryMaster.findOne({
      where: {
        category_id: Number(category_id),
        isDelete: false,
      },
    });
    return result === null ? false : result.toJSON();
  } catch (err) {
    return false;
  }
};

const UpdateCategoryById = async (category_id, info) => {
  try {
    const result = await CategoryMaster.update(
      { ...info },
      { where: { category_id: Number(category_id), isDelete: false } }
    );
    return result[0] > 0 ? true : false;
  } catch (err) {
    return false;
  }
};

// NOTE QueryListOfAttributeAndValueByCategoryId
const QueryCategoryAttributeValuesByCategoryId = async (category_id) => {
  try {
    const result = await db.sequelize.query(
      `
      SELECT t4.attribute_id, t5.attribute_name, t5.attribute_value_type, ( SELECT CONCAT( '[', GROUP_CONCAT( JSON_OBJECT( 'attribute_value_id', t4_1.attribute_value_id, 'attribute_id', t4_1.attribute_id, 'attribute_value', t4_1.attribute_value, 'attribute_value_description', t4_1.attribute_value_description ) ORDER BY t4_1.attribute_value_description SEPARATOR ',' ), ']' ) FROM attribute_value_masters t4_1 WHERE FIND_IN_SET(t4_1.attribute_value_id, GROUP_CONCAT(DISTINCT t4.attribute_value_id)) AND t4_1.isDelete = 0 ) AS attribute_values, COUNT(DISTINCT t1.product_title) as product_count
      FROM product_masters t1, category_masters t3, product_attribute_values_trans t4, attribute_masters t5
      WHERE t1.isDelete = 0 AND FIND_IN_SET(${category_id}, t1.categorys_ids) AND t3.category_id = ${category_id} AND t4.product_id = t1.product_id AND t4.attribute_id = t5.attribute_id AND t4.isDelete = 0 AND t5.isDelete = 0
      GROUP BY t4.attribute_id;`,
      { type: db.QueryTypes.SELECT }
    );
    return result.length > 0 ? result : false;
  } catch (err) {
    return false;
  }
};

module.exports = {
  QueryCategoryAttributeValuesByCategoryId,
  CreateCategory,
  QueryCategoryById,
  QueryCategoryBySlug,
  QueryCategoryByParentId,
  UpdateCategoryById,
};
