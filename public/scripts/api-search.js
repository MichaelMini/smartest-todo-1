


$(function(){
  // $(".save-button").hide()
  function insertEntryInTodoList($domTable, data){

    console.log('entry=>>>>', data);
    $('#todo-item').text(data.term);
    $('#search-item').text(data.name);
    $('#text').text(data.todoCategory);
    $('#api-source').text(data.source);
    $('#query').text(data.term);
  }
  var $todo_entry_table = $('table.todo_entries');
  $('[action="/search"]').on('submit', function(event) {
    // TODO: blank the search bar
    event.preventDefault();
    $('.api-result').remove();
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
    var category = $('#text').text();
    var userId = $('#user-id').text();
    var apiSource = $('#api-source').text();
    var done_status = false;
    // var apiSource = $('#api-source').text();


    savedTodo.name = name;
    savedTodo.category = category;
    savedTodo.userId = userId;
    savedTodo.done_status = done_status;
    savedTodo.apiSource = apiSource
    // savedTodo.apiSource = apiSource;

    $.post('/save', savedTodo).then(function(data) {
      console.log("savedTodo ==>>>>", savedTodo)
    });

    console.log('From save: ', '| todo_item => ', name, '| todo_catagory => ', category, '| api-source => ', apiSource '| done_status => ', done_status, '| user_id => ', userId);

    let $tr = $('<tr>')
      .append($('<td>').addClass('category'))
      .append($('<td>').addClass('search-item'))
      .appendTo($('tbody'));

    $tr.find('.category').text(category);
    $tr.find('.search-item').text(name);
  })

})
