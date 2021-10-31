const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'aplikacija',
    password: 'aplikacija',
    database:'aplikacija'
});

connection.promise().query('SELECT * FROM category WHERE parent__category_id = ?;', [1])
.then(prikaziKategorije)
.catch(error => {
    console.log('Doslo je do greske ', error);
})

function prikaziKategorije([rows, fields] ){ // rows redovi koje citamo, mogli smo staviti i categories npr.|| fields -kolone
    for (let category of rows) {
        console.log('Ucitana kategorija je: ', category.name);
    }
}
