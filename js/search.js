document.getElementById("searchHeader").addEventListener("click", function() {
    $('.nav-cust').addClass("isActive");
});


document.getElementById("nav-cust").addEventListener("focusout", function() {
    $('.nav-cust').removeClass("isActive");
});