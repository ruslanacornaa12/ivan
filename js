const tasks = {
    all: [
        {id:1, title: 'title1', description: '', startDate: '', endDate:''},
        {id:2, title: 'title2', description: '', startDate: '', endDate:''},
        {id:3, title: 'title3', description: '', startDate: '', endDate:''}
    ],
    complete: [
    {id:4, title: 'title4', description: '', startDate: '', endDate:''}
    ],
    overdue: [
    {id:5, title: 'title5', description: '', startDate: '', endDate:''}
    ]
}
set(tasks)

if(!localStorage.getItem('tasks')){
    localStorage.setItem('tasks', JSON.stringify({
        all: [],
        complete: [],
        overdue: []
    }))
}

function get(){
    return JSON.parse( localStorage.getItem('tasks') )
}

function set(data){
    localStorage.setItem('tasks', JSON.stringify(data))
}

function update(type, data){
    const allTasks = get();
    allTasks[type].push(data);
    set(allTasks);
}

const navButtons = document.querySelectorAll('header nav button')
navButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const type = event.srcElement.id.split('-')[1];
        generateTasks(type)
    });
});

function generateTasks(type){
    const placeTasks = document.querySelector('div.tasks')
    const tasks = get()[type];



    let html = ''

    let navigate = type === 'all'
    ? '<button class="button-complete green">Завершено</button><button class="button-delete red">Удалить</button>'
    : '<button class="button-delete red">Удалить</button>'

    for(let task of tasks){
        html += `
            <div class="task ${type}" id="task-id-${task.id}">
                <div class="info">
                    <h3 class="task-name">${task.title}</h3>
                    <p class="task-description">${task.description}</p>
                    <p class="task-date">
                        <span class="date-start">${task.startDate}</span>
                        до
                        <span class="date-end">${task.endDate}</span>
                    </p>
                </div>
                <div class="navigate">
                    ${navigate}
                </div>
            </div>
        `
    }


    placeTasks.innerHTML = html;

    const titleTasks = document.getElementById('title-tasks');
    let name = '';

    const titleTasksClass = titleTasks.classList[1];
    titleTasks.classList.remove(titleTasksClass);

    if(type === 'all'){
        name = 'Все задачи'
        titleTasks.classList.add('title-all')
    }
    else if(type === 'complete'){
        name = 'Выполненные задачи'
        titleTasks.classList.add('title-complete')
    }
    else if(type === 'overdue'){
        name = 'Просроченные задачи'
        titleTasks.classList.add('title-overdue')
    }
    titleTasks.textContent = name;

     if(tasks.length === 0){
    placeTasks.innerHTML = `
    <div class = "not-found-tasks"
        <h2>Задачи не найдены</h2>
    </div>
    `;
    }
}

window.onload = generateTasks('all')



