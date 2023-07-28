const dbConfig = require("../config/dbConfig.js");
// const defineAssociations = require("./associations");
const { Sequelize, DataTypes, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
sequelize
  .authenticate()
  .then(() => {
    console.log("connected.");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.QueryTypes = QueryTypes;

db.userMaster = require("./userMaster.model.js")(sequelize, DataTypes, Sequelize);
db.categoryMaster = require("./categoryMaster.model.js")(sequelize, DataTypes, Sequelize);
db.tagMaster = require("./tagMaster.model.js")(sequelize, DataTypes, Sequelize);
db.gstMaster = require("./gstMaster.model.js")(sequelize, DataTypes, Sequelize);
db.productMaster = require("./productMaster.model.js")(sequelize, DataTypes, Sequelize );
db.attributeMaster = require("./attributeMaster.model.js")( sequelize, DataTypes, Sequelize );
db.attributeValueMaster = require("./attributeValueMaster.model.js")( sequelize, DataTypes, Sequelize );
db.productAttributeValues = require("./productAttributeValues.model.js")( sequelize, DataTypes, Sequelize);
db.productImg = require("./productImg.model.js")(sequelize, DataTypes, Sequelize);
db.wishlistMaster = require("./wishlistMaster.model.js")(sequelize, DataTypes, Sequelize );
db.cartMaster = require("./cartMaster.model.js")( sequelize, DataTypes, Sequelize );
db.orderMaster = require("./orderMaster.model.js")( sequelize, DataTypes, Sequelize );
db.orderItemMaster = require("./orderItemMaster.model.js")( sequelize, DataTypes, Sequelize );
db.orderStatus = require("./orderStatus.model.js")( sequelize, DataTypes, Sequelize );
db.orderStatusLog = require("./orderStatusLog.model.js")( sequelize, DataTypes, Sequelize );
db.addressMaster = require("./addressMaster.model.js")( sequelize, DataTypes, Sequelize );
db.pincodeMaster = require("./pincodeMaster.model.js")( sequelize, DataTypes, Sequelize );

db.sequelize.sync({ force: false }).then(() => { console.log("yes re-sync done!"); });

/*
 *Associations Start
 */
 // associations orderItemMaster
 db.orderItemMaster.belongsTo(db.orderMaster,{ foreignKey: "order_id", indexes: [{ fields: ["order_id"] }], });
 db.orderItemMaster.belongsTo(db.productMaster,{ foreignKey: "product_id", indexes: [{ fields: ["product_id"] }], });
 // associations orderStatusLog
 db.orderStatusLog.belongsTo(db.orderStatus, { foreignKey: "old_status" });
 db.orderStatusLog.belongsTo(db.orderStatus, { foreignKey: "new_status" });
 db.orderStatusLog.belongsTo(db.orderMaster, { foreignKey: "order_id", indexes: [{ fields: ["order_id"] }], });
 // associations orderMaster
 db.orderMaster.belongsTo(db.addressMaster, { foreignKey: "shipping_address_id", indexes: [{ fields:["shipping_address_id"] }], });
 db.orderMaster.belongsTo(db.addressMaster, { foreignKey: "billing_address_id", indexes: [{ fields: ["billing_address_id"] }], });
 db.orderMaster.belongsTo(db.orderStatus, { foreignKey: "order_status" ,as:"status_id" });
 db.orderMaster.belongsTo(db.userMaster, { foreignKey: "user_id", indexes: [{ fields: ["user_id"] }], });
//  // associations addressMaster
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
/*
 *Associations End
 */

module.exports = db;
