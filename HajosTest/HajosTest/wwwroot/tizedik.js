var hotList = [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;
var timerHandler;

document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < questionsInHotList; i++) {
        hotList[i] = {
            question: {},
            goofAnswres: 0,
        }
    }

    fetch("questions/count")
        .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })

    document.getElementById("következő").addEventListener("click", előre);
    document.getElementById("előző").addEventListener("click", hátra);

    if (localStorage.getItem("hotlist")) {
        hotList = JSON.parse(localStorage.getItem("hotlist"));
    }

    if (localStorage.getItem("nextQuestion")) {
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"));
    }

    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"));
    }

    if (hotList.length === 0) {
        for (let i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }
    } else {
        kérdésMegjelenítés();
    }
});

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(result => {
            if (!result.ok) {
                console.error(`Hibás letöltés: ${result.status}`)
                return null
            }
            else {
                return result.json();
            }
        })
        .then(q => {
            hotList[destination].question = q;
            hotList[destination].goofAnswres = 0;
            console.log(`A ${questionNumber}. kérdés letöltésre került a hotlist ${destination}. helyére.`);
            if (displayedQuestion === undefined && destination === 0) {
                displayedQuestion = 0;
                kérdésMegjelenítés();
            }
        })
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    document.getElementById("kérdésszöveg").innerText = kérdés.questionText;
    document.getElementById("válasz1").innerText = kérdés.answer1;
    document.getElementById("válasz2").innerText = kérdés.answer2;
    document.getElementById("válasz3").innerText = kérdés.answer3;
    if (kérdés.image) {
        document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        document.getElementById("kép").style.display = "block";
    } else {
        document.getElementById("kép").style.display = "none";
    }

    for (var i = 1; i <= 3; i++) document.getElementById("válasz" + i).classList.remove("jó", "rossz");
    document.getElementById("válaszok").style.pointerEvents = "auto";
}

function előre() {
    clearTimeout(timerHandler);
    displayedQuestion++;
    if (displayedQuestion === questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés();
}

function hátra() {
    displayedQuestion--;
    if (displayedQuestion < 0) displayedQuestion = questionsInHotList - 1;
    kérdésMegjelenítés();
}

function választás(n) {
    let kérdés = hotList[displayedQuestion].question;
    if (n === kérdés.correctAnswer) {
        document.getElementById("válasz" + n).classList.add("jó");
        hotList[displayedQuestion].goofAnswres++;
        if (hotList[displayedQuestion].goofAnswres===3) {
            kérdésBetöltés(nextQuestion, displayedQuestion)
            nextQuestion++;
        }

    } else {
        document.getElementById("válasz" + n).classList.add("rossz");
        document.getElementById("válasz" + kérdés.correctAnswer).classList.add("jó");
    }
    document.getElementById("válaszok").style.pointerEvents = "none";
    timerHandler = setTimeout(előre, 3000);

    localStorage.setItem("hotlist", JSON.stringify(hotList));
    localStorage.setItem("nextQuestion", nextQuestion);
    localStorage.setItem("displayedQuestion", displayedQuestion);
}