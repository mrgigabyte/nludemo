//drawHexagonalMap("");

function drawHexagonalMap(csvpath) {
    
    d3v3.select('.selected').html(treasury);
    d3v3.select('.notselected1').html(churn);
    d3v3.select('.notselected2').html(cross_sell);
	var center = [20.5937, 78.9629];
	var osmUrl = '',
		osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});

	map = new L.Map('map', {layers: [osm], center: new L.LatLng(center[0], center[1]), zoom: 7});

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

	var hexLayer = L.hexbinLayer(options).addTo(map)
	hexLayer.colorScale().range(['white', 'blue']);

	var latFn = d3.randomNormal(center[0], 1);
	var longFn = d3.randomNormal(center[1], 1);

	var generateData = function(){
		var data = [];
		for(i=0; i<1000; i++){
			data.push([longFn(),  latFn()]);
		}
		hexLayer.data(data);
	};

	generateData();
}
