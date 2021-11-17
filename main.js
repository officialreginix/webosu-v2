/* eslint-disable linebreak-style */
const circles = Array.from(document.querySelectorAll(".item"));
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
    this.dElement.addEventListener("click", (e) => {
      e.target.style.animationName = "circleClick";

      setTimeout(() => {
        if (Number(e.target.innerHTML) !== tempPlayerFigure) {
          alert("OrderMistake");
        }
        if (tempPlayerFigure === 10) {
          tempPlayerFigure = 1;
        } else {
          tempPlayerFigure += 1;
        }

        if (tempPlayerFigure === 9) {
          tempColor = renderRandmColor();
        }

        // aim
        const radius = Number(circleRadius) / 2;
        const middlePoint = [this.xCord + radius, this.yCord + radius];
        const clientPoint = [e.clientX, e.clientY];

        const dist = Math.sqrt(
          (middlePoint[0] - clientPoint[0]) ** 2 +
            (middlePoint[1] - clientPoint[1]) ** 2
        );
        const tempAim = 100 - (dist / radius) * 100;
        arrayForAim.push(tempAim);
        aim =
          arrayForAim.reduce((acc, currentValue) => acc + currentValue) /
          arrayForAim.length;
        document.querySelector(".aim").innerHTML = `${(aim + 20).toFixed(2)}%`;
        e.target.style.animationName = "none";
        // endAim

        // speed
        if (millisecondsID == false) {
          millisecondsID = setInterval(() => {
            milliseconds += 166;
          }, 166);
        } else {
          arrayOfMilliseconds.push(milliseconds);
          milliseconds = 0;

          const avgSpeed =
            arrayOfMilliseconds.reduce((acc, item) => acc + item) /
            arrayOfMilliseconds.length;
          playerSpeed = 60000 / avgSpeed;

          clearInterval(millisecondsID);
          millisecondsID = setInterval(() => {
            milliseconds += 50;
          }, 50);
        }
        document.querySelector(".speed").innerHTML = playerSpeed.toFixed(0);
        // endSpeed

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
        newY = Math.random() * (clientHeigth - circleRadius);

        let validation = true;

        circles.forEach((item) => {
          let circleTop = item.style.top;
          let circleLeft = item.style.left;

          circleTop = Number(circleTop.slice(0, circleTop.length - 2));
          circleLeft = Number(circleLeft.slice(0, circleTop.length - 2));

          if (
            Math.abs(newX - circleLeft) < circleRadius ||
            Math.abs(newY - circleTop) < circleRadius
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
  if (e.target.className != "item") {
    alert("MissClick");
  }
  clearTimeout(gameTimer);
  gameTimer = setTimeout(() => {
    alert("Time is out!");
  }, speed);
}

let circle1;
let circle2;
let circle3;

function startGame() {
  document.querySelector(".menu_window").style.display = "none";
  setTimeout(() => document.addEventListener("click", mistakesHandler), 0);

  circle1 = new Circle("first_item");
  circle2 = new Circle("second_item");
  circle3 = new Circle("third_item");
}

let tempColor = "red";

function renderRandmColor() {
  const newColor = [
    Math.random() * 255,
    Math.random() * 255,
    Math.random() * 255,
  ];

  return `rgb(${newColor[0]},${newColor[1]},${newColor[2]})`;
}

audioController.addEventListener("ended", () => {
  stopGame();
});

function stopGame() {
  // displayStats
  // reloadPage in 10 sec

  console.log("END");
}
