var showSuggestions = function() {
    var str = this.value;
    $('.nav-cust').addClass("isActive");
    $('.srch-container').addClass("isActive");
    $('.search-container-parent').addClass('isActive');
    $('.fall-back').addClass('isActive');
    $('.search-container-parent').html("");
    $('.searchicon').addClass('Active');
    
    setTimeout(showRecent, 100);
};

document.getElementById("searchHeader").addEventListener("keyup", showSuggestions);
document.getElementById("searchHeader").addEventListener("click", showSuggestions);


document.getElementById("nav-cust").addEventListener("focusout", function() {
    setTimeout(function() {
        $('.nav-cust').removeClass("isActive");
        $('.srch-container').removeClass("isActive");
        $('.search-container-parent').removeClass('isActive');
        $('.search-container-parent').html("<button class='search-btn1'>VS INFLATION</button><button class='search-btn2'>VS GDP</button>");    
        $('.fall-back').removeClass('isActive');
        $('.searchicon').removeClass('Active');
    }, 200);
});

function updateSearchResult(func_name, query) {
    var txt = $('.srch-container input').val(query);
    eval(func_name);
}

function showRecent(){
    var txt = $('.srch-container input').val();
    var localQueries = (txt == "") ? queries : product_queries;

    $('.search-container-parent').html("");
    for(index in localQueries) {
        var ele = `<p class="search-suggestions" onclick='updateSearchResult(`+localQueries[index][1]+`,"`+localQueries[index][0]+`")'>`+localQueries[index][0]+`</p>`;
        console.log(ele);
        $('.search-container-parent').append(ele);
    }
}


