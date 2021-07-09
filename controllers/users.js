const User = require('../models/user');

module.exports.renderRegister = (req,res) => {
    res.render('user/register');
}

module.exports.regsiter = async (req,res,next) => {
    try{
        const { username , email , password } = req.body;
        const user = new User({username , email});
        const registeredUser = await User.register(user , password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success', 'Welcome to Yelp-camp!');
            res.redirect('/campgrounds');
        });
    }catch(e){
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req,res) => {
    res.render('user/login');
}

module.exports.login = (req,res) => {
    req.flash('success', 'Welcome Back!');
    const returnUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(returnUrl);
}

module.exports.logout = (req,res) => {
    req.logout();
    req.flash('success', 'Goodbye!');
    res.redirect('/campgrounds');
}