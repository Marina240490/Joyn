setURL('http://marina-schwab.developerakademie.com/smallest_backend_ever'); // Connection to the server
let allTasks = [];
let currentUserFromLocalStorage = {};


/**
 * Function for responsive Menu for all pages! (Never delete!!!!!!)
 */
let show = false;


/**
 * userinformations
 */
 let users = [
    {
        'id': 0,
        'name': 'Marina',
        'password': 'Marina123!',
        'image': 'img/marina.jpg',
        'e-mail': 'marina@join.de',
    },
    {
        'id': 1,
        'name': 'Yvonne',
        'password': 'Yvonne123!',
        'image': 'img/yvonne.jpg',
        'e-mail': 'yvonne@join.de',
    },
    {
        'id': 2,
        'name': 'Steffi',
        'password': 'Steffi123!',
        'image': 'img/steffi.jfif',
        'e-mail': 'steffi@join.de',
    },
    {
        'id': 3,
        'name': 'Junus',
        'password': 'Junus123!',
        'image': 'img/junus.jfif',
        'e-mail': 'junus@join.de',
    }
];


/**
 * Showing MobileMenu
 */

function showMenu() {


    if (show == false) {

        document.getElementById('res-menu').classList.add('show-mobilemenu');

        show = !show

    }
    else {
        document.getElementById('res-menu').classList.remove('show-mobilemenu');
        show = !show
    }
}


/**
 * @param {id for selected user} id 
 * @returns the selected user
 */

//function getUserById(id) {
//    return users.find(u => u.id == id);
//}


/**
 * Main Function to load all the tasks
 */

async function loadAllTasks() {
    await downloadFromServer(); // 1. Function downloadFromServer() -> mini_backend.js / 2. Waiting for server response in order to let the function continue
    //let allTasksAsString = await backend.getItem('allTasks');
    allTasks = jsonFromServer['allTasks'] ? JSON.parse(jsonFromServer['allTasks']) : [];
    console.log(allTasks);
    //allTasks = allTasksAsString?  JSON.parse(allTasksAsString) : [];
    //console.log(allTasks);
    //await pushBoard();
}


/**
 * Defining backgroundcolor of Category
 */

 function coloredCategory(category, index) {
    if(category == 'Marketing'){
        document.getElementById(`category${index}`).style.backgroundColor = "rgb(181,228,240)";
    };

    if(category == 'Product'){
        document.getElementById(`category${index}`).style.backgroundColor = "rgb(255,251,168)";
    };

    if(category == 'Sale'){
        document.getElementById(`category${index}`).style.backgroundColor = "rgb(179,244,185)";
    };

    if(category == 'Controlling'){
        document.getElementById(`category${index}`).style.backgroundColor = "rgb(192,192,192)";
    };
}


/**
 * Defining backgroundcolor of Category in backlog-div
 */

function coloredBacklogdiv(category, index) {
    if(category == 'Marketing'){
        document.getElementById(`category${index}`).style.borderInlineStart = "solid 5px rgb(181,228,240)";
    };

    if(category == 'Product'){
        document.getElementById(`category${index}`).style.borderInlineStart = "solid 5px rgb(255,251,168)";
    };

    if(category == 'Sale'){
        document.getElementById(`category${index}`).style.borderInlineStart = "solid 5px rgb(179,244,185)";
    };

    if(category == 'Controlling'){
        document.getElementById(`category${index}`).style.borderInlineStart = "solid 5px rgb(192,192,192)";
    };
}


/**
 * Checking current user for navigationbar
 */

function checkCurrentUser() {
    if (localStorage.getItem('currentUser')) { // Check if user exists
        currentUserFromLocalStorage = JSON.parse(localStorage.getItem('currentUser'));
        document.getElementById('user-pic').src = currentUserFromLocalStorage.image;
    }
}


/**
 * logging out the current user
 */

function logout() {
    localStorage.removeItem('currentUser');
}


/**
 * to init important functions in body onload
 */

function initOverallApp() {
    checkCurrentUser();
    includeHTML();
}


/**
 * Function for templates 
 */

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}
