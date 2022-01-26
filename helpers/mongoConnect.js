const mongoose = require('mongoose');
/*https://stackoverflow.com/questions/55267494/the-uri-parameter-to-openuri-must-be-a-string-got-undefined/55267839*/
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});
const mongoConnectionUrl = process.env.MONGO_CONNECTION_URL;

exports.connectDB = async () => {
    try {
        const connect = await mongoose.connect(mongoConnectionUrl);
        console.log('\x1b[34m', ` Spajanje sa bazom '${connect.connection.name}' je uspjelo!
  Stranicu možete posjetiti klikom na: http://localhost:3000/TalaShop`
        );
    } catch (error) {
        console.error('\x1b[31m', `Spajanje sa bazom nije uspjelo! ${error.message}`);
        process.exit(1);
    }
};
