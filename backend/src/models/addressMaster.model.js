module.exports = (sequelize, DataTypes, Sequelize) => {
  const addressMaster = sequelize.define(
    "address_master",
    {
      address_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: { isEmail: true },
      },
      fname: { type: DataTypes.STRING },
      lname: { type: DataTypes.STRING },
      receiver_mobile: { type: DataTypes.STRING, allowNull: false },
      alternative_mobile: { type: DataTypes.STRING, allowNull: true },
      apartment_suite_unit: { type: DataTypes.STRING, allowNull: true },
      street_address: { type: DataTypes.STRING, allowNull: false },
      city: { type: DataTypes.STRING, allowNull: false },
      state: { type: DataTypes.STRING, allowNull: false },
      pincode: { type: DataTypes.STRING, allowNull: false },
      country: { type: DataTypes.STRING, allowNull: false },
      address_type: {
        type: DataTypes.ENUM("shipping", "billing"),
        allowNull: false,
      },
      isDefault: { type: DataTypes.BOOLEAN, defaultValue: true },
      isDelete: { type: DataTypes.BOOLEAN, defaultValue: false },
      createdBy: { type: DataTypes.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedBy: { type: DataTypes.INTEGER },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    },
    { sequelize }
  );

  return addressMaster;
};
