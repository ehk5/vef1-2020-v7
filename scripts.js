/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;

/**
 * Byrja forrit.
 */
function start() {
  var adferd = prompt ('Hvort viltu kóða eða afkóða streng? Skrifaðu „kóða“ eða „afkóða“');
  if (adferd === 'kóða') {
    var hlidrun = prompt ('Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, 31]');
    if (hlidrun <= 31 && hlidrun >= 1) {
      var strengur = prompt ('Gefðu upp strenginn sem á að ' + adferd +  ' með hliðrun ' + hlidrun + ':');
      if (strengur.length > 0) {
        if (!valid(strengur, LETTERS)){
          alert('Þú gafst upp stafi sem ekki er hægt að ' + adferd + ' Reyndu aftur.');
          start();
        }
        alert(encode(strengur, hlidrun));
        return;
        
      } else {
        alert ('Þú gafst ekki upp streng. Reyndu aftur.');
        start();
      }
    } else {
      alert (hlidrun + ' er ekki heiltala á bilinu [1, 31]. Reyndu aftur.');
      start();
    }
  } else if (adferd === 'afkóða') {
    var hlidrun = prompt ('Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, 31]');
    if (hlidrun <= 31 && hlidrun >= 1) {
      var strengur = prompt ('Gefðu upp strenginn sem á að ' + adferd +  ' með hliðrun ' + hlidrun + ':');
      if (strengur.length > 0) {
        if (!valid(strengur, LETTERS)){
          alert('Þú gafst upp stafi sem ekki er hægt að ' + adferd + 'Reyndu aftur.');
          start();
        }
        alert(decode(strengur, hlidrun));
        return;
        
      } else {
        alert ('Þú gafst ekki upp streng. Reyndu aftur.');
        start();
      }
    } else {
      alert (hlidrun + ' er ekki heiltala á bilinu [1, 31]. Reyndu aftur.');
      start();
    }
  } else {
    alert ('Veit ekki hvaða aðgerð „' + adferd + '“ er. Reyndu aftur.');
    start();
  }
}

// Hér er gott að commenta út til að vinna í encode/decode föllum fyrst og síðan „viðmóti“ forrits
start();

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n) {
  let retval = "";
  for (let i = 0; i < str.length; i++) {
  retval = retval + LETTERS[((LETTERS.toLocaleLowerCase()).indexOf(str[i].toLocaleLowerCase())+n)%LETTERS.length]
  }
  return retval;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  let retval = "";
  for (let i = 0; i < str.length; i++) {
    retval = retval + LETTERS[(((LETTERS.toLocaleLowerCase()).indexOf(str[i].toLocaleLowerCase())-n)+LETTERS.length)%LETTERS.length]
  }
  return retval;
}

/**
 * Skoðar hvort stafirnir í strengum séu í stafrófinu.
 *
 * @param {string} str Strengur sem skal skoða
 * @param {string} alphabet stafróf sem á að bera saman við
 * @returns {boolean} satt ef það passar annars ósatt
 */
function valid(str, alphabet) {
  for (let i = 0; i < str.length; i++) {
    if (alphabet.toLocaleLowerCase().indexOf(str[i].toLocaleLowerCase()) === -1) {
      return false;
    } 
  }
      return true;
}

console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');
