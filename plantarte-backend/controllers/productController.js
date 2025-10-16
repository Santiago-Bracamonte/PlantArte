const Product = require('../models/Product');
const getProducts = async (req, res) => {
    const products = await Product.find({}); 
    res.json(products);
};


const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

const createProduct = async (req, res) => {
    const { name, price, image, description, category, stock } = req.body;

    const product = new Product({
        name,
        price,
        image,
        description,
        category,
        stock,

    });

    const createdProduct = await product.save(); 
    res.status(201).json(createdProduct); 
};

const updateProduct = async (req, res) => {
    const { name, price, image, description, category, stock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name; 
        product.price = price || product.price;
        product.image = image || product.image;
        product.description = description || product.description;
        product.category = category || product.category;
        product.stock = stock || product.stock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne(); 
        res.json({ message: 'Producto eliminado' });
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};