'use strict';

document.addEventListener('DOMContentLoaded', function() {
  //arrays of diol
  var phaseArray = ['morning', 'day', 'night'];
  var staticImageArray = ['../images/cf_building.jpg'];
  var staticChoiceArray = [['question one', 'question two', 'question three', 'question four']];
  var staticResponseArray = [['response one', 'response two', 'response three', 'response four']];
  var randomChoiceArray = [];
  var randomResponseArray = [];

  renderPage();

  function Character(name, image){
    this.name = name;
    this.image = image;
    this.health = 100;
    this.grade = 100;
    this.social = 100;
  }
  var player = new Character('name');

  function renderPage(){
    appendImage(staticImageArray[0]);
    createDialogue(staticImageArray[0], staticChoiceArray[0], staticResponseArray[0]);
  }

  function renderResponse(id) {
    var questionsList = document.getElementById('questions-list');
    questionsList.remove();
    var gameText = document.getElementById('game-text');
    var responsePar = document.createElement('p');

    var responseId = parseInt(id);
    console.log(responseId);
    responsePar.textContent = staticResponseArray[0][id];
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
        renderResponse(this.id);
      })
    })

    // var questions = Array.prototype.slice.call(questionsCollection); //turn into array
    // console.log(questionsCollection);

  }
});

