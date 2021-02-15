

  
const taskInput = document.getElementById("task-input");
const taskButton = document.getElementById("task-button");
const tableBody = document.getElementById("table-body");

const taskEditInput = document.getElementById("task-edit-input");
const taskEditButton = document.getElementById("edit-task-button");
const taskEditInputUUID = document.getElementById("task-edit-input-uuid");


let tasks = [];

function markTaskComplete(task) {
    task.complete = true;
    renderTasks();
}

function removeTask(event, task) {
    event.stopPropagation();

    console.log(tasks);
    tasks = tasks.filter((t) => t.id != task.id)
    console.log(tasks);
    renderTasks();
}

function openTaskEditModal(event, task) {
    event.stopPropagation();

    taskEditInput.value = task.task;
    taskEditInputUUID.value = task.id;
    $('#task-edit-modal').modal('show');
}

function renderTasks() {
    tableBody.innerHTML = "";
    for (const task of tasks) {
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
}


function addTask() {
    if (!taskInput.value) { return;}

    const task =  new Task(taskInput.value);

    tasks.push(task);
    renderTasks();

    taskInput.value = ""
}

function editTask() {
    const task = tasks.find((t) => t.id == taskEditInputUUID.value);

    taskEditInputUUID.value = "";

    if (!task) { return; }
    
    task.task = taskEditInput.value;
    $('#task-edit-modal').modal('hide');
    renderTasks();
}

taskButton.addEventListener("click", addTask);
taskEditButton.addEventListener("click", editTask);

