
window.onload = function () {
    /* 1. feladat JS
    let külső = document.getElementById("main");
    for (var s = 0; s < 10; s++) {
        let belső = document.createElement("div");
        külső.appendChild(belső);
        belső.innerText = (`${s + 1}`)
        belső.style.background = `rgb(${255 - 21 * s}, ${255 - 21 * s}, ${255 - 21 * s})`;
        belső.classList.add("elem");
    }*/

    var faktoriális = function (n) {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * faktoriális(n - 1);
        }
    }

    let szám = document.getElementById("pascal");
    for (var s = 0; s < 10; s++) {
        let sor = document.createElement("div");
        szám.classList.add("sor");
        szám.appendChild(sor);

        for (var o = 0; o <= s; o++) {
            let elem = document.createElement("div");
            elem.classList.add("elem");
            sor.appendChild(elem);
            elem.innerText = faktoriális(s) / (faktoriális(o) * faktoriális(s-o));
        }
    }
}
