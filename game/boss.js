//this is Logan's monstrosity
'use strict';
document.addEventListener('DOMContentLoaded', function () {
  var count = 0;
  //array of boss images
  var bossImageArray = ['../images/angrierAdam.jpg', '../images/angryAdam.jpg', '../images/normalAdam.jpg', '../images/happyAdam.jpg','../images/happierAdam.jpg'];
  //array of boss questions
  var bossQuestionArray = ['Adam uses busmall, what is your response?', 'Adam uses salmon cookies, what is your response?', 'Adam uses chocolate pizza, what is your response?', 'Adam uses about me, what is your response?', 'Adam uses disapointment, what is your response?'];
  //corresponding choices to questions
  var bossChoiceArray = [['cry and try to get them to raise your grade by taking pitty on you.', 'try you absolute best to finish the project.', 'cheat off the smart people in the class.', 'give up and go home.'], ['stay up all night perfecting your project.', 'wonder why anyone would want to eat salmon cookies.', 'don\'t do the project and relax instead.', 'check the internet for the answers you need.'], ['spend ten hours trying to make the CSS work right.', 'make it \"good enough.\"', 'think about food.', 'contemplate life.'], ['make it funny.', 'make it serious.', 'make it weird.', 'make it right.'], ['try to apeal to his empathy.', 'tell your mom on him.', 'threaten him.', 'bribe him.']];
  //corresponding responses to choices
  var bossResponseArray = [['Adam takes no pitty. (-10 health, -5 grade, -20 social)', 'failure is inevitable. (-10 health, -5 grade, +5 social)', 'everyone in class now dispises you for taking the easy way out. (+10 health, +10 grade, -50 social)', 'you don\'t turn in the project and relax instead. (+20 health, -15 grade, +20 social)'], ['you are very tired but things work out for you. (-10 health, +10 grade, -10 social)', 'that is a very good question but your project is still lacking. (+10 health, -15 grade, +15 social)', 'you have plenty of time to see friends and recover from the onslaught, but your grade begins to suffer. (+20 health, -10 grade, +25 social)', 'the internet has all the answers, but not always the right ones, you are docked for not following directions. (+5 health, -5 grade)'], ['you spend all your time finiking with the CSS, your soul is fading from your body. (-20 health, +5 grade)', 'you do your best but you can\'t seem to get everything to stay the way you want it. (-5 grade)', 'you spwnd your time thinking about what makes you happy, it is very theraputic. (+15 health, -10 grade)', 'you contemplate the fine detailes of your existence. (-10 health, -10 grade, -10 social)'], ['you try your best to make your page as funny as can be to make a good impression on the class, but your TA\'s are not ammused. (-10 grade, +20 social)', 'you make your pages serious so you are sure other people understand you are not to be messed with. (+5 grade, -10 social)', 'you try to let out your inner weirdness to the class, some people actually relate. (+10 social)', 'you just make sure to have all the requirements for the project and nothing else. (+5 grade, -5 social)'], ['no effect. (-10 grade, -10 social)', 'your mom comes to class and has a word with this "Mr. Adam" she\'s heard so much about, you don\'t know what she said but it seems to have worked. (+10 grade, -50 social)', 'you threaten Adam to raise your grade, not the smartest idea, you were thrown out of class. (-100 grade, -100 social)', 'you attempt to bribe him, everyone now knows your evil ways. (-10 grade, -40 social)']];
  //corresponding effects per response
  var affectScore = [[[-10, -5, +5], [-10, -5, +5], [+10, +10, -50], [+20, -15, +20]], [[-10, +10, -10], [+10, -15, +15], [+20, -10, +25], [+5, -5, +0]], [[-20, +5, +0], [+0, -5, +0], [+15, -10, +0], [-10, -10, -10]], [[+0, -10, +20], [+0, +5, -10], [+0, +0, +10], [+0, +5, -5]], [[+0, -10, -10], [+0, +10, -50], [+0, -100, -100], [+0, -10, -40]]];
  var uniqueClassPerResponse = [['bussmall', 'bussmall', 'bussmall', 'bussmall'], ['salmon cookies', 'salmon cookies', 'salmon cookies', 'salmon cookies'], ['chocolate pizza', 'chocolate pizza', 'chocolate pizza', 'chocolate pizza'], ['about me', 'about me', 'about me', 'about me'], ['disapointment', 'disapointment', 'disapointment', 'disapointment']];
  //character constructor
  var questionNum = randomNum(bossQuestionArray.length - 1, 0);
  function Character(name, image) {
    this.name = name;
    this.image = image;
    this.health = 100;
    this.grade = 100;
    this.social = 100;
  }
//creaing new character from local storage/replacing default values
  var character = new Character(localStorage.userName, localStorage.image);
  console.log(character);
//checking to see if stats fall below 0
  function failureChecker(character){
    if(character.health <= 0){
      localStorage.setItem('failure', 'health');
      location.href = './outcome.html';
    }
    if(character.grade <= 0){
      localStorage.setItem('failure', 'grade');
      location.href = './outcome.html';
    }
    if(character.social <= 0){
      localStorage.setItem('failure', 'social');
      location.href = './outcome.html';
    }
  }
//making sure stats don't go over the max ammount
  function maxStatChecker(character){
    if(character.health >= 120){
      character.health = 120;
      console.log('exceeding max health, health reset to: ' + character.health);
    }
    if(character.grade >= 120){
      character.grade = 120;
      console.log('exceeding max grade, grade reset to: ' + character.grade);
    }
    if(character.social >= 120){
      character.social = 120;
      console.log('exceeding max social, social reset to: ' + character.social);
    }
  }
  renderPage();
  function randomNum(max, min){
    return Math.round(Math.random() * (max - min) + min);
  }
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
    handleChoiceClick();
  }

  function updateStats(responseIndex) {
    var responseIndex = parseInt(responseIndex);
    var character = JSON.parse(localStorage.character);
    console.log(responseIndex);
    character.health = character.health + affectScore[questionNum][responseIndex][0];
    console.log('this.health ' + character.health);
    character.grade = character.grade + affectScore[questionNum][responseIndex][1];
    console.log('this.grade ' + character.grade);
    character.social = character.social + affectScore[questionNum][responseIndex][2];
    console.log('this.social ' + character.social);
    failureChecker(character);
    maxStatChecker(character);
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
    if(character.grade > 90 && count > 5){
      console.log('win');
      renderTransition();
    }
    else{
      responsePar.addEventListener('click', function () {   //when click, clear DOM elements and render new
        clearElements();
        renderPage();
        count++;
      });
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
//adding change
  function renderTransition() {           //reveals a hidden link to transition to week2
    var jCharacter = JSON.stringify(character); //wraps up character in JSON to send through
    localStorage.character = jCharacter;
    localStorage.setItem('failure', null);
    console.log(jCharacter);
    location.href = './outcome.html';
    // var hiddenLink = document.getElementById('link-to-week2');
    // hiddenLink.removeAttribute('class', 'hidden');
  }
});
