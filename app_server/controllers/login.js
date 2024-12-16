/* GET meals view */
const login = (req, res) => {
    res.render('login', {title: process.env.DEFAULT_TITLE});
};

module.exports = {
    login
}