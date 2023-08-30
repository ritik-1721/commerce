const { promises } = require("fs");
const db = require("../models/index");
const { isEmptyObject } = require("../helpers/local.helpers");

// 👇️ Models Use
const ProductImg = db.productImg;
const ProductMaster = db.productMaster;
const ProductAttributeValues = db.productAttributeValues;

const CreateProductImg = async (info) => {
  try {
    const result = await ProductImg.create(info);
    return result instanceof ProductImg ? result.toJSON() : false;
  } catch (error) {
    return false;
  }
};

const CreateProduct = async (info) => {
  try {
    const result = await ProductMaster.create(info);
    return result instanceof ProductMaster ? result.toJSON() : false;
  } catch (err) {
    return false;
  }
};

const UpdateProductById = async (product_id, info) => {
  try {
    const result = await ProductMaster.update(
      { ...info },
      { where: { product_id: Number(product_id), isDelete: false } }
    );
    return result[0] > 0 ? true : false;
  } catch (err) {
    return false;
  }
};

const CreateProductAttributeValues = async (info) => {
  try {
    const result = await ProductAttributeValues.create(info);
    return result instanceof ProductAttributeValues ? result.toJSON() : false;
  } catch (err) {
    return false;
  }
};

const QuerySimilarProducts = async (
  product_id,
  product_title,
  attribute_id,
  attribute_value_id,
  attributes
) => {
  try {
    let ext = "";
    await Promise.all(
      attributes.map((i) => {
        if (Number(i.attribute_id) === Number(attribute_id)) {
          return false;
        }
        ext += ` AND tb.attribute_id=${i.attribute_id} AND 
        tb.attribute_value_id=${i.attribute_value_id} `;
      })
    );
    const base_url = "http://localhost:1000/";
    const result = await db.sequelize.query(
      `
    SELECT 
      t2.product_id,t2.product_slug,t1.attribute_value_id,t3.attribute_value,t3.attribute_value_description,
       CASE
            WHEN t1.product_id=${product_id}
               THEN 1
               ELSE 0
       END as selectedProduct 

      FROM 
            product_attribute_values_trans t1 ,product_masters t2, attribute_value_masters t3
      WHERE 
            t1.attribute_id=${attribute_id} AND 
            t1.isDelete=0 AND 
            FIND_IN_SET(
               t1.product_id, 
               (
                 SELECT GROUP_CONCAT(ta.product_id) 
                 FROM product_masters ta , product_attribute_values_trans tb 
                 WHERE 
                 ta.isDelete=0 AND
                 tb.isDelete=0 AND
                 ta.product_title LIKE '${product_title}' AND 
                 ta.product_id=tb.product_id  
                 ${ext}
                 /* AND ta.product_id!=${product_id} */
               )
            ) AND
            t1.product_id=t2.product_id AND
            t2.isDelete=0 AND
            t2.product_title LIKE '${product_title}' AND
            t3.isDelete=0 AND
            t3.attribute_value_id=t1.attribute_value_id 
      GROUP BY 
            t1.product_id
      ORDER BY
            t3.attribute_value
      `,
      { type: db.QueryTypes.SELECT }
    );
    return result.length > 0 ? result : false;
  } catch (error) {
    return false;
  }
};

const QueryProductById = async (product_id) => {
  try {
    const base_url = "http://localhost:1000/";
    const result = await db.sequelize.query(
      `
      SELECT 
              t1.*, 
              t2.gst_percentage, 
              MIN(t1_1.priority), 
              CONCAT( "${base_url}static/images/", IFNULL(t1_1.img_name, "default.jpg") ) AS img_link  ,
              (SELECT CONCAT( '[', GROUP_CONCAT( JSON_OBJECT( 'pa_id',t_a.pa_id, 'attribute_value_type', t_c.attribute_value_type, 'attribute_name', t_c.attribute_name , 'attribute_id', t_a.attribute_id , 'attribute_value_description', t_b.attribute_value_description , 'attribute_value_id', t_a.attribute_value_id ) ORDER BY t1_1.priority SEPARATOR ',' ), ']' ) FROM product_attribute_values_trans t_a, attribute_value_masters t_b, attribute_masters t_c WHERE t_b.attribute_value_id = t_a.attribute_value_id AND t_a.attribute_id = t_c.attribute_id AND t_a.isDelete = 0 AND t_a.product_id = t1.product_id ) AS attributes
      FROM 
              product_masters t1 
              LEFT JOIN product_imgs t1_1 ON ( t1.product_id = t1_1.product_id AND t1_1.isDelete = 0 ), 
              gst_masters t2 
      WHERE 
              t1.isDelete = 0 AND 
              t1.gst_id = t2.gst_id AND 
              t2.isDelete = 0 AND 
              t1.product_id = '${product_id}' 
      GROUP BY 
              t1.product_id;
      `,
      { type: db.QueryTypes.SELECT }
    );
    return result.length > 0 ? result : false;
  } catch (err) {
    return false;
  }
};

