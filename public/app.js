const tweetElement = document.querySelector('#tweet');
const generateButton = document.querySelector('#generateButton');
const loadingElement = document.querySelector('#loading');
const tweetLink = document.querySelector('#tweetThis');

const rnn = ml5.charRNN('./models/tweets', modelLoaded);

function generate() {
  tweetElement.textContent = '';
  generateButton.setAttribute('disabled', true);
  loadingElement.style.display = '';
  tweetLink.textContent = '';
  rnn.generate({
    seed: 'Thanksgiving',
    length: 250,
    temperature: Math.random(),
  }, (err, results) => {
    loadingElement.style.display = 'none';
    const tweet = 'Thanksgiving ' + results.sample;
    tweetElement.textContent = tweet + ' #blessed';
    generateButton.removeAttribute('disabled');
    tweetLink.textContent = 'TWEET THIS';
    tweetLink.setAttribute('href', `https://twitter.com/intent/tweet?text=${tweet}&hashtags=blessed`);
  });
}

// When the model is loaded
function modelLoaded() {
  generate();
  generateButton.addEventListener('click', () => {
    generate();
  });
}
