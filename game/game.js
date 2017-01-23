'use strict';
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
//array of randomly chosen questions
var randomQuestionArray = [];
//corresponding choices to the questions
var randomChoiceArray = [];
//corresponding responses to the choices
var randomResponseArray = [];
//array of boss images
var bossImageArray = ['../images/cf_building.jpg'];
//array of boss questions
var bossQuestionArray = ['Adam uses busmall', 'Adam uses salmon cookies', 'Adam uses chocolate pizza', 'Adam uses about me'];
//corresponding choices to questions
var bossChoiceArray = [['','','',''], ['','','',''], ['','','',''], ['','','','']];
//corresponding responses to choices
var bossResponseArray = [['','','',''], ['','','',''], ['','','',''], ['','','','']];
//collecting local storage from character page
var local = JASON.parse(localStorage);
console.log(local);
//character constructor
function Character(local){
  this.name = local[0];
  this.image = local[1];
  this.health = 100;
  this.grade = 100;
  this.social = 100;
}
//creating a new player with the local storage data
var player = new Character(local);
function random(max, min){
  return Math.round(Math.random() * (max - min) + min);
}
function bossAdam(image, question, choice, response){
  interactionImage(bossImageArray);
}
function interactionImage(image){
  var pageEl = document.getElementById('interactive-box');
  var imageEl = document.createElement('img');
  imageEl.setAttribute('id', 'interactive-image');
  imageEl.setAttribute('src', image);
  pageEl.appendChild(imageEl);
}
function playerImage(image){
  var pageEl = document.getElementById('user-box');
  var imageEl = document.createElement('img');
  imageEl.setAttribute('id', 'player-image');
  imageEl.setAttribute('src', image);
  pageEl.appendChild(imageEl);
}
//short introduction/base page layout
function intro(image){
  phaseImage(image);

}
function page(){
  phase(staticImageArray[0], staticChoiceArray[0], staticResponseArray[0]);
  bossAdam();
}
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
function phase(image, choice, responses){
  // for(var j = 0; j < phaseArray.length; j++){
  //   var titleEl = document.getElementById('head-tag');
  //   var phaseEl = document.createElement('h1');
  //   phaseEl.textContent = phaseArray[j];
  //   titleEl.appendChild(phaseEl);
  intro(image);
  var footerEl = document.getElementById('game-text');
  var listEl = document.createElement('ul');
  for(var i = 0; i < choice.length; i++){
    var textEl = document.createElement('li');
    textEl.textContent = choice[i];
    listEl.appendChild(textEl);
    var userChoice = function(event){
      event.preventDefault();
      event.stopPropagation();
      footerEl.removeChild(listEl);
      var responseEl = document.createElement('p');
      responseEl.textContent = responses;
      console.log(responses);
      footerEl.appendChild(responseEl);
    };
    textEl.addEventListener('click', userChoice, false);
  }
  footerEl.appendChild(listEl);
}
// }
page();
console.log(player.name);
