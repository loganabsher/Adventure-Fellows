'use strict';
document.addEventListener('DOMContentLoaded', function () {
  var questionNum = 0;
  //array of phases/titles
  //array of place images
  var staticImageArray = [
    '../images/cartoon_cf_building.jpg',
    '../images/cf_building.jpg',
    '../images/cf_building.jpg'
  ];
  //array of questions/events
  var staticQuestionArray = ['Yay! You survived the second week of Code Fellows 201! You\'re on a roll!', 'Time to start your week 3 project! How do you get started?', 'Your friends are concerned because they haven’t seen you for a while. They invite you out to dinner, but you can\'t figure out how to get your three images to display on the Busmall project. What do you do?', 'You survived three weeks of Code Fellows 201!'];
  //array of choices for the questions
  var staticChoiceArray = [['Let\'s Keep Going!'], ['Stare at a blank screen until you give up', 'Start writing some code and hope that Shia LaBeouf’s magic comes along', 'Go to MDN and figure it out for yourself ', 'Talk to the TAs and your classmates for inspiration '], ['Leave campus early and meet them for dinner', 'Finish your work and silence your phone', 'Tell them you’re still alive and make plans for the weekend', 'Convince them to pick up carry-out and bring it to you '], ['You are amazing!', 'You are almost finished with this course!', 'You can do anything!', 'You are awesome!']];
  //array of responses to the choices
  var staticResponseArray = [['Click here to proceed'], ['Did you really think that would work? (grade decreases)', 'Hey, you never know what he\'s capable of! (grade increases)', 'It\'s a great resource, after all (grade increases a lot, social decreases)', 'It might help...or you might get distracted by GIFs and memes (social increases, health and grade decrease)'], ['Your brain needed a break anyway (social increases, grade decreases)', 'Who needs friends anyway? (social decreases, grade increases)', 'Well, at least they won\'t file a missing person report. Yet. (social increases slightly, grade increases)', 'They might not appreciate it, but at least they\'ll get to see your face for a few seconds (social decreases, grade increases)'], ['Take a deep breath and relax... You\'re almost finished...', 'Take a deep breath and relax... You\'re almost finished...', 'Take a deep breath and relax... You\'re almost finished...', 'Take a deep breath and relax... You\'re almost finished...']];

  var uniqueClassPerResponse = [['proceed', 'proceed', 'proceed', 'proceed'], ['blank', 'magic', 'mdn', 'inspiration'], ['leaveEarly', 'silence', 'alive', 'carryOut'], ['amazing', 'finish', 'anything', 'awesome']];
  // increments score  pairpgrammed with Teddy
  var affectScore = [[[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, -25, 0], [0, +25, 0], [0, +25, -25], [-25, -25, +25]], [[0, -25, +25], [0, +25, -25], [0, +25, +25], [0, +25, -25]], [[+50, +50, +50], [+50, +50, +50], [+50, +50, +50], [+50, +50, +50]]];

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
  var character = JSON.parse(localStorage.character);
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
    handleChoiceClick();

  }

  function updateStats(responseIndex) {
    var responseIndex = parseInt(responseIndex);
    var character = JSON.parse(localStorage.character);
    // console.log(responseIndex);
    character.health = character.health + affectScore[questionNum][responseIndex][0];
    console.log('this.health ' + character.health);
    character.grade = character.grade + affectScore[questionNum][responseIndex][1];
    console.log('this.grade ' + character.grade);
    character.social = character.social + affectScore[questionNum][responseIndex][2];
    console.log('this.social ' + character.social);
    failureChecker();
    maxStatChecker();
  }

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

  //pair programmed with EVERYONE

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
        console.log('on question number#' + questionNum + 'updating stats...')
        updateStats(id);
        updateWithRandom(id);
        console.log(character);
      });
    } else {
      renderTransition();
    }
  }

  function clearElements() {
    questionNum++;              //after rendering response, move to next question

    console.log('incrementing...now on question at index: ', questionNum);

    var response = document.getElementById('response-paragraph');
    // console.log(response);
    var image = document.getElementById('background-image');
    // console.log('removing image');
    image.remove();
    response.remove();
    trulyRandom();
  }

  function renderTransition() {
    var jCharacter = JSON.stringify(character); //wraps up character in JSON to send through
    localStorage.character = jCharacter;
    setTimeout(function () {
      location.href = '../game/boss.html';
    }, 3000);
  }
  var randomNumberArray = Math.floor(Math.random() * 6);
  var randomNumberPrompt = Math.floor(Math.random() * 5);

  function displayRandomEvent() {
    alert(randomArrays[randomNumberArray][randomNumberPrompt]);
    // console.log(randomArrays[randomNumberArray][randomNumberPrompt]);
  }
  //pairprogrammed with Teddy
  var generateRandom = Math.random();

  function trulyRandom() {
    if (generateRandom > 0.5) {
      displayRandomEvent();
    }
  }

  function updateWithRandom(responseIndex) {
    var responseIndex = parseInt(responseIndex);
    console.log(character);
    if (increaseHealth.includes(randomArrays[randomNumberArray][randomNumberPrompt])) {
      character.health = character.health + 10;
    } else if (decreaseHealth.includes(randomArrays[randomNumberArray][randomNumberPrompt])) {
      character.health = character.health - 10;
    } else if (increaseGrade.includes(randomArrays[randomNumberArray][randomNumberPrompt])) {
      character.grade = character.grade + 10;
    } else if (decreaseGrade.includes(randomArrays[randomNumberArray][randomNumberPrompt])) {
      character.grade = character.grade - 10;
    } else if (increaseSocial.includes(randomArrays[randomNumberArray][randomNumberPrompt])) {
      character.social = character.social + 10;
    } else if (decreaseSocial.includes(randomArrays[randomNumberArray][randomNumberPrompt])) {
      character.social = character.social - 10;
    }
    console.log('update happened?');
    console.log(character);
  }
});
