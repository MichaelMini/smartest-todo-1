

function insertEntryInTodoList($domTable, entry){
  var row = $("<tr>");
  var firstCol = $("<td>").text(entry.id);
  var secondCol = $("<td>").text(entry.name);
  var thirdCol = $("<td>").text(entry.category);
  row.append(firstCol).append(secondCol).append(thirdCol);
  $domTable.append(row);
}

$(function(){
  var $todo_entry_table = $('table.todo_entries');
  $('[action="/search"]').on('submit', function(event) {
    // TODO: blank the search bar
    event.preventDefault();
    var data = $(this).serialize();

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
