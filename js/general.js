function addHeaderButton(txt, funcname, btnId){
	var idTxt = "";
	if (btnId) { var idTxt = `id="`+btnId+`"`}
	var ele = `<button class="search-btn" `+idTxt+` onclick="`+funcname+`()">`+txt+`</button>`;
	console.log(ele);
	$('.search-container-parent.buttons').append(ele);
}

function removeHeaderButtons(){
    $('.search-container-parent.buttons').html("");
}

$('.box.first').click(function() {
	query = "What have been the product trends for ABFL in the last 12 months?";
	var txt = $('.srch-container input').val(query);
	drawSteamGraph();
	addHeaderButton("VS INFLATION", "addInflationGraph", "inflateBtn");
	addHeaderButton("VS GDP", "doNothing");
});

function addInflationGraph() {
	console.log("TO BE ADDED #TODO ?");
	$('#inflateBtn').remove();
}

function doNothing() {
	console.log('I do nothing. Really.');
}


