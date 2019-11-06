'use strict';


const questions = [
    'In which Pier can you find sea lions?',
    'What is the highest tower in San Francisco?',
    'How many hills was San Francisco built on?',
    'What was San Francisco called before it was renamed',
    'What color is the Golden Gate Bridge?',
];

const answers = [
    ['2', 'Pier 20', 'Pier 39', 'Embarcadero', 'Baker Beach'],
    ['1', 'SalesForce Tower', 'Coit Tower', 'The Trans-America Pyramid', '555 California Street Building'],
    ['3', '20', '10', '50', '7'],
    ['2', 'El Pueblo', 'Yerba Buena', 'Tuleburg', 'Todos Santos'],
    ['2', 'Gold', 'International Orange', 'Red', 'Coral Pink'],
];

const descriptions = [
    'There are many interesting attractions at Fisherman\'s Wharf, including sea lions',
    'The SalesForce tower rises 1,070ft and is the 13th tallest building in the US.',
    'There are a total of 50 named hills, most well known are Russian Hill, Nob Hill, and Twin Peaks.',
    'San Francisco was called Yerba Buena, meaning "Good herb" in Spanish before it was renamed in 1846.',
    'This was the color of the primer used to protect the steel for the bridge. Because of how well it looked, it was left.',
];


//changing variables:  
var questionAnsweredLive = 0;
var timesPlayed = -1;
var numberOfQuestion = 1;
var score = 0;
var seconds = 30;
var seconds2 = 5; 
var timer; 
var timer2; 
 


//variables change in response to change of changing variables:
//determines the right answer for each question based on the question being answered:
//right answers always on index 0
var Question = questions[questionAnsweredLive];
var Answers = answers[questionAnsweredLive]; 
var Descriptions = descriptions[questionAnsweredLive];
var indexOfTheAnswer = Number(Answers[0]); 
var rightAnswer = Answers[indexOfTheAnswer];
var indexOfDescription = descriptions[questionAnsweredLive];

const initiation = function (a) {
    if (a.code === 'Space') {
        document.getElementById('initiation').innerHTML = '';
        document.removeEventListener("keyup", initiation);
        return startNewGame();   
    }
};

function startNewGame() {
    console.log("startNewGame");
    $("#timer").text("00:" + seconds);
    $("#questionNumber").text("Question #" + numberOfQuestion); 
    $("#answeredRightOrWrong").text("");
    $("#description").text("");
    $("#pressKey").text("");
    clearTimer(); 
    clearInterval(timer2);
    timesPlayed++; 
    if (timesPlayed < questions.length) { 
        document.removeEventListener("keyup", startNewGame);
        numberOfQuestion++
        $("answersInsert").empty(); 
        renderQA (questions[timesPlayed], answers[timesPlayed] );
        timerRun(); 
        questionAnsweredLive++;
    } else { 
        gameOver(); 
    }
};

function gameOver() { 
    $("#questionInsert").text("game Over");
    $("#questionNumber").text(" "); 
    $("#answerRightOrWrong").text(" ");
    $("#description").text(" "); 
    $("#timer").empty();
    $("#pressKey").text(" ");
    $("#yourScore").text("");
    $("#playAgainBtn").append("<br><button type='button' class='btn btn-info' onclick='playAgain()'>Click to Play Again</button>");
}; 

function playAgain() { 
    window.location.reload(); 
}


//Adds questions and answers: 
function renderQA (question, answer) {
    console.log("renderQA");
    $("#questionInsert").text(question); 
    //loop through answers: 
    for (let index = 1; index < answer.length; index++) {
        $("#answersInsert").append("<span> <button type='button' class='btn btn-info'  id=" + (index) + " class='answerButton'>" + answer[index] + "</button> </span>");
    };
};

//runs timer for question displays: 
function timerRun() { 
    console.log("timerRun");
    clearInterval(timer); 
    timer = setInterval(decrement, 1000); //decreases by second
}; 

//Question Timer: 
function decrement() { 
    console.log("decrement");
    seconds--; 
    $("#timer").text("00:"+ seconds); 
    if (seconds <= 0) { 
        timeOut();
        clearInterval(timer2);
        clearTimer();
        shortTimer(); 
    }
}

//short timer for right/wrong answer: 
function shortTimer() { 
    console.log("shortTimer");
    clearInterval(timer);
    clearTimer(); 
    timer2 = setInterval(decrement2, 1000);
    document.addEventListener("keyup", startNewGame);
    document.removeEventListener("keyup", startNewGame);
    moveToNextPage();  
}

//move to next page:
const moveToNextPage = function() {
    console.log("moveToNextPage");
    document.addEventListener("keyup", startNewGame);
    timerRun();
    clearTimer();
}

//for the page with the descriptions: 
function decrement2() { 
    console.log("decrement2");
    seconds--; 
    $("#timer").text("00:"+ seconds); 
    if (seconds === 0) { 
        timeOut(); 
        clearTimer(); 
        timerRun(); 
    }
}

//clears the timer:
function clearTimer() {
    console.log("clearTimer"); 
    clearInterval(timer); 
    seconds = 30; 
    $("#timer").text("00:" + seconds); 
}

//
function timeOut() { 
    $('#answeredRightOrWrong').text("You ran out of time!");
        $('#description').text(descriptions[timesPlayed]);
        $('#questionInsert').text("");
        $('#answersInsert').text("");
        $('#yourScore').text("Your score: " + score + "/5");
        $("#pressKey").text("(Press any key to continue)");
    clearInterval(timer2);
    shortTimer(); 
    clearTimer();
}

//event listener:
$(document).on("click", ".btn", checkAnswer);
function checkAnswer() {
    console.log("checkAnswer");
    console.log(event.target.id);
    console.log(indexOfTheAnswer);
    console.log(questionAnsweredLive);
    if (event.target.id === answers[timesPlayed][0]) {
        score++;
        $('#answeredRightOrWrong').text("Correct Answer!");
        $('#description').text(descriptions[timesPlayed]);
        $('#questionInsert').text("");
        $('#answersInsert').text("");
        $('#yourScore').text("Your score: " + score + "/5");

    } else {
        $('#answeredRightOrWrong').text("Wrong Answer"); 
        $('#description').text(descriptions[timesPlayed]);
        $('#questionInsert').text("");
        $('#answersInsert').text("");
        $('#yourScore').text("Your score: " + score + "/5");
    }
    $("#pressKey").text("(Press any key to continue)");
    shortTimer(); 
    clearInterval();
    clearTimer(); 
}


document.addEventListener('keyup', initiation); 
