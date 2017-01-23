'use strict';
//arrays of diol
var phaseArray = ['morning', 'day', 'night'];
var staticImageArray = ['../images/cf_building.jpg'];
var staticChoiceArray = [['question one', 'question two', 'question three', 'question four']];
var staticResponseArray = [['response one', 'response two', 'response three', 'response four']];
var randomChoiceArray = [];
var randomResponseArray = [];

function Character(name, image){
  this.name = name;
  this.image = image;
  this.health = 100;
  this.grade = 100;
  this.social = 100;
}
var player = new Character('name');

function page(){
  phase(staticImageArray[0], staticChoiceArray[0], staticResponseArray[0]);
}

function phase(image, choice, responses){
  // for(var j = 0; j < phaseArray.length; j++){
  //   var titleEl = document.getElementById('head-tag');
  //   var phaseEl = document.createElement('h1');
  //   phaseEl.textContent = phaseArray[j];
  //   titleEl.appendChild(phaseEl);
  var pageEl = document.getElementById('place-image');
  var imageEl = document.createElement('img');
  imageEl.setAttribute('id', 'background-image');
  imageEl.setAttribute('src', image);
  pageEl.appendChild(imageEl);
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
