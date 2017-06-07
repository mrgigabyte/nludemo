
var comments = [];
$('.bigCol').dblclick(function(eventData) {
	var mouseX = eventData.originalEvent.clientX;
	var mouseY = eventData.originalEvent.clientY;
    console.log(mouseX);
    console.log(mouseY);        
	// create a marker using CSS #TODO
    addCommentButton(comments.length+1,"commentclick","comment-btn"+comments.length+1,mouseX,mouseY)
	toggleMenu();
    
})

//sidenav comments
var new_comments =function(){
    var value = $("#comment_value").val();
    if (value !=""){
        console.log("hi dear")
        comments.push(value);
    }
    $("#comment_value").val("");
}
document.getElementById("add_comment").addEventListener("click", new_comments)


function addCommentButton(txt, funcname, btnId, xpos,ypos){
	var idTxt = "";
	if (btnId) { var idTxt = `id="`+btnId+`"`}
	var ele = `<button class="comment-btn" `+idTxt+` onclick="`+funcname+`()">`+txt+`</button>`;
    $('body').append(ele);
    $('#'+btnId).css('position', 'absolute');
    $('#'+btnId).css('top', ypos+'px'); //or wherever you want it
    $('#'+btnId).css('left', xpos+'px');
    $('#'+btnId).css('z-index', 1007);
	console.log(ele);
}