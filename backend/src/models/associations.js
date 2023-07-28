const db = require('./index');

// Define associations between models
const defineAssociations = () => {
    try {
    // associations orderStatus
    db.orderStatus.hasMany(db.orderMaster,{ foreignKey: "order_status", indexes: [{ fields: ["order_status"] }], })

    // associations orderItemMaster
    db.orderItemMaster.belongsTo(db.orderMaster,{ foreignKey: "order_id", indexes: [{ fields: ["order_id"] }], });
    db.orderItemMaster.belongsTo(db.productMaster,{ foreignKey: "product_id", indexes: [{ fields: ["product_id"] }], });

    // associations orderStatusLog
    db.orderStatusLog.hasMany(db.orderMaster, { foreignKey: "order_status", indexes: [{ fields: ["order_status"] }], });
    db.orderStatusLog.belongsTo(db.orderMaster, { foreignKey: "order_id", indexes: [{ fields: ["order_id"] }], });

    // associations orderMaster
    db.orderMaster.belongsTo(db.addressMaster, { foreignKey: "shipping_address_id", indexes: [{ fields:["shipping_address_id"] }], });
    db.orderMaster.belongsTo(db.addressMaster, { foreignKey: "billing_address_id", indexes: [{ fields: ["billing_address_id"] }], });
    db.orderMaster.belongsTo(db.orderStatus, { foreignKey: "order_status", indexes: [{ fields: ["order_status"] }], });
    db.orderMaster.belongsTo(db.userMaster, { foreignKey: "user_id", indexes: [{ fields: ["user_id"] }], });

    // associations addressMaster
    db.addressMaster.belongsTo(db.userMaster, { foreignKey: "user_id", indexes: [{ fields: ["user_id"] }], });
    db.addressMaster.hasMany(db.orderMaster, { foreignKey: "user_id", indexes: [{ fields: ["user_id"] }], });

    // associations userMaster
    db.userMaster.hasMany(db.orderMaster, { foreignKey: "user_id", indexes: [{ fields: ["user_id"] }], });
    db.userMaster.hasMany(db.addressMaster, { foreignKey: "user_id", indexes: [{ fields: ["user_id"] }], });
    db.userMaster.hasMany(db.cartMaster, { foreignKey: "user_id", indexes: [{ fields: ["user_id"] }], });
    db.userMaster.hasMany(db.wishlistMaster, { foreignKey: "user_id", indexes: [{ fields: ["user_id"] }], });

    // associations attributeMaster
    db.attributeMaster.hasMany(db.attributeValueMaster, { foreignKey: "attribute_id", indexes: [{ fields: ["attribute_id"] }], });

    // associations attributeValueMaster
    db.attributeValueMaster.belongsTo(db.attributeMaster, { foreignKey: "attribute_id", indexes: [{ fields: ["attribute_id"] }], });

    // associations cartMaster
    db.cartMaster.belongsTo(db.productMaster, { foreignKey: "product_id", indexes: [{ fields: ["product_id"] }], });
    db.cartMaster.belongsTo(db.userMaster, { foreignKey: "user_id", indexes: [{ fields: ["user_id"] }], });

    // associations categoryMaster
    db.categoryMaster.belongsTo(db.categoryMaster, { foreignKey: "parent_id", indexes: [{ fields: ["parent_id"] }], });
    db.categoryMaster.hasMany(db.categoryMaster, { foreignKey: "parent_id", indexes: [{ fields: ["parent_id"] }], });

    // associations productAttributeValues
    db.productAttributeValues.belongsTo(db.productMaster, { foreignKey: "product_id", indexes: [{ fields: ["product_id"] }], });
    db.productAttributeValues.belongsTo(db.attributeMaster, { foreignKey: "attribute_id", indexes: [{ fields: ["attribute_id"] }], });
    db.productAttributeValues.belongsTo(db.attributeValueMaster, { foreignKey: "attribute_value_id", indexes: [{ fields: ["attribute_value_id"] }], });

    // associations productImg
    db.productImg.belongsTo(db.productMaster, { foreignKey: "product_id", indexes: [{ fields: ["product_id"] }], });

    // associations productMaster
    db.productMaster.belongsTo(db.gstMaster, { foreignKey: "gst_id", indexes: [{ fields: ["gst_id"] }], });
    db.productMaster.hasMany(db.productImg, { foreignKey: "product_id", indexes: [{ fields: ["product_id"] }], });
    db.productMaster.hasMany(db.wishlistMaster, { foreignKey: "product_id", indexes: [{ fields: ["product_id"] }], });
    db.productMaster.hasMany(db.cartMaster, { foreignKey: "product_id", indexes: [{ fields: ["product_id"] }], });

    // associations wishlistMaster
    db.wishlistMaster.belongsTo(db.productMaster, { foreignKey: "product_id", indexes: [{ fields: ["product_id"] }], });
    db.wishlistMaster.belongsTo(db.userMaster, { foreignKey: "user_id", indexes: [{ fields: ["user_id"] }], });
} catch (error) {
    console.error("Error occurred while defining associations:", error);
    throw error; // rethrow the error to be caught by the caller if needed
  }
};

module.exports = defineAssociations;
