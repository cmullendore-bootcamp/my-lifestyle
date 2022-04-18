var taskList = [];


$(".save-btn").on("click", function(e) {
    e.preventDefault()
    var parent = $(this).closest(".modal");
    var text = parent.children(".textarea").val().trim();
    const newTask = {
        task_text: text
    }
    saveTaskItem(newTask)
    createTaskItem(newTask);
});

var createTaskItem = function(task) {
    var list = $("<li>").addClass("columns task-list-item");
    var checkDiv = $("<div>").addClass("column is-2 check-box").html("<button class='btn-check check-no-color'><i class='fa-solid fa-check fa-lg'></i></button>");
    var taskDiv = $("<div>").addClass("column is-10 task-box").html("<p class='task'>" + task.task_text + "</p>");

    list.append(checkDiv);
    list.append(taskDiv);
    $(".tasks-list").append(list);
};

var saveTaskItem = function(task) {
    taskList.push(task)
    console.log(taskList)
    localStorage.setItem('taskStorage',JSON.stringify(taskList))
};

function getStoredTasks(){
    var storedtasks = localStorage.getItem('taskStorage')
    if(storedtasks){
        taskList = JSON.parse(storedtasks);
    }
    console.log(taskList)
    taskList.forEach(task => {
        createTaskItem(task)
    });
};

getStoredTasks();

// Clear textarea after modale closes
$(".btn-create").on("click", function (){
    $("textarea").val("");
});


// Display a green check when checkbox is clicked
$("ul").on("click", ".btn-check", function(){
    $(this).removeClass("check-no-color").addClass("check-color");
    var taskIndex = $(this).closest(".task-list-item").index();
    console.log(taskIndex);
    var taskList = $(this).parent(".check-box");
    var taskText = taskList.siblings(".task-box").children(".task").text();
    console.log(taskText);

    localStorage.setItem(taskIndex, JSON.stringify(taskText));    
});


