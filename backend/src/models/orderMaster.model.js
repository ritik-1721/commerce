module.exports = (sequelize, DataTypes, Sequelize) => {
  const orderMaster = sequelize.define(
    "order_master",
    {
      order_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      shipping_address_id: { type: DataTypes.INTEGER, allowNull: false },
      billing_address_id: { type: DataTypes.INTEGER, allowNull: false },
      invoice_no: { type: DataTypes.STRING, allowNull: true },
      order_no: { type: DataTypes.STRING, allowNull: true },
      order_amount: { type: DataTypes.DECIMAL(10, 2) },
      order_datetime: { type: Sequelize.DATE },
      order_status: { type: DataTypes.INTEGER, allowNull: false },
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
  return orderMaster;
};
