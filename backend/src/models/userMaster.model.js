module.exports = (sequelize, DataTypes, Sequelize) => {
  const userMaster = sequelize.define(
    "user_master",
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      fname: {
        type: DataTypes.STRING,
      },
      lname: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
      },
      updatedBy: {
        type: DataTypes.INTEGER,
      },
      isAdmin: {
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

  return userMaster;
};
