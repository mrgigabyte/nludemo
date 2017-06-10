var showSuggestions = function(e) {
    // on pressing of enter we need to exit this as the suggestions are no longer needed
    if (e.which == 13) {
        return;
    }
    // if the modified card is there... change its text
    // TODOALPHA
    if($('.sidenavModified').hasClass('isActive')!=false){
        $('.modifiedfirstText').text($('.srch-container input').val());
        // $('.trending-text').text($('.srch-container input').val());
    }
    
    var str = this.value;
    $('.box').addClass('search');
    $('.search-container-parent.buttons').hide();
    $('.nav-cust').addClass("isActive");
    $('.srch-container').addClass("isActive");
    $('.search-container-parent.searchSuggest').addClass('isActive');
    $('.fall-back').addClass('isActive');
    $('.searchicon').addClass('Active');
    $('.box.first ').addClass('isActive');
    
    if ($('.sidenavModified').hasClass('isActive')==false) {
        $('.trending_box_container').addClass('isSearchActive');
        $('.trending_box_container').removeClass('isActive');
    }
    setTimeout(showRecent, 100);
};

function addSearchCard() {
    $('#sidenavModified').html(`
        <div class="box trendingModified trending_box_container">How many customers have more than 10 Cr and collateralized property?
            <br><br>
            <div class="subtitle"><img src="../images/ic-trending.png"   srcset="../images/ic-trending@2x.png 2x, ../images/ic-trending@3x.png 3x"
                    class="ic_trending"><strong>
                TRENDING</strong>
            </div>    
        </div>
        <div class="box" style="margin: 25px auto;
                padding: 15px 40px;
                width: 320px;
                padding-top: 35px;
                box-shadow: 0 2px 51px 0 rgba(60, 98, 159, 0.15)">
            <div class="modifiedfirstText">
                What have been the product trends for ABFL in the last 12 months?
            </div>
            <hr id="modifiedHR">
            <button class="modified-save" onclick=ModifiedSave() id="modifiedSave">
                Save
            </button>
        </div>`);
    $('.modifiedfirstText').text($('#searchHeader').val());
}

$('#searchHeader').on('keyup', function(e) {
    if (e.which == 13) {
        var searchTxt = $('#searchHeader').val();
        addSearchCard();
        $.ajax({
            type: "POST",
            url: baseApiUrl + 'search',
            data: { "search" : searchTxt },
            success: function(data) {
                if ( data.chart_type == "streamo" )
                    drawSteamGraph(data);
                if ( data.chart_type == 'double')
                    barChart("single", data)();
                if ( data.chart_type == 'map')
                    generateMapView(data);
            }
        });

        closeSearchBar();
        e.preventDefault();
    }
});

document.getElementById("searchHeader").addEventListener("keyup", showSuggestions);
document.getElementById("searchHeader").addEventListener("click", function() {
    if ($('.sidenavModified').hasClass('isActive')==false) // modified card is not open) // TODOALPHA
    {var txt = $('.srch-container input').val("");}
    else{var txt = $('.srch-container input').val();}
    showSuggestions({"which": 0});
});

function closeSearchBar() {
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
}

document.getElementById("nav-cust").addEventListener("focusout", function() {
    setTimeout(function() {
        closeSearchBar();
    }, 100);
});

function updateSearchResult(func_name, query) {
    console.log('hello');
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


