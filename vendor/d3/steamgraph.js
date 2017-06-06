chart("../data/steam-data.csv");

var datearray = [];
var colorrange = [];

function chart(csvpath) {
//  colorrange = ["#f4760a", "#dd8819", "#d36e1f", "#c50052", "#f4760a", "#d36e1f"];
  colorrange = [["242deg", "#f4760a", "#f4760a"], ["251deg", "#dd8819", "#ff9200"], ["250deg", "#d36e1f", "#b01a33"], ["244deg", "#c50052", "#920029"], ["238deg", "#f4760a", "#ffc900"], ["247deg", "#d36e1f", "#b01a33"], ["238deg", "#f4760a", "#ffc900"]];
//  colorrange = ["linear-gradient(242deg, #f4760a, #f4760a)", "linear-gradient(251deg, #dd8819, #ff9200)", "#linear-gradient(250deg, #d36e1f, #b01a33)", "linear-gradient(244deg, #c50052, #920029", "linear-gradient(238deg, #f4760a, #ffc900)", "linear-gradient(247deg, #d36e1f, #b01a33)"];

strokecolor = colorrange[0];

var format = d3v3.time.format("%m/%d/%y");
var docWidth = document.body.clientWidth;

var margin = {top: 40, right: 0, bottom: 30, left: 0};
console.log(document.body.clientWidth);
var width = document.body.clientWidth - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
	
var tooltip = d3v3.select("body")
    .append("div")
    .attr("class", "remove")
  	.style("opacity", "0.2")
	.style("background-color", "#383f49")
    .style("position", "absolute")
    .style("z-index", "1")
    .style("visibility", "hidden")
    .style("top", "30px")
    .style("left", "55px");

var x = d3v3.time.scale()
    .range([0, width]);

var y = d3v3.scale.linear()
    .range([height-10, 0]);

var z = d3v3.scale.ordinal()
    .range(colorrange);

var xAxis = d3v3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(d3v3.time.weeks);

var yAxis = d3v3.svg.axis()
    .scale(y);

var yAxisr = d3v3.svg.axis()
    .scale(y);

var stack = d3v3.layout.stack()
    .offset("silhouette")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value; });

var nest = d3v3.nest()
    .key(function(d) { return d.key; });

var area = d3v3.svg.area()
    .interpolate("cardinal")
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

var svg = d3v3.select(".chart").append("svg");
var svgDefs = svg.append('defs');
	
svg.attr("width", width + margin.left + margin.right)
    	.attr("height", height + margin.top + margin.bottom)
  		.append("g")
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

for (var i=0; i<colorrange.length; i++) {
	var mainGradient = svgDefs.append('linearGradient').attr('id', 'mainGradient'+(i+1));
	// Create the stops of the main gradient. Each stop will be assigned a class to style the stop using CSS.
	mainGradient.append('stop')
		.attr('stop-color', colorrange[i][1])
		.attr('offset', '5%');
	mainGradient.append('stop')
		.attr('stop-color', colorrange[i][2])
		.attr('offset', '95%');
}

var graph = d3v3.csv(csvpath, function(data) {
  data.forEach(function(d) {
    d.date = format.parse(d.date);
    d.value = +d.value;
  });

  var layers = stack(nest.entries(data));

  x.domain(d3v3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3v3.max(data, function(d) { return d.y0 + d.y; })]);
	
  var vertical = d3v3.select(".chart")
        .append("div")
        .attr("class", "remove")
        .style("position", "absolute")
        .style("z-index", "0")
  		.style("opacity", "0.2")
        .style("width", "1px")
        .style("height", parseInt(0.36* docWidth)+"px")
        .style("top", "280px")
        .style("left", "0px")
        .style("background", "#383f49");

  svg.selectAll(".layer")
      .data(layers)
      .enter().append("path")
      .attr("class", "layer")
      .attr("d", function(d) { return area(d.values); })
  	  .style("fill", function(d, i) { return "url(#mainGradient"+(i+1)+")"; });
//  	  .classed(function(d, i) { return "url(#mainGradient"+i+")"; }, true);
//      .style("fill", "url(#mainGradient)");
//      .style("fill", function(d, i) { return z(i); });


  svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + 0 + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", "translate(" + docWidth * 0.06 + ", 0)")
      .call(yAxis.orient("left"));

//  svg.append("g")
//      .attr("class", "y axis")
//      .call(yAxis.orient("left"));

  svg.selectAll(".layer")
    .attr("opacity", 1)
    .on("mouseover", function(d, i) {
      svg.selectAll(".layer").transition()
      .duration(250)
      .attr("opacity", function(d, j) {
        return j != i ? 0.9 : 1;
    })})

    .on("mousemove", function(d, i) {
      mousex = d3v3.mouse(this);
      mousex = mousex[0];
      var invertedx = x.invert(mousex);
      invertedx = invertedx.getMonth() + invertedx.getDate();
      var selected = (d.values);
      for (var k = 0; k < selected.length; k++) {
        datearray[k] = selected[k].date
        datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
      }

      mousedate = datearray.indexOf(invertedx);
      pro = d.values[mousedate].value;

      d3v3.select(this)
      .classed("hover", true)
      .attr("stroke", strokecolor)
      .attr("stroke-width", "0.5px"), 
      tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "visible");
	  
	  $('#productName').text(d.key);
      
    })
    .on("mouseout", function(d, i) {
     svg.selectAll(".layer")
      .transition()
      .duration(250)
      .attr("opacity", "1");
	  
	  $('#productName').text("All Products");
	  
      d3v3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"), tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "hidden");
  })

  function getMod(a) {
	  if (a>0)
		  return a;
	  else
		  return -1*a;
  }

  var divs = d3v3.selectAll('.x-axis .tick')[0];
  var xPos = divs.map(function(a) { return a.getBoundingClientRect().left; } )
  var numHeadings = divs.length;
  var selectedIndex = numHeadings / 2;
  updateHeadings(docWidth/2);
  
  function updateHeadings(mousex) {
	 var disX = xPos.map(function(a) {return getMod(a - mousex)});
	 var newX = disX.indexOf(Math.min.apply(Math, disX));

	 if (newX !== selectedIndex) {
		 $(".x-axis text").eq(selectedIndex).removeClass("selectedTime");
		 selectedIndex = newX;
		 $(".x-axis text").eq(selectedIndex).addClass("selectedTime");
	 }
  }
  d3v3.select(".chart")
      .on("mousemove", function(){
	  	console.log('mouseover');
         mousex = d3v3.mouse(this);
         mousex = mousex[0] + 5;
         vertical.style("left", mousex + "px" );
	  	 updateHeadings(mousex);
  	  })
      .on("mouseover", function(){
//	     console.log('mouseover');
         mousex = d3v3.mouse(this);
         mousex = mousex[0] + 5;
         vertical.style("left", mousex + "px");
		 updateHeadings(mousex);
	   });
	});
}