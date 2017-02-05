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
  $('#divNewNotifications li > a').click(function(){
    $('#text').text($(this).html());
  });
  // search form verifier
  $("form[action='/search']").submit(function(e) {
    if ($.trim($("#search").val()) === "") {
      e.preventDefault();
      alert('You did not fill out the field!');
      return false;
    }
    $('#search-item').text($('#search').val());
  });

});
