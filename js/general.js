function addHeaderButton(txt, funcname, btnId){
	var idTxt = "";
	if (btnId) { var idTxt = `id="`+btnId+`"`}
	var ele = `<button class="search-btn" `+idTxt+` onclick="`+funcname+`()">`+txt+`</button>`;
	console.log(ele);
	$('.search-container-parent.buttons').append(ele);
}

function removeHeaderButtons(){
    $('.search-container-parent.buttons').html("");
    $('body #commentsIndex').html("");
}

$('.box.first').click(function() {
	query = "What have been the product trends for ABFL in the last 12 months?";
	var txt = $('.srch-container input').val(query);
	drawSteamGraph();
    $('.box').removeClass("selected");
	removeHeaderButtons();
	addHeaderButton("VS INFLATION", "addInflationGraph", "inflateBtn");
	addHeaderButton("VS GDP", "doNothing");
});

function unsecuredLoans() {
	singleBarChart();
	removeHeaderButtons();
	addHeaderButton("FOR NBFC", "unsecuredNBFC", "nbfcButton");
	addHeaderButton("VS RISK", "doubleBarChartOk");
}

function unsecuredNBFC() {
	$('#searchHeader').val($('#searchHeader').val()+" for NBFC");
	singleBarChartNBFC();
	removeHeaderButtons();
	addHeaderButton("VS RISK", "doubleBarChartOk");
}

function doubleBarChartOk() {
	$('#searchHeader').val($('#searchHeader').val()+" vs RISK");
	removeHeaderButtons();
	doubleBarChart();
	addHeaderButton("SHOW OPPORTUNITIES GEOGRAPHICALLY", "mapViewDedo", "thisismapview");
}

function mapViewDedo() {
	$('#thisismapview').remove();
	generateMapView();
}

function addInflationGraph() {
	$('#inflateBtn').remove();
	plotLineGraph();
}

function doNothing() {
	console.log('I do nothing. Really.');
}


baseApiUrl = "http://52.66.179.123:4000/";
