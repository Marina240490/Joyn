/**
 * userinformations
 */
let user = [
    {
        'name': 'Marina',
        'password': 'Marina123!',
        'image': 'img/marina.jpg',
        'e-mail': 'marina@join.de',
    },
    {
        'name': 'Yvonne',
        'password': 'Yvonne123!',
        'image': 'img/yvonne.jpg',
        'e-mail': 'yvonne@join.de',
    },
    {
        'name': 'Steffi',
        'password': 'Steffi123!',
        'image': 'img/steffi.jfif',
        'e-mail': 'steffi@join.de',
    },
    {
        'name': 'Junus',
        'password': 'Junus123!',
        'image': 'img/junus.jfif',
        'e-mail': 'junus@join.de',
    }
];

/**
 * Login function to enter the main page
 */

function login(i) { 
    let loginSuccessful = false; //Loginverfahren definieren
    for (let i = 0; i < user.length; i++) { 
        if (username.value == user[i]['name'] && (password.value) == user[i]['password']) { //Wenn Wert des Inputs Name und Inputs Passwort passend, dann....
            loginSuccessful = true; //Loginverfahren als erfolgreich deklarieren
            
            document.getElementById('overlay').classList.remove('d-none');
            document.getElementById('overlay').classList.add('overlay');
            document.getElementById('main-section').classList.add('d-none');
        } 
    }
    if(loginSuccessful) { //Loginverfahren erfolgreich deklariert
        setTimeout(function () {
        window.location.href = 'board.html'}, 2000); //Weiterleitung auf die gewünschte Seite (mittels Link)
    } else {
        alert('Falscher Username oder Passwort!'); //Loginverfahren missglückt
    }
}

/**
 * Push Message with "Enter"
 */
function init() {
    document.addEventListener("keydown", function (u) {
        if (u.keyCode == 13) {  //checks whether the pressed key is "Enter"
        login();
    }
    });
}

/**
 * Show picture of currentUser
 */
function currentUser() {
    if (document.getElementById('username').value == 'Marina') {
        document.getElementById('currentUserpic').src = user[0]['image'];
    }

    if (document.getElementById('username').value == 'Yvonne') {
        document.getElementById('currentUserpic').src = user[1]['image'];
    }

    if (document.getElementById('username').value == 'Steffi') {
        document.getElementById('currentUserpic').src = user[2]['image'];
    }

    if (document.getElementById('username').value == 'Junus') {
        document.getElementById('currentUserpic').src = user[3]['image'];
    }
}

/**
 * Saving the login data of the user that is currently logged in in the local storage.
 */
 function saveCurrentUserInLocalStorage() {
    let currentUserAsString = JSON.stringify(currentUser);
    localStorage.setItem("currentUser", currentUserAsString);
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
