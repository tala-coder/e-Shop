for (let index = 0; index < 10; index++) {
    let poruka = "ovo je broj " + index;
    console.log(poruka);
}

console.log("--------------------------------------------------------")

const student = {
    indeks : '117/IT-19',
    ime : 'Muhammed',
    prezime : 'Talic',
    ocjene : [
        { predmet : ' Programiranje I', ocjena: 9},
        { predmet : 'Baze podataka', ocjena: 8 }
    ]
}

const kljuceviObjekta = Object.getOwnPropertyNames(student);
console.log(kljuceviObjekta);

for(let kljuc of kljuceviObjekta){
    let podatak = student[kljuc];
    console.log('naziv kljuca je ', kljuc , ' i pod tim kljucem je ', podatak);
}


const JSON_zapisi_studenata = JSON.stringify(student);
console.log(JSON_zapisi_studenata)

console.log("------------------------  PROMISSE  --------------------------------")

const obecanje = new Promise((resolve, reject) => {
    setTimeout(() => {
        let broj = (Math.random() *5).toFixed(0);
        if (broj <= 3){
            reject("Dobijen je nedozvoljen broj!")
        }
        resolve(broj);
    }, 1500)
});

obecanje
    .then(b => console.log(b))
    .catch(greska => console.log("doslo je do greske: ", greska));

obecanje.then(broj => console.log("Ovaj broj uvecan za jedan je:", Number(broj) + 1))

console.log("-----------------------              ------------------------------")