const QueryProductBySlug = async (product_slug) => {
  try {
    const base_url = "http://localhost:1000/";
    const result = await db.sequelize.query(
      `
      SELECT t1.*, t2.gst_percentage, CONCAT( '[', GROUP_CONCAT( JSON_OBJECT( 'product_img_id', IFNULL(t1_1.product_img_id,0) , 'img', CONCAT( "${base_url}static/images/" ,IFNULL(t1_1.img_name,"default.jpg")) , 'image_description', t1_1.image_description, 'priority', t1_1.priority ) ORDER BY t1_1.priority SEPARATOR ',' ), ']' ) AS images, (SELECT CONCAT( '[', GROUP_CONCAT( JSON_OBJECT( 'pa_id',t_a.pa_id, 'attribute_value_type', t_c.attribute_value_type, 'attribute_name', t_c.attribute_name , 'attribute_id', t_a.attribute_id , 'attribute_value_description', t_b.attribute_value_description , 'attribute_value_id', t_a.attribute_value_id ) ORDER BY t1_1.priority SEPARATOR ',' ), ']' ) FROM product_attribute_values_trans t_a, attribute_value_masters t_b, attribute_masters t_c WHERE t_b.attribute_value_id = t_a.attribute_value_id AND t_a.attribute_id = t_c.attribute_id AND t_a.isDelete = 0 AND t_a.product_id = t1.product_id ) AS attributes
      FROM product_masters t1 LEFT JOIN product_imgs t1_1 ON ( t1.product_id=t1_1.product_id AND t1_1.isDelete=0 ),  gst_masters t2
      WHERE t1.isDelete = 0 AND t2.gst_id=t1.gst_id AND t2.isDelete = 0 AND t1.product_slug = '${product_slug}'
      GROUP BY t1.product_title
      ORDER BY t1_1.priority ASC
      `,
      { type: db.QueryTypes.SELECT }
    );
    return result.length > 0 ? result : false;
  } catch (err) {
    return false;
  }
};

const QueryListOfProductsByCategoryId = async ( category_id, filterObj, user_id = 0 ) => {
  try {
    let filterQuery = "";
    let filterIsApply = false;
    const extQuery = user_id && user_id !== 0 ? ` t1_2.user_id=${user_id} ` : ` t1_2.user_id=0 `;
    const base_url = "http://localhost:1000/";
    const filterIsEmpty = isEmptyObject(filterObj);
    if (!filterIsEmpty) {
      const filterConditions = [];
      for (const key in filterObj) {
        if (filterObj.hasOwnProperty(key)) {
          const value = filterObj[key];
          if (value != "") {
            filterConditions.push(`(t4.attribute_id = ${key} AND FIND_IN_SET(t4.attribute_value_id, '${value}'))`);
            filterIsApply = true;
          }
        }
      }
      if (filterConditions.length > 0) {
        filterQuery = ` AND t1.product_id = t4.product_id AND (${filterConditions.join( " OR " )})`;
      }
    }
    const result = await db.sequelize.query(
      `
      SELECT 
            t1.*, 
            t2.gst_percentage, 
            t3.*,MIN(t1_1.priority),
            CONCAT( "${base_url}static/images/" ,IFNULL(t1_1.img_name,"default.jpg"),"?w=240&h=240") as img_link,
            ifnull(t1_2.wishlist_id,0) as wishlist_id
            ${filterIsApply ? `,t4.attribute_id ,t4.attribute_value_id ` : ""}
      FROM 
            product_masters t1 
            LEFT JOIN product_imgs t1_1 ON ( t1.product_id=t1_1.product_id AND t1_1.isDelete=0 )
            LEFT JOIN wishlist_masters t1_2 ON ( t1.product_id=t1_2.product_id AND ${extQuery} AND t1_2.isDelete=0 )
            , gst_masters t2 
            , category_masters t3
            ${filterIsApply ? `,product_attribute_values_trans t4` : ""}
      WHERE 
            t1.isDelete = 0 
            AND t1.gst_id = t2.gst_id 
            AND t2.isDelete = 0 
            AND FIND_IN_SET(${category_id}, t1.categorys_ids) 
            And t3.category_id = ${category_id}
            ${filterQuery}
      GROUP BY t1.product_title 
      `,
      { type: db.QueryTypes.SELECT }
    );
    return result.length > 0 ? result : false;
  } catch (error) {
    return false;
  }
};

const QueryListOfProducts = async () => {
  try {
    const result = await db.sequelize.query(
      `
      SELECT t1.*, t2.gst_percentage, CONCAT( '[', GROUP_CONCAT( JSON_OBJECT( 'category_id', t1_1.category_id, 'category_name', t1_1.category_name, 'category_slug', t1_1.category_slug, 'isActive', t1_1.isActive ) ORDER BY t1_1.category_id SEPARATOR ',' ), ']' ) AS categories, IFNULL(( SELECT GROUP_CONCAT("<br>",t_c.attribute_name,"=",t_b.attribute_value_description) FROM product_attribute_values_trans t_a, attribute_value_masters t_b, attribute_masters t_c WHERE t_b.attribute_value_id = t_a.attribute_value_id AND t_a.attribute_id = t_c.attribute_id AND t_a.isDelete = 0 AND t_a.product_id = t1.product_id ),"[]") AS attributes
      FROM product_masters t1 JOIN category_masters t1_1 ON FIND_IN_SET( t1_1.category_id, t1.categorys_ids ) AND t1_1.isDelete = 0, gst_masters t2
      WHERE t1.isDelete = 0 AND t1.gst_id = t2.gst_id AND t2.isDelete = 0
      GROUP BY t1.product_id;
      `,
      { type: db.QueryTypes.SELECT }
    );
    return result.length > 0 ? result : false;
  } catch (error) {
    return false;
  }
};

const QueryListOfProductImgsById = async (product_id) => {
  try {
    const result = await ProductImg.findAll({
      where: {
        product_id: Number(product_id),
        isDelete: false,
      },
    });
    return result === null ? false : result;
  } catch (err) {
    console.log(err);

    return false;
  }
};

module.exports = {
  QueryProductById,
  CreateProduct,
  CreateProductImg,
  CreateProductAttributeValues,
  UpdateProductById,
  QueryListOfProductImgsById,
  QueryListOfProducts,
  QueryListOfProductsByCategoryId,
  QueryProductBySlug,
  QuerySimilarProducts,
};
