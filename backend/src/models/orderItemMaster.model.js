module.exports = (sequelize, DataTypes, Sequelize) => {
  const orderItemMaster = sequelize.define(
    "order_item_master",
    {
      order_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      order_id: { type: DataTypes.INTEGER, allowNull: false },
      product_id: { type: DataTypes.INTEGER, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      isDelete: { type: DataTypes.BOOLEAN, defaultValue: false },
      createdBy: { type: DataTypes.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedBy: { type: DataTypes.INTEGER },
      updatedAt: { allowNull: false, type: Sequelize.DATE, },
    },
    { sequelize }
  );

  return orderItemMaster;
};
