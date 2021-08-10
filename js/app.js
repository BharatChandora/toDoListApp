class UI {

    // to display all task
    static displayAll() {

        const tasks = Storage.getTasks();
        const completedTask = Storage.getCompletedTask();

        tasks.forEach((task) => UI.addTask(task));

        completedTask.forEach((task) => UI.addcompleted(task));


    }

    // to display onlu completed task
    static displayCompleted() {

        const completedTask = Storage.getCompletedTask();
        completedTask.forEach((task) => UI.addcompleted(task));
    }

    // to display incompleted task
    static displayIncompleted() {

        const tasks = Storage.getTasks();
        tasks.forEach((task) => UI.addTask(task));

    }

    // adding task to task area by appending child elements
    static addcompleted(task) {

        const taskBox = document.querySelector('.tasks');

        let lis = document.createElement('li');

        // template code
        lis.innerHTML = `

        <div class="task flex align-center justify-between">
            <p style="text-decoration: line-through">${task}</p>
            <div>
                <button  class="tick task-btn btn-success"><img  src="./icons/checked.png" alt=""></button><!--
                --><button  class="del task-btn btn-secondary"><img  src="./icons/delete.png" alt=""></button>
            </div>

        </div>
        <div class="overlay-static"></div>
        
        `;

        taskBox.appendChild(lis);


    }



    //dropDown button function
    static dropDown() {

        const dropBtn = document.querySelector('#drop');
        dropBtn.addEventListener('click', () => {

            const menu = document.querySelector('.droplist');
            // menu.style.display = "block";

            if (menu.style.display === "block") {
                menu.style.display = "none";
            } else {
                menu.style.display = "block";
            }

        });

        const listItems = document.querySelectorAll('.droplist li');
        listItems.forEach((item) => {
            item.addEventListener('click', () => {

                const listInput = document.querySelector('.list-input');
                listInput.value = item.textContent;
                
                if (listInput.value === 'All') {

                    const taskBox = document.querySelector('.tasks');
                    taskBox.innerHTML = ''
                    UI.displayAll();

                } else if (listInput.value === 'Completed') {

                    const taskBox = document.querySelector('.tasks');
                    taskBox.innerHTML = ''
                    UI.displayCompleted();

                } else if (listInput.value === 'Incompleted') {

                    const taskBox = document.querySelector('.tasks');
                    taskBox.innerHTML = ''
                    UI.displayIncompleted()
                }

            });

        });

        

    }

    //  adding task to task area
    static addTask(task) {

        const taskBox = document.querySelector('.tasks');

        let lis = document.createElement('li');

        //html template code
        lis.innerHTML = `

        <div class="task flex align-center justify-between">
            <p>${task}</p>
            <div>
                <button  class="tick task-btn btn-success"><img  src="./icons/checked.png" alt=""></button><!--
                --><button  class="del task-btn btn-secondary"><img  src="./icons/delete.png" alt=""></button>
            </div>

        </div>
        <div class="overlay"></div>
        
        `;

        taskBox.appendChild(lis);

    }


    static clearFields() {

        document.querySelector('.task-input').value = '';

    }


    // to handle tick button and delete button operations
    static actionBtn(el) {
        if (el.classList.contains('del')) {

            const  li = el.parentElement.parentElement.parentElement;
            li.style.animation = 'drop ease 1s forwards';
            console.log(el.parentElement.parentElement.parentElement);

            setTimeout(() => {
                
                el.parentElement.parentElement.parentElement.remove();
                Storage.removeTask(el.parentElement.previousElementSibling.textContent);

            }, 1000);

            return ;

        } 

        if (el.classList.contains('tick')) {
            
            console.log(el.parentElement.parentElement.parentElement.children[1]);
            const overlay = el.parentElement.parentElement.parentElement.children[1]
            overlay.style.animation = 'overlay 0.3s ease forwards';

            el.parentElement.previousElementSibling.style.textDecoration = "line-through";
            Storage.addCompletedTask(el.parentElement.previousElementSibling.textContent);
            

        }
    }

}


// storage class that communicates with local storage of browser
class Storage {


    static getTasks() {

        let tasks;

        if (localStorage.getItem('tasks') === null) {
            tasks = [];
            // console.log(tasks);
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));

        }

        return tasks;

    }

    static addTasks(item) {

        const tasks = Storage.getTasks();
        tasks.push(item);


        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static getCompletedTask() {
        
        let completedTask;

        if (localStorage.getItem('completedtasks') === null) {
            completedTask = [];
        } else {
            completedTask = JSON.parse(localStorage.getItem('completedtasks'));
            console.log(completedTask);
        }

        return completedTask;
    }

    static addCompletedTask(ctask) {

        let item = ctask;

        Storage.removeTask(ctask);

        let completedTasks = Storage.getCompletedTask();
        completedTasks.push(item);
        console.log(completedTasks);
        
        localStorage.setItem('completedtasks', JSON.stringify(completedTasks));

    }

    static removeTask(item) {

        const tasks = Storage.getTasks();
        const completedTasks = Storage.getCompletedTask();

        tasks.forEach((task, index) => {


            if (task === item) {

                tasks.splice(index, 1);
            }

        });

        completedTasks.forEach((cTask, index) => {


            if (cTask === item) {

                completedTasks.splice(index, 1);
            }

        });

        localStorage.setItem('completedtasks', JSON.stringify(completedTasks));

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

}


document.addEventListener('DOMContentLoaded', UI.displayAll);





UI.dropDown();




document.querySelector('.task-input').addEventListener('keyup', (e) => {

    if (e.keyCode===13) {

        console.log('presd enter');
        e.preventDefault();
        document.querySelector('#add').click();
        
    }


});


document.querySelector('#add').addEventListener('click', () => {

    const taskItem = document.querySelector('.task-input').value;

    if (taskItem === '') {

        alert('add task');

    } else {

        UI.addTask(taskItem);
        Storage.addTasks(taskItem);
        UI.clearFields();
        window.location = window.location;
        

    }

    

});



document.querySelector(".tasks").addEventListener('click', (e) => {


    UI.actionBtn(e.target.parentElement);
   


});





