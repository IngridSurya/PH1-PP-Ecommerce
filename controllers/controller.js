const { Product, Category, PurchaseHistory } = require('../models');
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
            const { cart } = req.session;
            const { id, purchasedQty } = req.body;
            if ( purchasedQty > 0 ) {
                if (!cart) {
                    cart = [];
                }
                let perItemCart = cart.find(el => el.id === +id);
                if (perItemCart) {
                    perItemCart.purchasedQty = (+purchasedQty) + (perItemCart.purchasedQty);
                } else {
                    cart.push({ id: +id, purchasedQty: +purchasedQty });
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
            const { userId, cart } = req.session;
            const { id, purchasedQty } = req.body;

            if (!userId) {
                let err = new Error('Please login first.');
                err.name = 'ValidateLogin'
                throw err;
            }
            if (!cart) {
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
                        await PurchaseHistory.create({ productId: id[i], userId: userId, quantity: purchasedQty[i], purchaseHistoryNo });
                    }
                } else {
                    await PurchaseHistory.create({ productId: id, userId: userId, quantity: purchasedQty, purchaseHistoryNo });
                }
                cart = [];
            }
            res.redirect('/');
        } catch (error) {
            // console.log(error);
            if (error.name === 'ValidateLogin' || error.name === 'ValidatePurchase') {
                res.redirect(`/cart?error=${error.message}`);
            } else {
                res.send(error.message);
            }
        }
    }
}

module.exports = Controller;
