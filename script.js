// Pamatuje ktere tlacitko ma text skryt a ktere ukazat (0 = ukazat, 1 = schovat)
var dalsi = [];
// Indexy clanku po seradeni (na zacatku serazene podle data)
var clanek = [];

for (var i = 0; i < clanky.length; i++) {
    dalsi.push(0);
}

function novyClanek(i) {
    var output = "<div id='div" + i + "'><h1>";
    output += clanky[i].den + '. ' + clanky[i].mesic + '. ' + clanky[i].nadpis;
    output += "</h1><p>";
    output += clanky[i].text;
    //dalsi text
    output += "</p><p class='hidden'>";
    output += clanky[i].text;
    //
    output += '</p><button onclick="dale(' + i + ')">Číst dále...</button></div>';
    return output;
}

function nastavPocet() {
    for (var i = 0; i < clanky.length; i++) {
        document.getElementById('pocet').innerHTML += '<option value=' + (i + 1) + '>' + (i + 1) + '</option>';
    }
}
nastavPocet();

function razeniNazev() {
    var pole = [];
    var pom = 0;
    for (var i = 0; i < clanky.length; i++) {
        pole.push(i);
    }
    for (var i = 0; i < clanky.length; i++) {
        for (var j = 0; j < clanky.length - 1; j++) {
            if (clanky[pole[j]].nadpis.charCodeAt(0) > clanky[pole[j + 1]].nadpis.charCodeAt(0)) {
                pom = pole[j];
                pole[j] = pole[j + 1];
                pole[j + 1] = pom;
            }
        }
    }
    return pole;
}

function razeniDatum() {
    var pole = [];
    var pom = 0;
    for (var i = 0; i < clanky.length; i++) {
        pole.push(i);
    }
    for (var i = 0; i < clanky.length; i++) {
        for (var j = 0; j < clanky.length - 1; j++) {
            if (clanky[pole[j]].mesic + clanky[pole[j]].den * 0.01 > clanky[pole[j + 1]].mesic + clanky[pole[j + 1]].den * 0.01) {
                pom = pole[j];
                pole[j] = pole[j + 1];
                pole[j + 1] = pom;
            }
        }
    }
    return pole;
}
clanek = razeniDatum();
document.getElementById('pocet').value = clanky.length;

function vypisClanky() {
    document.getElementById("body").innerHTML = "";
    if (document.getElementById('razeni').value == 'vzestupne') {
        for (var i = 0; i < document.getElementById('pocet').value; i++) {
            document.getElementById("body").innerHTML += novyClanek(clanek[i]);
        }
    }
    else {
        for (var i = clanky.length - 1; i >= clanky.length - document.getElementById('pocet').value; i--) {
            document.getElementById("body").innerHTML += novyClanek(clanek[i]);
        }
    }
}
vypisClanky();

// Tlacitko cist dale
function dale(i) {
    var id = 'div' + i;
    if (dalsi[i] == 1) {
        document.getElementById(id).childNodes[2].style.display = 'none';
        dalsi[i]--;
    }
    else {
        document.getElementById(id).childNodes[2].style.display = 'block';
        dalsi[i]++;
    }
}
//

document.getElementById('vyber').addEventListener('click', function () {
    document.getElementById('podle').value == 'datum' ? clanek = razeniDatum() : clanek = razeniNazev();
    vypisClanky();
})
