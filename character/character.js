'use strict';

var divCollection = document.getElementsByClassName('traits');
var characters = Array.prototype.slice.call(divCollection);
console.log(characters);
characters.forEach(function(character) {
  character.addEventListener('click', function(){
    var charName = character.id;
    var imgUrl;
    console.log(charName);
    console.log(character.firstChild.src);
  });
});

function displayText(){
  var bodyEl = document.getElementById('body');
  var user = JSON.parse(localStorage.userName);
  var createHeader = document.createElement('h3');
  createHeader.textContent = ('Hello, ' + user + ' please select a character');
  bodyEl.appendChild(createHeader);
}
displayText();
//All group participated in this character.js
