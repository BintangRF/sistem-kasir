const Item = require("../models/Item");
const Category = require("../models/Category");

exports.createItem = async (req, res) => {
  const { name, price, categoryId } = req.body;

  try {
    const newItem = await Item.create({ name, price, categoryId });

    res.status(201).json({
      data: newItem,
      message: "Item created successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
    });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [{ model: Category, as: "category", attributes: ["name"] }],
      order: [["name", "ASC"]],
    });

    res.status(200).json({
      data: items,
      message: "Items fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
    });
  }
};

exports.getItemsById = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({
        data: null,
        message: "Item not found",
      });
    }

    res.status(200).json({
      data: item,
      message: "Item fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
    });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, categoryId } = req.body;

  try {
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({
        data: null,
        message: "Item not found",
      });
    }

    await item.update({
      name,
      price,
      categoryId,
    });

    await item.reload({
      include: [{ model: Category, as: "category" }],
    });

    res.status(200).json({
      data: item,
      message: "Item updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
    });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Item.findByPk(id);

    if (!deletedItem) {
      return res.status(404).json({
        data: null,
        message: "Item not found",
      });
    }

    await deletedItem.destroy();

    res.status(200).json({
      data: null,
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
    });
  }
};
