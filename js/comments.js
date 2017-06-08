
$('.bigCol').dblclick(function(eventData) {
	var mouseX = eventData.originalEvent.clientX;
    var mouseY = eventData.originalEvent.clientY;       
    // create a marker using CSS #TODO
    addSidebar(true);
    addCommentButton(commentArray.length+1, "toggleMenu", "comment-btn"+commentArray.length+1, mouseX, mouseY)
	toggleMenu();
    
})

//sidenav comments
function addCommentButton(txt, funcname, btnId, xpos,ypos){
	var idTxt = "";
	if (btnId) { var idTxt = `id="`+btnId+`"`}
	var ele = `<button class="comment-btn" `+idTxt+` onclick="`+funcname+`()">`+txt+`</button>`;
    $('body').append(ele);
    $('#'+btnId).css('position', 'fixed');
    $('#'+btnId).css('top', ypos+'px'); //or wherever you want it
    $('#'+btnId).css('left', xpos+'px');
    $('#'+btnId).css('z-index', 1007);
    $('#'+btnId).css('border-radius', "50%");
    $('#'+btnId).css('border', "none");
    $('#'+btnId).css('color', '#fff');
    $('#'+btnId).css('background-image', "linear-gradient(207deg, #c50052, #920029)");
    $('#'+btnId).css('padding', "16px 20px");
    $('#'+btnId).css('cursor', "pointer");
    $('#'+btnId).css('outline', "none");
}
