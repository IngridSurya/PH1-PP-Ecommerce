const { Product, Category, PurchaseHistory, User, UserProfile } = require('../models');
const { formatPrice } = require('../helpers');

class Controller {
    static async showHomePage(req, res) {
        try {
            let session = req.session;
            const { categoryId, name } = req.query;
            let categories = await Category.findAll();
            let products = await Product.getDetails(categoryId, name);
            let filteredByCategory = await categories.find(el => el.id === +categoryId)
            res.render('homePage', { title: 'Home Page', categories, products, filteredByCategory, formatPrice, session });

        } catch (error) {
            // console.log(error);
            res.send(error.message);
        }
    }
    static async addToCart(req, res) {
        try {
            let { id, purchasedQty } = req.body;
            if ( purchasedQty > 0 ) {
                if (!req.session.cart) {
                    req.session.cart = [];
                }
                let perItemCart = req.session.cart.find(el => el.id === +id);
                if (perItemCart) {
                    perItemCart.purchasedQty = (+purchasedQty) + (perItemCart.purchasedQty);
                } else {
                    req.session.cart.push({ id: +id, purchasedQty: +purchasedQty });
                }
            } else {
                throw new Error('quantity need to be more than 0.');
            }
            res.redirect('/');
        } catch (error) {
            // console.log(error);
            res.send(error.message);
        }
    }
    static async showCartPage(req, res) {
        try {
            const { cart } = req.session;
            let session = req.session;
            const { error } = req.query;
            let productOnCart = [];
            if (cart) {
                for (let i in cart) {
                    let el = {};
                    let options = {};
                    options.include = Category;
                    el.product = await Product.findByPk(cart[i].id, options);
                    el.purchasedQty = cart[i].purchasedQty;
                    productOnCart.push(el);
                }
            }
            res.render('cartPage', { title: 'Cart Page', session, formatPrice, products: productOnCart, error });
        } catch (error) {
            // console.log(error);
            res.send(error.message);
        }
    }
    static async purchase(req, res) {
        try {
            const { userId } = req.session;
            const { id, purchasedQty } = req.body;

            if (!userId) {
                let err = new Error('Please login first.');
                err.name = 'ValidateLogin'
                throw err;
            }
            if (!req.session.cart) {
                let err = new Error('Please add item to your cart.');
                err.name = 'ValidatePurchase'
                throw err;
            }
            if (id) {
                let d = new Date();
                let str = `00${userId}`;
                let purchaseHistoryNo = `${+d}${str.slice(-3)}`;
                if (Array.isArray(id)) {
                    let productLength = id.length;
                    
                    for (let i = 0; i < productLength; i++) {
                        console.log(id[i], userId, purchasedQty[i], purchaseHistoryNo);
                        await PurchaseHistory.create({ productId: id[i], userId: userId, quantity: purchasedQty[i], purchaseHistoryNo });
                    }
                } else {
                    console.log(id, userId, purchasedQty, purchaseHistoryNo);
                    await PurchaseHistory.create({ productId: id, userId: userId, quantity: purchasedQty, purchaseHistoryNo });
                }
                req.session.cart = [];
            }
            res.redirect('/');
        } catch (error) {
            console.log(error);
            if (error.name === 'ValidateLogin' || error.name === 'ValidatePurchase') {
                res.redirect(`/cart?error=${error.message}`);
            } else {
                res.send(error.message);
            }
        }
    }
    static async showSellerPage(req, res) {
        try {
            let session = req.session;
            let options = {};
            if (!session.userId) {
                let err = new Error('Please login first.');
                err.name = 'ValidateLogin'
                throw err;
            }
            options.where = { userId: session.userId };
            options.include = Category;
            let products = await Product.findAll(options);
            res.render('sellerPage', { title: 'Seller Page', products, session, formatPrice });
        } catch (error) {
            res.send(error.message);
        }
    }
    static async showAddProductForm(req, res) {
        try {
            let session = req.session;
            const { error } = req.query;
            let categories = await Category.findAll();
            res.render('addProductForm', { title: 'Add Product Form Page', categories, session, error });
        } catch (error) {
            res.send(error.message);
        }
    }
    static async addNewProduct(req, res) {
        try {
            const { error } = req.query;
            const { name, description, price, stock, categoryId, imgUrl } = req.body;
            const { userId } = req.session;
            await Product.create({name, description, price, userId, stock, categoryId, imgUrl});
            res.redirect('/seller');
        } catch (error) {
            if (error.name === 'ValidateLogin' || error.name === 'ValidatePurchase') {
                res.redirect(`/seller/add?error=${error.message}`);
            } else {
                res.send(error.message);
            }
        }
    }
    static async showEditProductForm(req, res) {
        try {
            let session = req.session;
            const { error } = req.query;
            const { id } = req.params;
            let options = {};
            options.include = Category;
            let product = await Product.findByPk(id, options);
            let categories = await Category.findAll();
            // res.send(product)
            res.render('editProductForm', { title: 'Edit Product Form Page', session, error, product, categories });
        } catch (error) {
            res.send(error.message);
        }
    }
    static async editProduct(req, res) {
        try {
            const { id } = req.params;
            const { name, description, price, stock, categoryId, imgUrl } = req.body;
            // const { userId } = req.session;
            await Product.update({ name, description, price, stock, categoryId, imgUrl }, { where: { id } });
            res.redirect('/seller');
        } catch (error) {
            if (error.name === 'ValidateLogin' || error.name === 'ValidatePurchase') {
                res.redirect(`/seller/add?error=${error.message}`);
            } else {
                res.send(error.message);
            }
        }
    }
    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const { name, description, price, stock, categoryId, imgUrl } = req.body;
            // const { userId } = req.session;
            await Product.destroy({ where: { id } });
            res.redirect('/seller');
        } catch (error) {
            if (error.name === 'ValidateLogin' || error.name === 'ValidatePurchase') {
                res.redirect(`/seller/add?error=${error.message}`);
            } else {
                res.send(error.message);
            }
        }
    }
    static async showPurchaseHistory(req, res) {
        try {
            const { userId } = req.session;
            let options = {};
            // options.where = { id: userId }
            options.include = UserProfile
            let purchaseHistory = await User.findAll(options);
            res.send(purchaseHistory);
        } catch (error) {
            res.send(error.message);
        }
    }
}

module.exports = Controller;
