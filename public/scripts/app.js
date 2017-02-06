$(() => {

  //Change username/password
  $("form[action='/profile']").submit(function(event) {
    event.preventDefault();

    var accountChanges = {};
    var name = $(this).find('#new_name').val();
    var password = $(this).find('#new_password').val()

    accountChanges.name = name;
    accountChanges.password = password;

    $.ajax({
      method: "PUT",
      url: "/profile",
      data: accountChanges
    })
    .then(function(data) {
      alert("Account info succesfully changed");
    })
    .done((users) => {
      window.location.replace("/");
    });
  });

  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });

  // Toggle Options
  $('#divNewNotifications li > a').click(function(){
    $('#category').text($(this).html());
  });

  // Search Form Verifier
  $("form[action='/search']").submit(function(e) {
    if ($.trim($("#search").val()) === "") {
      e.preventDefault();
      alert('You did not fill out the field!');
      return false;
    }
    $('#search-item').text($('#search').val());
  });

  // To Disable Save Button By Default
  $("button[action='/save']").attr('disabled','disabled');
  // When User Fills Out Form Completely
  $("form[action='/search']").submit(function(){
    if ($("#search-item").text() !== 'My Item') {
      $("button[action='/save']").removeAttr('disabled');
    }
  });
});
