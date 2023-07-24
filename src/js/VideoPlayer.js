export default class VideoPlayer {
    constructor(container) {
        this.container = container;
    }

    static get markup() {
        return ` 
        <video class="video" controls></video>
        <div>
        <button type="button" class='video-stop'>Stop</button>
        <button type="button" class='video-close'>Close</button>
        </div>
        `;
    }

    static get video() {
        return 'video';
    }

    static get close() {
        return '.video-close';
    }

    static get stop() {
        return '.video-stop';
    }


    bindToDom() {
        this.container.innerHTML = VideoPlayer.markup;
        this.video = this.container.querySelector(VideoPlayer.video);
        // this.video.muted = true;
        this.record = this.container.querySelector(VideoPlayer.record);
        this.stop = this.container.querySelector(VideoPlayer.stop);

        (async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true
            });

            const recorder = new MediaRecorder(stream);
            const chunk = [];

            recorder.addEventListener('start', () => {
                console.log('start');
                console.log(recorder.state);
       
                // if(recorder.state === 'recording'){
                    // this.video.srcObject = stream;
                    // console.log(this.video);
                    // this.video.play();
                    // recorder.ondataavailable();
                    // const blob = new Blob(chunk);
                    // this.video.src = URL.createObjectURL(blob);
                // }
            });

            recorder.addEventListener('dataavailable', (event) => {
                // console.log(event.data);
                chunk.push(event.data);
            });

            recorder.addEventListener('stop', () => {
                const blob = new Blob(chunk);
                this.video.src = URL.createObjectURL(blob);
            });
        
            recorder.start();

            this.stop.addEventListener('click', () => {
                recorder.stop();
                stream.getTracks().forEach(track => track.stop());
                console.log(this.video);
            });

        })();
    }
};

