const isLoggedIn = function (req, res, next) {
    console.log(req.session);

    if (! req.session.userId) {
        const error = 'Please login first!'
        res.redirect(`/login?error=${error}`)
    } else {
        next();
    }
}

module.exports = isLoggedIn