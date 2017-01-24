'use strict';

var divCollection = document.getElementsByClassName('traits');
var characters = Array.prototype.slice.call(divCollection);
console.log(characters);
characters.forEach(function (character) {
  character.addEventListener('click', function () {
    var charName = character.id;
    var imgUrl = character.firstChild.src;
    
    localStorage.imgUrl = character.firstChild.src;

    console.log(character);

  });
});


function displayText() {
  var bodyEl = document.getElementById('body');
  var user = localStorage.userName; //don't JSON.parse because it will create ""name"" with too many quotation marks
  var createHeader = document.createElement('h3');
  createHeader.textContent = ('Hello, ' + user + ' please select a character');
  bodyEl.appendChild(createHeader);
}
displayText();
//All group participated in this character.js