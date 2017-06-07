var showSuggestions = function() {
    var str = this.value;
    $('.nav-cust').addClass("isActive");
    $('.srch-container').addClass("isActive");
    $('.search-container-parent').addClass('isActive');
//    $('.page-wrapper').addClass('isActive');
     $('.fall-back').addClass('isActive');
    showRecent(str);
};

document.getElementById("searchHeader").addEventListener("keyup", showSuggestions);

document.getElementById("searchHeader").addEventListener("click", showSuggestions);


document.getElementById("nav-cust").addEventListener("focusout", function() {
    setTimeout(function() {
        $('.nav-cust').removeClass("isActive");
        $('.srch-container').removeClass("isActive");
        $('.search-container-parent').removeClass('isActive');
        $('.search-container-parent').html("");
        $('.fall-back').removeClass('isActive');
    }, 200);
});

function showRecent(txt){
    $('.search-container-parent').html("");
    if(txt==="") {
        for(index in queries) {
            var ele = '<p class="search-suggestions" onclick="'+queries[index][1]+'()">'+queries[index][0]+'</p>';
            $('.search-container-parent').append(ele);
        }
    }
    else {
        for(index in product_queries) {
              $('.search-container-parent').append('<p class="search-suggestions" onclick="'+product_queries[index][1]+'()">'+product_queries[index][0]+"</p>");
        }  
        
    }
}


