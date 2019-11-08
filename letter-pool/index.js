var g = {
  liveLetters: [],
  initialLetters: [],
  usedLetters: [],
  matchedLetters: [],
  matchIndexHistory: []
};

function makeArray(string) {
  return string.split('')
    .filter(char => /[\w]/i.test(char))
    .map(char => char.toLowerCase());
}

function showAvailable(someArr) {
  const joinArr = someArr.join('  ');
  $('#avail-letters').html(joinArr);
}

function updateLiveLetters() {
  g.matchIndexHistory.unshift(g.liveLetters.indexOf(g.usedLetters[0]));
  if (g.matchIndexHistory[0] >= 0) {
    g.matchedLetters.unshift(g.usedLetters[0]);
    g.liveLetters.splice(g.matchIndexHistory[0], 1);
  }
  showAvailable(g.liveLetters);
}

// display intial user input
$(document).ready(function () {
  $('#submit-button').click(function () {
    g.initialLetters = makeArray($('#text-input').val());
    g.liveLetters = g.initialLetters.filter(char => /[\w]/i.test(char));
    showAvailable(g.liveLetters);
    $('#input-form')[0].reset();
  });
});

// update liveLetters with 2nd input. show liveLetters
$(document).ready(function () {
  $('#new-text').keyup(function (event) {
    const inputVal = event.key;
    if (inputVal == 'Backspace' && g.matchIndexHistory[0] >= 0) {
      g.liveLetters.splice(g.matchIndexHistory[0], 0, g.matchedLetters[0]);
      g.matchIndexHistory.shift();
      g.usedLetters.shift();
      g.matchedLetters.shift();
      showAvailable(g.liveLetters);
    } else if (inputVal == 'Backspace') {
      g.matchIndexHistory.shift();
      g.usedLetters.shift();
    }
    else {
      g.usedLetters.unshift(inputVal);
      updateLiveLetters();
    }
  });
});