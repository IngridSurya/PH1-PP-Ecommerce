const { User, UserProfile } = require('../models');
const bcryptjs = require ("bcryptjs")

class UserController {
    static async showRegisterUser(req, res) {
        try {
            res.render('registerUserForm', { title: "Create Account" })
        } catch (error) {
            res.send(error.message)
        }
    }
    static async postRegisterUser(req,res) {
        try {
            // console.log(req.body);
            let {username, password, role} = req.body;
            let user = await User.create({username, password, role});
            // res.send(user)
            res.redirect(`/register/profile/?userId=${user.id}`)
        } catch (error) {
            res.send(error.message)
        }
    }
    static async showRegisterProfile (req, res) {
        try {
            const { userId } = req.query;
            res.render('registerProfileForm', { userId,title:"Add User Profile" })
        } catch (error) {
            res.send(error.message)
        }
    }
    static async postRegisterProfile(req, res) {
        try {
            // console.log(req.body);
            const { userId } = req.query
            let { fullName, address, email } = req.body
            // let data = await User.findAll()
            await UserProfile.create({ fullName, address, email, userId });
            res.redirect('/');
        } catch (error) {
            res.send(error.message)
        }
    }
    static async showLoginForm(req, res) {
        try {
            res.render ('loginForm',{ title: "Login Page" });

        } catch (error) {
            res.send (error.message)
        }
    }
    static async postLogin (req, res) {
        const {username, password} = req.body
        await User.findOne({ where: {username} })
        .then(User => {
            if (User) {
                const isValidPassword = bcryptjs.compareSync(password,User.password);

                if (isValidPassword) {
                    res.redirect ('/');
                } else {
                    const error = 'Invalid Username/Password'
                    return res.redirect(`/login?error=${error}`, )
                }
            } else {
                const error = "Invalid username/password"
                return res.redirect(`/login?error${error}`)
            }
        }).catch (error => res.send (error.message))
    }

}

module.exports = UserController;