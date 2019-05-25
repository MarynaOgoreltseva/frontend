//ajaxRequest
let ajax = new XMLHttpRequest();
      
ajax.open('GET', 'playlist.json', true);
ajax.onreadystatechange = function() {

  if(ajax.readyState != 4) {
    return;
  } 
  const TEMPLATE = document.querySelector('._template');
  const UL = document.querySelector('._contentSong');


  JSON.parse(ajax.responseText).forEach((item) => {
    const CLONE_TEMPLATE = TEMPLATE.content.cloneNode(true);
    CLONE_TEMPLATE.querySelector('._contentTrackName').innerText = item.track;
    CLONE_TEMPLATE.querySelector('audio').setAttribute('src', ('track/' + item.file));
    if (item.image == null) {
      item.image = 'placeholder.png';
    }
    CLONE_TEMPLATE.querySelector('._trackPicture').setAttribute('src', ('img/' + item.image));
    CLONE_TEMPLATE.querySelector('._trackAuthor').innerText = item.author;
    UL.appendChild(CLONE_TEMPLATE);
  });
};

ajax.send();

// global selectors
const TAG_AUDIO = document.querySelectorAll('audio');
const CLASS_ACTIVE = document.getElementsByClassName('.active');

// events declaration
document.querySelector('.content').addEventListener('click', onClick);
document.querySelector('._sidebarPlay').addEventListener('click', sidebarPlay);
document.querySelector('._sidebarPrevious').addEventListener('click', sidebarPrevious);
document.querySelector('._sidebarNext').addEventListener('click', sidebarNext);
document.querySelector('._sidebarVolume').addEventListener('click', sidebarVolume);

/** функция не работает
 * Определяет продолжительность песни в минутах
 * 
 * 
 */
function trackTime() {
  document.querySelectorAll('audio').forEach((item) => {
  item.closest('li').querySelector('._contentTrackTime').innerText = (item.duration / 60).toFixed(2);
  }); 
}

/**
 * Включает/останавливает песню по клику на кнопку Play возле названия песни
 * 
 * @param {object} event - встроенные объект событий
 */
function onClick(event) {
  const TARGET = event.target;
  let audio = TARGET.closest('li').querySelector('audio');

  document.querySelectorAll('audio').forEach((item) => {
    item.classList.remove('.active');
  });

  document.querySelectorAll('._contentTrackTime').forEach((item) => {
    item.innerText = '';
  });

  audio.classList.add('.active');
  if (audio.paused) {
        audio.play();
    } else{
        audio.pause();
        audio.currentTime = 0
    };

  let srcValue = document.getElementsByClassName('.active')[0].previousElementSibling.getAttribute('src');

  document.querySelector('._contentPicture').setAttribute('src', srcValue);
  document.querySelector('._contentName').innerText = document.getElementsByClassName('.active')[0].parentNode.querySelector('._contentTrackName').innerText;
  document.querySelector('._contentAuthor').innerText = document.getElementsByClassName('.active')[0].nextElementSibling.innerText;
  CLASS_ACTIVE[0].closest('li').querySelector('._contentTrackTime').innerText = (document.querySelector('audio').duration / 60).toFixed(2);
}

/**
 * Включает/останавливает песню по клику на кнопку Play на панеле уравления
 * 
 * @param {object} event - встроенные объект событий
 */
function sidebarPlay(event) { 
  const sidebarPlay = CLASS_ACTIVE;
    if (sidebarPlay[0].paused) {
        sidebarPlay[0].play();
    } else{
        sidebarPlay[0].pause();
        sidebarPlay[0].currentTime = 0
    }
}

/**
 * Включает предыдущую песню по клику на кнопку Previous на панеле уравления
 * 
 * @param {object} event - встроенные объект событий
 */
function sidebarPrevious(event) { 
  let audioPrevious = CLASS_ACTIVE[0].closest('li').previousElementSibling.querySelector('audio');
    audioPrevious.play();
    
}

/**
 * Включает следуюущую песню по клику на кнопку Previous на панеле уравления
 * 
 * @param {object} event - встроенные объект событий
 */
function sidebarNext(event) { 
  let audioNext = CLASS_ACTIVE[0].closest('li').nextElementSibling.querySelector('audio');
        audioNext.play();
}

/**
 * по клику на кнопку Previous на панеле уравления включает/отключает громкость, меняет цвет на оранжевый когда громкости нет 
 * 
 * @param {object} event - встроенные объект событий
 */
function sidebarVolume(event) {
  const TARGET = event.target;
  let button = TARGET.closest('svg').querySelector('path');
  let volumeSrc = document.getElementsByClassName('.active')[0];
  if (volumeSrc.volume == 0) {
    volumeSrc.volume=1;
    button.style.fill = '#3e4a43';
  } else {
    volumeSrc.volume=0;
    button.style.fill = '#d07d3c';
  }
}