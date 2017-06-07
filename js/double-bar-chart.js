// doubleBarChart(); 

function doubleBarChart() {
	d3v3.select("#page-wrapper").html();
	$("#page-wrapper").append(`<div class="row">
			<div>
				<div class="title">Risk</div>
				<div class="subtitle">GNPA%</div>
			</div>
			<div>
				<div class="vsTitle">vs</div>
			</div>
			<div>
				<div class="title">Return</div>
				<div class="subtitle">Good Understanding INR CR</div>
			</div>
		</div>`);

	var labelArea = 160;
    var chart,
            width = 400,
            bar_height = 20,
            height = bar_height * 200;
    var rightOffset = width + labelArea;

    var lCol = "infant.mortality";
    var rCol = "gdp";
    // var lCol = " ", rCol = " ";
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

        xFrom.domain(d3v3.extent(data, function (d) {
            return d[lCol];
        }));
        xTo.domain(d3v3.extent(data, function (d) {
            return d[rCol];
        }));

        y.domain(data.map(function (d) {
            return d.countries;
        }));

        var yPosByIndex = function (d) {
            return y(d.countries);
        };
        chart.selectAll("rect.left")
                .data(data)
                .enter().append("rect")
                .attr("x", function (d) {
                    return width - xFrom(d[lCol]);
                })
                .attr("y", yPosByIndex)
                .attr("class", "left")
                .attr("width", function (d) {
                    return xFrom(d[lCol]);
                })
                .attr("height", y.rangeBand());
        chart.selectAll("text.leftscore")
                .data(data)
                .enter().append("text")
                .attr("x", function (d) {
                    return width - xFrom(d[lCol])-40;
                })
                .attr("y", function (d) {
                    return y(d.countries) + y.rangeBand() / 2;
                })
                .attr("dx", "20")
                .attr("dy", ".36em")
                .attr("text-anchor", "end")
                .attr('class', 'leftscore')
                .text(function(d){return d[lCol];});
        chart.selectAll("text.name")
                .data(data)
                .enter().append("text")
                .attr("x", (labelArea / 2) + width)
                .attr("y", function (d) {
                    return y(d.countries) + y.rangeBand() / 2;
                })
                .attr("dy", ".20em")
                .attr("text-anchor", "middle")
                .attr('class', 'name')
                .text(function(d){return d.countries;});

        chart.selectAll("rect.right")
                .data(data)
                .enter().append("rect")
                .attr("x", rightOffset)
                .attr("y", yPosByIndex)
                .attr("class", "right")
                .attr("width", function (d) {
                    return xTo(d[rCol]);
                })
                .attr("height", y.rangeBand());
        chart.selectAll("text.score")
                .data(data)
                .enter().append("text")
                .attr("x", function (d) {
                    return xTo(d[rCol]) + rightOffset+40;
                })
                .attr("y", function (d) {
                    return y(d.countries) + y.rangeBand() / 2;
                })
                .attr("dx", -5)
                .attr("dy", ".36em")
                .attr("text-anchor", "end")
                .attr('class', 'score')
                .text(function(d){return d[rCol];});
        chart.append("text").attr("x",width/3).attr("y", 10).attr("class","title").text("Infant Mortality");
        chart.append("text").attr("x",width/3+rightOffset).attr("y", 10).attr("class","title").text("GDP");
        chart.append("text").attr("x",width+labelArea/3).attr("y", 10).attr("class","title").text("Countries");
    }

    function type(d) {
        d["gdp"] = +d["gdp"];
        d["infant.mortality"] = +d["infant.mortality"];
        return d;
    }

    d3v3.csv("../assets/UN.csv", type, render);
}