// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCMxjhl2IfImsf6bK9MKds1Ej5HhPbFn9o",
    authDomain: "todoapp-4a356.firebaseapp.com",
    projectId: "todoapp-4a356",
    storageBucket: "todoapp-4a356.appspot.com",
    messagingSenderId: "547610595104",
    appId: "1:547610595104:web:d3ba284e8c8483a9265145"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

// Code below is to add a new task to the document.
// db.collection("tasks").add({
//     task: "clean my room",
//     complete: "false"
// }).then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
// }).catch((error) => {
//     console.error("Error adding document: ", error);
// });


const taskInput = document.getElementById("task-input");
const taskButton = document.getElementById("task-button");
const tableBody = document.getElementById("table-body");

const taskEditInput = document.getElementById("task-edit-input");
const taskEditButton = document.getElementById("edit-task-button");
const taskEditIdInput = document.getElementById("task-edit-id-input");

// let tasks = [];

async function markTaskComplete(task) {
    
    try {
        await db.collection("tasks").doc(task.id).update({
            complete: true
        });

        renderTasks();

    } catch (error) {
        console.log(error);
    }
}

async function removeTask(event, task) {
    
    try {
        event.stopPropagation();
        
        await db.collection("tasks").doc(task.id).delete();

        renderTasks();
    } catch (error) {
        console.log(error);
    }


}

function openTaskEditModal(event, task) {
    event.stopPropagation();

    taskEditInput.value = task.task;
    taskEditIdInput.value = task.id;
    $('#task-edit-modal').modal('show');
}

async function renderTasks() {
    tableBody.innerHTML = "";

    try {
        const tasksSnap = await db.collection("tasks").get();

        for (const taskSnap of tasksSnap.docs) {

            const task = new Task();
            const data = taskSnap.data();
            task.id = taskSnap.id;
            task.complete = data.complete;
            task.task = data.task;

            //console.log(task);


            const row = document.createElement("tr");
            const taskCell = document.createElement("td");
            const statusCell = document.createElement("td");
            const removeCell = document.createElement("td");
    
            taskCell.innerHTML = task.task;
    
            if (task.complete) {
                statusCell.innerHTML = "<i class=\"fa fa-circle green\" aria-hidden=\"true\"></i>";
            } else {
                statusCell.innerHTML = "<i class=\"fa fa-circle-thin\" aria-hidden=\"true\"></i>";
                row.classList.add("pointer");
            }
    
            const removeButton = document.createElement("i");
            removeButton.classList.add("fa");
            removeButton.classList.add("fa-trash-o");
            removeButton.classList.add("pointer");
            removeButton.addEventListener("click", (event) => removeTask(event, task));
    
            const editButton = document.createElement("i");
            
            editButton.classList.add("fa");
            editButton.classList.add("fa-pencil");
            editButton.classList.add("pointer");
            editButton.classList.add("mr-3");
            editButton.addEventListener("click", (event) => openTaskEditModal(event, task));
            // editButton.setAttribute("data-toggle", "modal")
            // editButton.setAttribute("data-target", "#task-edit-modal")
    
    
            removeCell.appendChild(editButton);
            removeCell.appendChild(removeButton);
    
            row.appendChild(taskCell);
            row.appendChild(statusCell);
            row.appendChild(removeCell);
            
    
            row.addEventListener("click", () => markTaskComplete(task));
    
    
            tableBody.appendChild(row)
        }
        
    } catch (error) {
        console.log(error);
    }


}


async function addTask() {
    if (!taskInput.value) { return;}

    // const task =  new Task(taskInput.value);

    // tasks.push(task);


    try {    
        // Saves the task into the database
        const res = await db.collection("tasks").add({
            task: taskInput.value,
            complete: false
        });
        //console.log(res);
    } catch (error) {
        console.log(error);
    }

    renderTasks();

    taskInput.value = ""
}

async function editTask() {
    
    try {
        const taskId = taskEditIdInput.value;
    
        //console.log(taskEditIdInput.value)

        await db.collection("tasks").doc(taskId).update({
            task: taskEditInput.value
        });
        
        $('#task-edit-modal').modal('hide');
        taskEditIdInput.value = ""
        taskEditInput.value = ""

        renderTasks();

    } catch (error) {
        console.log(error);
    }
}

taskButton.addEventListener("click", addTask);
taskEditButton.addEventListener("click", editTask);

renderTasks();

