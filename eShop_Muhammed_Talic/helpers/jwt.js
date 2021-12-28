const expressJwt = require('express-jwt');

function authJwt() {
    const secret = 'secret';
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked // Zabrana korisniku da koriste metode PUT;DELETE,POST, a adminu dozvoljava
    }).unless({ // daj mi ove rute bez tokena, ( npr. pristup posjetiocima)
        path: [
            // KONFUZNOO!
            // https://stackoverflow.com/questions/36400665/regex-for-express-router-url-to-match-path-starting-with-public
            // https://www.regextester.com // public routes that don't require authentication
            {url: /\/TalaShop\/proizvod(.*)/ ,     methods: ['GET', 'OPTIONS'] },
            {url: /\/TalaShop\/kategorija(.*)/ ,   methods: ['GET', 'OPTIONS'] }, // TODO kategorije dodaje samo headAdmin
            `/TalaShop/korisnik/login`,
            `/TalaShop/korisnik/register`,
            `/TalaShop`,
            `/TalaShop/test`,
            `/TalaShop/logout`
        ]
    })
}
// revoke token if user no longer exists
async function isRevoked(req, payload, done) {
    if(!payload.jelAdmin) {
        done(null, true)
    }
    done();
}

module.exports = authJwt;





/*
const expressJwt = require('express-jwt');

function authJwt() {
    const secret = "tajna";
    const nazivShopa = process.env.nazivShopa;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked // Zabrana korisniku da koriste metode PUT;DELETE,POST, a adminu dozvoljava
    }).unless({ // daj mi ove rute bez tokena, ( npr. pristup posjetiocima)
        path: [
            // KONFUZNOO!
            // https://stackoverflow.com/questions/36400665/regex-for-express-router-url-to-match-path-starting-with-public
            // https://www.regextester.com
            {url: /\/TalaShop\/proizvod(.*)/ ,   methods: ['GET', 'OPTIONS'] },
            {url: /\/TalaShop\/kategorija(.*)/ , methods: ['GET', 'OPTIONS'] },
            // `/TalaShop/korisnik/login`,
            `${nazivShopa}/korisnik/login`,
            `${nazivShopa}/korisnik/register`,
            // /api/v1
        ]
    })
}

async function isRevoked(req, payload, done) {
    if(!payload.jelAdmin) {
        done(null, true)
    }
    done();
}

module.exports = authJwt;*/
