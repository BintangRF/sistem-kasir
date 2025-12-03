const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const newCategory = await Category.create({ name });
    res.status(201).json({
      data: newCategory,
      message: "Category created successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [["name", "ASC"]],
    });

    res.status(200).json({
      data: categories,
      message: "Categories fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
    });
  }
};

exports.getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json({
      data: category,
      message: "Category fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedCategory = await Category.findByPk(id);

    if (!updatedCategory) {
      return res.status(404).json({
        data: null,
        message: "Category not found",
      });
    }

    await updatedCategory.update({ name });

    res.status(200).json({
      data: updatedCategory,
      message: "Category updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByPk(id);

    if (!deletedCategory)
      return res.status(404).json({ message: "Category not found" });

    await deletedCategory.destroy();

    res.status(200).json({
      data: null,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
    });
  }
};
