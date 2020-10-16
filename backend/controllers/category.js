const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.categoryById = async (req, res, next, id) => {
  try {
    await Category.findById(id).exec((err, category) => {
      if (err || !category) {
        return res.status(400).json({
          error: "Category not found",
        });
      }
      req.category = category;
      next();
    });
  } catch (err) {
    console.error(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json({ data });
    });
  } catch (err) {
    console.error(err.message);
  }
};

exports.read = (req, res) => {
  return res.json(req.category);
};

exports.update = async (req, res) => {
  try {
    let category = req.category;
    category.name = req.body.name;

    await category.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  } catch (err) {
    console.error(err.message);
  }
};

exports.remove = async (req, res) => {
  try {
    let category = req.category;
    await category.remove((err) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json({
        message: "Category deleted successfully",
      });
    });
  } catch (err) {
    console.error(err.message);
  }
};

exports.list = async (req, res) => {
  try {
    Category.find().exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  } catch (err) {
    console.error(err.message);
  }
};
