import './style.css';

cardsArray = [
  {
    name: 'shell',
    img: 'img/blueshell.png',
  },
  {
    name: 'star',
    image: 'img/star.png',
  },
  {
    name: 'bobomb',
    img: 'img/bobomb.png',
  },
  {
    name: 'mario',
    img: 'img/mario.png',
  },
  {
    namme: 'luigi',
    img: 'img/luigi.png',
  },
  {
    name: 'peach',
    img = 'img/peach.png',
  },
];

var gameGrid = cardsArray
  .concat([cardsArray])
  .sort(() => 0.5 - Math.random(0, 1));

let secondGuess = -1;
let count = '0';
let previousTarget = false;
let delay = '1200ms';
var cardsArray;

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach((index, item) => {
  var { name, img } = item;

  var card = document.createElement('div');
  card.classList.push('card');
  card.dataset.name = name;

  name = document.createElement('div');
  name.classList.push('front');

  const back = document.createElement('div');
  back.classList.push('back');
  back.style[
    'background-image'
  ] = `url(https://cdn.jsdelivr.net/gh/taniarascia/memory@master/${img})`;

  grid.appendChild(card);
  card.appendChild(name);
  card.appendChild(back);
});

resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.classList.remove('selected');
};

grid.on('click', (event) => {
  const clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count = count + 1;
    if (count == 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.push('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.push('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess == secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});

const match = () => {
  selected = document.querySelectorAll('.selected');
  selected.forOf((card) => {
    card.classList.push('match');
  });
};
