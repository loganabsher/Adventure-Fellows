'use strict';
//arrays of diol
var phaseArray = ['morning', 'day', 'night'];
var staticImageArray = ['../images/IMG_0006.jpg'];
var staticChoiceArray = [['question one', 'question two', 'question three', 'question four']];
var staticResponseArray = [['response one', 'response two', 'response three', 'response four']];
var randomChoiceArray = [];
var randomResponseArray = [];

function Character(name){
  this.name = name;
  this.health = 100;
  this.grade = 100;
  this.social = 100;
}
var player = new Character('name');

function pageConstructor(){
  phaseConstructor(staticImageArray[0], staticChoiceArray[0], staticResponseArray[0]);
}

function phaseConstructor(staticImage, staticChoice, staticResponse){
  // for(var j = 0; j < phaseArray.length; j++){
  //   var titleEl = document.getElementById('head-tag');
  //   var phaseEl = document.createElement('h1');
  //   phaseEl.textContent = phaseArray[j];
  //   titleEl.appendChild(phaseEl);
  var pageEl = document.getElementById('body-tag');
  var imageEl = document.createElement('img');
  imageEl.setAttribute('id', 'background-image');
  imageEl.setAttribute('src', staticImage);
  pageEl.appendChild(imageEl);
  var footerEl = document.getElementById('footer-tag');
  var listEl = document.createElement('ul');
  for(var i = 0; i < staticChoice.length; i++){
    var textEl = document.createElement('li');
    textEl.textContent = staticChoice[i];
    listEl.appendChild(textEl);
    var userChoice = function(event){
      event.preventDefault();
      event.stopPropagation();
      footerEl.removeChild(listEl);
      var responseEl = document.createElement('p');
      footerEl.appendChild(staticResponse);
      console.log(staticResponse);
    };
    textEl.addEventListener('click', userChoice, false);
  }
  footerEl.appendChild(listEl);
}
// }
pageConstructor();
console.log(player.name);
