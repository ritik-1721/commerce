module.exports = (sequelize, DataTypes, Sequelize) => {
  const productImg = sequelize.define(
    "product_img",
    {
      product_img_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      product_id: { type: DataTypes.INTEGER },
      img_name: { type: DataTypes.STRING },
      image_description: { type: DataTypes.STRING },
      priority: { type: DataTypes.INTEGER },
      createdBy: { type: DataTypes.INTEGER },
      updatedBy: { type: DataTypes.INTEGER },
      isDelete: { type: DataTypes.BOOLEAN, defaultValue: false },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    },
    {
      sequelize,
    }
  );

  return productImg;
};
