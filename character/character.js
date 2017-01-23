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
