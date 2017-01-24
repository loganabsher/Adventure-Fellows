//this is Logan's monstrosity
'use strict';
document.addEventListener('DOMContentLoaded', function () {
  var questionNum = 0;
  //array of boss images
  var bossImageArray = ['../images/angrierAdam.jpg', '../images/angryAdam.jpg', '../images/normalAdam.jpg', '../images/happyAdam.jpg','../images/happierAdam.jpg'];
  //array of boss questions
  var bossQuestionArray = ['Adam uses busmall, what is your response?', 'Adam uses salmon cookies, what is your response?', 'Adam uses chocolate pizza, what is your response?', 'Adam uses about me, what is your response?', 'Adam uses disapointment, what is your response?'];
  //corresponding choices to questions
  var bossChoiceArray = [['bussmall', 'bussmall', 'bussmall', 'bussmall'], ['salmon cookies', 'salmon cookies', 'salmon cookies', 'salmon cookies'], ['chocolate pizza', 'chocolate pizza', 'chocolate pizza', 'chocolate pizza'], ['about me', 'about me', 'about me', 'about me'], ['disapointment', 'disapointment', 'disapointment', 'disapointment']];
  //corresponding responses to choices
  var bossResponseArray = [['bussmall', 'bussmall', 'bussmall', 'bussmall'], ['salmon cookies', 'salmon cookies', 'salmon cookies', 'salmon cookies'], ['chocolate pizza', 'chocolate pizza', 'chocolate pizza', 'chocolate pizza'], ['about me', 'about me', 'about me', 'about me'], ['disapointment', 'disapointment', 'disapointment', 'disapointment']];
  //corresponding effects per response
  var affectScore = [[[-100, -100, -100], [0, 0, +25], [0, 0, 0], [0, -25, 0]], [[+25, -25, 0]]];
  var uniqueClassPerResponse = [['bussmall', 'bussmall', 'bussmall', 'bussmall'], ['salmon cookies', 'salmon cookies', 'salmon cookies', 'salmon cookies'], ['chocolate pizza', 'chocolate pizza', 'chocolate pizza', 'chocolate pizza'], ['about me', 'about me', 'about me', 'about me'], ['disapointment', 'disapointment', 'disapointment', 'disapointment']];
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
    renderImage(bossImageArray[questionNum]);
    displayQuestionPrompt(questionNum);
    createDialogue(bossImageArray[questionNum], bossChoiceArray[questionNum], bossResponseArray[questionNum]);
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
    displayQuestionEl.textContent = bossQuestionArray[questionNum];
    questionContainer.appendChild(displayQuestionEl);
  }

  function createDialogue(image, choices, responses) {
    var gameText = document.getElementById('game-text');

    for (var i = 0; i < choices.length; i++) {
      var choiceEl = document.createElement('li');
      choiceEl.setAttribute('class', 'question ' + uniqueClassPerResponse[questionNum][i]);
      choiceEl.setAttribute('id', i);
      choiceEl.textContent = choices[i];
      var choicesList = document.getElementById('choices-list');
      choicesList.appendChild(choiceEl);
    }
    handleChoiceClick();      //
  }

  function updateStats(responseIndex) {
    var responseIndex = parseInt(responseIndex);
    var character = JSON.parse(localStorage.character);
    console.log(character);
    for (var i = 0; i < affectScore.length; i++) {
      character.health = character.health + affectScore[responseIndex][i][0];
      console.log('this.health ' + character.health);
      character.grade = character.grade + affectScore[responseIndex][i][1];
      console.log('this.grade ' + character.grade);
      character.social = character.social + affectScore[responseIndex][i][2];
      console.log('this.social ' + character.social);
    }
  }
  //pair programmed with EVERYONE

  function handleChoiceClick() {    //renders the response
    var choicesCollection = document.getElementById('choices-list').children;
    var choicesArray = Array.prototype.slice.call(choicesCollection);

    choicesArray.forEach(function (choice) {
      choice.addEventListener('click', function () {
        renderResponse(this.id, questionNum);
        updateStats(this.id);
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
    responsePar.textContent = bossResponseArray[questionNum][id];
    gameText.appendChild(responsePar);

    if (questionNum < bossQuestionArray.length - 1) {
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
    location.href = '../credits/credits.html';
    // var hiddenLink = document.getElementById('link-to-week2');
    // hiddenLink.removeAttribute('class', 'hidden');
  }

});
