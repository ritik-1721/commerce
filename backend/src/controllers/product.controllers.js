const {
  CreateProduct,
  CreateProductAttributeValues,
  UpdateProductById,
  QueryListOfProducts,
  CreateProductImg,
  QueryListOfProductImgsById,
  QueryListOfProductsByCategoryId,
  QueryProductBySlug,
  QuerySimilarProducts,
} = require("../service/product.services");
const {
  createSlug,
  checkExist: slugExist,
} = require("../helpers/slug.helpers");
const { isNotEmpty, isID } = require("../helpers/validate.helpers");
const { getCurrentDateTime } = require("../helpers/local.helpers");
const {
  QueryAttributeValuesByID,
} = require("../service/attributeValue.services");
const { fileUpload } = require("../helpers/upload.helpers");
const { QueryCategoryBySlug } = require("../service/category.services");

const addProductImg = async (req, res) => {
  try {
    const currentDateTime = getCurrentDateTime();
    const { product_id, image_description, priority } = req.body;
    const file = req.files.image_file;
    let img_name = "";
    if (!isID(product_id) && !isNotEmpty(priority)) {
      return res.status(402).json({
        ok: false,
        message: "Product-id, priority and image file is required.",
      });
    }
    if (!file) {
      return res.status(402).json({
        ok: false,
        message: "Image file is required.",
      });
    }
    const newFile = await fileUpload(
      file,
      "images/",
      ["jpg", "jpeg", "png", "gif", "webp"],
      true
    );
    if (newFile.ok === false) {
      return res.status(402).json({ ok: false, message: newFile.message });
    } else {
      img_name = newFile.fileName;
    }

    const info = {
      product_id,
      image_description,
      img_name,
      priority,
      createdAt: currentDateTime,
    };
    const newProductImg = await CreateProductImg(info);
    if (newProductImg === false) {
      return res
        .status(402)
        .json({ ok: false, message: "Something went wrong." });
    } else {
      return res.status(200).json({
        ok: true,
        message: "Added successfully.",
        record: newProductImg,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: error.message + "Something went wrong." });
  }
};

const addProduct = async (req, res) => {
  const currentDateTime = getCurrentDateTime();
  try {
    const {
      title,
      sub_title,
      description,
      tags,
      categorys_array,
      attribute_ids,
      product_code_array,
      product_sku_array,
      product_mrp_array,
      product_msp_array,
      product_gst_array,
    } = req.body;
    if (
      !isNotEmpty(title) ||
      !isNotEmpty(sub_title) ||
      !isNotEmpty(description) ||
      !isNotEmpty(tags)
    ) {
      return res.status(501).json({
        message: "A title, sub title , tags and decription are required.",
      });
    }
    if (!categorys_array || categorys_array.length === 0) {
      return res.status(501).json({
        message: "A Category is required.",
      });
    }

    if (!isNotEmpty(attribute_ids)) {
      return res.status(501).json({
        message: "No Attributes Found.",
      });
    }

    if (
      (!product_code_array || product_code_array.length === 0) &&
      (!product_sku_array || product_sku_array.length === 0) &&
      (!product_mrp_array || product_mrp_array.length === 0) &&
      (!product_msp_array || product_msp_array.length === 0) &&
      (!product_gst_array || product_gst_array.length === 0)
    ) {
      return res.status(501).json({
        message: "ADD PRODUCT.",
      });
    }

    let checkAtt = true;
    var attribute_ids_array = attribute_ids.trim().split(",");
    attribute_ids_array.map((i) => {
      if (!checkAtt) return false;
      if (
        !req.body[`attribute_id_${i}_array`] ||
        req.body[`attribute_id_${i}_array`].length === 0
      ) {
        checkAtt = false;
      }
    });
    if (!checkAtt) {
      return res.status(501).json({
        body: req.body,
        message: "No Attributes Values Found.",
      });
    }
    let categorys_ids = categorys_array.join();
    let product_ids = [];
    if (Array.isArray(product_code_array)) {
      /*
       *multipe product
       */
      let product_count = product_code_array.length;
      for (let p = 0; product_count > p; p++) {
        let productSlugName = title;
        await Promise.all(
          attribute_ids_array.map(async (i) => {
            if (isID(req.body[`attribute_id_${i}_array`][p])) {
              const av = await QueryAttributeValuesByID(
                req.body[`attribute_id_${i}_array`][p]
              );
              productSlugName += av.attribute_value_description;
            }
          })
        );

        let product_slug = await createSlug(productSlugName);
        // SLUG EXIT CHECK;
        const check = await slugExist(product_slug);
        if (check === false) {
          product_slug = product_slug + " " + Math.floor(Math.random() * 90000);
        }
        const result = await CreateProduct({
          product_title: title,
          product_sub_title: sub_title,
          product_description: description,
          product_tags: tags,
          product_slug,
          categorys_ids,
          product_code: product_code_array[p],
          product_sku: product_sku_array[p],
          product_msp: product_msp_array[p],
          product_mrp: product_mrp_array[p],
          gst_id: product_gst_array[p],
          createdAt: currentDateTime,
        });

        if (result !== false) {
          product_ids.push(result.product_id);
          await Promise.all(
            attribute_ids_array.map(async (i) => {
              if (isID(req.body[`attribute_id_${i}_array`][p])) {
                await CreateProductAttributeValues({
                  product_id: result.product_id,
                  attribute_id: i,
                  attribute_value_id: req.body[`attribute_id_${i}_array`][p],
                });
              }
            })
          );
        }
      }

      await Promise.all(
        product_ids.map(async (product_id) => {
          var similar_products = product_ids.filter((id) => id !== product_id);
          await UpdateProductById(product_id, {
            similar_products: similar_products.toString(),
          });
        })
      );

      return res.status(200).json({
        ok: true,
        message: "Added successfully.",
      });
    } else {
      /*
       *single product
       */
      let productSlugName = title;
      await Promise.all(
        attribute_ids_array.map(async (i) => {
          if (isID(req.body[`attribute_id_${i}_array`]) === true) {
            const av = await QueryAttributeValuesByID(
              req.body[`attribute_id_${i}_array`]
            );

            productSlugName =
              productSlugName + " " + av.attribute_value_description;
          }
        })
      );
      let product_slug = await createSlug(productSlugName);
      // SLUG EXIT CHECK;
      const check = await slugExist(product_slug);
      if (check === false) {
        product_slug = product_slug + " " + Math.floor(Math.random() * 90000);
      }
      const result = await CreateProduct({
        product_title: title,
        product_sub_title: sub_title,
        product_description: description,
        product_tags: tags,
        product_slug,
        categorys_ids,
        product_code: product_code_array,
        product_sku: product_sku_array,
        product_msp: product_msp_array,
        product_mrp: product_mrp_array,
        gst_id: product_gst_array,
        createdAt: currentDateTime,
      });
      if (result !== false) {
        product_ids.push(result.product_id);
        await Promise.all(
          attribute_ids_array.map(async (i) => {
            if (isID(req.body[`attribute_id_${i}_array`])) {
              await CreateProductAttributeValues({
                product_id: result.product_id,
                attribute_id: i,
                attribute_value_id: req.body[`attribute_id_${i}_array`],
              });
            }
          })
        );
      }
      return res.status(200).json({
        ok: true,
        message: "Added successfully.",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

const getAllProductImgsById = async (req, res) => {
  try {
    const product_id = req.params.id;
    const productImgList = await QueryListOfProductImgsById(product_id);
    if (productImgList === false) {
      return res.status(402).json({ ok: false, message: "No Record found." });
    } else {
      return res.status(200).json({
        ok: true,
        message: "Records Found.",
        result: productImgList,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const productList = await QueryListOfProducts();
    if (productList === false) {
      return res.status(402).json({ ok: false, message: "No Products found." });
    } else {
      return res
        .status(200)
        .json({ ok: true, message: "Products Found.", result: productList });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

const getProductDetailsByProductSlug = async (req, res) => {
  try {
    const product_slug = req.params.slug;
    const productDetails = await QueryProductBySlug(product_slug);
    if (productDetails === false) {
      return res
        .status(402)
        .json({ ok: false, message: "Something went wrong." });
    } else {
      const { images, attributes, ...other } = productDetails[0];
      const similarProductsAttributes = [];
      if (JSON.parse(attributes).length > 0) {
        await Promise.all(
          JSON.parse(attributes).map(async (i) => {
            const products = await QuerySimilarProducts(
              productDetails[0].product_id,
              productDetails[0].product_title,
              i.attribute_id,
              i.attribute_value_id,
              JSON.parse(attributes)
            );
            similarProductsAttributes.push({
              attribute_id: i.attribute_id,
              attribute_value_type: i.attribute_value_type,
              attribute_name: i.attribute_name,
              products,
            });
          })
        );
      }

      return res.status(200).json({
        ok: true,
        message: "Product Found.",
        productDetails: {
          similarProductsAttributes,
          images: JSON.parse(images),
          attributes: JSON.parse(attributes),
          ...other,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

const getProductsCategorySlug = async (req, res) => {
  try {
    const { user_id } = req.query;
    const category_slug = req.params.slug;
    const result = await QueryCategoryBySlug(category_slug);
    if (result === false) {
      return res
        .status(500)
        .json({ ok: false, message: "Invalid Category Slug." });
    } else {
      const productList = await QueryListOfProductsByCategoryId(
        result.category_id,
        user_id
      );
      if (productList === false) {
        return res
          .status(500)
          .json({ ok: false, message: "No Products Found." });
      }
      return res.status(200).json({
        ok: true,
        message: "Products Found.",
        productList,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

const getProductByCategorySlug = async (req, res) => {
  try {
    const category_slug = req.params.slug;
    const result = await QueryCategoryBySlug(category_slug);
    if (result === false) {
      return res
        .status(500)
        .json({ ok: false, message: "Invalid Category Slug." });
    } else {
      const productList = await QueryListOfProductsByCategoryId(
        result.category_id
      );
      return res.status(200).json({
        ok: true,
        message: "Products Found.",
        productList,
        categoryDetails: result,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

module.exports = {
  addProduct,
  getAllProduct,
  addProductImg,
  getAllProductImgsById,
  getProductDetailsByProductSlug,
  getProductByCategorySlug,
  getProductsCategorySlug,
};
