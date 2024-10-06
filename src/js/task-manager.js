import '../css/task-manager.css'

export class TaskManager {
    constructor(elementId) {
        this.taskManager = document.getElementById(elementId);
        this.init();
    }

    init() {
        this.taskManager.innerHTML = `
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
        `

        this.getElements();
        this.loadTasks();
    }

    getElements() {
        this.tasksPopupElement = document.getElementById("tasksPopup");
        this.taskInput = document.getElementById("taskInput");
        this.taskList = document.getElementById("taskList");
        this.toggleTasksPopup = document.getElementById("switchTasksPopup");

        this.toggleTasksPopup.addEventListener("click", () => {
            this.tasksPopupElement.classList.toggle("active");
        });

        document.addEventListener('click', (event) => {
            if (!document.querySelector('.tasks-app').contains(event.target)) {
                if (event.target.classList.contains("tasks-app__popup-task-delete")) {
                    return;
                }
                this.tasksPopupElement.classList.remove("active");
            }
        })

        document.getElementById("deleteCompleted").addEventListener("click", () => {
            this.deleteCompletedTasks();
        })

        this.taskInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                if (this.taskInput.value) {
                    const task = {
                        id: Date.now(),
                        title: this.taskInput.value,
                        completed: false
                    }

                    this.addTaskToDOM(task);
                    this.saveTaskToLocalStorage(task)
                    this.taskInput.value = "";
                } else {
                    this.taskInput.style.color = "red";
                    this.taskInput.value = "Заполните поле";
                    this.taskInput.setAttribute('disabled', 'disabled');
                    setTimeout(() => {
                        this.taskInput.style.color = "#ffffff";
                        this.taskInput.value = "";
                        this.taskInput.removeAttribute('disabled');
                    }, 2000);
                }
            }
        });
    }

    addTaskToDOM(task) {
        const taskItem = document.createElement('div');
        taskItem.classList.add('tasks-app__popup-task');
        taskItem.setAttribute('data-id', task.id);
        taskItem.innerHTML = `
            <input id="task-${task.id}" class="tasks-app__popup-checkbox" type="checkbox" ${task.completed ? 'checked' : ''}>
            <label for="task-${task.id}" class="tasks-app__popup-label">
                ${task.title}
            </label>
            <div class="tasks-app__popup-task-delete" title="Delete task">x</div>
        `;
        this.taskList.appendChild(taskItem);

        this.deleteBtn = taskItem.querySelector('.tasks-app__popup-task-delete');
        this.checkbox = taskItem.querySelector('.tasks-app__popup-checkbox');

        this.deleteBtn.addEventListener('click', () => this.deleteTask(taskItem, task.id));
        this.checkbox.addEventListener('change', () => this.updateStatusInLocalStorage(task.id));
    }

    updateStatusInLocalStorage(taskId) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                task.completed = !task.completed;
            }

            return task;
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    deleteCompletedTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => !task.completed);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        this.taskList.innerHTML = "";
        this.loadTasks();
    }

    saveTaskToLocalStorage(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    deleteTask(taskItem, taskId) {
        taskItem.remove(taskItem);
        this.deleteTaskToLocalStorage(taskId);
    }

    deleteTaskToLocalStorage(taskId) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => this.addTaskToDOM(task));
    }

}