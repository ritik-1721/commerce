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

module.exports = {
  CreateCategory,
  QueryCategoryById,
  QueryCategoryBySlug,
  QueryCategoryByParentId,
  UpdateCategoryById,
};
