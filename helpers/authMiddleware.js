    const jwt = require('jsonwebtoken');

exports.jelArhiviran = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, "tajna", (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/TalaShop/korisnik/login');
        } else {
            console.log(decodedToken, 'decoded');
            if (decodedToken.korisnikStatus === 'arhiviran')
                return res.render('login/arhiviran', {    });
            else
                next();
        }
    })
}
    else {
        res.redirect('/TalaShop/korisnik/login');
    }
}

//https://www.youtube.com/watch?v=JqF2BJBQI9Y&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=17
exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, "tajna", (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
        } else {
            // console.log('find decoded', decodedToken);
            res.locals.user = decodedToken.korisnikIme;
            res.locals.nickname = decodedToken.korisnikNickname;
            res.locals.admin = decodedToken.jelAdmin;
            res.locals.userId = decodedToken.korisnikId;
            res.locals.slika = decodedToken.korisnikSlika;
            res.locals.status = decodedToken.korisnikStatus;
            next();
        }
    })
}
    else {
        res.locals.user = null;
        next();
    }
}