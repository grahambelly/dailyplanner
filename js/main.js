$(document).ready(function() {
  //sayfa hazır oldugunda süslü parantez içindekini icra eder.yani sayfa yüklendiğinde
  //add task evet
  $("#add-task-form").on("submit", function(e) {
    //event listener eklenerek (on) id'si add-task-form olan nesne submit eildiğinde aşağıdaki kod icra edilecek

    //function to add task aşağıda oluşturuldu
    addTask(e);
  });

  //edit task event
  $("#edit-task-form").on("submit", function(e) {
    //event listener eklenerek (on) id'si edit-task-form olan nesne submit eildiğinde aşağıdaki kod icra edilecek
    updateTask(e); //function aşağıda oluşturuldu
  });

  //remove task event
$('#task-table').on('click', '#remove-task', function(){
id = $(this).data('id');
removeTask(id);
});

//clear all tasks event
$('#clear-tasks').on('click', function(){

clearAllTasks();
});

  //display tasks to show right away no need an event handler
  displayTasks();

  //we need to create displayTasksm function entioned above
  function displayTasks() {
    //first of all we need to get all tasks.so we need to call a variable created named taskList
    var taskList = JSON.parse(localStorage.getItem("tasks"));

    //if taskList is not empty than sort them by time
    if (taskList != null) {
      taskList = taskList.sort(sortByTime); //sortByTime will be created by us below
    }
    //we need to create an each loop to check if is there any tasks to display.if it is so than we will display them by each loop
    //fisrt of all we need create a counter for loop
    var i = 0; //counter
    //check tasks
    if (localStorage.getItem("tasks") != null) {
      //loop through and display
      $.each(taskList, function(key, value) {
        //all elemnts will be displayed on table
        $("#task-table").append(
          '<tr id="' +
            value.id +
            '">' +
            "<td>" +
            value.task +
            "</td>" +
            "<td>" +
            value.task_priority +
            "</td>" +
            "<td>" +
            value.task_date +
            "</td>" +
            "<td>" +
            value.task_time +
            "</td>" +
            '<td><a href="edit.html?id=' +
            value.id +
            '">Edit</a> | <a href="#" id="remove-task" data-id="'+ value.id +'">Remove</a></td>' +
            "</tr>"
        );
      });
    }
  }
  //function to sort tasks by time
  function sortByTime(a, b) {
    var aTime = a.task_time;
    var bTime = b.task_time;
    return aTime < bTime ? -1 : aTime > bTime ? 1 : 0;
  }
  function addTask(e) {
    //add a uniq id.here it will be timestamp
    var newDate = new Date();
    id = newDate.getTime();
    //kullanıcının girdiği verileri çekmeye başlıyorum.bunu yaparken inputlardaki id'ler kullanılıyor
    var task = $("#task").val();
    var task_priority = $("#priority").val();
    var task_date = $("#date").val();
    var task_time = $("#time").val();

    //simple validation
    if (task == "") {
      alert("task boş olamaz");
      e.preventDefault();
    } else if (task_priority == "") {
      alert("task_priority boş olamaz");
      e.preventDefault();
    } else if (task_date == "") {
      alert("task date boş olamaz");
      e.preventDefault();
    } else if (task_time == "") {
      alert("task time boş olamaz");
      e.preventDefault();
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));

      //check tasks
      if (tasks == null) {
        tasks = [];
      }
      var taskList = JSON.parse(localStorage.getItem("tasks"));

      //new object
      var new_task = {
        id: id,
        task: task,
        task_priority: task_priority,
        task_date: task_date,
        task_time: task_time
      };
      tasks.push(new_task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      console.log(tasks);
    }
  }
  // function to update tasks
  function updateTask(e) {
    var id = $("#task_id").val();
    var task = $("#task").val();
    var task_priority = $("#priority").val();
    var task_date = $("#date").val();
    var task_time = $("#time").val();

    taskList = JSON.parse(localStorage.getItem("tasks"));

    for (var i = 0; i < taskList.length; i++) {
      if (taskList[i].id == id) {
        taskList.splice(i, 1);
      }
      localStorage.setItem("tasks", JSON.stringify(taskList));
    }
    if (task == "") {
      alert("task boş olamaz");
      e.preventDefault();
    } else if (task_priority == "") {
      alert("task_priority boş olamaz");
      e.preventDefault();
    } else if (task_date == "") {
      alert("task date boş olamaz");
      e.preventDefault();
    } else if (task_time == "") {
      alert("task time boş olamaz");
      e.preventDefault();
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));

      //check tasks
      if (tasks == null) {
        tasks = [];
      }
      var taskList = JSON.parse(localStorage.getItem("tasks"));

      //new object
      var new_task = {
        id: id,
        task: task,
        task_priority: task_priority,
        task_date: task_date,
        task_time: task_time
      };
      tasks.push(new_task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
//function to remove task
function removeTask(id){
    if(confirm('are you sure?')){
        var taskList = JSON.parse(localStorage.getItem('tasks'));
        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].id == id) {
              taskList.splice(i, 1)
            }
            localStorage.setItem('tasks', JSON.stringify(taskList));
          }
          location.reload();
    }
}
//function to clear all tasks
function clearAllTasks(){
    if(confirm('are you sure?')){
        localStorage.clear();
        location.reload();
    }
}
});

//function for getting single task
function getTask() {
  var $_GET = getQueryParams(document.location.search);
  id = $_GET["id"];

  var taskList = JSON.parse(localStorage.getItem("tasks"));

  for (var i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      $("#edit-task-form #task_id").val(taskList[i].id);
      $("#edit-task-form #task").val(taskList[i].task);
      $("#edit-task-form #priority").val(taskList[i].task_priority);
      $("#edit-task-form #date").val(taskList[i].task_date);
      $("#edit-task-form #time").val(taskList[i].task_time);
    }
  }
}

//function to get HTTP requests
function getQueryParams(qs) {
  qs = qs.split("+").join(" ");
  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

  while ((tokens = re.exec(qs))) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }
  return params;
}
