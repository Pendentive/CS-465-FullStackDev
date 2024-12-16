/* GET rooms view */
const reservations = (req, res) => {
    res.render('reservations', {title: process.env.DEFAULT_TITLE});
};

module.exports = {
    reservations
}