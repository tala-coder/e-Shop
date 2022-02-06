/*
const expressJwt = require('express-jwt');

function authJwt() {
    const secret = 'tajna';
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked // Zabrana arhiviranom korisniku da koriste metode PUT;DELETE,POST, a ostalim dozvoljava
    }).unless({ // daj mi ove rute bez tokena, ( npr. pristup posjetiocima)
        path: [
            // KONFUZNOO!
            // https://stackoverflow.com/questions/36400665/regex-for-express-router-url-to-match-path-starting-with-public
            // https://www.regextester.com // public routes that don't require authentication
            // {url: /\/TalaShop\/korisnik(.*)/ ,     methods: ['GET', 'OPTIONS'] },
            // {url: /\/TalaShop(.*)/ ,   methods: ['GET', 'OPTIONS'] },
            {url: /\/public\/images(.*)/ ,   methods: ['GET', 'OPTIONS'] },
            // {url: /\/TalaShop\/soketi(.*)/ },
            // {url: /\/TalaShop\/kategorija(.*)/ ,   methods: ['GET', 'OPTIONS'] },
            // {url: /\/TalaShop\/proizvod(.*)/ ,     methods: ['GET', 'OPTIONS'] },
            {url: /\/TalaShop\/korisnik(.*)/ ,     methods: ['GET', 'OPTIONS'] },
            // {url: /\/TalaShop\/narudzba\/korpa(.*)/ ,     methods: ['GET', 'OPTIONS'] },
            // {url: /\/TalaShop\/narudzba(.*)/ ,     methods: ['GET', 'OPTIONS'] },
            `/TalaShop/korisnik/login`,
            `/TalaShop/korisnik/register`,
            `/TalaShop/logout`,
            `/TalaShop`,
        ]
    })
}
// revoke token if user no longer exists
async function isRevoked(req, payload, done) {
    if( !payload.jelArhiviran  ) {
        done(null, true);
    }
    done();
}

module.exports = authJwt

 */