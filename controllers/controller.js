const { Product, Category } = require('../models');

class Controller {
    static async showHomePage(req, res) {
        try {
            const { categoryId, name } = req.query;
            let categories = await Category.findAll();
            let products = await Product.getDetails(categoryId, name);
            let filterByCategory = await categories.find(el => el.id === +categoryId)
            res.render('homePage', { title: 'Home Page', categories, products, filterByCategory });
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }
    // static async showHomePage(req, res) {
    //     try {
            
    //     } catch (error) {
    //         console.log(error);
    //         res.send(error.message);
    //     }
    // }
}

module.exports = Controller;