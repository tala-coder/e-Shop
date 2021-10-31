const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'aplikacija',
    password: 'aplikacija',
    database:'aplikacija'
});

connection.query(
    'SELECT * FROM category WHERE parent__category_id = ?;',
    [1],
    prikaziKategorije
);

function prikaziKategorije(error, rows, fields){ // rows redovi koje citamo, mogli smo staviti i categories npr.|| fields -kolone
    if(error){
        console.log('Doslo je do greske', error);
        return;
    }

    for (category of rows) {
        console.log('Ucitana kategorija je', category.name);
    }

}
