const {
  CreateAttributeValue,
  QueryAttributeValuesByAttributeIdAndValue,
  QueryListOfAttributeValuesByAttrbuteId,
  UpdateAttributeValueById,
} = require("../service/attributeValue.services");

const { fileUpload } = require("../helpers/upload.helpers");

const { isNotEmpty, isID } = require("../helpers/validate.helpers");

const { getCurrentDateTime } = require("../helpers/local.helpers");

const addAttributeValue = async (req, res) => {
  const currentDateTime = getCurrentDateTime();
  try {
    let attribute_value;
    const { attribute_id, attribute_type, attribute_value_description } =
      req.body;
    if (
      !isID(attribute_id) ||
      !isNotEmpty(attribute_type) ||
      !isNotEmpty(attribute_value_description)
    ) {
      return res.status(402).json({
        ok: false,
        message:
          "attribute-id, attribute type, attribute value and attribute description is required.",
      });
    }

    switch (attribute_type) {
      case "text": {
        // code block for text
        attribute_value = req.body.attribute_value;
        if (!isNotEmpty(attribute_value)) {
          return res.status(402).json({
            ok: false,
            message: "Attribute value is required.",
          });
        }
        break;
      }
      case "color": {
        // code block for color
        attribute_value = req.body.attribute_value;
        if (!isNotEmpty(attribute_value)) {
          return res.status(402).json({
            ok: false,
            message: "Attribute value is required.",
          });
        }
        break;
      }
      case "file": {
        // code block for file
        const file = req.files.attribute_value;
        if (file) {
          const newFile = await fileUpload(
            file,
            "images/",
            ["jpg", "jpeg", "png", "gif"],
            true
          );
          if (newFile.ok === false) {
            return res
              .status(402)
              .json({ ok: false, message: newFile.message });
          } else {
            attribute_value = newFile.fileName;
          }
        } else {
          return res.status(402).json({
            ok: false,
            message: "Attribute value is required.",
          });
        }
        break;
      }
      default: {
        //default code block
        return res
          .status(402)
          .json({ ok: false, message: "Something went wrong." });
      }
    }

    const check = await QueryAttributeValuesByAttributeIdAndValue(
      attribute_id,
      attribute_value
    );
    if (check === false) {
    } else {
      return res.status(402).json({
        ok: false,
        message: "Already Exist.",
      });
    }
    const info = {
      attribute_id: Number(attribute_id),
      attribute_value,
      attribute_value_description,
      createdAt: currentDateTime,
    };
    const newAtributeValue = await CreateAttributeValue(info);
    if (newAtributeValue === false) {
      return res
        .status(402)
        .json({ ok: false, message: "Something went wrong." });
    } else {
      return res.status(200).json({
        ok: true,
        message: "Added successfully.",
        data: newAtributeValue,
      });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

const deleteAttributeValue = async (req, res) => {
  const currentDateTime = getCurrentDateTime();
  try {
    const attribute_value_id = req.params.id;
    const info = { isDelete: true, updatedAt: currentDateTime };
    const result = await UpdateAttributeValueById(attribute_value_id, info);
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

const getAttributeValueByAttributeId = async (req, res) => {
  try {
    const attribute_id = req.params.id;
    const attributeValueList = await QueryListOfAttributeValuesByAttrbuteId(
      attribute_id
    );
    if (attributeValueList === false) {
      return res.status(402).json({ ok: false, message: "No Values found." });
    } else {
      return res.status(200).json({
        ok: true,
        message: "Values Found.",
        records: attributeValueList,
      });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

module.exports = {
  addAttributeValue,
  deleteAttributeValue,
  getAttributeValueByAttributeId,
};
