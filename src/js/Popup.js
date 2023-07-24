export default class Popup {
    constructor(container) {
        this.container = container;
        this.onClick = this.onClick.bind(this);
    }
    static get markup() {
        return ` 
        <div class="popup active">
        <div class="popup-message">
        <p>
        Что-то пошло не так
        </p>
        <p>
        К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение 
        на использование геолокации, либо введите координаты вручную.
        </p>
        <p>
        Широта и долгота через запятую
        </p>
        </div>
        <form class="popup-form">
        <input class="geolocation-input" placeholder="Введите координаты" type="text">
          <button type="button" class="cancel">Отмена</button>
          <button type="button" class="accept">Ок</button>
          </form>
        </div>  
        `;
    }

    static get cancel() {
        return '.cancel';
    }

    static get accept() {
        return '.accept';
    }

    static get input() {
        return '.geolocation-input';
    }

    static checkPopupInput(string) {
        const regex = /^(\[)?(-?([0-9]{1,2}|1[0-7][0-9]|180))(\.[0-9]{1,10})(\,)\s?-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})(\])?$/;
        //Если true, функция возвращает true?
        if(regex.test(string) === true){
            return true
        }
        else throw new Error('Неверный формат координат');
        // Если false throw new error('неверный формат);
    }

    bindToDom() {
        this.container.innerHTML = Popup.markup;

        this.geolocation = this.container.querySelector(Popup.input);

        this.cancel = this.container.querySelector(Popup.cancel);
        this.cancel.addEventListener('click', this.onClick);


        this.accept = this.container.querySelector(Popup.accept);
        this.accept.addEventListener('click', this.onClick);
    }

    // Дописать: если отмена, закрыть модалку, если ок, валидация и тесты

    onClick(e) {
        this.e = e.preventDefault();

        if (e.currentTarget.classList.contains('accept')) {
            // Получить значение инпута
            console.log(this.geolocation.value);

            // Переделать в try catch finally
            if (Popup.checkPopupInput(String(this.geolocation.value))) {
                console.log('валидация пройдена');

                //Запушить результат? Сделать return?

                this.geolocation.value = ' ';
                let popup = document.querySelector('.popup');
                popup.classList.remove('active');
            }
            else{
                console.log(Popup.chechPopupInput(String(this.geolocation.value)));
            }

            // Закрыть модалку
            this.geolocation.value = ' ';
            let popup = document.querySelector('.popup');
            popup.classList.remove('active');
        }
        else if (e.currentTarget.classList.contains('cancel')) {

            // Закрыть модалку, ничего не делая
            this.geolocation.value = ' ';
            let popup = document.querySelector('.popup');
            popup.classList.remove('active');
        }

        else return

    }

};