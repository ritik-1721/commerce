module.exports = (sequelize, DataTypes, Sequelize) => {
  const productAttributeValues = sequelize.define(
    "product_attribute_values_trans",
    {
      pa_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      product_id: { type: DataTypes.INTEGER },
      attribute_id: { type: DataTypes.INTEGER },
      attribute_value_id: { type: DataTypes.INTEGER },
      createdBy: { type: DataTypes.INTEGER },
      updatedBy: { type: DataTypes.INTEGER },
      isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    },
    {
      sequelize,
    }
  );
  return productAttributeValues;
};
