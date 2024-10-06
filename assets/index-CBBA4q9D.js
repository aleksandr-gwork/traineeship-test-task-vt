var r=Object.defineProperty;var l=(p,t,e)=>t in p?r(p,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):p[t]=e;var o=(p,t,e)=>l(p,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();const d={API_KEY:"c52fa46d57a85be6feebc723e377389a",DEFAULT_CITY:"Krasnodar"};class c{constructor(t){this.city=localStorage.getItem("city"),this.city||console.log("no city"),this.weatherApp=document.getElementById(t),this.init()}init(){this.weatherApp.innerHTML=`
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
        `,this.getElements(),this.getWeather().then()}getElements(){this.mainTempInfoElement=document.getElementById("mainTemp"),this.popupTempInfoElement=document.getElementById("popupTemp"),this.popupWeatherInfoElement=document.getElementById("popupWeatherInfo"),this.mainCityInfoElement=document.getElementById("city"),this.popupCityInfoElement=document.getElementById("popupCity"),this.weatherPopupElement=document.getElementById("weatherPopup"),this.togglePopupContent=document.querySelector(".weather-app__content"),this.togglePopupContent.addEventListener("click",()=>{this.weatherPopupElement.classList.toggle("active")}),document.addEventListener("click",t=>{document.querySelector(".weather-app").contains(t.target)||this.weatherPopupElement.classList.remove("active")})}async getWeather(){try{const t=await new Promise((e,a)=>navigator.geolocation.getCurrentPosition(e,a));await this.getOpenWeather(t.coords.latitude,t.coords.longitude)}catch{this.city||(this.city=d.DEFAULT_CITY),await this.getOpenWeatherOnCity(this.city)}this.setInfo()}setInfo(){this.mainTempInfoElement.innerHTML=`${this.temp}`,this.popupTempInfoElement.innerHTML=`${this.temp}`,this.mainCityInfoElement.innerHTML=`${this.city}`,this.popupCityInfoElement.innerHTML=`${this.city}`,this.popupWeatherInfoElement&&(this.popupWeatherInfoElement.innerHTML=this.weather)}async getOpenWeather(t,e){const s=await(await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${e}&lang=ru&appid=${d.API_KEY}&units=metric`)).json();s.cod<400&&s.main&&s.main.temp&&s.weather&&s.name?(this.temp=Math.round(s.main.temp)+"°",this.weather=s.weather[0].description,this.city=s.name,localStorage.setItem("city",s.name)):(this.temp="",this.weather="",this.city="")}async getOpenWeatherOnCity(t){const a=await(await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${t}&lang=ru&appid=${d.API_KEY}&units=metric`)).json();a.cod<400&&a.main&&a.main.temp&&a.weather&&a.name?(this.temp=Math.round(a.main.temp)+"°",this.weather=a.weather[0].description,this.city=a.name,localStorage.setItem("city",a.name)):(this.temp="",this.weather="",this.city="")}}class h{constructor(t){this.taskManager=document.getElementById(t),this.init()}init(){this.taskManager.innerHTML=`
        <div class="tasks-app">
            <div class="tasks-app__button" id="switchTasksPopup">Tasks</div>
            <div class="tasks-app__popup" id="tasksPopup">
                <div class="tasks-app__popup-header">
                    <div class="tasks-app__popup-title">My Tasks</div>
                    <div class="tasks-app__popup-completed" id="deleteCompleted">
                        Delete Completed
                    </div>
                </div>
                <div class="tasks-app__popup-tasks" id="taskList">
                    <!-- tasks -->
                </div>
                <div class="tasks-app__popup-footer">
                    <input class="tasks-app__popup-input" id="taskInput" placeholder="Input task" type="text">
                </div>
            </div>
        </div>
        `,this.getElements(),this.loadTasks()}getElements(){this.tasksPopupElement=document.getElementById("tasksPopup"),this.taskInput=document.getElementById("taskInput"),this.taskList=document.getElementById("taskList"),this.toggleTasksPopup=document.getElementById("switchTasksPopup"),this.toggleTasksPopup.addEventListener("click",()=>{this.tasksPopupElement.classList.toggle("active")}),document.addEventListener("click",t=>{if(!document.querySelector(".tasks-app").contains(t.target)){if(t.target.classList.contains("tasks-app__popup-task-delete"))return;this.tasksPopupElement.classList.remove("active")}}),document.getElementById("deleteCompleted").addEventListener("click",()=>{this.deleteCompletedTasks()}),this.taskInput.addEventListener("keydown",t=>{if(t.key==="Enter")if(this.taskInput.value){const e={id:Date.now(),title:this.taskInput.value,completed:!1};this.addTaskToDOM(e),this.saveTaskToLocalStorage(e),this.taskInput.value=""}else this.taskInput.style.color="red",this.taskInput.value="Заполните поле",this.taskInput.setAttribute("disabled","disabled"),setTimeout(()=>{this.taskInput.style.color="#ffffff",this.taskInput.value="",this.taskInput.removeAttribute("disabled")},2e3)})}addTaskToDOM(t){const e=document.createElement("div");e.classList.add("tasks-app__popup-task"),e.setAttribute("data-id",t.id),e.innerHTML=`
            <input id="task-${t.id}" class="tasks-app__popup-checkbox" type="checkbox" ${t.completed?"checked":""}>
            <label for="task-${t.id}" class="tasks-app__popup-label">
                ${t.title}
            </label>
            <div class="tasks-app__popup-task-delete" title="Delete task">x</div>
        `,this.taskList.appendChild(e),this.deleteBtn=e.querySelector(".tasks-app__popup-task-delete"),this.checkbox=e.querySelector(".tasks-app__popup-checkbox"),this.deleteBtn.addEventListener("click",()=>this.deleteTask(e,t.id)),this.checkbox.addEventListener("change",()=>this.updateStatusInLocalStorage(t.id))}updateStatusInLocalStorage(t){let e=JSON.parse(localStorage.getItem("tasks"))||[];e=e.map(a=>(a.id===t&&(a.completed=!a.completed),a)),localStorage.setItem("tasks",JSON.stringify(e))}deleteCompletedTasks(){let t=JSON.parse(localStorage.getItem("tasks"))||[];t=t.filter(e=>!e.completed),localStorage.setItem("tasks",JSON.stringify(t)),this.taskList.innerHTML="",this.loadTasks()}saveTaskToLocalStorage(t){let e=JSON.parse(localStorage.getItem("tasks"))||[];e.push(t),localStorage.setItem("tasks",JSON.stringify(e))}deleteTask(t,e){t.remove(t),this.deleteTaskToLocalStorage(e)}deleteTaskToLocalStorage(t){let e=JSON.parse(localStorage.getItem("tasks"))||[];e=e.filter(a=>a.id!==t),localStorage.setItem("tasks",JSON.stringify(e))}loadTasks(){(JSON.parse(localStorage.getItem("tasks"))||[]).forEach(e=>this.addTaskToDOM(e))}}class m{constructor(t,e){o(this,"sixH",1e3*60*60);o(this,"bgImages",{1:"01.jpg",2:"02.jpg",3:"03.jpg",4:"04.jpg"});this.dateApp=document.getElementById(t),this.bgElement=e,this.init(),this.setIntervalImmediately(this.clock.bind(this),1e3),this.setIntervalImmediately(this.date,this.sixH)}init(){this.dateApp.innerHTML=`
            <div class="date-app">
                <div class="main-content__time" id="clock">00:00:00</div>
                <div class="main-content__date" id="date"></div>
            </div>
        `}setIntervalImmediately(t,e){return t(),setInterval(t,e)}clock(){let t=new Date,e=t.getHours()<10?"0"+t.getHours():t.getHours(),a=t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes(),s=t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds();document.getElementById("clock").innerHTML=e+":"+a+":"+s,this.slide=Math.floor(e%24/6),this.bgElement.style.backgroundImage=`url(/${this.bgImages[this.slide]})`}date(){let t=new Date,e=new Intl.DateTimeFormat("ru",{month:"long",day:"2-digit"}).format(t),a=new Intl.DateTimeFormat("ru",{weekday:"long"}).format(t);document.getElementById("date").innerHTML=e+", "+a}}class u{constructor(){this.init(),this.loadApps()}init(){document.querySelector("#app").innerHTML=`
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
        `,this.bgElement=document.getElementById("bgImage")}loadApps(){this.weather=new c("weatherApp"),this.taskManager=new h("taskManager"),this.date=new m("dateApp",this.bgElement)}}new u;
