export default class AudioPlayer {
    constructor(container) {
        this.container = container;
        this.onClick = this.onClick.bind(this);
    }

    static get markup() {
        return ` 
        <audio class="audio" controls></audio>
        <button type="button" class="audio-stop">Stop</button>
        <div class="timer">Таймер</div>
        <button type="button" class="audio-close">Close</button>
        `;
    }

    static get audio() {
        return 'audio';
    }

    static get stop() {
        return '.audio-stop';
    }

    static get close() {
        return '.audio-close';
    }

    bindToDom() {
        this.container.innerHTML = AudioPlayer.markup;
        this.audio = this.container.querySelector(AudioPlayer.audio);
        this.stop = this.container.querySelector(AudioPlayer.stop);
        this.stop.addEventListener('click', this.onClick);
        this.close = this.container.querySelector(AudioPlayer.close);
        this.close.addEventListener('click', this.onClick);

        (async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });

            const recorder = new MediaRecorder(stream);
            const chunk = [];

            recorder.addEventListener('start', () => {
                console.log('start');
                this.audio.srcObject = stream;
                this.audio.play();
            });

            recorder.addEventListener('dataavailable', (event) => {
                chunk.push(event.data);
            });

            recorder.addEventListener('stop', () => {
                const blob = new Blob(chunk);
                console.log(blob);
                this.audio.src = URL.createObjectURL(blob);
            });

            recorder.start();

           
            this.stop.addEventListener('click', () => {
                this.audio.stop();
                recorder.stop();
                stream.getTracks().forEach(track => track.stop());
            });

        })();
    }

    // По клику на кнопку закрыть видео и остановить запись или 
    //отправить сообщение, остановить видео, закрыть видео

    onClick(e){
        e.preventDefault();
    }
}