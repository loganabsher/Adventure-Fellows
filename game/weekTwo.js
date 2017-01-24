'use strict';
document.addEventListener('DOMContentLoaded', function () {
  var questionNum = 0;
  //array of phases/titles
  //array of place images
  var staticImageArray = ['../images/cf_building.jpg', '../images/cf_building.jpg', '../images/cf_building.jpg'];
  //array of questions/events
  var staticQuestionArray = ['you get stuck when creating your salmon cookies form, what do you do?', 'Your table isn’t rendering correctly, what did you forget to do?', 'how do you spend your weekend?'];
  //array of choices for the questions
  var staticChoiceArray = [['Keep working', 'Ask a TA ', 'As a classmate', 'Give up and go home'], ['You set up an infinite loop', 'Forgot to append table', 'table choice placeholder #1', 'table choice placeholder #2'], ['Crying', 'Questioning your life choices', 'Considering dropping out', 'Applying for jobs as a barista']];
  //array of responses to the choices
  var staticResponseArray = [['(keep working response placeholder)', 'Ask a TA response placeholder', 'Ask A Classmate Response placeholder (+5 grade, -10 social)', 'give up response placeholder'],['infinite loop reponse placeholder', 'forgot to append table placeholder', 'table placeholder 1', 'table placeholder 2'] , ['spend weekend crying response placeholder (+20 health, -10 grade, +10 social)', 'questioning life placeholder', 'drop out placeholder', 'barista placeholder']];  //array of randomly chosen questions
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
    createDialogue(staticImageArray[questionNum], staticChoiceArray[questionNum], staticResponseArray[questionNum]);
    renderAvitarWithStats();
  }
  function renderAvitarWithStats(){
    var divEl = getElementById('avitar-stats');
  }

  //RENDERING PAGE
  function renderImage(image) {
    var pageEl = document.getElementById('place-image');
    var imageEl = document.createElement('img');
    imageEl.setAttribute('id', 'background-image');
    imageEl.setAttribute('src', image);
    pageEl.appendChild(imageEl);
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

  function removeChoiceElements() {
    var choicesList = document.getElementById('choices-list').children;
    var choicesArray = Array.prototype.slice.call(choicesList);
    choicesArray.forEach(function (choice) {
      choice.remove();
    });
  }

  function renderResponse(id, questionNum) {
    removeChoiceElements();

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
    var hiddenButton = document.getElementById('link-to-week3');
    hiddenButton.removeAttribute('class', 'hidden');
  }

});
