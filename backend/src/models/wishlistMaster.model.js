module.exports = (sequelize, DataTypes, Sequelize) => {
  const wishlistMaster = sequelize.define(
    "wishlist_master",
    {
      wishlist_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      product_id: { type: DataTypes.INTEGER, allowNull: false },
      createdBy: { type: DataTypes.INTEGER },
      updatedBy: { type: DataTypes.INTEGER },
      isDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    },
    {
      sequelize,
    }
  );
  return wishlistMaster;
};
