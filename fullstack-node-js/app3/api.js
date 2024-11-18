const Products = require('./products')

module.exports = {
  listProducts,
  getProduct
}

async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query

  try {
    res.json(await Products.list({
      offset: Number(offset),
      limit: Number(limit),
      tag
    }))
  } catch(err) {
    res.status(500).json({ error: err.message })
  }
}

async function getProduct(req, res, next) {
  const { id } = req.param

  try {
    const product = await Products.get(id)
    if (!product) return next()

    res.json(product)
  } catch(err) {
    res.status(500).json({ error: err.message })
  }
}
