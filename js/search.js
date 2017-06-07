var showSuggestions = function() {
    var str = this.value;
    $('.nav-cust').addClass("isActive");
    $('.srch-container').addClass("isActive");
    $('.search-container-parent').addClass('isActive');
    showRecent(str);
};

document.getElementById("searchHeader").addEventListener("keyup", showSuggestions);

document.getElementById("searchHeader").addEventListener("click", showSuggestions);


document.getElementById("nav-cust").addEventListener("focusout", function() {
    $('.nav-cust').removeClass("isActive");
    $('.srch-container').removeClass("isActive");
    $('.search-container-parent').removeClass('isActive');
    $('.search-container-parent').html("");
});

function showRecent(txt){
    $('.search-container-parent').html("");
    if(txt===""){
        for(index in queries) {
            $('.search-container-parent').append('<p class="search-suggestions">'+queries[index]+"</p>");
        }
    }
    
    else{
          for(index in product_queries) {
              $('.search-container-parent').append('<p class="search-suggestions">'+product_queries[index]+"</p>");
        }  
        
    }
}


