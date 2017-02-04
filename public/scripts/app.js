$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;

  // toggle options
  // $('.dropdown-toggle').dropdown();
  $('#divNewNotifications li > a').click(function(){
    $('#text').text($(this).html());
  });
});
