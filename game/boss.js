//this is Logan's monstrosity
'use strict';
<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function () {
  var questionNum = 0;
  //array of place images
  var staticImageArray = ['../images/cf_building.jpg', '../images/cf_building.jpg', '../images/cf_building.jpg'];
  //array of questions/events
  var staticQuestionArray = ['You are on your home directory of the terminal and following along, what do you type in the command line?', 'How do you spend the weekend?'];
  //array of choices for the questions
  var staticChoiceArray = [['rm –rf', 'cd codefellows/201', 'tree', 'cmatrix'], ['Go to the spa', 'study all weekend', 'go out for dinner and drinks with friends', 'sleep your standard eight hours, run, study']];
  //array of responses to the choices
  var staticResponseArray = [['You deleted all files on your machine, you can no longer continue in the class. (-100, health, -100 grade)', 'You follow along with the class, learing much about how to properly operate your computer.', 'You tree from your home directory, the files keep flying past your screen, it amazes you how many "interesting" files are on your computer ;). (+5 grade, -10 social)', 'You cmatrix and stare at the screen mesmorized by the falling matrix, you pay little attention to the lecture. (-10 grade)'], ['You go to the spa to rejuvenate and relax, sleeping in and lounging all weekend. (+20 health, -10 grade, +10 social)', 'You study very hard all weekend, not getting a chance to relax or see any friends. (+10 grade, - 15 social)', 'You go out drinking all weekend having a terrible hangover, but somehow on Monday your code is finished? (-15 health, +5 grade, +20 social)', 'You get your standard eight hours of sleep, go for a run, study and finish your homework like a productive member of society. (+5 health, +5 grade, -5 social)']];

  var uniqueClassPerResponse = [['rm-rf', 'cdCorrectly', 'tree', 'cmatrix'], ['spa', 'studyWeekend', 'dinner', 'sleepEight']];
  // increments score
  var affectScore = [[[-100, -100, -100], [0, 0, +25], [0, 0, 0], [0, -25, 0]], [[+25, -25, 0], [-25, +25, -25], [-25, -25, +25], [+10, +10, +10]]];
  //array of randomly chosen questions
  var randomQuestionArray = [];
  //corresponding choices to the questions
  var randomChoiceArray = [];
  //corresponding responses to the choices
  var randomResponseArray = [];
  //collecting local storage from character page
  // var local = JASN.parse(localStorage);
  // console.log(local);
  //character constructor
  function Character(name, image) {
    this.name = name;
    this.image = image;
    this.health = 100;
    this.grade = 100;
    this.social = 100;
  }

  var character = new Character(localStorage.userName, localStorage.imgUrl);
  console.log(character);

  renderPage();

  function renderPage() {
    renderImage(staticImageArray[questionNum]);
    displayQuestionPrompt(questionNum);
    createDialogue(staticImageArray[questionNum], staticChoiceArray[questionNum], staticResponseArray[questionNum]);
  }

  //RENDERING PAGE
  function renderImage(image) {
    var pageEl = document.getElementById('place-image');
    var imageEl = document.createElement('img');
    imageEl.setAttribute('id', 'background-image');
    imageEl.setAttribute('src', image);
    pageEl.appendChild(imageEl);
  }

  function displayQuestionPrompt(questionNum) {
    var questionContainer = document.getElementById('prompt');
    var displayQuestionEl = document.createElement('p');
    displayQuestionEl.setAttribute('id', 'questionNum');
    displayQuestionEl.textContent = staticQuestionArray[questionNum];
    questionContainer.appendChild(displayQuestionEl);
  }

  function createDialogue(image, choices, responses) {
    var gameText = document.getElementById('game-text');

    for (var i = 0; i < choices.length; i++) {
      var choiceEl = document.createElement('li');
      choiceEl.setAttribute('class', 'question ' + uniqueClassPerResponse[questionNum][i]);
      choiceEl.setAttribute('id', i);
      choiceEl.textContent = choices[i];
      var choicesList = document.getElementById('choices-list');
      choicesList.appendChild(choiceEl);
    }
    handleChoiceClick();      //
  }

  function updateStats(responseIndex) {
    var responseIndex = parseInt(responseIndex);
    var character = JSON.parse(localStorage.character);
    console.log(character);
    for (var i = 0; i < affectScore.length; i++) {
      character.health = character.health + affectScore[responseIndex][i][0];
      console.log('this.health ' + character.health);
      character.grade = character.grade + affectScore[responseIndex][i][1];
      console.log('this.grade ' + character.grade);
      character.social = character.social + affectScore[responseIndex][i][2];
      console.log('this.social ' + character.social);
    }
  }
  //pair programmed with EVERYONE

  function handleChoiceClick() {    //renders the response
    var choicesCollection = document.getElementById('choices-list').children;
    var choicesArray = Array.prototype.slice.call(choicesCollection);

    choicesArray.forEach(function (choice) {
      choice.addEventListener('click', function () {
        renderResponse(this.id, questionNum);
        updateStats(this.id);
      });
    });
  }

  function removePrompt() {
    var promptParent = document.getElementById('prompt');
    var promptChild = document.getElementById('questionNum');
    promptParent.removeChild(promptChild);
  }

  function removeChoiceElements() {
    var choicesList = document.getElementById('choices-list').children;
    var choicesArray = Array.prototype.slice.call(choicesList);
    choicesArray.forEach(function (choice) {
      choice.remove();
    });
  }

  function renderResponse(id, questionNum) {
    removeChoiceElements();
    removePrompt();

    var gameText = document.getElementById('game-text');  //append response to textContent div
    var responsePar = document.createElement('p');
    responsePar.setAttribute('id', 'response-paragraph');

    var responseId = parseInt(id);
    // console.log(responseId);
    responsePar.textContent = staticResponseArray[questionNum][id];
    gameText.appendChild(responsePar);

    if (questionNum < staticQuestionArray.length - 1) {
      responsePar.addEventListener('click', function () {   //when click, clear DOM elements and render new
        clearElements();
        renderPage();
      });
    } else {
      renderTransition();
    }
  }

  function clearElements() {
    questionNum++;              //after rendering response, move to next question

    console.log('incrementing...now on question at index: ', questionNum);

    var response = document.getElementById('response-paragraph');
    console.log(response);
    var image = document.getElementById('background-image');
    console.log('removing image');
    image.remove();
    response.remove();
  }

  function renderTransition() {           //reveals a hidden link to transition to week2
    var jCharacter = JSON.stringify(character); //wraps up character in JSON to send through
    localStorage.character = jCharacter;
    console.log(jCharacter);
    location.href = '../game/dayTwo.html';
    // var hiddenLink = document.getElementById('link-to-week2');
    // hiddenLink.removeAttribute('class', 'hidden');
  }

});
=======
//array of boss images
var bossImageArray = ['../images/angrierAdam.jpg', '../images/angryAdam.jpg', '../images/normalAdam.jpg', '../images/happyAdam.jpg','../images/happierAdam.jpg'];
//array of boss questions
var bossQuestionArray = ['Adam uses busmall, what is your response?', 'Adam uses salmon cookies, what is your response?', 'Adam uses chocolate pizza, what is your response?', 'Adam uses about me, what is your response?'];
//corresponding choices to questions
var bossChoiceArray = [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']];
//corresponding responses to choices
var bossResponseArray = [['hello', 'hello', 'hello', 'hello'], ['hello', 'hello', 'hello', 'hello'], ['hello', 'hello', 'hello', 'hello'], ['hello', 'hello', 'hello', 'hello']];
//corresponding effects per response
var bossEffectArray = [];
function Character(name){
  this.name = name;
  this.lowHealthImg = '../images/IMG_0008.jpg';
  this.health = 100;
  this.grade = 100;
  this.social = 100;
}
var player = new Character('LoganTemp');
function renderBossFight(){
  intro();
  renderImage('../images/cf_building.jpg');
  var win = bossAdam();
  if(win === true){
    location.href = '../credits/credits.html';
  }
}
renderBossFight();
function intro(){
  appendText('You arive at your final day of class and are confronted by Adam, he asks to speak to you privatly...');
  var clickEl = document.getElementById('game-text');
  clickEl.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
    removeText();
  }), false;
}
function randomValue(max, min){
  return Math.round(Math.random() * (max - min) + min);
}
function bossQuestion(index){
  appendText(bossQuestionArray[index]);
  var questionEl = document.getElementById('game-text');
  questionEl.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
    removeText();
    bossAnswer(index);
  }), false;
}
function bossAnswer(index){
  appendFour(index);
}
function bossResponse(index){
  console.log(index);
  removeFour();
  appendText(index);
  var responseEl = document.getElementById('game-text');
  responseEl.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
    removeText();
  }), false;
}
function bossAdam(){
  var count = 0;
  do{
    var random = randomValue(bossQuestionArray.length - 1, 0);
    console.log(random);
    var questionEl = document.getElementById('game-text');
    questionEl.addEventListener('click', function(event) {
      event.stopPropagation();
      event.preventDefault();
      bossQuestion(random);
    }), false;
    count++;
  }while(player.grade < 90 && count < 4);
}
function playerImage(image){
  var pageEl = document.getElementById('user-box');
  var imageEl = document.createElement('img');
  imageEl.setAttribute('id', 'player-image');
  imageEl.setAttribute('src', image);
  pageEl.appendChild(imageEl);
}
function interactionImage(image){
  var pageEl = document.getElementById('interactive-box');
  var imageEl = document.createElement('img');
  imageEl.setAttribute('id', 'interactive-image');
  imageEl.setAttribute('src', image);
  pageEl.appendChild(imageEl);
}
function renderImage(image) {
  var pageEl = document.getElementById('place-image');
  var imageEl = document.createElement('img');
  imageEl.setAttribute('id', 'background-image');
  imageEl.setAttribute('src', image);
  pageEl.appendChild(imageEl);
}
function appendText(text){
  var sectionEl = document.getElementById('game-text');
  var textEl = document.createElement('p');
  textEl.setAttribute('id', 'text-content');
  textEl.textContent = text;
  sectionEl.appendChild(textEl);
}
function removeText(){
  var sectionEl = document.getElementById('game-text');
  var textEl = document.getElementById('text-content');
  sectionEl.removeChild(textEl);
}
function appendFour(index){
  var appendArray = bossChoiceArray[index];
  var ulEl = document.getElementById('questions-list');
  for(var i = 0; i < appendArray.length; i++){
    var liEl = document.createElement('li');
    liEl.setAttribute('id', 'listChoice' + i);
    liEl.textContent = appendArray[i];
    ulEl.appendChild(liEl);
  }
  var choiceOne = document.getElementById('listChoice0');
  choiceOne.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
    bossResponse(bossResponseArray[index][0]);
  }), false;
  var choiceTwo = document.getElementById('listChoice1');
  choiceTwo.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
    bossResponse(bossResponseArray[index][1]);
  }), false;
  var choiceThree = document.getElementById('listChoice2');
  choiceThree.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
    bossResponse(bossResponseArray[index][2]);
  }), false;
  var choiceFour = document.getElementById('listChoice3');
  choiceFour.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
    bossResponse(bossResponseArray[index][3]);
  }), false;
}
function removeFour(){
  var ulEl = document.getElementById('questions-list');
  for(var i = 0; i < 4; i++){
    var liEl = document.getElementById('listChoice' + i);
    ulEl.removeChild(liEl);
  }
}
>>>>>>> 4df359272ab74bdef8b59bd364ca58dde6134abc
