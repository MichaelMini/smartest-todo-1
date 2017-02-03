$(function(){
  $('[action="/search"]').on('submit', function(event) {
    event.preventDefault();

    let url = "https://www.goodreads.com/search?q=";
    let searchitem = "It";
    let searchparams = "&search_type=books&format=xml&";
    let key = "key=JloI2IHbn0RppqrV7dtxg";

    $.ajax({
      url: url+searchitem+searchparams+key,
      method: 'get',
      dataType: 'jsonp xml',

      success: function(result){
        console.log(url);
        renderResults(result);
      }
    })

  })
});
