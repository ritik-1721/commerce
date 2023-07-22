module.exports = (sequelize, DataTypes, Sequelize) => {
  const attributeMaster = sequelize.define(
    "attribute_master",
    {
      attribute_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      attribute_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      attribute_value_type: {
        type: DataTypes.STRING,
        defaultValue: "text",
        allowNull: 2,
      },
      createdBy: {
        type: DataTypes.INTEGER,
      },
      updatedBy: {
        type: DataTypes.INTEGER,
      },
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
  return attributeMaster;
};
