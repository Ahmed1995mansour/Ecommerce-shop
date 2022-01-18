const Product = require('../models/product');
const slugify = require('slugify');

exports.create = async (req, res) => {
  await Product.findOne({ slug: slugify(req.body.title) }).then((result) => {
    if (result) {
      res.status(409).json({ err: 'This Product title already exists' });
    } else {
      req.body.slug = slugify(req.body.title);
      console.log(req.body);
      Product(req.body)
        .save()
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({
            err: err.message,
          });
        });
    }
  });
};

exports.read = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};
