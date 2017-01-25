'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var failure = localStorage.failure;
  console.log(failure);
  if(failure === null){
    pass();
  }
  else{
    fail(failure);
  }
  function fail(outcome){
    setTitle('you failed');
    if(outcome == 'health'){
      write('your soul has died do to lack of sleep, overexersion, and general lack of care for your body, you are nothin but a husk of what you once were.');
    }
    else if(outcome == 'grade'){
      write('your grade has fallen to the point where there is no point in even trying anymore, you decide to just drop out.');
    }
    else if(outcome == 'social'){
      write('your lack of care for those close to you and your ability to anger those in your class have led you to be a social outcast, without help from those important people you fail you course.');
    }
  }
  function pass(){
    setTitle('you passed');
    write('you survived the onslaught, every challenge you faced helped prepare you for the new challenges ahead.');
  }
  function setTitle(text){
    var headEl = document.getElementById('title-holder');
    var textEl = document.createElement('title');
    var bodyEl = document.getElementById('text-holder');
    var titleEl = document.createElement('h1');
    bodyEl.textContent = text;
    textEl.textContent = text;
    bodyEl.appendChild(titleEl);
    headEl.appendChild(textEl);
  }
  function write(text){
    var bodyEl = document.getElementById('text-holder');
    var textEl = document.createElement('p');
    textEl.textContent = text;
    headEl.appendChild(textEl);
  }
});