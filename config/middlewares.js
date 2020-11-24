const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
    app.use((req, res, next) => { 
        if (req.headers["x-forwarded-proto"] == "http")
            res.redirect(`https://${req.headers.host}${req.url}`);
        else
            next();
    });
}