generateMapView();

function generateMapView() {
	var center = [28.733837000000003, 77.256175];
	map = new L.Map('map', {zoomControl:false, center: new L.LatLng(center[0], center[1]), zoom: 12});
	
	map.dragging.disable();
	map.touchZoom.disable();
	map.doubleClickZoom.disable();
	map.scrollWheelZoom.disable();
	map.boxZoom.disable();
	map.keyboard.disable();
	if (map.tap) map.tap.disable();
	document.getElementById('map').style.cursor='default';

	var polyPoints = [];
	
	$.getJSON("/assets/delhi.geojson", function(json) {
		poly = L.polygon(json.features);
		
		L.geoJSON(json, {
			onEachFeature: function (feature, layer) {
				map.fitBounds(layer.getBounds());
				polyPoints = feature.geometry.coordinates[0];
				
				layer.on('click', function() {
					map.fitBounds(layer.getBounds())
				});
			},
			style: function(feature) {
				return {color: "#ccc", opacity: "0.1", stroke: "1px"};
			}
		}).addTo(map);
		
		
		generateData();
	});
	
	var options = {
		radius : 12,
		opacity: 0.5,
		duration: 500,
		lng: function(d){
			return d[0];
		},
		lat: function(d){
			return d[1];
		},
		value: function(d){
			return d.length;
		},
		valueFloor: 0,
		valueCeil: undefined
	};
	
	function isMarkerInsidePolygon(marker) {
		var x = marker[0], y = marker[1];
		
		var inside = false;
		for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
			var xi = polyPoints[i][0], yi = polyPoints[i][1];
			var xj = polyPoints[j][0], yj = polyPoints[j][1];

			var intersect = ((yi > y) != (yj > y))
				&& (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
			if (intersect) inside = !inside;
		}

		return inside;
	};
	
	var hexLayer = L.hexbinLayer(options).addTo(map)
	hexLayer.colorScale().range(["#920029", "#d36e1f", "#f4760a"]);

	var latFn = d3.randomNormal(center[0], 0.018);
	var longFn = d3.randomNormal(center[1], 0.018);

	var generateData = function(){
		var data = [];
		for(i=0; i<20000; i++){
			var point = [longFn(),  latFn()];
			if( isMarkerInsidePolygon(point) ) {
				data.push(point);
			}
		}
		hexLayer.data(data);
	};
}