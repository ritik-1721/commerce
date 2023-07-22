module.exports = (sequelize, DataTypes, Sequelize) => {
  const tagMaster = sequelize.define(
    "tag_master",
    {
      tag_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      tag: { type: DataTypes.STRING },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
      isDelete: { type: DataTypes.BOOLEAN, defaultValue: false },
      updatedBy: { type: DataTypes.INTEGER },
      createdBy: { type: DataTypes.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    },
    { sequelize }
  );

  return tagMaster;
};
