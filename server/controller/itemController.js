const Item = require("../models/Item");
const Category = require("../models/Category");

exports.createItem = async (req, res) => {
  const { name, price, categoryId } = req.body;

  try {
    const newItem = await Item.create({ name, price, categoryId });

    res.status(201).json({ newItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [{ model: Category, as: "category", attributes: ["name"] }],
      order: [["name", "ASC"]],
    });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getItemsById = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id);

    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;

  try {
    const updatedItem = await Item.findByPk(id);

    if (!updatedItem)
      return res.status(404).json({ message: "Item not found" });

    await updatedItem.update({ name, price, category });

    res.status(200).json({ updatedItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Item.findByPk(id);

    if (!deletedItem)
      return res.status(404).json({ message: "Item not found" });

    await deletedItem.destroy();

    res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
