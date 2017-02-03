$(function(){

  function createResult(searchResult){
    let $result   = $("<div>").addClass("results");
    let $title    = $("<h3>").text(searchResult.title);
    let $savebox  = $("<input type="checkbox" id="savebox">").addClass("saveTodo");
    $result.append($title).append($savebox);
  }

  function renderResults(results){
    $(".results-container").empty();
    result.forEach(function(uniqueResult){
      let addResult = createResult(uniqueResult);
      $(".reuslt-container").append(addResult);
    })
  }

})
