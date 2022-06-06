const button = document.querySelector('.container button');
const jokeText = document.querySelector('.container p');
// let saveJokeButton = document.getElementById('save-joke-button');
document.addEventListener('DOMContentLoaded', getJoke);

button.addEventListener('click', getJoke);

let saveJokeButton = document.getElementById('save-joke-button');
// document.getElementById("save-joke-button").disabled = true;
// saveJokeButton.disabled = true;
saveJokeButton.addEventListener("click", saveJoke);

function getJoke() {
    fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => jokeText.innerHTML = data.joke);
    // console.log(jokeData);
    // const jokeObj = await jokeData.json();
    // console.log(jokeObj.joke);

    // document.getElementById("save-joke-button").disabled = false;
}

function saveJoke() {
    let jokeToSave = jokeText.innerHTML;

    let reqBody = {
        joke: jokeToSave,
    };

    let reqOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(reqBody)
    };

    fetch("http://localhost:3000/jokes", reqOptions)
        .then((resp) => resp.json())
        .then((data) => updateSavedJokesCounter(data.id));
}

function updateSavedJokesCounter(id) {
    let jokeDataCountHolder = document.getElementById("interesting-joke-counter");

    jokeDataCountHolder.innerHTML = id;
}

