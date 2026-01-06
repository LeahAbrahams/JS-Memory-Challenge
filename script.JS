document.getElementById('timeSpent').innerText = localStorage.getItem('timeSpentInSeconds');

function back() {
    document.getElementById("backToGameButton").addEventListener("click", function () {
        window.location = "../Game/Game.html";
    });
}

window.onload = back;