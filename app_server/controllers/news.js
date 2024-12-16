/* GET news view */
const news = (req, res) => {
    res.render('news', {title: process.env.DEFAULT_TITLE});
};

module.exports = {
    news
}