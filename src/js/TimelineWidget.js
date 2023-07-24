import VideoPlayer from "./VideoPlayer";
import Popup from "./Popup";
import AudioPlayer from "./AudioPlayer";
import TimelineTable from "./TimelineTable";

export default class TimelineWidget {
  constructor(container) {
    this.container = container;
    this.onClick = this.onClick.bind(this);
    this.onKeydown = this.onKeydown.bind(this);
  }

  static get markup() {
    return ` 
    <div class="timeline_container">
    <form class="content-form active">
    <input class="text-input" placeholder="Введите текст" type="text">
      <button type="button" class="audio">Audio</button>
      <button type="button" class="video">Video</button>
      </form>
    </div>  
    `;
  }

  static get video() {
    return '.video';
  }

  static get audio() {
    return '.audio'
  }

  static get input() {
    return '.text-input';
  }

  // Перепроверить, нужны ли статические методы
  bindToDom() {
    this.container.innerHTML = TimelineWidget.markup;
    this.input = this.container.querySelector(TimelineWidget.input);
    this.input.addEventListener('keydown', this.onKeydown);
    this.videoButton = this.container.querySelector(TimelineWidget.video);
    this.videoButton.addEventListener('click', this.onClick);
    this.audioButton = this.container.querySelector(TimelineWidget.audio);
    this.audioButton.addEventListener('click', this.onClick);
    this.timelineContainer = document.querySelector('.timeline_container');
  }

  onKeydown(e) {
    if (e.key === 'Enter') {

      //Отправить значение value в табличку
      let value = e.currentTarget.value;
      e.currentTarget.value = '';

      navigator.geolocation.getCurrentPosition(function (data) {
        const { latitude, longitude } = data.coords;
        console.log(latitude, longitude);
        console.log(data.timestamp);

        let message = {
          type: 'text',
          coords: coords,
          content: value,
          date: date
        };

        // // let timeStamp = 1690058963576;
        // // var dateFormat = new Date(timeStamp);

        // // let month = dateFormat.getMonth() + 1;
        // // month = String(month);
        // // if(month.length < 2){
        // //   month = '0' + month;
        // // }
        // // let date = String(dateFormat.getDate());
        // // let year = String(dateFormat.getFullYear());
        // // let minutes = String(dateFormat.getMinutes());
        // // let hours = String(dateFormat.getHours() + 3);

        // // let newDate = date + '.' + month + '.' + year + ' ' + hours + ':' + minutes;


        // // let date = new Date();

        // // let options = { year: 'numeric', month: 'numeric', day: 'numeric'};
        // // options.timeZone = 'GMT';
        // // options.timeZoneName = 'short';


        // // console.log(date.toLocaleString('ru-Ru', { hour12: false }, options));


      }, function (err) {

        console.log(err.message);




        //       const timelineContainer = document.querySelector('.timeline_container');

        //       let popupContainer = document.createElement('div');
        //       let popup = new Popup(popupContainer);
        //       popup.bindToDom(); 
        //       timelineContainer.insertAdjacentElement('afterbegin', popupContainer);


        //        // Провалидировать широту-долготу




      }, { enableHighAccuracy: true }
      );

      getGeolocation();

      // ПРЕВЕНТ ДЕФОЛТ ВСЕГДА В КОНЦЕ!!!!!!!!!!
      e.preventDefault();
    }
  }

  onClick(e) {
    this.e = e.preventDefault();

    // ЕСЛИ АУДИО
    if (e.currentTarget.classList.contains('audio')) {
      console.log('аудио');
      // Поменять визуальный вид формы
      // Отправить аудио в таймлайн таблицу
      //  navigator.geolocation.getCurrentPosition(function(data){console.log(data)});

      let audioContainer = document.createElement('div');
      audioContainer.classList.add('audio-container');

      let audioPlayer = new AudioPlayer(audioContainer);
      audioPlayer.bindToDom();

      this.timelineContainer.insertAdjacentElement('afterbegin', audioContainer);

      // Если все ок, в таймлайн таблицу улетает аудио

      // Если не ок, всплывает попап


    }

    // ЕСЛИ ВИДЕО
    else {

      if (e.currentTarget.classList.contains('active')) {
        return
      }

      else {
        e.target.classList.add('active');
        let videoContainer = document.createElement('div');
        videoContainer.classList.add('video-container');

        let videoPlayer = new VideoPlayer(videoContainer);
        videoPlayer.bindToDom();

        this.timelineContainer.insertAdjacentElement('afterbegin', videoContainer);

        //Дописать отправку видео в таймлайн
      }

    }
  }
}

