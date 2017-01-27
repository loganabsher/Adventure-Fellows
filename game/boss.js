//this is Logan's monstrosity
'use strict';
document.addEventListener('DOMContentLoaded', function () {
  var count = 0;
  //array of boss images
  var bossImageArray = ['../images/angrierAdam.jpg', '../images/angryAdam.jpg', '../images/normalAdam.jpg', '../images/happyAdam.jpg', '../images/happierAdam.jpg'];
  //array of boss questions
  var bossQuestionArray = ['Adam uses Busmall, what is your response?', 'Adam uses Salmon Cookies, what is your response?', 'Adam uses Chocolate Pizza, what is your response?', 'Adam uses About Me, what is your response?', 'Adam uses DISAPPOINTMENT, what is your response?'];
  //corresponding choices to questions
  var bossChoiceArray = [['Cry and try to get him to raise your grade by taking pity on you.', 'Try your absolute best to finish the project.', 'Cheat off the smart people in the class.', 'Give up and go home.'], ['Stay up all night perfecting your project.', 'Wonder why anyone would want to eat salmon cookies.', 'Don\'t do the project and relax instead.', 'Check the internet for the answers you need.'], ['Spend ten hours trying to make the CSS work right.', 'Make it "good enough."', 'Think about food.', 'Contemplate life.'], ['Make it funny.', 'Make it serious.', 'Make it weird.', 'Make it right.'], ['Try to appeal to his empathy.', 'Tell your mom on him.', 'Threaten him.', 'Bribe him.']];
  //corresponding responses to choices
  var bossResponseArray = [['Adam takes no pity!', 'Failure is inevitable!', 'Everyone in class now despises you for taking the easy way out.', 'You don\'t turn in the project and relax instead.'], ['You are very tired but things work out for you.', 'That is a very good question but your project is still lacking.', 'You have plenty of time to see friends and recover from the onslaught, but your grade begins to suffer.', 'The internet has all the answers, but not always the right ones, you are docked for not following directions.'], ['You spend all your time finicking with the CSS, your soul is fading from your body.', 'You do your best but you can\'t seem to get everything to stay the way you want it.', 'You spend your time thinking about what makes you happy, it is very theraputic.', 'You contemplate the fine details of your existence.'], ['You try your best to make your page as funny as can be to make a good impression on the class, but your TA\'s are not amused.', 'You make your pages serious so other people understand you are not to be messed with.', 'You try to let out your inner weirdness to the class, some people actually relate.', 'You just make sure to have all the requirements for the project and nothing else.'], ['No effect.', 'Your mom comes to class and has a word with this "Mr. Adam" she\'s heard so much about, you don\'t know what she said but it seems to have worked.', 'You threaten Adam to raise your grade, which was not the smartest idea, and you were thrown out of class.', 'You attempt to bribe him, everyone now knows your evil ways.']];
  //corresponding effects per response
  var affectScore = [[[-10, -5, +5], [-10, -5, +5], [+10, +10, -50], [+20, -15, +20]], [[-10, +10, -10], [+10, -15, +15], [+20, -10, +25], [+5, -5, +0]], [[-20, +5, +0], [+0, -5, +0], [+15, -10, +0], [-10, -10, -10]], [[+0, -10, +20], [+0, +5, -10], [+0, +0, +10], [+0, +5, -5]], [[+0, -10, -10], [+0, +10, -50], [+0, -100, -100], [+0, -10, -40]]];
  var uniqueClassPerResponse = [['busmall', 'busmall', 'busmall', 'busmall'], ['salmon cookies', 'salmon cookies', 'salmon cookies', 'salmon cookies'], ['chocolate pizza', 'chocolate pizza', 'chocolate pizza', 'chocolate pizza'], ['about me', 'about me', 'about me', 'about me'], ['disapointment', 'disapointment', 'disapointment', 'disapointment']];
  //character constructor
  var questionNum = randomNum(bossQuestionArray.length - 1, 0);
  var character = JSON.parse(localStorage.character);
  //creaing new character from local storage/replacing default values
  console.log(character);
  //checking to see if stats fall below 0
  function failureChecker() {
    if (character.health <= 0) {
      localStorage.setItem('failure', 'health');
      location.href = './outcome.html';
    }
    if (character.grade <= 0) {
      localStorage.setItem('failure', 'grade');
      location.href = './outcome.html';
    }
    if (character.social <= 0) {
      localStorage.setItem('failure', 'social');
      location.href = './outcome.html';
    }
  }
  //making sure stats don't go over the max ammount
  function maxStatChecker() {
    if (character.health >= 120) {
      character.health = 120;
      console.log('exceeding max health, health reset to: ' + character.health);
    }
    if (character.grade >= 120) {
      character.grade = 120;
      console.log('exceeding max grade, grade reset to: ' + character.grade);
    }
    if (character.social >= 120) {
      character.social = 120;
      console.log('exceeding max social, social reset to: ' + character.social);
    }
  }
  renderPage();
  function randomNum(max, min) {
    return Math.round(Math.random() * max + min);
  }
  function renderPage() {
    questionNum = randomNum(bossQuestionArray.length - 1, 0);
    renderImage(bossImageArray[questionNum]);
    renderAvatarAndStats();
    displayQuestionPrompt(questionNum);
    createDialogue(bossImageArray[questionNum], bossChoiceArray[questionNum], bossResponseArray[questionNum]);
  }

  //RENDERING PAGE
  function renderImage(image) {
    var pageEl = document.getElementById('character-avatar-pane');
    var imageEl = document.createElement('img');
    imageEl.setAttribute('id', 'background-image');
    imageEl.setAttribute('src', image);
    pageEl.appendChild(imageEl);
  }

  function renderAvatarAndStats() {
    //sets image and background-color from localStorage
    var avatarImage = document.getElementById('avatar-image');
    avatarImage.style['background-color'] = localStorage['background-color'];
    avatarImage.src = localStorage.imgUrl;

    //stats
    var statsGrade = document.getElementById('stats-grade');
    statsGrade.textContent = character.grade;
    var statsHealth = document.getElementById('stats-health');
    statsHealth.textContent = character.health;
    var statsSocial = document.getElementById('stats-social');
    statsSocial.textContent = character.social;
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
    // var character = JSON.parse(localStorage.character);  //character is already a global variable
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
        renderAvatarAndStats();
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
    if (character.grade > 90 && count > 5) {
      console.log('win');
      renderTransition();
    }
    else {
      responsePar.addEventListener('click', function () {   //when click, clear DOM elements and render new
        clearElements();
        renderPage();
        count++;
      });
    }
  }

  function clearElements() {              //after rendering response, move to next question
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
    localStorage.setItem('failure', 'win');
    console.log(jCharacter);
    location.href = './outcome.html';
    // var hiddenLink = document.getElementById('link-to-week2');
    // hiddenLink.removeAttribute('class', 'hidden');
  }
});
