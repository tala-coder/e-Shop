const multer = require("multer");

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

exports.storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('Slika mora biti u png/jpeg/jpg formatu!');

        if(isValid)
            uploadError = null;

        cb(uploadError, 'public/images')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.replace(' ', '-') // jpg obrisat dodat na kraj
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

