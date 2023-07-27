const express = require("express");
const cors = require('cors');

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5003;

router.get('/', cors(), (req, res) => {
  res.json({ message: 'Hello Render hi hey!' })
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} `)
})

const productsRouter = require("./products/products.router");
const categoriesRouter = require("./categories/categories.router");
const suppliersRouter = require("./suppliers/suppliers.router");

app.use(express.json());

app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/suppliers", suppliersRouter);

// Not found handler
app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
