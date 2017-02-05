// <ul class="nav nav-pills left">
//                         <li class="dropdown active span8">
//                           <a class="dropdown-toggle" id="inp_impact" data-toggle="dropdown">
//                             <i class="icon icon-envelope icon-white"></i> <span id="text">Suggestion</span><span class="caret"></span>
//                           </a>
//                           <ul ID="divNewNotifications" class="dropdown-menu">
//                             <li><a>Food</a></li>
//                             <li><a>Movies</a></li>
//                             <li><a>Books</a></li>
//                             <li><a>Products</a></li>
//                           </ul>
//                         </li>
//                       </ul>

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
  $('#search-item').text(entry.name);
  $('#text').text(entry.category);
  $('.api-source').text(entry.source);
  $('#idnum').text(entry.id);

}

$(function(){
  $(".save-button").hide()
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
    // event.preventDefault();

    var savedTodo = {}

    var name = $('#search-item').text();
    var category = $('#text').text();
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
