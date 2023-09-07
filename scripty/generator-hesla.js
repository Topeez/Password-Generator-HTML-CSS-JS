const vysledek = document.getElementById("vysledek");
const kopirovat = document.getElementById("kopirovat");
const delka = document.getElementById("delka");
const velkaPismena = document.getElementById("upper");
const cisla = document.getElementById("num");
const symboly = document.getElementById("sym");
const genButton = document.getElementById("generovat");
const form = document.getElementById("generator-hesla-form");

const VELKEPISMENA_CODE = arrayFromLowToHigh(65, 90);
const MALAPISMENA_CODE = arrayFromLowToHigh(97, 122);
const CISLA_CODE = arrayFromLowToHigh(48, 57);
const SYMBOLY_CODE = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

  function arrayFromLowToHigh(low, high) {
    const pole = [];

    for(let i = low; i <= high; i++){
      pole.push(i);
    }
    return pole;
  }

let generujHeslo = (
  pocetZnaku, 
  zahrnoutVelkaPismena, 
  zahrnoutCisla, 
  zahrnoutSymboly
  ) => {
  let charCodes = MALAPISMENA_CODE;

    if(zahrnoutVelkaPismena) charCodes = charCodes.concat(VELKEPISMENA_CODE);
    if(zahrnoutSymboly) charCodes = charCodes.concat(SYMBOLY_CODE);
    if(zahrnoutCisla) charCodes = charCodes.concat(CISLA_CODE);
    
    const znakyHesla = [];
    
    for(let i = 0; i < pocetZnaku; i++) {
      const znakyCode = 
        charCodes[Math.floor(Math.random() * charCodes.length)];
      znakyHesla.push(String.fromCharCode(znakyCode));
    }

  return znakyHesla.join("");
};

kopirovat.addEventListener("click", async () => {
  const hesloNaZkopirovani = vysledek.innerText;

  if (!hesloNaZkopirovani) return;

  try {
    await navigator.clipboard.writeText(hesloNaZkopirovani);
    alert("Heslo bylo zkopírováno do schránky");
  } catch (err) {
    console.error("Chyba při kopírování hesla:", err);
  }
});


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const pocetZnaku = delka.value;
  const zahrnoutVelkaPismena = velkaPismena.checked;
  const zahrnoutCisla = cisla.checked;
  const zahrnoutSymboly = symboly.checked;
  const heslo = generujHeslo(
    pocetZnaku, 
    zahrnoutVelkaPismena, 
    zahrnoutCisla, 
    zahrnoutSymboly
    );
  vysledek.innerText = heslo;
  console.log(heslo);
});