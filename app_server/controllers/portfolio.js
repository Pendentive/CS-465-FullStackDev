const galleriesEndpoint = 'http://localhost:3000/api/galleries';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    }
};

/* GET portfolio view */
const portfolioPersonal = async function(req, res, next) {
    await fetch(galleriesEndpoint, options)
        .then(response => response.json())
        .then(json => {
            let message = null;
            if (!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
                if (!json.length) {
                    message = 'No galleries exist in our database!';
                }
            }
            const galleryData = json[0]; // Assuming you want the first gallery
            res.render('pages/portfolio/personal', {
                layout: 'layout-portfolio',
                title: 'Personal Photography',
                galleryImages: galleryData.images,
                message
            });
        })
        .catch(err => res.status(500).send(err.message));
};

module.exports = {
    portfolioPersonal
};