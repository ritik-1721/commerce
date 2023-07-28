module.exports = (sequelize, DataTypes, Sequelize) => {
  const orderStatus = sequelize.define(
    "order_status",
    {
      status_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      status_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
      isDelete: { type: DataTypes.BOOLEAN, defaultValue: false },
      updatedBy: { type: DataTypes.INTEGER },
      createdBy: { type: DataTypes.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    },
    { sequelize }
  );

  return orderStatus;
};
