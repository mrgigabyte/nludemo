//addSidebar();
//addCommentsbar();

var commentArray = [];
addSidebar();

function addSidebar(addComment, karDoAdd) {
    if (karDoAdd) {
        commentArray.push($('.commentText').val());
    }

    var header = `<div class="row topBar">
                    <div class="col-md-2">
                        <img src="../images/ic-insights.svg" class="image">
                    </div>
                    <div class="col-md-6" style="padding-top:12px;">
                        <h3>Insights</h3>
                    </div>
                    <div class="col-md-3">
                        <img src="../images/ic-exit.svg" class="image" style="cursor: pointer" id="closeMenu">
                    </div>
                </div>`;

   var commentsHTML = "";

   for (var i=1; i<= commentArray.length; i++) {
       commentsHTML = commentsHTML + `<div class="first-container">
                <div class="row comment">
                    <div class="col-xs-2">
                        <p class="bold-Number">`+i+`</p>
                    </div>
                    <div class="col-xs-10">
                        <p class="copy_pros">&copy pros</p>
                        <p class="comment-for-item">`+commentArray[i-1  ]+`</p>
                    </div>
                </div>
            </div>`;
    }

    var addCommentBtn =  
    `<div class="row comment">
            <div class="btnAdd">
                <span class="btnAddComment">LEAVE A COMMENT OR INSIGHT</span>
            </div>
        </div><div class="sidebar-sources"><div class="sidebar-sources-container"><div class="sidebar-sources-content"><div class="sidebar-sources-content-header">SOURCES</div><br/>
<div class="sidebar-sources-content-txt">Trending query source:</div>
ABFL DWH<br/><br/>
<div class="sidebar-sources-content-txt">Natural language query:</div>
CIBIL Market Sizing Report (March 2017)<br/><br/>
<div class="sidebar-sources-content-txt">Query #3:</div>
CIBIL CIR Archives (March 2017)</div></div>`;

    var addCommentHTML = "";
    if (addComment) {
        addCommentHTML = `
            <div class="first-container">
                <div class="row comment">
                    <div class="col-xs-2">
                        <p class="bold-Number">`+(commentArray.length+1)+`</p>
                    </div>
                    <div class="col-xs-10">
                        <p class="copy_pros">&copy pros</p>
                        <textarea class="commentText"></textarea>
                        <div class="float-right">
                            <span class="btun" onclick="addSidebar();">Cancel</span>
                            <span class="btun save" onclick="addSidebar(false, true)">Save</span>
                        </div>
                    </div>
                </div>
            </div> `;
    }
        
    html = header + commentsHTML + addCommentHTML + addCommentBtn;
    
    $('#cbp-spmenu-s2').html(html);

    document.getElementById( 'closeMenu' ).onclick = function() { toggleMenu(); };
}



function addCommentsbar() {
   var html = `    <div class="row horizontal">
                <div class="col-md-2">
                    <img src="../images/ic-insights.svg" class="image">
                </div>
                <div class="col-md-6" style="padding-top:12px;">
                    <h3>Insights</h3>
                </div>
                <div class="col-md-3">
                    <img src="../images/ic-exit.svg" class="image" style="cursor: pointer" id="closeMenu">
                </div>
    </div>
    <div class="first-container">
            <div class="row ">
                    <div class="col-xs-2">
                        <p class="bold-Number">1</p>
                    </div>
                    <div class="col-xs-10">
                        <p class="copy_pros">Sanjay, CFO ABFL</p>
                        <p class="comment-for-item">Opportunity Area 1</p>
                    </div>
                    <div class="col-xs-2">
                        <p class="bold-Number">2</p>
                    </div>
                    <div class="col-xs-10">
                        <p class="copy_pros">Sanjay, CFO ABFL</p>
                        <p class="comment-for-item">Opportunity Area 2</p>
                    </div>
                    <div class="col-xs-2">
                        <p class="bold-Number">3</p>
                    </div>
                    <div class="col-xs-10">
                        <p class="copy_pros">Sanjay, CFO ABFL</p>
                        <p class="comment-for-item">Opportunity Area 3</p>
                    </div>
                    <div class="btnAdd">
                        <span class="btnAddComment">LEAVE A COMMENT OR INSIGHT</span>
                    </div>
            </div>
        </div>`;
         
    
    $('#cbp-spmenu-s2').html(html);

    document.getElementById( 'closeMenu' ).onclick = function() { toggleMenu(); };
}

