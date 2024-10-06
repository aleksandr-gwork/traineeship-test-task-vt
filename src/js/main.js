import '/src/css/style.css'
import {Weather} from './weather.js'
import {TaskManager} from "./task-manager.js";
import {DateWithTime} from "./date-with-time.js";

export class Main {

    constructor() {
        this.init(); // Инициализация приложения
        this.loadApps(); // Загрузка приложений
    }

    init() {
        document.querySelector('#app').innerHTML = `
            <div class="wrapper" id="bgImage">
                <header class="header">
                    <div class="header-apps">
                        <div class="header-apps__item">
                            <div id="weatherApp"></div>
                        </div>
                    </div>
                </header>
                <main class="main">
                    <div class="main-content">
                        <div id="dateApp"></div>
                    </div>
                </main>
                <footer class="footer">
                    <div class="footer-apps">
                        <div class="footer-apps__item">
                            <div id="taskManager"></div>
                        </div>
                    </div>
                </footer>
            </div>
        `
        this.bgElement = document.getElementById('bgImage');
    }

    loadApps() {
        this.weather = new Weather('weatherApp');
        this.taskManager = new TaskManager('taskManager');
        this.date = new DateWithTime('dateApp', this.bgElement);
    }
}

(new Main());





