'use strict';
//makeing sure character is cleared out of localStorage before adding a new one
localStorage.clear();
console.log('Stored character has been cleared: ', localStorage);
//taking user input from input field
var userNameEl = document.getElementById('userNameInput');
//adding an event listener to the submit button
userNameEl.addEventListener('submit', function(event) {
  event.stopPropagation();
  event.preventDefault();
  document.getElementById('userName').value;
  //getting user input and adding it to local storage
  var userName = document.getElementById('userName').value;
  localStorage.userName = userName;
  //linking to character page once input has been entered
  location.href = './character/character.html';
});
//pair-programmed with all four of us
