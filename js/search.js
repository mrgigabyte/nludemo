var showSuggestions = function() {
    var str = this.value;
    $('.search-container-parent.buttons').hide();
    $('.nav-cust').addClass("isActive");
    $('.srch-container').addClass("isActive");
    $('.search-container-parent.searchSuggest').addClass('isActive');
    $('.fall-back').addClass('isActive');
    $('.searchicon').addClass('Active');
    
    setTimeout(showRecent, 100);
};

document.getElementById("searchHeader").addEventListener("keyup", showSuggestions);
document.getElementById("searchHeader").addEventListener("click", showSuggestions);


document.getElementById("nav-cust").addEventListener("focusout", function() {
    setTimeout(function() {
        $('.nav-cust').removeClass("isActive");
        $('.srch-container').removeClass("isActive");
        $('.search-container-parent.searchSuggest').removeClass('isActive');
        $('.fall-back').removeClass('isActive');
        $('.searchicon').removeClass('Active');
        $('.search-container-parent.searchSuggest').html("");
        $('.search-container-parent.buttons').show();
    }, 200);
});

function updateSearchResult(func_name, query) {
    var txt = $('.srch-container input').val(query);
    eval(func_name);
}

function showRecent(){
    var txt = $('.srch-container input').val();
    var localQueries = (txt == "") ? queries : product_queries;

    $('.search-container-parent.searchSuggest').html("");
    for(index in localQueries) {
        var ele = `<p class="search-suggestions" onclick='updateSearchResult(`+localQueries[index][1]+`,"`+localQueries[index][0]+`")'>`+localQueries[index][0]+`</p>`;
        $('.search-container-parent.searchSuggest').append(ele);
    }
}


