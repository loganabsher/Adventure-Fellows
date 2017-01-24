'use strict';

// var divCollection = document.getElementsByClassName('traits');
// var characters = Array.prototype.slice.call(divCollection);
// console.log(characters);
// characters.forEach(function (character) {
//   character.addEventListener('click', function () {
//     var charName = character.id;
//     var imgUrl = character.firstChild.src;
//     localStorage.imgUrl = character.firstChild.src;
//
//     console.log(character);
//
//   });
// });
function displayText() {
  var bodyEl = document.getElementById('body');
  var user = localStorage.userName; //don't JSON.parse because it will create ""name"" with too many quotation marks
  var createHeader = document.createElement('h3');
  createHeader.textContent = ('Hello, ' + user + ' please select a character');
  bodyEl.appendChild(createHeader);
}
displayText();
//Logan contribution
//Allie's Data
var allieEl = document.getElementById('choice-one');
var allie = function(event){
  event.stopPropagation();
  event.preventDefault();
  var check = confirm('do you wish to continue');
  if(check === true){
    localStorage.setItem('maxHealth', '../images/IMG_0009.jpg');
    localStorage.setItem('mediumHealth', '../images/IMG_0010.jpg');
    localStorage.setItem('lowHealth', '../images/IMG_0011');
    localStorage.setItem('health', 100);
    localStorage.setItem('grade', 110);
    localStorage.setItem('social', 90);
    location.href = '../game/dayOne.html';
  }
};
allieEl.addEventListener('click', allie, false);
//Logan's data
var loganEl = document.getElementById('choice-two');
var logan = function(event){
  event.stopPropagation();
  event.preventDefault();
  var check = confirm('do you wish to continue');
  if(check === true){
    localStorage.setItem('maxHealth', '../images/IMG_0006.jpg');
    localStorage.setItem('mediumHealth', '../images/IMG_0007.jpg');
    localStorage.setItem('lowHealth', '../images/IMG_0008');
    localStorage.setItem('health', 120);
    localStorage.setItem('grade', 100);
    localStorage.setItem('social', 80);
    location.href = '../game/dayOne.html';
  }
};
loganEl.addEventListener('click', logan, false);
//Luis' data
var luisEl = document.getElementById('choice-three');
var luis = function(event){
  event.stopPropagation();
  event.preventDefault();
  var check = confirm('do you wish to continue');
  if(check === true){
    localStorage.setItem('maxHealth', '../images/IMG_0015.jpg');
    localStorage.setItem('mediumHealth', '../images/IMG_0016.jpg');
    localStorage.setItem('lowHealth', '../images/IMG_0017');
    localStorage.setItem('health', 110);
    localStorage.setItem('grade', 110);
    localStorage.setItem('social', 80);
    location.href = '../game/dayOne.html';
  }
};
luisEl.addEventListener('click', luis, false);
//david's data
var davidEl = document.getElementById('choice-four');
var david = function(event){
  event.stopPropagation();
  event.preventDefault();
  var check = confirm('do you wish to continue');
  if(check === true){
    localStorage.setItem('maxHealth', '../images/IMG_0012.jpg');
    localStorage.setItem('mediumHealth', '../images/IMG_0013.jpg');
    localStorage.setItem('lowHealth', '../images/IMG_0014');
    localStorage.setItem('health', 80);
    localStorage.setItem('grade', 100);
    localStorage.setItem('social', 120);
    location.href = '../game/dayOne.html';
  }
};
davidEl.addEventListener('click', david, false);
