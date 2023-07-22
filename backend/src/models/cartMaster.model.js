module.exports = (sequelize, DataTypes, Sequelize) => {
  const cartMaster = sequelize.define(
    "cart_master",
    {
      cart_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      product_id: { type: DataTypes.INTEGER, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
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
  return cartMaster;
};
