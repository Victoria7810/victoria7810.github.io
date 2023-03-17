'use strict';

// console.log (document.querySelector(`.message`).textContent);
// document.querySelector(`.message`).textContent = `🎉 Correct Number!`;

// document.querySelector(`.number`).textContent = 13;
// document.querySelector(`.score`).textContent = 10;

// document.querySelector(`.guess`).value = 23;
// console.log(document.querySelector(`.guess`).value);

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
    document.querySelector(`.message`).textContent = message;
}

const displayNumber = function (numbers) {
    document.querySelector(`.number`).textContent = numbers;
}

const displayScore = function (scores) {
    document.querySelector(`.score`).textContent = scores;
}

const bodyStyle = function (bodyStyles) {
    document.querySelector(`body`).style.backgroundColor = bodyStyles;
}

const widthStyle = function (styleWidth) {
    document.querySelector(`.number`).style.width = styleWidth;

}

const guessValue = function (guessValue) {
    document.querySelector(`.guess`).value = guessValue;   
}

document.querySelector(`.check`).addEventListener(`click`, function () {
    const guess = Number(document.querySelector(`.guess`).value);
    console.log(guess, typeof guess);
    // when there is no input
    if (!guess) {
        displayMessage(`⛔ No number!`);

        // when player wins
    } else if (guess === secretNumber) {
        displayMessage(`🎉 Correct Number!`);
        displayNumber(secretNumber);
        bodyStyle(`#60b347`);
        widthStyle(`30rem`);
        if (score > highscore) {
            highscore = score;
            document.querySelector(`.highscore`).textContent = highscore;
        }

        // when guess is wrong
    } else if (guess !== secretNumber) {
        if (score > 1) {
            displayMessage(guess > secretNumber ? `📈 Too high!` : `📉 Too low!`);
            score--;
            displayScore(score);
        }
        else {
            displayMessage(`💥 You lost the game!`);
            displayScore(0);
        }
    }
});

// again bnt
document.querySelector(`.again`).addEventListener(`click`, function () {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    displayScore(score);
    displayMessage(`Start guessing...`);
    bodyStyle(`#222`);
    widthStyle(`15rem`);
    displayNumber(`?`);
    guessValue(``);
});
    // when too high
    // else if (guess > secretNumber) {
    //     if (score > 1) {
    //         document.querySelector(`.message`).textContent = `📈 Too high!`;
    //         score--;
    //         document.querySelector(`.score`).textContent = score;

    //     }
    //     else {
    //         document.querySelector(`.message`).textContent = `💥 You lost the game!`;
    //         document.querySelector(`.score`).textContent = 0;
    //     }
    //     // when too low
    // } else if (guess < secretNumber) {
    //     if (score > 1) {
    //         document.querySelector(`.message`).textContent = `📉 Too low!`;
    //         score--;
    //         document.querySelector(`.score`).textContent = score;
    //     }
    //     else {
    //         document.querySelector(`.message`).textContent = `💥 You lost the game!`;
    //         document.querySelector(`.score`).textContent = 0;
    //     };
    // }
