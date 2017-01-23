'use strict';

document.addEventListener('DOMContentLoaded', function() {

  var questionNum = 0;
  //arrays of diol
  //array of phases/titles
  var phaseArray = ['Day 2', 'Day 3', 'Day 4'];
  //array of place images
  var staticImageArray = ['../images/cf_building.jpg'];
  //array of questions/events
  var staticQuestionArray = ['you are on your home directory of the terminal and following along, what do you type in the command line?', 'how do you spend the weekend?'];
  //array of choices for the questions
  var staticChoiceArray = [['rm –rf', 'cd codefellows/201', 'tree', 'cmatrix'], ['Go to the spa' , 'study all weekend', 'go out for dinner and drinks with friends', 'sleep your standard eight hours, run, study']];
  //array of responses to the choices
  var staticResponseArray = [['you deleted all files on your machine, you can no longer continue in the class. (-100, health, -100 grade)', 'you follow along with the class, learing much about how to properly operate your computer.', 'you tree from your home directory, the files keep flying past your screen, it amazes you how many "interesting" files are on your computer ;). (+5 grade, -10 social)', 'you cmatrix and stare at the screen mesmorized by the falling matrix, you pay little attention to the lecture. (-10 grade)'], ['you go to the spa to rejuvenate and relax, sleeping in and lounging all weekend. (+20 health, -10 grade, +10 social)', 'you study very hard all weekend, not getting a chance to relax or see any friends. (+10 grade, - 15 social)', 'you go out drinking all weekend having a terrible hangover, but somehow on Monday your code is finished? (-15 health, +5 grade, +20 social)', 'you get your standard eight hours of sleep, go for a run, study and finish your homework like a productive member of society. (+5 health, +5 grade, -5 social)']];

  renderPage();

  function Character(name, image){
    this.name = name;
    this.image = image;
    this.health = 100;
    this.grade = 100;
    this.social = 100;
  }
  var player = new Character('name');

  function renderPage(questionNum){
    appendImage(staticImageArray[0]);
    createDialogue(staticImageArray[0], staticChoiceArray[0], staticResponseArray[0]);

  function phaseImage(image){
    var pageEl = document.getElementById('place-image');
    var imageEl = document.createElement('img');
    imageEl.setAttribute('id', 'background-image');
    imageEl.setAttribute('src', image);
    pageEl.appendChild(imageEl);
  }
  function removeImage(){
    var pageEl = document.getElementById('place-image');
    pageEl.removeChild(imageEl);
  }
  function renderResponse(id, questionNum) {
    var questionsList = document.getElementById('questions-list');
    questionsList.remove();
    var gameText = document.getElementById('game-text');
    var responsePar = document.createElement('p');

    var responseId = parseInt(id);
    console.log(responseId);

    responsePar.textContent = staticResponseArray[questionNum][id];

    gameText.appendChild(responsePar);
  }
  function appendImage(image){
    var pageEl = document.getElementById('place-image');
    var imageEl = document.createElement('img');
    imageEl.setAttribute('id', 'background-image');
    imageEl.setAttribute('src', image);
    pageEl.appendChild(imageEl);
  }
  function createDialogue(image, choices, responses){
    var gameText = document.getElementById('game-text');
    for(var i = 0; i < choices.length; i++){
      var questionEl = document.createElement('li');
      questionEl.setAttribute('class', 'question');
      questionEl.setAttribute('id', i);
      questionEl.textContent = choices[i];
      var questionsList = document.getElementById('questions-list');
      questionsList.appendChild(questionEl);
    }

    var questionsCollection = document.getElementById('questions-list').children;
    var questionsArray = Array.prototype.slice.call(questionsCollection);

    questionsArray.forEach(function(question) {
      question.addEventListener('click', function() {
        renderResponse(this.id, questionNum);
        questionNum++;
      });
    });

    // var questions = Array.prototype.slice.call(questionsCollection); //turn into array
    // console.log(questionsCollection);

  }
});

