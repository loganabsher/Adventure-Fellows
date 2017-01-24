'use strict';
document.addEventListener('DOMContentLoaded', function () {
  var questionNum = 0;
  //array of phases/titles
  //array of place images
  var staticImageArray = ['../images/cf_building.jpg', '../images/cf_building.jpg', '../images/cf_building.jpg'];
  //array of questions/events
  var staticQuestionArray = ['Yay! You survived the first week of Code Fellows 201!', 'You get stuck when creating your salmon cookies form, what do you do?', 'Your table isn’t rendering correctly, what did you forget to do?', 'How do you spend your weekend?'];
  //array of choices for the questions
  var staticChoiceArray = [['Let\'s Keep Going!'],['Keep working', 'Ask a TA ', 'As a classmate', 'Give up and go home'], ['You set up an infinite loop', 'Forgot to append table', 'Forgot to save before opening in browser', 'Nothing, my code is perfect and it\'s the code\'s fault'], ['Crying', 'Questioning your life choices', 'Considering dropping out', 'Applying for a job at 7-Eleven']];
  //array of responses to the choices
  var staticResponseArray = [['Click here to proceed'],['You should really start asking for some help', 'The TA helps you tweak your code and it\'s working, but not how you wanted it to work', 'The classmate helps you get un-stuck! They are also stuck, and you help them figure out what the problem was. You high five each other and finish your assignments while eating popcorn on the sofa (+5 grade, -10 social)', 'You\'re never gonna make it through this course if you give up that easily!'],['Oh man, that sucks! You should really keep better track of your < and > operators in your for loops!', 'Easy fix, just go ahead and append that child', 'Easy fix, go back to Atom, save, and try again', 'If your code is so perfect, what are you doing here? And hey, help your classmates once in a while!'] , ['Sorry to break it to you, it\'s not going to get any better on Monday (+20 health, -10 grade, +10 social)', 'What are you doing with your life, anyway?', 'It\'s not the worst idea...', 'It might be a little better, right?']];

  var uniqueClassPerResponse = [['proceed', 'proceed', 'proceed', 'proceed'], ['keepWorking', 'askTA', 'askClassmate', 'giveUp'], ['infinite', 'append', 'save', 'perfect'], ['cry', 'questioning', 'dropOut', 'sevenEleven']];
  // increments score
  var affectScore = [[[0, -25, 0], [0, +25, 0], [0, +25, +25], [-25, -25, -25]], [[0, -25, 0], [0, +25, 0], [0, 0, 0], [0, -25, -25]], [[-25, 0, -25], [-25, 0, -25], [-25, 0, -25], [-25, 0, -25]]];
  //array of randomly chosen questions
  var randomQuestionArray = [];
  //corresponding choices to the questions
  var randomChoiceArray = [];
  //corresponding responses to the choices
  var randomResponseArray = [];
  //array of boss images
  var bossImageArray = ['../images/cf_building.jpg'];
  //array of boss questions
  var bossQuestionArray = ['Adam uses busmall', 'Adam uses salmon cookies', 'Adam uses chocolate pizza', 'Adam uses about me'];
  //corresponding choices to questions
  var bossChoiceArray = [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']];
  //corresponding responses to choices
  var bossResponseArray = [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']];
  //collecting local storage from character page
  // var local = JASN.parse(localStorage);
  // console.log(local);
  //character constructor
  function Character(local) {
    this.name = local[0];
    this.image = local[1];
    this.health = 100;
    this.grade = 100;
    this.social = 100;
  }

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
      choiceEl.setAttribute('class', 'question ' + uniqueClassPerResponse[questionNum][i]);
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
        console.log('click');
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

  function renderTransition() {
    location.href = '../game/dayThree.html';
    // var hiddenButton = document.getElementById('link-to-week3');
    // hiddenButton.removeAttribute('class', 'hidden');
  }

});
