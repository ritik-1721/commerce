const { base_url } = require("../helpers/local.helpers");
const moment = require("moment");
const { getCategoryTree } = require("./category.controllers");
const {
  QueryListOfAttributeWithValues,
} = require("../service/attribute.services");
const { QueryListOfGST, QueryTest } = require("../service/gst.services");
const data = { moment, APP_TITLE: process.env.APP_TITLE, version: "1.0.0" };

const attribute = (req, res) => {
  res.render("attribute", {
    ...data,
    userDate: req.session.userDate,
    base_url: base_url(req),
    title: `${process.env.APP_TITLE} | Attribute`,
  });
};

const category = (req, res) => {
  res.render("category", {
    ...data,
    userDate: req.session.userDate,
    base_url: base_url(req),
    title: `${process.env.APP_TITLE} | Category`,
  });
};

const home = (req, res) => {
  res.render("home", {
    ...data,
    userDate: req.session.userDate,
    base_url: base_url(req),
    title: `${process.env.APP_TITLE} | Home`,
  });
};

const product = async (req, res) => {
  const categoryHieratchy = await getCategoryTree(0);
  const attributeList = await QueryListOfAttributeWithValues();
  const gstList = await QueryListOfGST();
  res.render("product", {
    ...data,
    categoryHieratchy,
    attributeList,
    gstList,
    userDate: req.session.userDate,
    base_url: base_url(req),
    title: `${process.env.APP_TITLE} | Add Product`,
  });
};

const login = (req, res) => {
  if (req.session.userDate && req.session.userDate.isAdmin === true) {
    res.redirect("/");
  }
  res.render("login", {
    ...data,
    userDate: req.session.userDate,
    base_url: base_url(req),
    title: `${process.env.APP_TITLE} | Sign-In`,
  });
};

const productList = (req, res) => {
  res.render("product-list", {
    ...data,
    userDate: req.session.userDate,
    base_url: base_url(req),
    title: `${process.env.APP_TITLE} | Product List`,
  });
};

const test = async (req, res) => {
  await QueryTest();
  res.send("work");
};

module.exports = {
  login,
  home,
  attribute,
  category,
  product,
  test,
  productList,
};
