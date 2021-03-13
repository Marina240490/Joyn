/**
 * Overlay function for details
 */

/**
 * show the Details
 */

function showDetails() {
    document.getElementById('openDetails').classList.remove('d-none-details');
}

/**
 * close details
 */

function closeDetails() {
    document.getElementById('openDetails').classList.add('d-none-details');
}

/**
 * loading the added tasks from Backend to Backlog
 */

async function initBacklog() {
    await loadAllTasks();
    showBacklog();
}

/**
 * Posting in backlog 
 */

function showBacklog() {
    document.getElementById('push-to-backlog').innerHTML = '';
    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i];
        if(!(element['plususer'] && element['author'])){
            element['plususer'] = 'img/marina.jpg';
            element['author'] = 'img/marina.jpg';
        }
        document.getElementById('push-to-backlog').innerHTML += `
        <div class="backlog-div" id="category${i}"> 
        <div class="assigned-backlog">
            <div class="assigned-person">
                <div class="img-backlog"> 
                    <img src="${element['author']}">
                </div>
                <div class="name-backlog"> ${element['users']} <br>
                E-Mail: ${element['users']}</div>
            </div> 
        </div>
        <div  class="category-backlog"> ${element['category']} </div>
        <div class="details-backlog"> 
            <p class="details-text"> ${element['details']}</p>
            <p class="d-none-text" onclick="showDetails()"> Click here for more details!</p>
        </div>
        <div class="delete-backlog">
            <img src="img/delete_bin.svg" class="delete-pin-bl" onclick="deleteBacklog${i}"> 
        </div>
        </div>
        `;
        
        coloredBacklogdiv(element['category'], i); 

        
    }
}

/* ${taskIndex}) */

async function deleteBacklog(taskIndex) {
    allTasks.splice(taskIndex, 1);
    await backend.setItem("allTasks", JSON.stringify(allTasks));
    showBacklog();
}
