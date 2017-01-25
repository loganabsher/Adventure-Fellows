'use strict';
document.addEventListener('DOMContentLoaded', function () {
  var questionNum = 0;
  //array of place images
  var staticImageArray = ['../images/cartoon_console_question.jpeg', '../images/cartoon_space_needle.jpeg', '../images/cartoon_space_needle.jpeg'];
  //array of questions/events
  var staticQuestionArray = ['You are on your home directory of the terminal and following along, what do you type in the command line?', 'How do you spend the weekend?'];
  //array of choices for the questions
  var staticChoiceArray = [['rm –rf', 'cd codefellows/201', 'tree', 'cmatrix'], ['Go to the spa', 'study all weekend', 'go out for dinner and drinks with friends', 'sleep your standard eight hours, run, study']];
  //array of responses to the choices
  var staticResponseArray = [['You deleted all files on your machine, you can no longer continue in the class. (-100, health, -100 grade)', 'You follow along with the class, learing much about how to properly operate your computer.', 'You tree from your home directory, the files keep flying past your screen, it amazes you how many "interesting" files are on your computer ;). (+5 grade, -10 social)', 'You cmatrix and stare at the screen mesmorized by the falling matrix, you pay little attention to the lecture. (-10 grade)'], ['You go to the spa to rejuvenate and relax, sleeping in and lounging all weekend. (+20 health, -10 grade, +10 social)', 'You study very hard all weekend, not getting a chance to relax or see any friends. (+10 grade, - 15 social)', 'You go out drinking all weekend having a terrible hangover, but somehow on Monday your code is finished? (-15 health, +5 grade, +20 social)', 'You get your standard eight hours of sleep, go for a run, study and finish your homework like a productive member of society. (+5 health, +5 grade, -5 social)']];

  var uniqueClassPerResponse = [['rm-rf', 'cdCorrectly', 'tree', 'cmatrix'], ['spa', 'studyWeekend', 'dinner', 'sleepEight']];
  // increments score  pairpgrammed with Teddy
  var affectScore = [[[-100, -100, -100], [0, 0, +25], [0, 0, 0], [0, -25, 0]], [[+25, -25, 0], [-25, +25, -25], [-25, -25, +25], [+10, +10, +10]]];

  var increaseHealth = ['You go to the pharmacy and get a flu shot! Health increases', 'You get a good night’s sleep! Health increases', 'You decide to take a break! Health increases', 'You finish your project and leave early! Health increases', 'You have time to go to the gym! Health increases'];

  var decreaseHealth = ['You don\'t wash your hands and end up with the flu! Health decreases', 'Who has time to cook? Eat fast food instead! Health decreases', 'Stressed? Here\'s a case of insomnia! Health decreases', 'Work nonstop for 8 hours, who needs sleep anyway!? Health decreases', 'Walking home from school, pull a muscle! Health decreases'];

  var increaseGrade = ['Whoa! You aced your project! Grade increases', 'Your functions work on the first try! Grade increases', 'Your table renders properly on the first try! Grade increases', 'Chart.js renders a perfect chart. Look at those bars! Grade increases', 'Caffeination is perfect all day! Grade increases'];

  var decreaseGrade = ['You forget to ACP and lose all your code! Grade decreases', 'Oh no! You oversleep and miss code review and lecture! Grade decreases', 'Whoops! You forget to appendChild and your table looks like garbage! Grade decreases', 'You just broke your code and can’t figure out how to fix it! Grade decreases', 'Console.log returns NaN! What!? Grade decreases'];

  var increaseSocial = ['You sit with your classmates at lunch, make a new friend! Social increases', 'You help a classmate who is stuck, you\'re so nice! Social increases', 'A classmate is new to Seattle, you refer them to a great restaurant! Social increases', 'Go grab coffee with a classmate! Social increases', 'Share a snack with a classmate who is hangry, what a good friend! Social increases'];

  var decreaseSocial = ['You sit alone at lunch, man that sucks! Social decreases', 'A classmates asks for help, you say no. What a jerk! Social decreases', 'You\'re too tired to shower, develop B.O., no one wants to sit near you! Social decreases', 'You laugh when a classmate’s code doesn’t work. You\'re a terrible person! Social decreases', 'A classmate is new to Seattle, refer them to a bad restaurant. That\'s so mean! Social decreases'];

  var randomArrays = [increaseHealth, decreaseHealth, increaseGrade, decreaseGrade, increaseSocial, decreaseSocial];
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
  //checking to see if stats fall below 0
  function failureChecker(character){
    if(character.health <= 0){
      localStorage.setItem('failure', health);
      location.href = './outcome.html';
    }
    if(character.grade <= 0){
      localStorage.setItem('failure', grade);
      location.href = './outcome.html';
    }
    if(character.social <= 0){
      localStorage.setItem('failure', social);
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
    console.log('character ' + character);
    for (var i = 0; i < affectScore.length; i++) {
      console.log('affectScore: ' + affectScore);
      console.log('affectScore[responseIndex] = ' + affectScore[questionNum][responseIndex][0]);
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
    updateWithRandom(responseIndex);
  }
  //pair programmed with EVERYONE

  function handleChoiceClick() {    //renders the response
    var choicesCollection = document.getElementById('choices-list').children;
    var choicesArray = Array.prototype.slice.call(choicesCollection);

    choicesArray.forEach(function (choice) {
      choice.addEventListener('click', function () {
        renderResponse(this.id, questionNum);
        updateStats(this.id);
        updateWithRandom(this.id);
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
    trulyRandom();
  }

  function renderTransition() {           //reveals a hidden link to transition to week2
    var jCharacter = JSON.stringify(character); //wraps up character in JSON to send through
    localStorage.character = jCharacter;
    console.log(jCharacter);
    setTimeout(function () {
      location.href = '../game/weekTwo.html';
    }, 5000);
    // var hiddenLink = document.getElementById('link-to-week2');
    // hiddenLink.removeAttribute('class', 'hidden');
  }

  var randomNumberArray = Math.floor(Math.random() * 6);
  var randomNumberPrompt = Math.floor(Math.random() * 5);

  function displayRandomEvent() {
    alert (randomArrays[randomNumberArray][randomNumberPrompt]);
    console.log(randomArrays[randomNumberArray][randomNumberPrompt]);
  }
//pairprogrammed with Teddy
  var generateRandom = Math.random();

  function trulyRandom() {
    if (generateRandom > 0.5) {
      displayRandomEvent();
    }
  }

  function updateWithRandom(responseIndex) {

    console.log('we made it!');
    var responseIndex = parseInt(responseIndex);
    var character = JSON.parse(localStorage.character);
    if (increaseHealth.includes(randomArrays[randomNumberArray][randomNumberPrompt])) {
      character.health = character.health + 10;
      console.log(character.health);
    } else if (decreaseHealth.includes(randomArrays[randomNumberArray][randomNumberPrompt])) {
      character.health = character.health - 10;
      console.log(character.health);
    } else if (increaseGrade.includes(randomArrays[randomNumberArray][randomNumberPrompt])) {
      character.grade = character.grade + 10;
      console.log(character.grade);
    } else if (decreaseGrade.includes(randomArrays[randomNumberArray][randomNumberPrompt])) {
      character.grade = character.grade - 10;
      console.log(character.grade);
    } else if (increaseSocial.includes(randomArrays[randomNumberArray][randomNumberPrompt])) {
      character.social = character.social + 10;
      console.log(character.social);
    } else if (decreaseSocial.includes(randomArrays[randomNumberArray][randomNumberPrompt])) {
      character.social = character.social - 10;
      console.log(character.social);
    } else {
      console.log('oops!');
    }
  }
});
