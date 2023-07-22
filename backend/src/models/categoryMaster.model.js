module.exports = (sequelize, DataTypes, Sequelize) => {
  const categoryMaster = sequelize.define(
    "category_master",
    {
      category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      parent_id: {
        type: DataTypes.INTEGER,
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
      },
      updatedBy: {
        type: DataTypes.INTEGER,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
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

  return categoryMaster;
};
