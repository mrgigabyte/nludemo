addSidebar();

function addSidebar() {
   var html = `<div class="row">
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
                <div class="row">
                    <div class="col-xs-2">
                        <p class="bold-Number">1</p>
                    </div>
                    <div class="col-xs-10">
                        <p class="copy_pros">&copy pros</p>
                        <p class="comment-for-item">Good to see the upward trend in prices. Seems our personalized pricing model is working well @seker,fyi</p>
                    </div>
                    <div class="btnAdd">
                        <span class="btnAddComment">LEAVE A COMMENT OR INSIGHT</span>
                    </div>
                </div>
            </div> `;
         
    
    $('#cbp-spmenu-s2').html(html);

//    document.getElementById( 'closeMenu' ).onclick = function() { toggleMenu(); };
}