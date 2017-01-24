'use strict';
document.addEventListener('DOMContentLoaded', function () {
  var questionNum = 0;
  //array of place images
  var staticImageArray = ['../images/cf_building.jpg', '../images/cf_building.jpg', '../images/cf_building.jpg'];
  //array of questions/events
  var staticQuestionArray = ['This is your first day of Code Fellows. You are terrified and apprehensive because you know no one in your class. For the first hour of you being at the most amazing school ever, there is an orientation. Brooks is so excited to meet everyone he looks like he just merges with the code. After orientation you and your fellow classmates go to class and meet each other. It may be scary at first to introduce yourself but you get comfortable when you realize that everyone is just as scared as you. Adams beard blows your mind . You go home knowing a little more than you realize and had fun making new friends and gaining a lot of knowledge.','you are on your home directory of the terminal and following along, what do you type in the command line?', 'how do you spend the weekend?'];
  //array of choices for the questions
  var staticChoiceArray = [['Next'], ['rm –rf', 'cd codefellows/201', 'tree', 'cmatrix'], ['Go to the spa', 'study all weekend', 'go out for dinner and drinks with friends', 'sleep your standard eight hours, run, study']];
  //array of responses to the choices
  var staticResponseArray = [['The Next Day'], ['you deleted all files on your machine, you can no longer continue in the class. (-100, health, -100 grade)', 'you follow along with the class, learing much about how to properly operate your computer.', 'you tree from your home directory, the files keep flying past your screen, it amazes you how many "interesting" files are on your computer ;). (+5 grade, -10 social)', 'you cmatrix and stare at the screen mesmorized by the falling matrix, you pay little attention to the lecture. (-10 grade)'], ['you go to the spa to rejuvenate and relax, sleeping in and lounging all weekend. (+20 health, -10 grade, +10 social)', 'you study very hard all weekend, not getting a chance to relax or see any friends. (+10 grade, - 15 social)', 'you go out drinking all weekend having a terrible hangover, but somehow on Monday your code is finished? (-15 health, +5 grade, +20 social)', 'you get your standard eight hours of sleep, go for a run, study and finish your homework like a productive member of society. (+5 health, +5 grade, -5 social)']];
  //array of randomly chosen questions
  var randomQuestionArray = [];
  //corresponding choices to the questions
  var randomChoiceArray = [];
  //corresponding responses to the choices
  var randomResponseArray = [];
  //collecting local storage from character page
  // var local = JASN.parse(localStorage);
  // console.log(local);
  //character constructor
  function Character(name, image) {
    this.name = name;
    this.image = image;
    this.health = 100;
    this.grade = 100;
    this.social = 100;
  }
  var character = new Character(localStorage.userName, localStorage.imgUrl);
  console.log(character);
  renderPage();

  function renderPage() {
    renderImage(staticImageArray[questionNum]);
    displayQuestionPrompt(questionNum);
    createDialogue(staticImageArray[questionNum], staticChoiceArray[questionNum], staticResponseArray[questionNum]);
  }
  //RENDERING PAGE
  function renderImage(image) {
    var pageEl = document.getElementById('place-image');
    var imageEl = document.createElement('img');
    imageEl.setAttribute('id', 'background-image');
    imageEl.setAttribute('src', image);
    pageEl.appendChild(imageEl);
  }
  function displayQuestionPrompt(questionNum) {
    var questionContainer = document.getElementById('prompt');
    var displayQuestionEl = document.createElement('p');
    displayQuestionEl.setAttribute('id', 'questionNum');
    displayQuestionEl.textContent = staticQuestionArray[questionNum];
    questionContainer.appendChild(displayQuestionEl);
  }
  function createDialogue(image, choices, responses) {
    var gameText = document.getElementById('game-text');
    for (var i = 0; i < choices.length; i++) {
      var choiceEl = document.createElement('li');
      choiceEl.setAttribute('class', 'question');
      choiceEl.setAttribute('id', i);
      choiceEl.textContent = choices[i];
      var choicesList = document.getElementById('choices-list');
      choicesList.appendChild(choiceEl);
    }
    handleChoiceClick();      //
  }
  function handleChoiceClick() {    //renders the response
    var choicesCollection = document.getElementById('choices-list').children;
    var choicesArray = Array.prototype.slice.call(choicesCollection);
    choicesArray.forEach(function (choice) {
      choice.addEventListener('click', function () {
        renderResponse(this.id, questionNum);
      });
    });
  }
  function removePrompt() {
    var promptParent = document.getElementById('prompt');
    var promptChild = document.getElementById('questionNum');
    promptParent.removeChild(promptChild);
  }
  function removeChoiceElements() {
    var choicesList = document.getElementById('choices-list').children;
    var choicesArray = Array.prototype.slice.call(choicesList);
    choicesArray.forEach(function (choice) {
      choice.remove();
    });
  }
  function renderResponse(id, questionNum) {
    removeChoiceElements();
    removePrompt();
    var gameText = document.getElementById('game-text');  //append response to textContent div
    var responsePar = document.createElement('p');
    responsePar.setAttribute('id', 'response-paragraph');
    var responseId = parseInt(id);
    // console.log(responseId);
    responsePar.textContent = staticResponseArray[questionNum][id];
    gameText.appendChild(responsePar);
    if (questionNum < staticQuestionArray.length - 1) {
      responsePar.addEventListener('click', function () {   //when click, clear DOM elements and render new
        clearElements();
        renderPage();
      });
    } else {
      renderTransition();
    }
  }
  function clearElements() {
    questionNum++;              //after rendering response, move to next question
    console.log('incrementing...now on question at index: ', questionNum);
    var response = document.getElementById('response-paragraph');
    console.log(response);
    var image = document.getElementById('background-image');
    console.log('removing image');
    image.remove();
    response.remove();
  }
  function renderTransition() {           //reveals a hidden link to transition to week2
    var jCharacter = JSON.stringify(character); //wraps up character in JSON to send through
    localStorage.character = jCharacter;
    console.log(jCharacter);
    var hiddenLink = document.getElementById('link-to-week2');
    hiddenLink.removeAttribute('class', 'hidden');
  }
});
