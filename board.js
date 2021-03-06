/**
 * Loading Tasks from AddTask out of the Backend to show it then with showBoard()
 */

 async function initBoard(){
    await loadAllTasks();
    showBoard();
}


/**
 * Posting pin at board
 */

let taskIndex;

let indexTaskToDelete;

function showBoard(){
    console.log(allTasks);
    document.getElementById('to-do-area').innerHTML = '';
    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i];
        document.getElementById('to-do-area').innerHTML += `<div class="pin" id="dragelement${i}" ondragstart="dragStart(event)">
            <div class="first-row-pin">
                <p class="p-header">${element['title']}</p>
                <img src="img/X.svg" class="X-pin" onclick="openDeleteWindow(${i})">  
            </div>
            
            <div class="second-row-pin">
                <p class="p-pin1">${element['date']}</p>
                <p class="p-pin2">${element['urgency']}</p>
                <div class="picrow-pin">
                    <img src="${element['author']}" class="user-pic-pin">
                    <p class="p-category" id="category${i}">${element['category']}</p>
                </div>
            </div>
            <div class="pin-color" id="pin-color"></div>
        </div> 
        `;
        coloredCategory(element['category'], i);
    }  
}

async function aproveDeletion(){
   await deleteTask(indexTaskToDelete);
}


/**
 * asking if you really want to delete the task
 */

 function openDeleteWindow(index) {
    indexTaskToDelete = index;
    document.getElementById('deleteWindow').classList.remove('d-none');
    document.getElementById('deleteWindow').classList.add('deleteWindow');
    document.getElementById('main-section').classList.add('d-none');
}


/**
 * closing the delete Window
 */

function closeDeleteWindow() {
    document.getElementById('main-section').classList.remove('d-none');
    document.getElementById('main-section').classList.add('main-section');
    document.getElementById('deleteWindow').classList.add('d-none');
}


/**
 * deleting the current task
 */

async function deleteTask(TaskIndex) {
    allTasks.splice(TaskIndex, 1);
    await backend.setItem("allTasks", JSON.stringify(allTasks));
    closeDeleteWindow();
    showBoard();
}


/**
 * Loading the data of all signed up users from the local storage and saves them in the users array when the page is loaded.
 *
 */

 async function loadAllUsers() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}


/**
 * Loading the currently logged in user.
 */

function loadCurrentUser() {
    let currentUserAsString = localStorage.getItem("currentUser");

    if (currentUserAsString) {
        currentUser = JSON.parse(currentUserAsString);
    }
}


/**
 * Open current User Window
 * @param { numer } userIndex - Index Number of current User
 */

 function loadCurrentUserWindow(userIndex) {
    document.getElementById("user-pic").src=`${users[userIndex]['image']}`;
}


/**
 * Drag and Drop Function
 */

 let id;

 function dropPin(ev) {
     ev.preventDefault();
 }
 
 function dragStart(ev) {
     id=ev.target.id;
 }
 
 function drop(ev) {
     ev.target.append(document.getElementById(id));
 }

 function drop(ev, taskstatus) {
    ev.target.append(document.getElementById(id));
    console.log(id);
    checkId(id, taskstatus);

}

function checkId(id, taskstatus) {
    let number = +id.split('-')[1];
    console.log(number);

    //if(targetobject.contains(id)) {
    allTasks[number].taskstatus = taskstatus;
}


 /**
  * saving functions in local Storage for drag and drop
*/

 function LocalSaveUsers() {
    //setArray('users', users);
    backend.setItem('currentUser', JSON.stringify(currentUser));
}

function LocalSaveTasks() {
    //setArray('alltasks', alltasks);
    backend.setItem('allTasks', JSON.stringify(allTasks));
}

function SetLocal() {
    LocalSaveUsers();
    LocalSaveTasks();
 }