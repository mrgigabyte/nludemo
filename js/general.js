function headerbutton(txt,funcname){
  $('.search-container-parent').append(`<button class="search-btn" onclick="`+funcname+`()">`+txt+`</button>`);
}

function headerbuttonRemove(){
    $('.search-container-parent').html("");
}