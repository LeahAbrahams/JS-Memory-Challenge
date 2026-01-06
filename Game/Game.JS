const cards = document.querySelectorAll('.card');
const amountOfCards = cards.length;
let flippedCards = [];
let startTime;
// ID על ידי cardsמילוי המערך ב
let byID = [];
for (let k = 0; k < cards.length; k++) {
    byID.push(k.toString());
}
let count = 0;
const successSound = new Audio("../pm/puin_high.mp3");
const sets = document.getElementById("sets");
const successMessage = document.getElementById("successMessage");

const src = [
    "../img/new4.jpg",
    "../img/new4.jpg",
    "../img/new2.jpg",
    "../img/new2.jpg",
    "../img/new1.gif",
    "../img/new1.gif",
    "../img/2222.jpg",
    "../img/2222.jpg",
    "../img/mini mous5.gif",
    "../img/mini mous5.gif",
    "../img/mini mous3.jpg",
    "../img/mini mous3.jpg",
    "../img/1.gif",
    "../img/1.gif",
    "../img/mini mous6.jpg",
    "../img/mini mous6.jpg",
    "../img/4444.jpg",
    "../img/4444.jpg",
    "../img/mini mous4.png",
    "../img/mini mous4.png",
    "../img/niki 4.jpg",
    "../img/niki 4.jpg",
    "../img/3.jpg",
    "../img/3.jpg",
    "../img/1.gif",
    "../img/1.gif",
    "../img/2.png",
    "../img/2.png",
];

function load() {
    setInterval(byTime, 1000);
    startGame();
}

// הפיכת הכרטיסים, לולאה שזמינה בכל לחיצה על המסך
cards.forEach(card => {
    card.addEventListener('click', () => {
        if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length == 2) {
                setTimeout(() => {

                    if (matchingCards(flippedCards)) {
                        flippedCards[0].style.visibility = 'hidden';
                        flippedCards[1].style.visibility = 'hidden';
                    }

                    flippedCards.forEach(flippedCard => {
                        flippedCard.classList.remove('flipped');
                    });
                    flippedCards = [];

                }, 1000);
            }
        }
    });
});

function matchingCards(flippedCards) {
    if (flippedCards[0].querySelector('img').src == flippedCards[1].querySelector('img').src) {
        success();

        count++;
        updateSets();

        successMessage.style.display = "block";

        setTimeout(() => {
            successMessage.style.display = "none";
        }, 1000);

        if (cards.length / 2 == count) {
            endGame();
            win();
        }
        return true;
    }
    return false;
}

function success() {
    successSound.play();
}

function byTime() {
    const d = new Date();
    const userName = localStorage.getItem('currentKey').split(' ')[0];
    if (d.getHours() >= 6 && d.getHours() < 12) {
        document.getElementById("byTime").innerHTML = `Good morning ${userName}`;
    } else if (d.getHours() >= 12 && d.getHours() < 18) {
        document.getElementById("byTime").innerHTML = `Good afternoon ${userName}`;
    } else if (d.getHours() >= 18 && d.getHours() < 24) {
        document.getElementById("byTime").innerHTML = `Good evening ${userName}`;
    } else {
        document.getElementById("byTime").innerHTML = `Good night ${userName}`;
    }
}

function startGame() {
    document.getElementById("startGameButton").addEventListener("click", function () {
        startTime = Date.now();
        flippedCards = [];
        cards.forEach(card => {
            card.classList.remove('flipped');
            card.style.visibility = 'visible';
            count = 0;
        });
        cardsContainer.style.display = "block";
        mixCards();
        timer();
        updateSets();
        const byTime = document.getElementById('byTime');
        byTime.style.display = 'none';
    });
}

function mixCards() {
    let r;
    let temp;
    for (let i = 0; i < byID.length; i++) {
        r = Math.floor(Math.random() * (byID.length));
        temp = byID[r];
        byID[r] = byID[i];
        byID[i] = temp;
    }
    cards.forEach((card, j) => {
        card.querySelector('img').src = src[byID[j]];
    });
}

let stopTimer;
function timer() {
    clearInterval(stopTimer);
    const timer = document.getElementById("timer");
    let time = 120;
    stopTimer = setInterval(function () {
        if (time < 0) {
            clearInterval(stopTimer);
            endGame();
            loss();
        }
        let minutes = Math.floor((time % 3600) / 60);// החישוב של מספר הדקות מהרשת
        let seconds = time % 60;
        let result = minutes + ":" + (seconds < 10 ? '0' + seconds : seconds);
        timer.innerText = result;
        time--;
    }, 1000);
}

function updateSets() {
    sets.innerText = `Sets Found: ${count}`;
}

function endGame() {
    let endTime = Date.now();
    let timeSpentInSeconds = (endTime - startTime) / 1000;

    let minutes = Math.floor(timeSpentInSeconds / 60);
    let seconds = Math.round(timeSpentInSeconds % 60);
    seconds -= 2; //מעת הלחיצה על הכפתור עד פתיחת הטימר יש 2 שניות

    let result = [];
    if (minutes > 0) {
        result.push(`${minutes} minutes`);
    }
    if (seconds > 0) {
        result.push(`${seconds} seconds`);
    }
    // חיבור בין כל ערכי המערך כך שבין כל חלק של המערך יהיה וגם
    localStorage.setItem('timeSpentInSeconds', `Game time: ${result.join(' and ')}`);
}

function win() {
    window.location = "../Win/win.html";
}

function loss() {
    window.location = "../Loss/loss.html";
}








// עבור העשרה על ידי רנדום תופס קלף ואם מוצאים את הזוג שלו הופכים הכל
// function flipAllCards() {
//     cards.forEach(card => {
//         card.classList.toggle('flipped');
//     });
// }