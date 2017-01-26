'use strict';
document.addEventListener('DOMContentLoaded', function () {
  //global counter
  var questionNum = 0;
  //array of place images
  var staticImageArray = ['../images/cartoon_console_question.jpeg', '../images/cartoon_space_needle.jpeg', '../images/cartoon_space_needle.jpeg'];
  //array of questions/events
  var staticQuestionArray = ['You are on your home directory of the terminal and following along, what do you type in the command line to access the class directory?', 'How do you spend the weekend?'];
  //array of choices for the questions
  var staticChoiceArray = [['rm –rf', 'cd codefellows/201', 'tree', 'cmatrix'], ['Go to the spa', 'Study all weekend', 'Go out for dinner and drinks with friends', 'Sleep your standard eight hours, run, and study']];
  //array of responses to the choices
  var staticResponseArray = [['You deleted all files on your machine, you can no longer continue in the class.', 'You follow along with the class, learing about how to properly operate your computer.', 'You tree from your home directory, the files keep flying past your screen, it amazes you how many "interesting" files are on your computer ;)', 'You cmatrix and stare at the screen mesmorized by the falling matrix, you pay little attention to the lecture.'], ['You go to the spa to rejuvenate and relax, sleeping in and lounging all weekend.', 'You study very hard all weekend, not getting a chance to relax or see any friends.', 'You go out drinking all weekend and have a terrible hangover, but somehow on Monday your code is finished?', 'You get your standard eight hours of sleep, go for a run, study and finish your homework like a productive member of society.']];
  //unique classes, referenced for text glow
  var uniqueClassPerResponse = [['rm-rf', 'cdCorrectly', 'tree', 'cmatrix'], ['spa', 'studyWeekend', 'dinner', 'sleepEight']];
  //score changes
  var affectScore = [[0, 0, 0], [[0, -120, 0], [0, +25, 0], [0, 0, 0], [0, -25, 0]], [[+25, -25, 0], [-25, +25, -25], [-25, -25, +25], [+10, +10, +10]]];
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
  //character constructor
  function Character() {
    console.log('constructing character');
    this.name = localStorage.userName;
    this.image = localStorage.imgUrl;
    this.health = parseInt(localStorage.health);
    this.grade = parseInt(localStorage.grade);
    this.social = parseInt(localStorage.social);
    this.character = JSON.stringify(this);
  }
  function renderStatsChart() {
    var ctx = document.getElementById('my-chart').getContext('2d');
    var health = document.getElementById('stats-health').textContent;
    var grade = document.getElementById('stats-grade').textContent;
    var social = document.getElementById('stats-social').textContent;

    console.log(health);
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
  }
  //creaing a new character with character data
  var character = new Character();
  //checking to see if stats fall below 0, if so it links to outcome with a failure tag in local storage
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
  function maxStatChecker(){
    if(character.health >= 120){
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
  //creates an image in the middle of the screen
  function renderImage(image){
    var pageEl = document.getElementById('place-image');
    var imageEl = document.createElement('img');
    imageEl.setAttribute('id', 'background-image');
    imageEl.setAttribute('src', image);
    pageEl.appendChild(imageEl);
  }
  //sets image and background-color from localStorage
  function renderAvatarAndStats(){
    var avatarImage = document.getElementById('avatar-image');
    avatarImage.style['background-color'] = localStorage['background-color'];
    avatarImage.src = localStorage.imgUrl;
    //stats for chart.js
    var statsGrade = document.getElementById('stats-health');
    statsGrade.textContent = character.health;
    var statsGrade = document.getElementById('stats-grade');
    statsGrade.textContent = character.grade;
    var statsGrade = document.getElementById('stats-social');
    statsGrade.textContent = character.social;
  }
  //chooses a question from the question array using questionNum
  function displayQuestionPrompt(questionNum){
    var questionContainer = document.getElementById('prompt');
    var displayQuestionEl = document.createElement('p');
    displayQuestionEl.setAttribute('id', 'questionNum');
    displayQuestionEl.textContent = staticQuestionArray[questionNum];
    questionContainer.appendChild(displayQuestionEl);
  }
  //pulls an array of four options from questionNum index
  function createDialogue(image, choices, responses){
    var gameText = document.getElementById('game-text');
    for (var i = 0; i < choices.length; i++) {
      var choiceEl = document.createElement('li');
      choiceEl.setAttribute('class', 'question ' + uniqueClassPerResponse[questionNum][i]);
      choiceEl.setAttribute('id', i);
      choiceEl.textContent = choices[i];
      var choicesList = document.getElementById('choices-list');
      choicesList.appendChild(choiceEl);
    }
    //adds event listeners to choice's ID
    handleChoiceClick();
  }
  //gets stats and finds affects from affectScore array, applies affects to stats
  function updateStats(responseIndex){
    var responseIndex = parseInt(responseIndex);
    character.health = character.health + parseInt(affectScore[questionNum][responseIndex][0]);
    console.log('this.health ' + character.health);
    character.grade = character.grade + affectScore[questionNum][responseIndex][1];
    console.log('this.grade ' + character.grade);
    character.social = character.social + affectScore[questionNum][responseIndex][2];
    console.log('this.social ' + character.social);
    //checking to see if any stats go to high or low
    failureChecker();
    maxStatChecker();
  }
  //pair programmed with EVERYONE
  //renders the response
  function handleChoiceClick(){
    var choicesCollection = document.getElementById('choices-list').children;
    var choicesArray = Array.prototype.slice.call(choicesCollection);
    choicesArray.forEach(function (choice) {
      choice.addEventListener('click', function () {
        renderAvatarAndStats();
        renderResponse(this.id, questionNum);
      });
    });
  }
  //removes child from diolgue box
  function removePrompt(){
    var promptParent = document.getElementById('prompt');
    var promptChild = document.getElementById('questionNum');
    promptParent.removeChild(promptChild);
  }
  //removes the choice elements
  function removeChoiceElements(){
    var choicesList = document.getElementById('choices-list').children;
    var choicesArray = Array.prototype.slice.call(choicesList);
    choicesArray.forEach(function (choice) {
      choice.remove();
    });
  }
  //acesses the response based on the user's choice and removes old elements
  function renderResponse(id, questionNum){
    removeChoiceElements();
    removePrompt();
    var gameText = document.getElementById('game-text');  //append response to textContent div
    var responsePar = document.createElement('p');
    responsePar.setAttribute('id', 'response-paragraph');
    var responseId = parseInt(id);
    responsePar.textContent = staticResponseArray[questionNum][id];
    gameText.appendChild(responsePar);
    if (questionNum < staticQuestionArray.length - 1) {
      responsePar.addEventListener('click', function () {   //when click, clear DOM elements and render new
        console.log('updatingStats');
        clearElements();
        renderPage();
        updateStats(id);
        console.log(character);
        updateWithRandom(id);
      });
    } else {
      renderTransition();
    }
  }
  //clears response and incraments questionNum
  function clearElements(){
    questionNum++;
    var response = document.getElementById('response-paragraph');
    var image = document.getElementById('background-image');
    image.remove();
    response.remove();
    //plays a random events
    trulyRandom();
  }
  //if questionNum reaches the number of weeks, links to the next week
  function renderTransition(){
    //wraps up character in JSON to send through
    var jCharacter = JSON.stringify(character);
    localStorage.character = jCharacter;
    //creates a delay before going on to next page
    setTimeout(function () {
      location.href = '../game/weekTwo.html';
    }, 2000);
  }
  var randomNumberArray = Math.floor(Math.random() * 6);
  var randomNumberPrompt = Math.floor(Math.random() * 5);
  //gives an alert from a random selector
  function displayRandomEvent() {
    alert(randomArrays[randomNumberArray][randomNumberPrompt]);
    console.log(randomArrays[randomNumberArray][randomNumberPrompt]);
  }
  //pairprogrammed with Teddy
  var generateRandom = Math.random();
  //creates random number
  function trulyRandom() {
    if (generateRandom > 0.5) {
      displayRandomEvent();
    }
  }
  //updates stats for random events
  function updateWithRandom(responseIndex) {
    console.log('we made it!');
    var responseIndex = parseInt(responseIndex);
    if (increaseHealth.includes(randomArrays[randomNumberArray][randomNumberPrompt])) {
      character.health = parseInt(character.health) + 10;
    } else if (decreaseHealth.includes(randomArrays[randomNumberArray][randomNumberPrompt])) {
      character.health = parseInt(character.health) - 10;
    } else if (increaseGrade.includes(randomArrays[randomNumberArray][randomNumberPrompt])) {
      character.grade = parseInt(character.grade) + 10;
    } else if (decreaseGrade.includes(randomArrays[randomNumberArray][randomNumberPrompt])) {
      character.grade = parseInt(character.grade) - 10;
    } else if (increaseSocial.includes(randomArrays[randomNumberArray][randomNumberPrompt])) {
      character.social = parseInt(character.social) + 10;
    } else if (decreaseSocial.includes(randomArrays[randomNumberArray][randomNumberPrompt])) {
      character.social = parseInt(character.social) - 10;
    } else {
      console.log('oops!');
    }
    //checking stats
    failureChecker();
    maxStatChecker();
  }
  //renders page
  function renderPage() {
    renderImage(staticImageArray[questionNum]);
    renderAvatarAndStats();
    displayQuestionPrompt(questionNum);
    createDialogue(staticImageArray[questionNum], staticChoiceArray[questionNum], staticResponseArray[questionNum]);
  }
  renderPage();
  renderStatsChart();
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
