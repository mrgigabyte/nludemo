// doubleBarChart(); 

function doubleBarChart() {
	d3v3.select("#page-wrapper").html("");
	$("#page-wrapper").append(`<div style="margin-top: 60px; magin-bottom: 40px;"><div class="chartHead" style="width:370px; margin-right: 100px;">
			<div class="title">Risk</div>
			<div class="description">GNPA%</div>
		</div>
		<div class="chartHead" style="width:150px; margin-top: -20px">
			<div class="vsTitle">vs</div>
		</div>
		<div class="chartHead">
			<div class="title">Return</div>
			<div class="description">Good Understanding INR CR</div>
		</div>
        </div>
	`);

	var labelArea = 200;
    var chart,
            width = 300,
            bar_height = 30,
            height = bar_height * 14;

    var rightOffset = width + labelArea + 20;

    var lCol = "risk";
    var lCol2 = "risk2";
    var rCol = "return";
    var rCol2 = "return2";

    var xFrom = d3v3.scale.linear()
            .range([50, width]);
    var xFrom2 = d3v3.scale.linear()
            .range([50, width]);
    var xTo = d3v3.scale.linear()
            .range([20, width]);
    var xTo2 = d3v3.scale.linear()
            .range([20, width]);
    var y = d3v3.scale.ordinal()
            .rangeBands([20, height]);

    function render(data) {

        var chart = d3v3.select("#page-wrapper")
                .append('svg')
                .attr('class', 'biChart')
                .attr('width', labelArea + width + width + 200)
                .attr('height', height)

        var svg = d3v3.select(".biChart").append("svg");
	    var svgDefs = svg.append('defs');

	    var margin = {
	        top: 40,
	        right: 0,
	        bottom: 30,
	        left: 150
	    };

	    svg.attr("width", width + margin.left + margin.right)
	        .attr("height", height + margin.top + margin.bottom)
	        .append("g")
	        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	    var colorrange = [[["#c50052"], ["#920029"]], [["#dd8819"], ["#ff9200"]]];

	    for (var i = 0; i < colorrange.length; i++) {
	        var mainGradient = svgDefs.append('linearGradient')
	            .attr('id', 'barGradient' + (i + 1))
	        mainGradient.append('stop')
	            .attr('stop-color', colorrange[i][0])
	            .attr('offset', '5%');
	        mainGradient.append('stop')
	            .attr('stop-color', colorrange[i][1])
	            .attr('offset', '95%');
	    }

        xFrom.domain(d3v3.extent(data, function (d) {
            return d[lCol];
        }));

        xFrom2.domain(d3v3.extent(data, function (d) {
            return d[lCol2];
        }));
        
        xTo.domain(d3v3.extent(data, function (d) {
            return d[rCol];
        }));

        xTo2.domain(d3v3.extent(data, function (d) {
            return d[rCol2];
        }));

        y.domain(data.map(function (d) {
            return d.products;
        }));

        var yPosByIndex = function (d) {
            return y(d.products) + 8;
        };
        
        var yPosByIndex2 = function (d) {
            return y(d.products) + 23;
        };

        var yPosByIndexText = function (d) {
            return y(d.products) + 8 + 5;
            // return y(d.products) + y.rangeBand() / 2;
        };

        var yPosByIndex2Text = function (d) {
            return y(d.products) + 23 + 5;
            // return y(d.products) + y.rangeBand() / 2;
        };
        
        chart.selectAll("rect.left")
                .data(data)
                .enter().append("rect")
                .attr("x", function (d) {
                    return width + 30 - xFrom(d[lCol]);
                })
                .attr("y", yPosByIndex)
                .attr("rx", 5)
                .attr("ry", 5)
                .attr("class", "left")
                // .attr("class", "bg"+function(d) {return })
                .attr("width", function (d) {
                    return Math.max(xFrom(d[lCol]) - 30, 0);
                })
                .attr("height", 10);

        chart.selectAll("text.leftscore")
                .data(data)
                .enter().append("text")
                .attr("x", function (d) {
                    return width - xFrom(d[lCol]);
                })
                .attr("y", yPosByIndexText)
                .attr("dx", "20")
                .attr("dy", "0.36em")
                .attr("text-anchor", "end")
                .attr('class', 'leftscore')
                .text(function(d){return d[lCol];});

        chart.selectAll("rect.left2")
                .data(data)
                .enter().append("rect")
                .attr("x", function (d) {
                    return width + 30 - xFrom2(d[lCol2]);
                })
                .attr("y", yPosByIndex2)
                .attr("rx", 5)
                .attr("ry", 5)
                .attr("class", "left2")
                .attr("width", function (d) {
                    return Math.max(xFrom2(d[lCol2]) - 30, 0);
                })
                .attr("height", 10);

        chart.selectAll("text.leftscore2")
                .data(data)
                .enter().append("text")
                .attr("x", function (d) {
                    return width - xFrom2(d[lCol2]);
                })
                .attr("y", yPosByIndex2Text)
                .attr("dx", "20")
                .attr("dy", "0.36em")
                .attr("text-anchor", "end")
                .attr('class', 'leftscore')
                .text(function(d){return d[lCol2];});

        chart.selectAll("text.name")
                .data(data)
                .enter().append("text")
                .attr("x", (labelArea / 2) + width + 10)
                .attr("y", yPosByIndex2)
                .attr("dy", ".20em")
                .attr("text-anchor", "middle")
                .attr('class', 'name')
                .text(function(d){return d.products;});

        chart.selectAll("rect.right")
                .data(data)
                .enter().append("rect")
                .attr("x", rightOffset)
                .attr("y", yPosByIndex)
                .attr("rx", 5)
                .attr("ry", 5)
                .attr("class", "right")
                .attr("width", function (d) {
                    return xTo(d[rCol]);
                })
                .attr("height", 10);

        chart.selectAll("text.score")
                .data(data)
                .enter().append("text")
                .attr("x", function (d) {
                    return xTo(d[rCol]) + rightOffset+40;
                })
                .attr("y", yPosByIndexText)
                .attr("dx", -5)
                .attr("dy", "0.36em")
                .attr("text-anchor", "end")
                .attr('class', 'score')
                .text(function(d){return d[rCol];});

        chart.selectAll("rect.right2")
                .data(data)
                .enter().append("rect")
                .attr("x", rightOffset)
                .attr("y", yPosByIndex2)
                .attr("rx", 5)
                .attr("ry", 5)
                .attr("class", "right2")
                .attr("width", function (d) {
                    return xTo2(d[rCol2]);
                })
                .attr("height", 10);

        chart.selectAll("text.score2")
                .data(data)
                .enter().append("text")
                .attr("x", function (d) {
                    return xTo2(d[rCol2]) + rightOffset+40;
                })
                .attr("y", yPosByIndex2Text)
                .attr("dx", -5)
                .attr("dy", "0.36em")
                .attr("text-anchor", "end")
                .attr('class', 'score')
                .text(function(d){return d[rCol2];});
    }

    function type(d) {
        d[lCol] = +d[lCol];
        d[rCol] = +d[rCol];
        d[lCol2] = +d[lCol2];
        d[rCol2] = +d[rCol2];
        return d;
    }

    d3v3.csv("../assets/un.csv", type, render);
}