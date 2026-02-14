let startTime;
let timeout;
let waiting = false;

const message = document.getElementById("message");
const startBtn = document.getElementById("startBtn");
const bestScoreText = document.getElementById("bestScore");

let bestScore = localStorage.getItem("bestScore");

if (bestScore) {
    bestScoreText.textContent = "Best: " + bestScore + " ms";
}

startBtn.addEventListener("click", function() {

    message.textContent = "Wait for green...";
    document.body.style.backgroundColor = "red";
    startBtn.style.display = "none";

    waiting = true;

    let randomTime = Math.random() * 3000 + 2000;

    timeout = setTimeout(function() {
        document.body.style.backgroundColor = "green";
        message.textContent = "CLICK!";
        startTime = Date.now();
        waiting = false;
    }, randomTime);
});

document.getElementById("gameArea").addEventListener("click", function(event) {

    if (event.target.id === "startBtn") return;

    if (!waiting && document.body.style.backgroundColor === "green") {

        let reactionTime = Date.now() - startTime;

        message.textContent = "Your time: " + reactionTime + " ms";
        document.body.style.backgroundColor = "lightgray";
        startBtn.style.display = "inline-block";

        if (!bestScore || reactionTime < bestScore) {
            bestScore = reactionTime;
            localStorage.setItem("bestScore", bestScore);
            bestScoreText.textContent = "Best: " + bestScore + " ms";
        }

    } else if (waiting) {

        clearTimeout(timeout);
        message.textContent = "Too Early!";
        document.body.style.backgroundColor = "lightgray";
        startBtn.style.display = "inline-block";
        waiting = false;
    }

});
