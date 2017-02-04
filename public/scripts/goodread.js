$(function(){
  $('[action="/search"]').on('submit', function(event) {
    event.preventDefault();
    var data = $(this).serialize();

    $.post('/search', data).then(function(data) {
      console.log(data);
    });
    // let url = "https://www.goodreads.com/search?q=";
    // let searchitem = "It";
    // let searchparams = "&search_type=books&format=xml&";

    // $.ajax({
    //   url: url+searchitem+searchparams+key,
    //   method: 'get',
    //   dataType: 'jsonp xml',

    //   success: function(result){
    //     console.log(url);
    //     renderResults(result);
    //   }
    // })
  })
  console.log('exports goodread ok!', input)
})
