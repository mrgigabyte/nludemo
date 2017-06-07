// doubleBarChart(); 

function doubleBarChart() {
    d3v3.select('.selected').html(credit_policy2);
    d3v3.select('.notselected1').html(kycauthentication);
    d3v3.select('.notselected2').html(salesefficiency);
	d3v3.select("#page-wrapper").html("");
	$("#page-wrapper").append(`<div>
			<div class="title">Risk</div>
			<div class="description">GNPA%</div>
		</div>
		<div>
			<div class="vsTitle">vs</div>
		</div>

		<div>
			<div class="title">Return</div>
			<div class="description">Good Understanding INR CR</div>
		</div>

	`);

	var labelArea = 200;
    var chart,
            width = 400,
            bar_height = 30,
            height = bar_height * 10;
    var rightOffset = width + labelArea + 20;

    var lCol = "risk";
    var rCol = "return";

    var xFrom = d3v3.scale.linear()
            .range([0, width]);
    var xTo = d3v3.scale.linear()
            .range([0, width]);
    var y = d3v3.scale.ordinal()
            .rangeBands([20, height]);

    function render(data) {
        var chart = d3v3.select("#page-wrapper")
                .append('svg')
                .attr('class', 'chart')
                .attr('width', labelArea + width + width)
                .attr('height', height);

            var svg = d3v3.select(".chart").append("svg");
		    var svgDefs = svg.append('defs');

		    var margin = {
		        top: 40,
		        right: 0,
		        bottom: 30,
		        left: 0
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
        xTo.domain(d3v3.extent(data, function (d) {
            return d[rCol];
        }));

        y.domain(data.map(function (d) {
            return d.products;
        }));

        var yPosByIndex = function (d) {
            return y(d.products) + 8;
        };
        chart.selectAll("rect.left")
                .data(data)
                .enter().append("rect")
                .attr("x", function (d) {
                    return width - xFrom(d[lCol]);
                })
                .attr("y", yPosByIndex)
                .attr("rx", 5)
                .attr("ry", 5)
                .attr("class", "left")
                .attr("width", function (d) {
                    return xFrom(d[lCol]);
                })
                .attr("height", 10);
        chart.selectAll("text.leftscore")
                .data(data)
                .enter().append("text")
                .attr("x", function (d) {
                    return width - xFrom(d[lCol])-40;
                })
                .attr("y", function (d) {
                    return y(d.products) + y.rangeBand() / 2;
                })
                .attr("dx", "20")
                .attr("dy", "0.36em")
                .attr("text-anchor", "end")
                .attr('class', 'leftscore')
                .text(function(d){return d[lCol];});
        chart.selectAll("text.name")
                .data(data)
                .enter().append("text")
                .attr("x", (labelArea / 2) + width + 10)
                .attr("y", function (d) {
                    return y(d.products) + y.rangeBand() / 2;
                })
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
                .attr("y", function (d) {
                    return y(d.products) + y.rangeBand() / 2;
                })
                .attr("dx", -5)
                .attr("dy", "0.36em")
                .attr("text-anchor", "end")
                .attr('class', 'score')
                .text(function(d){return d[rCol];});

        // chart.append("text").attr("x",width/3).attr("y", 10).attr("class","title").html('Risk');
        // chart.append("div").attr("x",width/3).attr("y", 10).attr("class","title").html('<div class="title">Risk</div><div class="subtitle">GNPA%</div></div>');

   //      chart.append("div").attr("x",width/3+rightOffset).attr("y", 10).attr("class","title").html(`<div>
			// 	<div class="title">Return</div>
			// 	<div class="subtitle">Good Understanding INR CR</div>
			// </div>`);

   //      chart.append("div").attr("x",width+labelArea/3).attr("y", 10).attr("class","title").html(`<div>
			// 	<div class="vsTitle">vs</div>
			// </div>`);
    }

    function type(d) {
        d[lCol] = +d[lCol];
        d[rCol] = +d[rCol];
        return d;
    }

    d3v3.csv("../assets/UN.csv", type, render);
}