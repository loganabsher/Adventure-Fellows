//this is Logan's monstrosity
'use strict';
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
