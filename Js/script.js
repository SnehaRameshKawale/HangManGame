const keyborddiv = document.querySelector(".buttons");
const wordsdisplay = document.querySelector(".unorderdList");
let currentword, wrongguesses = 0, correctword;
const maxguesses = 6;
let countme = 0, getlengthword;
const displayword = document.querySelector(".unorderdList li");
var image = document.querySelector(".imageContainer img");
//created array for words and hints
const wordList = [
    {
        word: "icebox",
        hint: "An isolation cell in a prison."
    },
    {
        word: "umbrella",
        hint: " protects us from the hot rays of the sun and from rain."
    },
    {
        word: "oxygen",
        hint: "Human can not live without."
    },
    {
        word: "subway",
        hint: "A tunnel under a railway that is for people who are walking."
    },
    {
        word: "jovial",
        hint: "Full of happiness and joy."
    },
    {
        word: "zombie",
        hint: "A person who seems only partly alive."
    },
    {
        word: "quizzes",
        hint: "Competition in which you have to answer questions."
    },
    {
        word: "kayak",
        hint: "A small, narrow human-powered watercraf."
    }
];

//working on hints and words
const getWords = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word, hint);
    currentword = word;
    getlengthword = word.length;
    correctword = word;// storing word into currentword  
    //displaying hints 
    document.querySelector(".hint b").innerHTML = hint;
    //display the numbers of line quals to words
    wordsdisplay.innerHTML = word.split("").map(() => `<li class="letters"></li>`).join("");
}

const initGame = (button, ClickedLetter) => {
    //Getting the clicked letter 
    console.log(button, ClickedLetter);
    //check if the currentword contain cliked character or not
    if (currentword.includes(ClickedLetter)) {
        button.disabled = true;
        //console.log(ClickedLetter,"exist in word");
        [...currentword].forEach((letter, index) => {
            if (letter === ClickedLetter) {
                wordsdisplay.querySelectorAll("li")[index].innerText = letter;
                wordsdisplay.querySelectorAll("li")[index].classList.add("guessed");
                countme = countme + 1;
                if (getlengthword == countme) {
                    document.querySelector(".gamewin").style.visibility = "visible";
                }
            }
        });
    } else {
        console.log(ClickedLetter, "not exist in word");
        //showing the incorrect guesses
        if (wrongguesses == 6) {
            //display the game over message 
            document.querySelector(".gamefail").style.visibility = "visible";
            document.querySelector(".gamefail p b").innerHTML = correctword;
        } else {
            wrongguesses = wrongguesses + 1;
            document.querySelector(".incorrectgusses b").innerHTML = wrongguesses + "/" + maxguesses;
            //displaying the images according to incorrect gusses
            if (wrongguesses == 1) {
                image.src = "./images/hanggame1.png";
            } else if (wrongguesses == 2) {
                image.src = "./images/hanggame2.png";
            } else if (wrongguesses == 3) {
                image.src = "./images/hanggame3.png";
            } else if (wrongguesses == 4) {
                image.src = "./images/hanggame4.png";
            } else if (wrongguesses == 5) {
                image.src = "./images/hanggame5.png";
            } else if (wrongguesses == 6) {
                image.src = "./images/hanggame6.png";
            } else {
                image.src = "./images/hanggame.png"
            }
        }
    }
}
//creating keybord buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    //printing each char 
    button.innerText = String.fromCharCode(i);
    keyborddiv.appendChild(button);
    //making keybord working
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}
//hidding the game over message after ckiling button
document.querySelector(".gamefail button").addEventListener("click", hiddenfun);
function hiddenfun() {
    document.querySelector(".gamefail").style.visibility = "hidden";
    location.reload();
}
document.querySelector(".gamewin button").addEventListener("click", hiddenhappyfun);
function hiddenhappyfun() {
    document.querySelector(".gamewin").style.visibility = "hidden";
    location.reload();
}
getWords();