import '../css/date-with-time.css'

export class DateWithTime {

    sixH = 1000 * 60 * 60;
    bgImages = {
        1: '01.jpg',
        2: '02.jpg',
        3: '03.jpg',
        4: '04.jpg',
    }

    constructor(elementId, bgElement) {

        this.dateApp = document.getElementById(elementId);
        this.bgElement = bgElement;

        this.init();
        this.setIntervalImmediately(this.clock.bind(this), 1000);
        this.setIntervalImmediately(this.date, this.sixH);
    }


    init() {
        this.dateApp.innerHTML = `
            <div class="date-app">
                <div class="main-content__time" id="clock">00:00:00</div>
                <div class="main-content__date" id="date"></div>
            </div>
        `
    }

    setIntervalImmediately(func, interval) {
        func();
        return setInterval(func, interval);
    }

    clock() {
        let date = new Date(),
            hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
            minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
            seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
        document.getElementById('clock').innerHTML = hours + ':' + minutes + ':' + seconds;

        this.slide = Math.floor((hours % 24) / 6);
        this.bgElement.style.backgroundImage = `url(./${this.bgImages[this.slide]})`;
    } // Метод для отображения времени и фона

    date() {
        let date = new Date();
        let formatDayAndMonth = new Intl.DateTimeFormat("ru", {
            month: 'long',
            day: '2-digit'
            }).format(date);
        let formatWeekday = new Intl.DateTimeFormat("ru", {
            weekday: 'long',
            }).format(date);
        document.getElementById('date').innerHTML = formatDayAndMonth + ', ' + formatWeekday;
    } // Метод для отображения даты
}