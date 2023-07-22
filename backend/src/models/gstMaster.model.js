module.exports = (sequelize, DataTypes, Sequelize) => {
  const gstMaster = sequelize.define(
    "gst_master",
    {
      gst_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      gst_percentage: { type: DataTypes.DECIMAL(10, 2) },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
      isDelete: { type: DataTypes.BOOLEAN, defaultValue: false },
      updatedBy: { type: DataTypes.INTEGER },
      createdBy: { type: DataTypes.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    },
    { sequelize }
  );

  return gstMaster;
};
