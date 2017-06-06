var menuRight = document.getElementById( 'cbp-spmenu-s2' );
var showRight = document.getElementById( 'showRight' );

function toggleMenu() {
	classie.toggle( showRight, 'active'); 
        classie.toggle( menuRight, 'cbp-spmenu-open' );
}

$(document).keyup(function(e) {
    if (e.keyCode == 27) {
	toggleMenu();
    }
});

showRight.onclick = function() {
	toggleMenu();
};
