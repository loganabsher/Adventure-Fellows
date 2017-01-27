'use strict';
document.addEventListener('DOMContentLoaded', function () {
  //global counter
  var questionNum = 0;
  //array of place images
  var staticImageArray = ['../images/cartoon_cf_building.jpg', '../images/cartoon_lab_area.jpeg', '../images/cartoon_table_question.jpeg', '../images/cartoon_table_question.jpeg'];
  //array of questions/events
  var staticQuestionArray = ['Yay! You survived the first week of Code Fellows 201!', 'You get stuck when creating your salmon cookies form, what do you do?', 'Your table isn’t rendering correctly, what did you forget to do?', 'How do you spend your weekend?'];
  //array of choices for the questions
  var staticChoiceArray = [['Let\'s Keep Going!'], ['Keep working', 'Ask a TA ', 'As a classmate', 'Give up and go home'], ['You set up an infinite loop', 'Forgot to append table', 'Forgot to save before opening in browser', 'Nothing, my code is perfect and it\'s the code\'s fault'], ['Crying', 'Questioning your life choices', 'Considering dropping out', 'Applying for a job at 7-Eleven']];
  //array of responses to the choices
  var staticResponseArray = [['Click here to proceed'], ['You should really start asking for some help', 'The TA helps you tweak your code and it\'s working, but not how you wanted it to work', 'The classmate helps you get un-stuck! They are also stuck, and you help them figure out what the problem was. You high five each other and finish your assignments while eating popcorn on the sofa', 'You\'re never gonna make it through this course if you give up that easily!'], ['Oh man, that sucks! You should really keep better track of your < and > operators in your for loops!', 'Easy fix, just go ahead and append that child', 'Easy fix, go back to Atom, save, and try again', 'If your code is so perfect, what are you doing here? And hey, help your classmates once in a while!'], ['Sorry to break it to you, it\'s not going to get any better on Monday', 'What are you doing with your life, anyway?', 'It\'s not the worst idea...', 'It might be a little better, right?']];
  //unique classes, referenced for text glow
  var uniqueClassPerResponse = [['proceed', 'proceed', 'proceed', 'proceed'], ['keepWorking', 'askTA', 'askClassmate', 'giveUp'], ['infinite', 'append', 'save', 'perfect'], ['cry', 'questioning', 'dropOut', 'sevenEleven']];
  //score changes
  var affectScore = [[[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, -25, 0], [0, +25, 0], [0, +25, +25], [-25, -25, -25]], [[0, -25, 0], [0, +25, 0], [0, 0, 0], [0, -25, -25]], [[-25, 0, -25], [-25, 0, -25], [-25, 0, -25], [-25, 0, -25]]];
  //random increase health events
  var increaseHealth = ['You go to the pharmacy and get a flu shot! Health increases', 'You get a good night’s sleep! Health increases', 'You decide to take a break! Health increases', 'You finish your project and leave early! Health increases', 'You have time to go to the gym! Health increases'];
  //random decrease health events
  var decreaseHealth = ['You don\'t wash your hands and end up with the flu! Health decreases', 'Who has time to cook? Eat fast food instead! Health decreases', 'Stressed? Here\'s a case of insomnia! Health decreases', 'Work nonstop for 8 hours, who needs sleep anyway!? Health decreases', 'Walking home from school, pull a muscle! Health decreases'];
  //random increase grade events
  var increaseGrade = ['Whoa! You aced your project! Grade increases', 'Your functions work on the first try! Grade increases', 'Your table renders properly on the first try! Grade increases', 'Chart.js renders a perfect chart. Look at those bars! Grade increases', 'Caffeination is perfect all day! Grade increases'];
  //random decrease grade events
  var decreaseGrade = ['You forget to ACP and lose all your code! Grade decreases', 'Oh no! You oversleep and miss code review and lecture! Grade decreases', 'Whoops! You forget to appendChild and your table looks like garbage! Grade decreases', 'You just broke your code and can’t figure out how to fix it! Grade decreases', 'Console.log returns NaN! What!? Grade decreases'];
  //random increase social events
  var increaseSocial = ['You sit with your classmates at lunch, make a new friend! Social increases', 'You help a classmate who is stuck, you\'re so nice! Social increases', 'A classmate is new to Seattle, you refer them to a great restaurant! Social increases', 'Go grab coffee with a classmate! Social increases', 'Share a snack with a classmate who is hangry, what a good friend! Social increases'];
  //random decrease social events
  var decreaseSocial = ['You sit alone at lunch, man that sucks! Social decreases', 'A classmates asks for help, you say no. What a jerk! Social decreases', 'You\'re too tired to shower, develop B.O., no one wants to sit near you! Social decreases', 'You laugh when a classmate’s code doesn’t work. You\'re a terrible person! Social decreases', 'A classmate is new to Seattle, refer them to a bad restaurant. That\'s so mean! Social decreases'];
  //an array of all random events
  var randomArrays = [increaseHealth, decreaseHealth, increaseGrade, decreaseGrade, increaseSocial, decreaseSocial];
  //array of boss images
  var bossImageArray = ['../images/cartoon_table_question.jpg'];
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

  var ctx = document.getElementById('my-chart').getContext('2d');
  var health = document.getElementById('stats-health').textContent;
  var grade = document.getElementById('stats-grade').textContent;
  var social = document.getElementById('stats-social').textContent;
  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: ['Health', 'Grade', 'Social'],
      datasets: [{
        data: [health, grade, social],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          // 'rgba(75, 192, 192, 1)',
          // 'rgba(153, 102, 255, 1)',
          // 'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        display: false
      },
      responsive: false,
      scales: {
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
            max: 120
          }
        }],
        yAxes: [{
          ticks: {
            display: false,
          }
        }]
      }
    }
  });

  var character = JSON.parse(localStorage.character);
  console.log(character);
  renderPage();
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
  function renderPage() {
    renderImage(staticImageArray[questionNum]);
    renderAvatarAndStats();
    displayQuestionPrompt(questionNum);
    createDialogue(staticImageArray[questionNum], staticChoiceArray[questionNum], staticResponseArray[questionNum]);
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
    // console.log(responseIndex);
    character.health = character.health + affectScore[questionNum][responseIndex][0];
    console.log('character health ' + character.health);
    character.grade = character.grade + affectScore[questionNum][responseIndex][1];
    console.log('character grade ' + character.grade);
    character.social = character.social + affectScore[questionNum][responseIndex][2];
    console.log('character social ' + character.social);
    failureChecker();
    maxStatChecker();
  }
  //pair programmed with EVERYONE

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

  function handleChoiceClick() {    //renders the response
    var choicesCollection = document.getElementById('choices-list').children;
    var choicesArray = Array.prototype.slice.call(choicesCollection);

    choicesArray.forEach(function (choice) {
      choice.addEventListener('click', function () {
        renderAvatarAndStats();
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
        updateStats(id);
        updateWithRandom(id);
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
    image.remove();
    response.remove();
    trulyRandom();
  }

  function renderTransition() {
    localStorage.character = JSON.stringify(character);
    setTimeout(function () {
      location.href = '../game/weekThree.html';
    }, 3000);

  }
  var randomNumberArray = Math.floor(Math.random() * 6);
  var randomNumberPrompt = Math.floor(Math.random() * 5);

  function displayRandomEvent() {
    alert(randomArrays[randomNumberArray][randomNumberPrompt]);
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
    console.log('update happened? re-rendering');
    renderAvatarAndStats();
    console.log(character);
  }
});

function PlaySound(mySound) {
  var thissound = document.getElementById(mySound);
  thissound.play();
}
function StopSound(mySound) {
  var thissound = document.getElementById(mySound);
  thissound.pause();
  thissound.currentTime = 0;
}
