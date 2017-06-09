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
    padding-top: 35px;">
				<div class="modifiedfirstText">
					What have been the product trends for ABFL in the last 12 months?</div><hr id="modifiedHR"><button class="modified-save" onclick=ModifiedSave() id="modifiedSave">Save</button></div>`);
    $('.modifiedfirstText').text($('.srch-container input').val());
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
    // UPDATE SEARCH QUERY
    // TODOALPHA
    // UPDATE MODIFIED CARD IS THERE
     $('.srch-container input').val("What have been the product trends for ABFL in the last 12 months vs inflation");
    $('.modifiedfirstText').text("What have been the product trends for ABFL in the last 12 months vs inflation");
	$('#inflateBtn').remove();
	plotLineGraph();
}

function doNothing() {
	console.log('I do nothing. Really.');
}

function ModifiedSave(){
    $('.trending_box_container').addClass('isActive');
    $('.sidenavModified').removeClass('isActive');
    $('#modifiedHR').remove();
    $('#modifiedSave').remove();
    
//  $("<div class='box selected' style='height:400px;'>HI THIS IS ME</div>").prependTo('#sidenav').hide().slideDown();
}

baseApiUrl = "http://52.66.179.123:4000/";
