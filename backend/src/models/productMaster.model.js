module.exports = (sequelize, DataTypes, Sequelize) => {
  const productMaster = sequelize.define(
    "product_master",
    {
      product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      product_title: { type: DataTypes.STRING },
      product_sub_title: { type: DataTypes.STRING },
      product_description: { type: DataTypes.STRING },
      product_slug: { type: DataTypes.STRING },
      product_code: { type: DataTypes.STRING },
      product_sku: { type: DataTypes.STRING },
      product_msp: { type: DataTypes.DECIMAL(10, 2) },
      product_mrp: { type: DataTypes.DECIMAL(10, 2) },
      gst_id: { type: DataTypes.INTEGER },
      categorys_ids: { type: DataTypes.STRING },
      tag_ids: { type: DataTypes.STRING },
      similar_products: { type: DataTypes.STRING },
      updatedBy: { type: DataTypes.INTEGER },
      createdBy: { type: DataTypes.INTEGER },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
      isDelete: { type: DataTypes.BOOLEAN, defaultValue: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    },
    { sequelize }
  );

  return productMaster;
};
