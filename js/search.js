document.getElementById("searchHeader").addEventListener("click", function() {
    $('.nav-cust').addClass("isActive");
    $('.srch-container').addClass("isActive");
    $('.search-container-parent').addClass('isActive');
    showRecent();
});


document.getElementById("nav-cust").addEventListener("focusout", function() {
    $('.nav-cust').removeClass("isActive");
    $('.srch-container').removeClass("isActive");
    $('.search-container-parent').removeClass('isActive');
    $('.search-container-parent').html("");
});

function showRecent(){
    $('.search-container-parent').html("");
    for(index in queries) {
        $('.search-container-parent').append('<p class="search-suggestions">'+queries[index]+"</p>");
    }
}