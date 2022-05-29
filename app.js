const button = document.querySelector('.container button');
const jokeText = document.querySelector('.container p');
// let saveJokeButton = document.getElementById('save-joke-button');
document.addEventListener('DOMContentLoaded', getJoke);

button.addEventListener('click', getJoke);

let saveJokeButton = document.getElementById('save-joke-button');
// document.getElementById("save-joke-button").disabled = true;
saveJokeButton.disabled = true;
saveJokeButton.addEventListener("click", saveJoke);

async function getJoke(){
    const jokeData = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    } );
    // console.log(jokeData);
    const jokeObj = await jokeData.json();
    // console.log(jokeObj.joke);
    jokeText.innerHTML = jokeObj.joke;
    document.getElementById("save-joke-button").disabled = false;
} 

async function saveJoke(){
    const jokeData = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    } );
    const jokeObj = await jokeData.json();
    console.log(jokeObj.joke);
    jokeText.innerHTML = jokeObj.joke;

    // let dadJokeDiv = document.getElementsByClassName('.container p'); 
    // let dadJokeContainerP = dadJokeDiv.lastElementChild;
    // // let jokeData = dadJokeContainerP.joke;
    // console.log(dadJokeContainerP);

let reqBody = {
    jokes: jokeObj,
};

    let reqOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(reqBody)
    };

    fetch("http://localhost:3000/awesomeJokes", reqOptions)
        .then((resp) => resp.json())
        .then((data) => updateSavedJokesCounter(data.id));
} 

function updateSavedJokesCounter(id) {
    let jokeDataCountHolder = document.getElementById("interesting-joke-counter");

    jokeDataCountHolder.innerHTML = id;
}

