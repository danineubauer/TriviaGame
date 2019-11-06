'use strict';


const questions = [
    'In which Pier can you find sea lions?',
    'What is the highest tower in San Francisco?',
    'How many hills was San Francisco built on?',
    'What was San Francisco called before it was renamed in 1846?',
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
    'There are many interesting attractions at Fisherman\'s Wharf, including the Maritime Museum and the Historic Ships Pier. There is even a merry-go-round here',
    'The SalesForce tower rises 1,070ft and is the 13th tallest building in the US.',
    'The city is built on more than 50 hills. Many believe it only has 7 or 9 hills, but there are a total of more than 50 named hills. Some of the most well known are Russian Hill, Nob Hill, Telegraph Hill, and Twin Peaks. A few of the lesser known ones are Golden Mine Hill, Excelsior Heights, and Tank Hill.',
    'Before it was renamed to San Francisco, this small city by the bay was called Yerba Buena. Yerba Buena means, "Good herb" in Spanish. It was founded in 1776, but renamed in 1846. Portsmouth Square in Chinatown was the location of the public square in Yerba Buena.',
    'The color of the Golden Gate Bridge is called International Orange. It wasn\'t a color from the original list of options. It was the primer used to protect the steel for the bridge during transit and the architect loved it more than the other options, so he selected it as the official color.',
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
        clearTimer();
        shortTimer(); 
    }
}




//short timer for right/wrong answer: 
function shortTimer() { 
    console.log("shortTimer");
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
 }

//for the page with the descriptions: 
function decrement2() { 
    console.log("decrement2");
    seconds--; 
    $("#timer").text("00:"+ seconds); 
    if (seconds === 0) { 
        clearTimer(); 
        startNewGame(); 
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

    } else {
        $('#answeredRightOrWrong').text("Wrong Answer"); 
        $('#description').text(descriptions[timesPlayed]);
        $('#questionInsert').text("");
        $('#answersInsert').text("");
    }
    shortTimer(); 
}


document.addEventListener('keyup', initiation); 
