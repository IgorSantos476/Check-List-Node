function RequireLogin(req, res, next) {
    if(!req.session.userId) {
        req.flash("error_msg", "Você precisa estar logado para acessar esta página.");
        return res.redirect('/login');
    }

    next();
}

module.exports = RequireLogin;