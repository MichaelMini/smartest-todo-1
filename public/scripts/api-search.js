$(function(){
  $('[action="/search"]').on('submit', function(event) {
    event.preventDefault();
    var data = $(this).serialize();
    console.log(data);
    $.post('/search', data).then(function(data) {
      console.log(data);
    });
  })
  console.log('exports goodread ok!', input);
})
