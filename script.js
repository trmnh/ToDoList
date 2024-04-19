var taskId = 0;

function allowDrop(ev) {
  ev.preventDefault();
  ev.target.style.backgroundColor = "#f0f0f0"; // Change the background color when a task is dragged over the column
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  ev.target.style.backgroundColor = ""; // Reset the background color when the task is dropped
}

function dragLeave(ev) {
  ev.target.style.backgroundColor = ""; // Reset the background color when the task is dragged out of the column
}

// Ajoutez ces fonctions à chaque colonne de votre liste Kanban
var columns = document.querySelectorAll(".column");
columns.forEach(function (column) {
  column.ondragover = allowDrop;
  column.ondrop = drop;
  column.ondragleave = dragLeave;
});
function createTask() {
  var taskDescription = document.getElementById("new-task").value;
  if (taskDescription === "") return;

  var newTask = document.createElement("div");
  newTask.id = "task-" + taskId++;
  newTask.className = "draggable";
  newTask.draggable = true;
  newTask.ondragstart = function (event) {
    drag(event);
  };

  var taskText = document.createElement("span");
  taskText.textContent = taskDescription;
  newTask.appendChild(taskText);

  var editButton = document.createElement("button");
  editButton.textContent = "Modifier";
  editButton.onclick = function () {
    editTask(newTask.id);
  };
  newTask.appendChild(editButton);

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Supprimer";
  deleteButton.onclick = function () {
    deleteTask(newTask.id);
  };
  newTask.appendChild(deleteButton);

  document.getElementById("do").appendChild(newTask);
  document.getElementById("new-task").value = "";
}

function editTask(id) {
  var taskToEdit = document.getElementById(id);
  var taskText = taskToEdit.querySelector("span");
  var editButton = taskToEdit.querySelector("button");

  var input = document.createElement("input");
  input.type = "text";
  input.value = taskText.textContent;
  taskToEdit.insertBefore(input, taskText);
  taskText.style.display = "none";

  editButton.textContent = "Sauvegarder";
  editButton.onclick = function () {
    saveTask(id);
  };
}

function saveTask(id) {
  var taskToSave = document.getElementById(id);
  var input = taskToSave.querySelector("input");
  var taskText = taskToSave.querySelector("span");
  var saveButton = taskToSave.querySelector("button");

  taskText.textContent = input.value;
  taskText.style.display = "inline";

  taskToSave.removeChild(input);

  saveButton.textContent = "Modifier";
  saveButton.onclick = function () {
    editTask(id);
  };
}

function deleteTask(id) {
  var taskToDelete = document.getElementById(id);
  taskToDelete.parentNode.removeChild(taskToDelete);
}
