
var helyes;
var aktuálisKérdés = 1;

window.onload = function () {
    kérdésBetöltés(aktuálisKérdés);
}

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data));
}

function kérdésMegjelenítés(kérdés) {
    console.log(kérdés);
    document.getElementById("kérdésszöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3

    if (kérdés.image == null) {
        document.getElementById("kép1").style.display="none";
    } else {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    }

    helyes = kérdés.correctAnswer;
}

function előzőKérdés() {
    if (aktuálisKérdés == 1) {
        aktuálisKérdés = 859;
        kérdésBetöltés(aktuálisKérdés)
    } else {
        aktuálisKérdés = aktuálisKérdés - 1;
        kérdésBetöltés(aktuálisKérdés);
    }
    visszaszínez();
}

function következőKérdés() {
    if (aktuálisKérdés == 859) {
        aktuálisKérdés = 1;
        kérdésBetöltés(aktuálisKérdés)
    } else {
        aktuálisKérdés++;
        kérdésBetöltés(aktuálisKérdés);
    }
    visszaszínez();
}

function elsőJó() {
    if (helyes == 1) {
        document.getElementById("válasz1").style.background = 'green';
        document.getElementById("válasz1").style.color = 'white';
    }
    else {
        document.getElementById("válasz1").style.background = 'red';
        document.getElementById("válasz1").style.color = 'white';
    }

}
function másodikJó() {
    if (helyes == 2) {
        document.getElementById("válasz2").style.background = 'green';
        document.getElementById("válasz2").style.color = 'white';
    }
    else {
        document.getElementById("válasz2").style.background = 'red';
        document.getElementById("válasz2").style.color = 'white';
    }

}
function harmadikJó() {
    if (helyes == 3) {
        document.getElementById("válasz3").style.background = 'green';
        document.getElementById("válasz3").style.color = 'white';
    }
    else {
        document.getElementById("válasz3").style.background = 'red';
        document.getElementById("válasz3").style.color = 'white';
    }
}

function visszaszínez() {
    document.getElementById("válasz1").style.background = 'white';
    document.getElementById("válasz2").style.background = 'white';
    document.getElementById("válasz3").style.background = 'white';
    document.getElementById("válasz1").style.color = 'black';
    document.getElementById("válasz2").style.color = 'black';
    document.getElementById("válasz3").style.color = 'black';
}


/*function jóVálasz() {
    if (helyes == 1) {
        document.getElementById("válasz1").style.color = 'green'
    }
}*/

/*function letöltés() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data));
}

function letöltésBefejeződött(d) {
    kérdések = d
    kérdésMegjelenítés(k);
}

function kérdésMegjelenítés(kérdés) {
    document.getElementById("kérdésszöveg").innerText = kérdések[kérdés].questionText
    document.getElementById("válasz1").innerText = kérdések[kérdés].answer1
    document.getElementById("válasz2").innerText = kérdések[kérdés].answer2
    document.getElementById("válasz3").innerText = kérdések[kérdés].answer3
    document.getElementById("kép1").src = kérdések[kérdés].image;
    helyes = kérdések[kérdés].correctAnswer;
    document.getElementById("válasz1").style.color = black;
    document.getElementById("válasz2").style.color = black;
    document.getElementById("válasz3").style.color = black;
}*/


