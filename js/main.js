/* eslint-disable linebreak-style */
const circles = Array.from(document.querySelectorAll('.item'));
// var for figure inside circle
let innerFigure = 1;
// var that determinate order of clicked circle
let tempPlayerFigure = 1;

const arrayForAim = [];
let aim;

const arrayOfMilliseconds = [];
let millisecondsID = false;
let milliseconds = 0;
let playerSpeed = 0;

class Circle {
  constructor(dElementId) {
    this.xCord = 0;
    this.yCord = 0;
    this.dElement = document.querySelector(`#${dElementId}`);
    this.dElement.addEventListener('click', ({
      target,
      clientX,
      clientY,
    }) => {
      target.style.animationName = 'circleClick';
      target.style.zIndex = '1';

      setTimeout(() => {
        if (Number(target.innerHTML) !== tempPlayerFigure) {
          alert('OrderMistake');
          return;
        }
        if (tempPlayerFigure === 10) {
          tempPlayerFigure = 1;
        } else {
          tempPlayerFigure += 1;
        }

        if (tempPlayerFigure === 10 - (countOfCircles - 2)) {
          tempColor = renderRandmColor();
        }

        // aim
        const radius = Number(circleRadius) / 2;
        const middlePoint = [this.xCord + radius, this.yCord + radius];
        const clientPoint = [clientX, clientY];

        const dist = Math.sqrt(
          (middlePoint[0] - clientPoint[0]) ** 2
          + (middlePoint[1] - clientPoint[1]) ** 2,
        );
        const tempAim = 100 - (dist / radius) * 100;
        arrayForAim.push(tempAim);
        aim = arrayForAim.reduce((acc, currentValue) => acc + currentValue)
          / arrayForAim.length;
        document.querySelector('.aim').innerHTML = `${(aim + 20).toFixed(2)}%`;
        target.style.animationName = 'none';
        // endAim

        // speed
        if (millisecondsID == false) {
          millisecondsID = setInterval(() => {
            milliseconds += 166;
          }, 166);
        } else {
          arrayOfMilliseconds.push(milliseconds);
          milliseconds = 0;

          const avgSpeed = arrayOfMilliseconds.reduce((acc, item) => acc + item)
            / arrayOfMilliseconds.length;
          playerSpeed = 60000 / avgSpeed;

          clearInterval(millisecondsID);
          millisecondsID = setInterval(() => {
            milliseconds += 50;
          }, 50);
        }
        document.querySelector('.speed').innerHTML = playerSpeed.toFixed(0);
        // endSpeed

        // for prevent clicks
        target.style.zIndex = '2';

        this.render();
      }, 100);
    });
    this.render();
  }

  async render() {
    let newX;
    let newY;

    async function rerender() {
      while (true) {
        newX = Math.random() * (clientWidth - circleRadius);
        newY = Math.random() * (clientHeight - circleRadius);

        let validation = true;

        circles.forEach((item) => {
          let circleTop = item.style.top;
          let circleLeft = item.style.left;

          circleTop = Number(circleTop.slice(0, circleTop.length - 2));
          circleLeft = Number(circleLeft.slice(0, circleTop.length - 2));

          if (
            Math.abs(newX - circleLeft) < Number(circleRadius)
            || Math.abs(newY - circleTop) < Number(circleRadius)
          ) {
            validation = false;
          }
        });

        if (validation) break;
      }
    }
    await rerender();
    this.xCord = newX;
    this.yCord = newY;
    this.dElement.style.left = `${newX}px`;
    this.dElement.style.top = `${newY}px`;
    this.dElement.innerHTML = innerFigure;
    this.dElement.style.backgroundColor = tempColor;

    if (innerFigure < 10) {
      innerFigure += 1;
    } else {
      innerFigure = 1;
    }
  }
}

let gameTimer;

function mistakesHandler(e) {
  if (e.target.className != 'item') {
    alert('MissClick');
  }
  clearTimeout(gameTimer);
  gameTimer = setTimeout(() => {
    alert('Time is out!');
  }, speed);
}

function startGame() {
  document.querySelector('.menu_window').style.display = 'none';
  setTimeout(() => document.addEventListener('click', mistakesHandler), 0);

  for (let i = 1; i <= countOfCircles; i += 1) {
    arrayOfCircles.push(new Circle(`circle_id_${i}`));
  }
}

let tempColor = 'red';

function renderRandmColor() {
  const newColor = [
    Math.random() * 255,
    Math.random() * 255,
    Math.random() * 255,
  ];

  return `rgb(${newColor[0]},${newColor[1]},${newColor[2]})`;
}

audioController.addEventListener('ended', () => {
  stopGame();
});

function stopGame() {
  document.querySelector('.window').style.display = 'none';
  document.querySelector('.menu_window').style.display = 'none';
  document.querySelector('#result_aim').innerHTML = `${aim.toFixed(2)}%`;
  document.querySelector('#result_speed').innerHTML = playerSpeed.toFixed(0);
  document.removeEventListener('click', mistakesHandler);

  console.log('END');
}
