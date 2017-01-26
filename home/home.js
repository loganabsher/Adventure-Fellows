'use strict';

localStorage.clear(); //makes sure character is cleared out of localStorage
console.log('Stored character has been cleared: ', localStorage);

var userNameEl = document.getElementById('userNameInput');

userNameEl.addEventListener('submit', function(event) {
  event.stopPropagation();
  event.preventDefault();
  document.getElementById('userName').value;
  var userName = document.getElementById('userName').value;
  localStorage.userName = userName;

  location.href = './character/character.html';
});

//pair-programmed with all four of us
