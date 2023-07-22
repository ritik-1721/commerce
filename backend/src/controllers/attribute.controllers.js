const {
  QueryAttributeByAttributeName,
  CreateAttribute,
  UpdateAttributeById,
  QueryListOfAttributes,
} = require("../service/attribute.services");
const { isNotEmpty } = require("../helpers/validate.helpers");
const { getCurrentDateTime } = require("../helpers/local.helpers");

const addAttribute = async (req, res) => {
  const currentDateTime = getCurrentDateTime();
  try {
    const { attribute_name, attribute_value_type } = req.body;
    if (!isNotEmpty(attribute_name) || !isNotEmpty(attribute_value_type)) {
      return res.status(402).json({
        ok: false,
        message: "Attribute Name And Attribute Value Type Is Required.",
      });
    }
    const check = await QueryAttributeByAttributeName(attribute_name);
    console.log(check);
    if (check === false) {
    } else {
      return res.status(402).json({
        ok: false,
        message: "Already Exist.",
      });
    }
    const info = {
      attribute_name,
      attribute_value_type,
      createdAt: currentDateTime,
    };
    const newAtribute = await CreateAttribute(info);
    if (newAtribute === false) {
      return res
        .status(402)
        .json({ ok: false, message: "Something went wrong." });
    } else {
      return res
        .status(200)
        .json({ ok: true, message: "Added successfully.", record: newAtribute });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

const deleteAttribute = async (req, res) => {
  const currentDateTime = getCurrentDateTime();
  try {
    const attribute_id = req.params.id;
    const info = { isDelete: true, updatedAt: currentDateTime };
    const result = await UpdateAttributeById(attribute_id, info);
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

const GetAllAttributes = async (req, res) => {
  try {
    const attributeList = await QueryListOfAttributes();
    if (attributeList === false) {
      return res
        .status(402)
        .json({ ok: false, message: "No Attributes found." });
    } else {
      return res
        .status(200)
        .json({ ok: true, message: "Attributes Found.", allRecord: attributeList });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

module.exports = { addAttribute, deleteAttribute, GetAllAttributes };
