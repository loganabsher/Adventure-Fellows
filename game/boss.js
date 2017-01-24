'use strict';
//array of boss images
var bossImageArray = ['../images/angrierAdam.jpg', '../images/angryAdam.jpg', '../images/normalAdam.jpg', '../images/happyAdam.jpg','../images/happierAdam.jpg'];
//array of boss questions
var bossQuestionArray = ['Adam uses busmall', 'Adam uses salmon cookies', 'Adam uses chocolate pizza', 'Adam uses about me'];
//corresponding choices to questions
var bossChoiceArray = [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']];
//corresponding responses to choices
var bossResponseArray = [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']];
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
  renderImage('../images/cf_building.jpg');
  bossAdam(bossImageArray, bossChoiceArray, bossResponseArray);
}
renderBossFight();
function randomValue(max, min){
  return Math.round(Math.random() * (max - min) + min);
}
function bossQuestion(image, question){
  interactionImage(bossImageArray[2]);

}
function bossAnswer(image, choice){

}
function bossResponse(image, response){

}
function bossAdam(image, question, choice, response){
  var count = 0;
  do{
    for(var i = 0; i < bossQuestionArray.length; i++){
      var random = randomValue(bossQuestionArray.length, 0);
      console.log(random);
      var questionEl = document.getElementById('game-text');
      questionEl.addEventListener('click', function(event) {
        event.stopPropagation();
        event.preventDefault();
        bossQuestion(bossQuestionArray[random]);
      }), false;
      count++;
    }
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
