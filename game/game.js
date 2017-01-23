'use strict';

document.addEventListener('DOMContentLoaded', function() {
  console.log('okay');
  var staticChoiceArray = [];
  var staticResponseArray = [];
  var randomChoiceArray = [];
  var randomResponseArray = [];

  function Character(name){
    this.name = name;
    this.health = 100;
    this.grade = 100;
    this.social = 100;
  }

  var player = new Character('name');
  console.log(player.name);

});
