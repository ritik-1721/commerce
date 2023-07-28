module.exports = (sequelize, DataTypes, Sequelize) => {
  const pincodeMaster = sequelize.define(
    "pincode_master",
    {
      pincode_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      pincode: { type: DataTypes.STRING, allowNull: true },
      city: { type: DataTypes.STRING, allowNull: true },
      state: { type: DataTypes.STRING, allowNull: true },
      country: { type: DataTypes.STRING, allowNull: true },
      hasCOD: { type: DataTypes.BOOLEAN, defaultValue: false },
      hasPrepaid: { type: DataTypes.BOOLEAN, defaultValue: false },
      hasReverse: { type: DataTypes.BOOLEAN, defaultValue: false },
      isDelete: { type: DataTypes.BOOLEAN, defaultValue: false },
      createdBy: { type: DataTypes.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedBy: { type: DataTypes.INTEGER },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    },
    { sequelize }
  );

  return pincodeMaster;
};
