const audioController = document.querySelector('audio');

// creatingMenu
mapsData.forEach((item, index) => {
  const menuElement = document.createElement('div');
  menuElement.setAttribute('data-src', index);
  menuElement.innerHTML = item;
  menuElement.className = 'menu_item';

  menuElement.addEventListener('click', (e) => changeMap(e));

  document.querySelector('.menu_wrapper').appendChild(menuElement);
});

let tempMenuElement = document.querySelector('.menu_item');

function changeMap({
  target,
}) {
  document.querySelector('.menu_window').style.backgroundImage = `url("maps/${target.getAttribute('data-src')}/bg.jpg")`;
  document.querySelector('.window').style.backgroundImage = `url("maps/${target.getAttribute('data-src')}/bg.jpg")`;
  document.querySelector('.results_window').style.backgroundImage = `url("maps/${target.getAttribute('data-src')}/bg.jpg")`;

  audioController.pause();
  audioController.currentTime = 0;
  audioController.src = `maps/${target.getAttribute('data-src')}/0.mp3`;
  audioController.play();

  tempMenuElement.style.backgroundColor = 'transparent';
  tempMenuElement.style.color = 'white';

  target.style.backgroundColor = 'white';
  target.style.color = 'black';

  tempMenuElement = target;
}

function changeCircleRadius(e, newRadius) {
  Array.from(document.querySelectorAll('.settings_radius__item')).forEach((item) => {
    item.style.boxShadow = '';
  });

  e.target.style.boxShadow = '0px 0px 20px white';

  circleRadius = newRadius;
  Array.from(document.querySelectorAll('.item')).forEach((item) => {
    item.style.width = `${newRadius}px`;
    item.style.height = `${newRadius}px`;
  });
}

function changeSpeed(e, newSpeed) {
  Array.from(document.querySelectorAll('.settings_time__item')).forEach((item) => {
    item.style.boxShadow = '';
  });

  speed = newSpeed;
  e.target.style.boxShadow = '0px 0px 20px white';
}
