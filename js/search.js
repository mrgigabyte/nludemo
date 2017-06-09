var showSuggestions = function() {
    // if the modified card is there... change its text
    // TODOALPHA
    if($('.sidenavModified').hasClass('isActive')!=false){
        $('.modifiedfirstText').text($('.srch-container input').val());
    $('.trending-text').text($('.srch-container input').val());}
    
    var str = this.value;
    $('.box').addClass('search');
    $('.search-container-parent.buttons').hide();
    $('.nav-cust').addClass("isActive");
    $('.srch-container').addClass("isActive");
    $('.search-container-parent.searchSuggest').addClass('isActive');
    $('.fall-back').addClass('isActive');
    $('.searchicon').addClass('Active');
    $('.box.first ').addClass('isActive');
    if($('.sidenavModified').hasClass('isActive')==false){
    $('.trending_box_container').addClass('isSearchActive');
    $('.trending_box_container').removeClass('isActive');}
    setTimeout(showRecent, 100);
};

document.getElementById("searchHeader").addEventListener("keyup", showSuggestions);
document.getElementById("searchHeader").addEventListener("click", function() {
    if ($('.sidenavModified').hasClass('isActive')==false) // modified card is not open) // TODOALPHA
    {var txt = $('.srch-container input').val("");}
    else{var txt = $('.srch-container input').val();}
    showSuggestions();
});


document.getElementById("nav-cust").addEventListener("focusout", function() {
    setTimeout(function() {
        $('.nav-cust').removeClass("isActive");
        $('.srch-container').removeClass("isActive");
        $('.search-container-parent.searchSuggest').removeClass('isActive');
        $('.fall-back').removeClass('isActive');
        $('.searchicon').removeClass('Active');
         $('.box.first ').removeClass('isActive');
        $('.search-container-parent.searchSuggest').html("");
        $('.search-container-parent.buttons').show();
        if($('.sidenavModified').hasClass('isActive')==false){
            $('.trending_box_container').removeClass('isSearchActive');
            $('.trending_box_container').addClass('isActive');
        }
        $('.box').removeClass('search');
    }, 200);
});

function updateSearchResult(func_name, query) {
    var txt = $('.srch-container input').val(query);
    eval(func_name+"()");
}

function showRecent(){
    var txt = $('.srch-container input').val();
    var localQueries = (txt == "") ? queries : product_queries;

    $('.search-container-parent.searchSuggest').html("");
    for(index in localQueries) {
        var ele = `<p class="search-suggestions" onclick='updateSearchResult("`+localQueries[index][1]+`","`+localQueries[index][0]+`")'>`+localQueries[index][0]+`</p>`;
        $('.search-container-parent.searchSuggest').append(ele);
    }
}


