const db = require("../models/index");

// 👇️ Models Use
const UserMaster = db.userMaster;

const CreateUser = async (info) => {
  try {
    const newUser = await UserMaster.create(info);
    return newUser instanceof UserMaster ? newUser.toJSON() : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Returns Boolean Email has already been taken
const QueryUserByEmail = async (email) => {
  try {
    const user = await UserMaster.findOne({
      where: {
        email: email,
        isDelete: false,
      },
    });
    return user === null ? false : user.toJSON();
  } catch (err) {
    console.log(err);
    return false;
  }
};

// Returns User With Id
const QueryUserById = async (user_id) => {
  try {
    const user = await UserMaster.findOne({
      where: {
        user_id: Number(user_id),
        isDelete: false,
      },
    });
    return user === null ? false : user.toJSON();
  } catch (err) {
    return false;
  }
};



// Returns List of Users
const QueryListOfUsers = async () => {
  try {
    const users = await UserMaster.findAll({
      attributes: { exclude: ["password"] },
      where: {
        isDelete: false,
      },
    });
    return users === null ? false : users;
  } catch (err) {
    return false;
  }
};

const UpdateUserById = async (user_id, info) => {
  try {
    const result = await UserMaster.update(
      { ...info },
      { where: { user_id: Number(user_id), isDelete: false } }
    );
    return result[0] > 0 ? true : false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  UpdateUserById,
  CreateUser,
  QueryUserById,
  QueryListOfUsers,
  QueryUserByEmail,
};
