const {
  QueryCategoryById,
  CreateCategory,
  QueryCategoryByParentId,
  UpdateCategoryById,
  QueryCategoryBySlug,
  QueryCategoryAttributeValuesByCategoryId,
} = require("../service/category.services");

const {
  createSlug,
  checkExist: slugExist,
} = require("../helpers/slug.helpers");

const { isNotEmpty, isID } = require("../helpers/validate.helpers");

const { getCurrentDateTime } = require("../helpers/local.helpers");

// 👇️ Add Category
const addCategory = async (req, res) => {
  const currentDateTime = getCurrentDateTime();
  let parent_slug = "";
  try {
    const { category_name, parent_id } = req.body;
    if (!isNotEmpty(category_name)) {
      return res
        .status(402)
        .json({ ok: false, message: "Category Name is required." });
    }
    if (parent_id) {
      if (!isID(parent_id)) {
        return res
          .status(402)
          .json({ ok: false, message: "Enter Valid Parent-ID." });
      }
      const parent = await QueryCategoryById(parent_id);
      if (parent === false) {
        return res
          .status(402)
          .json({ ok: false, message: "Enter Valid Parent-ID." });
      } else {
        parent_slug = parent.category_slug + " ";
      }
    }
    const category_slug = await createSlug(parent_slug + category_name);
    // SLUG EXIT CHECK;
    const check = await slugExist(category_slug);
    if (check === false) {
      return res
        .status(402)
        .json({ ok: false, message: "Slug Already Exist." });
    }

    const info = {
      category_name,
      category_slug,
      parent_id: parent_id ? parent_id : 0,
      createdAt: currentDateTime,
    };

    const newCategory = await CreateCategory(info);
    if (newCategory === false) {
      return res
        .status(402)
        .json({ ok: false, message: "Something went wrong." });
    } else {
      return res
        .status(200)
        .json({ ok: true, message: "Added successfully.", data: newCategory });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

// 👇️ Get Category Tree
const getCategoryTree = async (parent_id, seq = 0) => {
  try {
    const c = await QueryCategoryByParentId(parent_id);
    seq++;
    if (c) {
      const hierarchy = await Promise.all(
        c.map(async (item) => {
          let category_hierarchy = await getCategoryTree(item.category_id, seq);
          return {
            level: seq,
            category_id: item.category_id,
            parent_id: item.parent_id,
            category_name: item.category_name,
            category_slug: item.category_slug,
            isActive: item.isActive,
            category_hierarchy,
          };
        })
      );
      return hierarchy;
    }
    return false;
  } catch (error) {
    return false;
  }
};

// 👇️ Get Category Hieratchy
const categoryHierarchy = async (req, res) => {
  try {
    const category_id = req.params.id;
    const hierarchy = await getCategoryTree(category_id);
    if (hierarchy && hierarchy.length > 0) {
      return res
        .status(200)
        .json({ ok: true, allRecord: hierarchy, message: "Successfully." });
    } else {
      return res
        .status(200)
        .json({ ok: false, message: "No Categorys Found." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

// 👇️ Get Category Hieratchy
const categoryHieratchy = async (req, res) => {
  try {
    const hierarchy = await getCategoryTree(0);
    if (hierarchy && hierarchy.length > 0) {
      return res
        .status(200)
        .json({ ok: true, allRecord: hierarchy, message: "Successfully." });
    } else {
      return res
        .status(200)
        .json({ ok: false, message: "No Categorys Found." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

// 👇️ Delete Category By ID
const deleteCategory = async (req, res) => {
  const currentDateTime = getCurrentDateTime();
  try {
    const category_id = req.params.id;
    const info = { isDelete: true, updatedAt: currentDateTime };
    const result = await UpdateCategoryById(category_id, info);
    console.log(result);
    if (result === false) {
      return res
        .status(402)
        .json({ ok: false, message: "Something went wrong." });
    } else {
      return res
        .status(200)
        .json({ ok: true, message: "Deleted successfully." });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

// 👇️ Update isActive category By ID
const updateIsActiveCategory = async (req, res) => {
  try {
    const category_id = req.params.id;
    const { isActive } = req.body;
    if (!isID(category_id)) {
      return res
        .status(402)
        .json({ ok: false, message: "Invalid Category-Id." });
    }
    if (Number(isActive) !== 0 && Number(isActive) !== 1) {
      return res.status(402).json({ ok: false, message: "Invalid isActive." });
    }
    const info = {
      updatedAt: currentDateTime,
      isActive: Number(isActive) === 0 ? false : true,
    };
    const result = await UpdateCategoryById(category_id, info);
    if (result === false) {
      return res
        .status(402)
        .json({ ok: false, message: "Something went wrong." });
    } else {
      return res
        .status(200)
        .json({ ok: true, message: "Deleted successfully." });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

const getCategoryBySlug = async (req, res) => {
  try {
    const category_slug = req.params.slug;
    const result = await QueryCategoryBySlug(category_slug);
    if (result === false) {
      return res
        .status(500)
        .json({ ok: false, message: "Invalid Category Slug." });
    } else {
      return res.status(200).json({
        ok: true,
        message: "Category Found.",
        categoryDetails: result,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

const getCategoryAttributeValuesByCategoryId = async (req, res) => {
  try {
    const category_id = req.params.id;
    const result = await QueryCategoryAttributeValuesByCategoryId(category_id);
    if (result === false) {
      return res
        .status(500)
        .json({ ok: false, message: "Invalid Category Slug." });
    } else {
      const allRecord = result.map((item) => {
        return {
          ...item,
          attribute_values: JSON.parse(item.attribute_values),
        };
      });

      return res.status(200).json({
        ok: true,
        message: "Category Attribute Values Found.",
        allRecord,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

module.exports = {
  getCategoryAttributeValuesByCategoryId,
  addCategory,
  categoryHieratchy,
  deleteCategory,
  updateIsActiveCategory,
  getCategoryTree,
  getCategoryBySlug,
  categoryHierarchy,
};
