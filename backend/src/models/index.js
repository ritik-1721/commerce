const dbConfig = require("../config/dbConfig.js");
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

db.userMaster = require("./userMaster.model.js")(
  sequelize,
  DataTypes,
  Sequelize
);
db.categoryMaster = require("./categoryMaster.model.js")(
  sequelize,
  DataTypes,
  Sequelize
);
db.tagMaster = require("./tagMaster.model.js")(sequelize, DataTypes, Sequelize);

db.gstMaster = require("./gstMaster.model.js")(sequelize, DataTypes, Sequelize);

db.productMaster = require("./productMaster.model.js")(
  sequelize,
  DataTypes,
  Sequelize
);
db.attributeMaster = require("./attributeMaster.model.js")(
  sequelize,
  DataTypes,
  Sequelize
);
db.attributeValueMaster = require("./attributeValueMaster.model.js")(
  sequelize,
  DataTypes,
  Sequelize
);
db.productAttributeValues = require("./productAttributeValues.model.js")(
  sequelize,
  DataTypes,
  Sequelize
);
db.productImg = require("./productImg.model.js")(
  sequelize,
  DataTypes,
  Sequelize
);

db.wishlistMaster = require("./wishlistMaster.model.js")(
  sequelize,
  DataTypes,
  Sequelize
);

db.cartMaster = require("./cartMaster.model.js")(
  sequelize,
  DataTypes,
  Sequelize
);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

/*
 *Associations
 */

// db.gstMaster.hasMany(db.productMaster);
// db.productMaster.belongsTo(db.gstMaster);

// db.attributeMaster.hasMany(db.attributeValueMaster);
// db.attributeValueMaster.belongsTo(db.attributeMaster);

// db.productMaster.hasMany(db.productAttributeValues);
// db.productAttributeValues.belongsTo(db.productMaster);

module.exports = db;
