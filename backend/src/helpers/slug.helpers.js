const slugify = require("slug");
const print = console.log.bind(console, ">");
const { CheckSlugExist } = require("../service/helper.service");

const createSlug = async (text) => {
  const slug = await slugify(text);
  return slug;
};

const checkExist = async (slug) => {
  try {
    const check = await CheckSlugExist(slug);
    return check.length > 0 ? false : true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  createSlug,
  checkExist,
};
