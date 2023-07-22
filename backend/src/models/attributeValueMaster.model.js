module.exports = (sequelize, DataTypes, Sequelize) => {
  const attributeValueMaster = sequelize.define(
    "attribute_value_master",
    {
      attribute_value_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      attribute_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      attribute_value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      attribute_value_description: {
        type: DataTypes.STRING,
        allowNull: false,
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
  return attributeValueMaster;
};
