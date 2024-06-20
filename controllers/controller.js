const { Product, Category } = require('../models');
const { formatPrice } = require('../helpers');

class Controller {
    static async showHomePage(req, res) {
        try {
            const { categoryId, name } = req.query;
            let categories = await Category.findAll();
            let products = await Product.getDetails(categoryId, name);
            let filterByCategory = await categories.find(el => el.id === +categoryId)
            res.render('homePage', { title: 'Home Page', categories, products, filterByCategory, formatPrice });

        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }
    static async addToCart(req, res) {
        try {
            const { id, purchasedQty } = req.body;
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
                throw new Error('quantity need to be more than 0.')
            }
            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }
    static async showCartPage(req, res) {
        try {
            res.render('cartPage', { title: 'Cart Page' });
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }
}

module.exports = Controller;