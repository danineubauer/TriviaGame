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
var score = 0;
var seconds = 30;

//variables change in response to change of changing variables:
//determines the right answer for each question based on the question being answered:
//right answers always on index 0
var Question = questions[questionAnsweredLive];
var Answers = answers[questionAnsweredLive];
var indexOfTheAnswer = Number(answers[questionAnsweredLive][0]);
var rightAnswer = answers[questionAnsweredLive][indexOfTheAnswer];
var indexOfDescription = descriptions[questionAnsweredLive];

console.log("Question: ", Question);
console.log("index of answer: ", indexOfTheAnswer);
console.log("right answer: ", rightAnswer);
console.log("description: ", indexOfDescription);

const initiation = function (a) {
    if (a.code === 'Space') {
        document.getElementById('initiation').innerHTML = '';
        document.getElementById('explination').innerHTML = '';
        return start();
    }
};

const start = function() {
    document.removeEventListener("keyup", initiation);
    $("#timer").text("00:" + seconds);
    $("#questionNumber").text("Question #" + (questionAnsweredLive+1));
    $("#questionInsert").text(Question);
    //loop through answers: 
    for (let index = 1; index < answers.length; index++) {
        $("#answersInsert").append("<div><button type='button' id=" + (index) + ">" + Answers[index] + "</div>");
    }
    $("#yourScore").text("Your score: " + score);
}

var logic = function () {

}


// $(document).on("click", ".choice", checkAnswer);

var checkAnswer = function () {
    if (answers[0] === answers[answers[0]]) {
        console.log('correct!');
    }
}

document.addEventListener('keyup', initiation); 
