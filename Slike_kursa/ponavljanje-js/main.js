function init(){
    prikaziCuvanjePodatakaPopup();
}

window.addEventListener('load', init);
function prikaziCuvanjePodatakaPopup(){
    let d = document.getElementById('cuvanjePodataka');
    d.classList.remove('hidden');
}