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
  var user = localStorage.userName;
  var createHeader = document.createElement('h3');
  createHeader.textContent = ('Hello ' + user + ', please choose a character:'); //please do NOT call JSON.parse on user
  bodyEl.appendChild(createHeader);
}

var images = {
  allie: '../images/allieAvatar.png',
  luis: '../images/avatar_luis.png',
  david: '../images/avatar_david.png',
  logan: '../images/logan_avatar.png'
}
displayText();
//Logan contribution
//Allie's Data
var allieEl = document.getElementById('choice-one');
var allie = function(event){
  console.log('click');
  var check = confirm('do you wish to continue');
  if(check === true){

    localStorage.setItem('imgUrl', images.allie); 
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

    localStorage.setItem('imgUrl', images.logan);
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
    localStorage.setItem('imgUrl', images.luis);
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
    localStorage.setItem('imgUrl', images.david);
    localStorage.setItem('health', 80);
    localStorage.setItem('grade', 100);
    localStorage.setItem('social', 120);
    location.href = '../game/dayOne.html';
  }
};
davidEl.addEventListener('click', david, false);
