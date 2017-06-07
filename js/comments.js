$('.bigCol').dblclick(function(eventData) {
	var mouseX = eventData.originalEvent.clientX;
	var mouseY = eventData.originalEvent.clientY;

	// create a marker using CSS #TODO
	toggleMenu();
})