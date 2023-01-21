function clickHandler(evt) {
    console.log(evt)
    clickCounter++
    let str = "Thanks for clicking: " + clickCounter
    this.innerText = str
}

function bodyClick(evt) {
    console.log("Clicked at: " + evt.pageX + ", " + evt.pageY)
}

function pageLoaded(evt) {
    console.log("")
}

function keyUp(evt) {
    console.log("Key pressed: " + evt.key)
}

function setup() {
    createCanvas(300, 300)
    background("#a9a9a9#")
}


let clickCounter = 0
let p = document.getElementById("pElement")

p.addEventListener("click", clickHandler)
window.onclick = bodyClick
window.onload = pageLoaded
window.onkeyup = keyUp