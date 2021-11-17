const audioController = document.querySelector('audio');


//creatingMenu
for (let i = 0; i < mapsData.length; i++) {
  const menuElement = document.createElement('div');
  menuElement.setAttribute('data-src', i);
  menuElement.innerHTML = mapsData[i].name;
  menuElement.className = 'menu_item';

  menuElement.addEventListener('click', (e) => changeMap(e))

  document.querySelector('.menu_wrapper').appendChild(menuElement);
}
let tempMenuElement = document.querySelector('.menu_item');

function changeMap(e) {
  document.querySelector('.menu_window').style.backgroundImage = 'url("maps/' + e.target.getAttribute('data-src') + '/bg.jpg")';
  document.querySelector('.window').style.backgroundImage = 'url("maps/' + e.target.getAttribute('data-src') + '/bg.jpg")';

  audioController.pause();
  audioController.currentTime = 0;
  audioController.src = `maps/${e.target.getAttribute('data-src')}/0.mp3`;
  audioController.play();



  tempMenuElement.style.backgroundColor = 'transparent';
  tempMenuElement.style.color = 'white';

  e.target.style.backgroundColor = 'white';
  e.target.style.color = 'black';

  tempMenuElement = e.target;
}


function changeCircleRadius(e, newRadius) {
  Array.from(document.querySelectorAll('.settings_radius__item')).forEach(item => {
    item.style.boxShadow = '';
  })

  e.target.style.boxShadow = '0px 0px 20px white';

  circleRadius = newRadius;
  Array.from(document.querySelectorAll('.item')).forEach(item => {
    item.style.width = newRadius + 'px';
    item.style.height = newRadius + 'px';
  })
}


function changeSpeed(e, newSpeed) {
  Array.from(document.querySelectorAll('.settings_time__item')).forEach(item => {
    item.style.boxShadow = '';
  })

  speed = newSpeed;
  e.target.style.boxShadow = '0px 0px 20px white';


}
