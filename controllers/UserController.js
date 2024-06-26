const { User, UserProfile } = require('../models');
const bcryptjs = require ("bcryptjs");

class UserController {
    static async showRegisterUser(req, res) {
        try {
            const { error } = req.query;
            res.render('registerUserForm', { title: "Create Account", error });
        } catch (error) {
            res.send(error.message);
        }
    }
    static async postRegisterUser(req, res) {
        try {
            let { username, password, role } = req.body;
            let user = await User.create({ username, password, role });
            res.redirect(`/register/profile/?userId=${user.id}`);
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                let err = error.errors.map(el => el.message);
                res.redirect(`/register?error=${err}`)
            } else {
                res.send(error.message);
            }
        }
    }
    static async showRegisterProfile (req, res) {
        try {
            const { userId, error } = req.query;
            res.render('registerProfileForm', { userId, title: "Add User Profile", error });
        } catch (error) {
            res.send(error.message);
        }
    }
    static async postRegisterProfile(req, res) {
        const { userId } = req.query;
        try {
            let { fullName, address, email } = req.body;
            await UserProfile.create({ fullName, address, email, userId });
            res.redirect('/');
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                let err = error.errors.map(el => el.message);
                res.redirect(`/register/profile?userId=${userId}&error=${err}`)
            } else {
                res.send(error.message);
            }
        }
    }
    static async showLoginForm(req, res) {
        try {
            const { error } = req.query;
            res.render ('loginForm',{ error, title: "Login Page" });
        } catch (error) {
            res.send (error.message);
        }
    }
    static async postLogin (req, res) {
        const {username, password} = req.body;
        await User.findOne({ where: {username} })
        .then(User => {
            if (User) {
                const isValidPassword = bcryptjs.compareSync(password,User.password);

                if (isValidPassword) {
                    req.session.userId = User.id;
                    req.session.role = User.role;
                    req.session.username = User.username;
                    res.redirect ('/');
                } else {
                    const error = 'Invalid Username/Password';
                    return res.redirect(`/login?error=${error}`);
                }
            } else {
                const error = "Invalid username/password";
                return res.redirect(`/login?error=${error}`);
            }
        }).catch (error => res.send (error.message));
    }
    static logOutUser (req, res){
        try {
            req.session.destroy(function(error){
                res.redirect('/');
            })
        } catch (error) {
            res.send (error.message);
        }
    }

}

module.exports = UserController;
