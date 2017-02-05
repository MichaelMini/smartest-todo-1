

function insertEntryInTodoList($domTable, entry){
  var row = $("<tr>").addClass('api-result');
  var firstCol = $("<td>")//.text(entry.id);
  var secondCol = $("<td>").addClass('api-name').text(entry.name);
  var sourceCol = $("<td>").addClass('api-source').text(entry.source);
  var thirdCol = $("<td>").addClass('api-category').text(entry.category);
  row.append(firstCol).append(secondCol).append(thirdCol).append(sourceCol);
  $domTable.append(row);
  $('#search-item').text($("#search").val());
  $('#text').text(entry.category);
  $('#idnum').text(entry.id);

}

$(function(){
  var $todo_entry_table = $('table.todo_entries');
  $('[action="/search"]').on('submit', function(event) {
    // TODO: blank the search bar
    event.preventDefault();
    $('.api-result').remove();
    var data = $(this).serialize();
    console.log(data);
    $.post('/search', data).then(function(data) {
      if (data.error) {
        console.log("sadface.  no todo entry for you.");
      } else {
        insertEntryInTodoList($todo_entry_table, data)
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

    var name = $('.api-name').text();
    var category = $('.api-category').text();
    var userId = $('#user-id').text();
    var done_status = false;
    var apiSource = $('.api-source').text();


    savedTodo.name = name;
    savedTodo.category = category;
    savedTodo.userId = userId;
    savedTodo.done_status = done_status;
    savedTodo.apiSource = apiSource;

    $.post('/save', savedTodo).then(function(data) {

    });

    console.log('From save: ', '| todo_item => ', name, '| todo_catagory => ', category, '| api-source => ', apiSource, '| done_status => ', done_status, '| user_id => ', userId);

  })

})
