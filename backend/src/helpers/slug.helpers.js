const slugify = require("slug");
const print = console.log.bind(console, ">");
const { CheckSlugExist } = require("../service/helper.service");

/**
 * Create a URL-friendly slug from a given text.
 * @param {string} text - The text to convert into a slug.
 * @returns {Promise<string>} The generated slug.
 */
const generateSlug = async (text) => {
  const slug = await slugify(text);
  return slug;
};

/**
 * Check if a slug already exists.
 * @param {string} slug - The slug to check.
 * @returns {Promise<boolean>} `true` if the slug doesn't exist, otherwise `false`.
 */
const isSlugAvailable = async (slug) => {
  try {
    const check = await CheckSlugExist(slug);
    return check.length > 0 ? false : true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  createSlug: generateSlug,
  checkExist: isSlugAvailable,
};
