module.exports = (sequelize, DataTypes, Sequelize) => {
  const orderStatusLog = sequelize.define(
    "order_status_log",
    {
      log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      order_id: { type: DataTypes.INTEGER, allowNull: false },
      status_id: { type: DataTypes.INTEGER, allowNull: false },
      // new_status: { type: DataTypes.INTEGER, allowNull: false },
      log_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      isDelete: { type: DataTypes.BOOLEAN, defaultValue: false },
      createdBy: { type: DataTypes.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedBy: { type: DataTypes.INTEGER },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    },
    { sequelize }
  );

  return orderStatusLog;
};
