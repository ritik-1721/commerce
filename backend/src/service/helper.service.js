const db = require("../models/index");

const CheckSlugExist = async (slug) => {
  try {
    const result = await db.sequelize.query(
      `
            SELECT category_slug as slug
            FROM  category_masters 
            WHERE  isDelete=0 AND category_slug="${slug}"
            UNION ALL
            SELECT category_slug as slug
            FROM category_masters
            WHERE  isDelete=0 AND category_slug="${slug}"
            UNION ALL
            SELECT product_slug as slug
            FROM product_masters
            WHERE  isDelete=0 AND product_slug="${slug}"

        `,
      {
        type: db.QueryTypes.SELECT,
      }
    );
    return result.length > 0 ? result : false;
  } catch (err) {
    return false;
  }
};

module.exports = { CheckSlugExist };
