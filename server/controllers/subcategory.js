const Subcategory = require('../models/subcategory');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const { parent } = req.body;
    const subcategory = await new Subcategory({
      name,
      slug: slugify(name),
      parent,
    }).save();
    res.json(subcategory);
  } catch (err) {
    res.status(400).send('Creating Subcategory Failed');
  }
};
exports.list = async (req, res) => {
  const subcategories = await Subcategory.find({})
    .sort({ createdAt: -1 })
    .exec();
  res.json(subcategories);
};
exports.read = async (req, res) => {
  let subcategory = await Subcategory.findOne({ slug: req.params.slug }).exec();
  res.json(subcategory);
};
exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Subcategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name), parent },
      { new: true }
    );
    res.send(updated);
  } catch (err) {
    res.status(400).send('Subcategory Update failed');
  }
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Subcategory.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    res.status(400).send('Subcategory delete failed');
  }
};
