let userScore = 0;
let compScore = 0;
let msg = document.querySelector(".msg");
let user = document.querySelector("#user-score");
let comp = document.querySelector("#comp-score");
const choices = document.querySelectorAll(".choice");
let champ;
let score_t=0;

const drawGame = ()=>
{
    msg.innerText = "Game was draw. Play again!";
    msg.style.backgroundColor = "#081b31";
}
const showWinner = (userWin,userChoice,compChoice) =>
{
    if(userWin)
    {
        msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        userScore++;
        user.innerText = userScore;
        champ = "User";
        score_t = userScore;
    }
    else
    {
        msg.innerText = `You Lose! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
        compScore++;
        comp.innerText = compScore;
        champ = "Comp";
        score_t = compScore;
    }
}
const autoGenerate = ()=>
{
    const options = ["rock","paper","scissors"];
    const ranIndex = Math.floor(Math.random()*3);
    return options[ranIndex];
}
const playGame = (userChoice)=>
{
    // Auto generate
    const compChoice = autoGenerate();
    if (userChoice === compChoice)
    {
        drawGame();
    }
    else
    {
        // rock --- > scissors --- > paper ---> rock
        userWin = true;
        if (userChoice === "rock")
        {
            userWin = compChoice === "paper" ? false : true ;
        }
        else if (userChoice === "paper")
        {
            userWin = compChoice === "rock"? true : false;
        }
        else
        {
            userWin = compChoice === "paper" ? true : false;
        }
        showWinner(userWin,userChoice,compChoice);
    }
}
choices.forEach((choice)=>
{
    choice.addEventListener('click',()=>
    {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

const enableBtns = ()=>
{
    for (let choice of choices)
    {
        choice.disabled = false;
    }
}
const disableBtns = ()=>
{
    for (let choice of choices)
    {
        choice.classList.add("disable");
    }
}


// Reset and End Game
let resetGame = document.querySelector(".reset");
let endGame = document.querySelector(".end");

resetGame.addEventListener('click',()=>
{
    userScore = 0;
    compScore = 0;
    user.innerText = userScore;
    comp.innerText = compScore;
    msg.innerText = "Play Again!";
    msg.style.backgroundColor = "#081b31";
});

endGame.addEventListener('click',()=>
{
    let response = prompt("Are are sure? Y or N:");
    if (response === "Y")
    {
        let result = document.querySelector(".result");
        result.innerText = `Congratulations! ${champ} is the Winner of Game! Score is ${score_t}`;
        result.classList.remove("hide");
        result.style.backgroundColor = "#081b31";
        result.style.color = "white";
    }
    else
    {
        result.classList.add("hide");
    }
});