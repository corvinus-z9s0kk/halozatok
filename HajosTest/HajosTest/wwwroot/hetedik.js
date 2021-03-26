var kérdések;
var k = 0;
var helyes;

window.onload = function () {
    letöltés();
}

function letöltés() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data));
}

function letöltésBefejeződött(d) {
    kérdések = d
    kérdésMegjelenítés(k);
}

function kérdésMegjelenítés(kérdés) {
    let kerdesszoveg = document.getElementById("kérdésszöveg")
    kerdesszoveg.innerText = kérdések[kérdés].questionText
    let valasz1 = document.getElementById("válasz1")
    valasz1.innerText = kérdések[kérdés].answer1
    let valasz2 = document.getElementById("válasz2")
    valasz2.innerText = kérdések[kérdés].answer2
    let valasz3 = document.getElementById("válasz3")
    valasz3.innerText = kérdések[kérdés].answer3
    let kep = document.getElementById("kép1");
    kep.src = kérdések[kérdés].image;
    console.log(kep);
    document.getElementById("kép1").src = kérdések[kérdés].image
    helyes = kérdések[kérdés].correctAnswer
    console.log(helyes);
    document.getElementById("válasz1").style.color = 'black'
    document.getElementById("válasz2").style.color = 'black'
    document.getElementById("válasz3").style.color = 'black';
}
function előzőKérdés() {
    if (k == 0) {
        k = 1;
        kérdésMegjelenítés(k);
        return;
    }
    if (k == 1) {
        k = 2;
        kérdésMegjelenítés(k);
        return;
    }
    if (k == 2) {
        k = 0;
        kérdésMegjelenítés(k);
        return;
    }
}

function következőKérdés() {
    if (k == 0) {
        k = 2;
        kérdésMegjelenítés(k);
        return;
    }
    if (k == 1) {
        k = 0;
        kérdésMegjelenítés(k);
        return;
    }
    if (k == 2) {
        k = 1;
        kérdésMegjelenítés(k);
        return;
    }
}

function elsőJó() {
    if (helyes == 1) {
        document.getElementById("válasz1").style.color = 'green';
    }
    else {
        document.getElementById("válasz1").style.color = 'red';
    }

}
function másodikJó() {
    if (helyes == 2) {
        document.getElementById("válasz2").style.color = 'green';
    }
    else {
        document.getElementById("válasz2").style.color = 'red';
    }

}
function harmadikJó() {
    if (helyes == 3) {
        document.getElementById("válasz3").style.color = 'green';
    }
    else {
        document.getElementById("válasz3").style.color = 'red';
    }
}
