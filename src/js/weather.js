import '/src/css/weather.css'
import config from "./config.js";

export class Weather {

    constructor(elementId) {
        this.city = localStorage.getItem('city');
        if (!this.city) {
            console.log('no city');
        }
        this.weatherApp = document.getElementById(elementId);
        this.init();
    }

    init() {
        this.weatherApp.innerHTML = `
            <div class="weather-app">
                <div class="weather-app__content">
                    <div class="weather-app__temp" id="mainTemp"></div>
                    <span class="weather-app__city" id="city"></span>
                </div>
                <div class="weather-app__popup" id="weatherPopup">
                    <div class="weather-app__popup-header">
                        <div class="weather-app__popup-title weather-app__city" id="popupCity"></div>
                        <div class="weather-app__popup-weather" id="popupWeatherInfo"></div>
                    </div>
                    <div class="weather-app__popup-main">
                        <div class="weather-app__popup-temp" id="popupTemp"></div>
                    </div>
                </div>
            </div>
        `

        this.getElements();
        this.getWeather().then();
    }

    getElements() {
        this.mainTempInfoElement = document.getElementById("mainTemp");
        this.popupTempInfoElement = document.getElementById("popupTemp");
        this.popupWeatherInfoElement = document.getElementById("popupWeatherInfo");
        this.mainCityInfoElement = document.getElementById("city");
        this.popupCityInfoElement = document.getElementById("popupCity");
        this.weatherPopupElement = document.getElementById("weatherPopup");
        this.togglePopupContent = document.querySelector('.weather-app__content');

        this.togglePopupContent.addEventListener("click", () => {
            this.weatherPopupElement.classList.toggle("active");
        });

        document.addEventListener('click', (event) => {
            if (!document.querySelector('.weather-app').contains(event.target)) {
                this.weatherPopupElement.classList.remove("active");
            }
        })
    }

    async getWeather() {
        try {
            const position = await new Promise((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            );
            await this.getOpenWeather(position.coords.latitude, position.coords.longitude);
        } catch {
            if (!this.city) {
                this.city = config.DEFAULT_CITY;
            }
            await this.getOpenWeatherOnCity(this.city);

        }
        this.setInfo();
    }

    setInfo() {
        this.mainTempInfoElement.innerHTML = `${this.temp}`;
        this.popupTempInfoElement.innerHTML = `${this.temp}`;
        this.mainCityInfoElement.innerHTML = `${this.city}`;
        this.popupCityInfoElement.innerHTML = `${this.city}`;
        if (this.popupWeatherInfoElement) {
            this.popupWeatherInfoElement.innerHTML = this.weather;
        }
    }

    async getOpenWeather(lat, lon) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ru&appid=${config.API_KEY}&units=metric`);
        const data = await response.json();
        if (data.cod < 400 && data.main && data.main.temp && data.weather && data.name) {
            this.temp = Math.round(data.main.temp) + '°';
            this.weather = data.weather[0].description;
            this.city = data.name;
            localStorage.setItem('city', data.name);
        } else {
            this.temp = '';
            this.weather = '';
            this.city = '';
        }
    }

    async getOpenWeatherOnCity(city) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${config.API_KEY}&units=metric`);
        const data = await response.json();
        if (data.cod < 400 && data.main && data.main.temp && data.weather && data.name) {
            this.temp = Math.round(data.main.temp) + '°';
            this.weather = data.weather[0].description;
            this.city = data.name;
            localStorage.setItem('city', data.name);
        } else {
            this.temp = '';
            this.weather = '';
            this.city = '';
        }
    }
}