
function insertEntryInTodoList($domTable, entry){
  // var row = $("<tr>").addClass('api-result');
  // var firstCol = $("<td>")//.text(entry.id);
  // var secondCol = $("<td>").addClass('api-name').text(entry.name);
  // var sourceCol = $("<td>").addClass('api-source').text(entry.source);
  // // var thirdCol = $("<td>").addClass('api-category').text(entry.category);
  // row.append(secondCol).append(sourceCol);
  // $domTable.append(row);
 //  var row = $("<tr>").addClass('api-result');
 // var firstCol = $("<th>")//.text(entry.id);
 //  var secondCol = $("<th>").text('name');
 //  var sourceCol = $("<th>").text('category');
 //  // var thirdCol = $("<td>").addClass('api-category').text(entry.category);
 //  row.append(secondCol).append(sourceCol);
 //  $domTable.prepend(row);
console.log('entry===>', entry);
  $('#todo-item').text(entry.todo);
  $('#search-item').text(entry.name);
  $('#text').text(entry.category);
  $('.api-source').text(entry.source);
  $('#idnum').text(entry.id);
}

$(function(){
  // $(".save-button").hide()

  function insertEntryInTodoList($domTable, data){

    console.log('entry=>>>>', data);
    $('#search-item').text(data.name);
    $('#todo-item').text(data.term);
    $('#category').text(data.category);
    $('#api-source').text(data.source);
    $('#todo-query').text(data.todo);
  }

$(".todo_search").hide()

  var $todo_entry_table = $('table.todo_entries');

  $('[action="/search"]').on('submit', function(event) {
    // TODO: blank the search bar
    event.preventDefault();
    if ($(".todo_search").is(':hidden')) {
      $(".todo_search").slideDown( "slow");
    }

    $(".todo_search").slideDown( "slow");

      // $('div.todo_search').addClass('reveal')

    var data = $(this).serialize();
    console.log('this.serialize =>>>', data);
    $.post('/search', data).then(function(data) {
      if (data.error) {
        console.log("sadface.  no todo entry for you.");
      } else {
        // Here's where we insert into Todolist!!!
        insertEntryInTodoList($todo_entry_table, data)
        $(".save-button").show()
        console.log('from goodread.js in public/scripts:', data);
      }
    });
    // TODO: maybe some error handling on the ajax call?
    //        -- including a .catch for exceptions
    //        -- including the possiblity that the backend says "fuck no"
  })
})

$(function(){
  $('[action="/save"]').on('submit', function(event) {
    event.preventDefault();

    var savedTodo = {}

    var name = $('#search-item').text();
    var category = $('#category').text();
    var userId = $('#user-id').text();
    var apiSource = $('#api-source').text();
    var todo = $('#todo-query').text();
    console.log('where is todo-query???? ==>', todo)
    var done_status = false;


    savedTodo.name = name;
    savedTodo.category = category;
    savedTodo.userId = userId;
    savedTodo.done_status = done_status;
    savedTodo.todo = todo;
    savedTodo.apiSource = apiSource;
    // savedTodo.apiSource = apiSource;

    $.post('/save', savedTodo).then(function(data) {
      console.log("savedTodo ==>>>>", savedTodo)
    });

    console.log('From save: ', '| todo_item => ', name, '| todo_catagory => ', category, '| api-source => ', apiSource, '| done_status => ', done_status, '| user_id => ', userId);
    location.reload();
    let $tr = $('<tr>')
      .append($('<td>').addClass('category'))
      .append($('<td>').addClass('search-item'))
      .appendTo($('tbody'));

    $tr.find('.category').text(category);
    $tr.find('.search-item').text(name);
  })
})
