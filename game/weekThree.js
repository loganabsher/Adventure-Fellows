'use strict';
document.addEventListener('DOMContentLoaded', function () {
  var questionNum = 0;
  //array of phases/titles
  //array of place images
  var staticImageArray = [
    '../images/cf_building.jpg',
    '../images/cf_building.jpg',
    '../images/cf_building.jpg'
  ];
  //array of questions/events
  var staticQuestionArray = [
    'starting a project, how do you get it started?',
    'Your friends are concerned because they haven’t seen you for a while, what do you do?',
    'morale boost before boss battle'
  ];
  //array of choices for the questions
  var staticChoiceArray = [
    ['Stare at a blank screen until you give up (grade decreases) ', 'Start writing some code and hope that Shaia LeBouf’s magic comes along (grade increases)  ', 'Go to MDN and figure it out for yourself (grade increases a lot, social decreases)', 'Talk to the TAs and your classmates for inspiration (social increases, health and grade decrease)'],
    ['Leave campus early and meet them for dinner (social increases, grade decreases)  ', 'Finish your work and silence your phone (social decreases, grade increases)', 'Tell them you’re still alive and make plans for the weekend (social increases slightly, grade increases) ', 'Convince them to pick up carry-out and bring it to you (social decreases, grade increases)'],
    ['You survived three weeks of Code Fellows 201! You are amazing! You are almost finished with this course! You can do anything! You are awesome! Your friends are awesome! Your life is awesome!', 'But wait, there is one more week to go...', 'Can you survive...THE BOSS???', 'Use the skills you gained these past three weeks to defeat the BOSS!']
  ];
  //array of responses to the choices
  var staticResponseArray = [['Did you really think that would work?', 'Hey, you never know what Shia\'s capable of!', 'MDN is a great resource, after all.', 'Talking to TAs and classmates might help...or you might get distracted by GIFs and memes.'], ['leave campus early response placeholder', 'silence phone response placeholder', 'plans for weekend placeholder', 'friends bring carryout placeholder'], ['morale boost 1 response', 'morale boost 2 response', 'morale boost 3 reaponse', 'morale boost 4 response']];
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
    var hiddenButton = document.getElementById('link-to-boss');
    hiddenButton.removeAttribute('class', 'hidden');
  }

});
