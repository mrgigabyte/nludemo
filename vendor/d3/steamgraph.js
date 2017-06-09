// drawSteamGraph();

var selectedDate;
var lx;
var vertical2;

function drawSteamGraph() {
    $('body #commentsIndex').html("");
    $('#sidenavModified').html(`
                <div class="box trendingModified trending_box_container">What have been the product trends for ABFL in the last 12 months?
					<br><br>
					<div class="subtitle"><img src="../images/ic-trending.png"   srcset="../images/ic-trending@2x.png 2x, ../images/ic-trending@3x.png 3x"
                            class="ic_trending"><strong>
                        TRENDING</strong>
					</div>    
				</div>
                <div class="box Modifiedfirst">
				<div class="modifiedfirstText">
					What have been the product trends for ABFL in the last 12 months?</div><hr><button class="modified-save" onclick=ModifiedSave()>Save</button></div>`);
//    d3v3.select('.Modifiedfirst').html(modified_card);
    d3v3.select('.selected').html(daily_digest_extended);
    d3v3.select('.notselected1').html(treasury);
    d3v3.select('.notselected2').html(sales_efficiency);
    d3v3.select('.notselected3').html(cross_sell);
    d3v3.select('.notselected4').html(credit_policy2);
    d3v3.select('.notselected5').html(kycauthentication);
    d3v3.select('.notselected6').html(credit_policy1);
    var datearray = [];
    var colorrange = [];

    colorrange = [
        ["238", "#f4760a", "#ffc900"],
        ["238", "#dd8819", "#ffc900"],
        ["247", "#d36e1f", "#b01a33"],
        ["244", "#c50052", "#920029"],
        ["250", "#d36e1f", "#b01a33"],
        ["251", "#dd8819", "#ff9200"],
        ["242", "#f4760a", "#ffc900"]
    ];

    strokecolor = colorrange[0];

    var format = d3v3.time.format("%m/%d/%y");
    var docWidth = document.body.clientWidth;

    var margin = {
        top: 40,
        right: 0,
        bottom: 30,
        left: 0
    };
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
        .range([height - 10, 0]);

    var z = d3v3.scale.ordinal()
        .range(colorrange);

    var xAxis = d3v3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(5)
        .tickFormat(d3v3.time.format("%b"));

    var yAxis = d3v3.svg.axis()
        .scale(y);

    var yAxisr = d3v3.svg.axis()
        .scale(y)
        .tickFormat (function (d) { return formatValue(d).replace('G', 'B'); });

    var stack = d3v3.layout.stack()
        .offset("silhouette")
        .values(function(d) {
            return d.values;
        })
        .x(function(d) {
            return d.date;
        })
        .y(function(d) {
            return d.metric;
        });

    var nest = d3v3.nest()
        .key(function(d) {
            return d.product;
        });

    var area = d3v3.svg.area()
        .interpolate("cardinal")
        .x(function(d) {
            return x(d.date);
        })
        .y0(function(d) {
            return y(d.y0);
        })
        .y1(function(d) {
            return y(d.y0 + d.y);
        });

    $('#page-wrapper').html("")
    $("#page-wrapper").append('<div class="row"> \
        <div id="productName">All Products</div> \
        <div class="chart steamgraph"> \
        </div> \
      </div> \
    ');

    var svg = d3v3.select(".chart").append("svg");
    var svgDefs = svg.append('defs');

    svg.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    for (var i = 0; i < colorrange.length; i++) {
        var mainGradient = svgDefs.append('linearGradient')
            .attr('id', 'mainGradient' + (i + 1))
            .attr('gradientTransform', "rotate(" + colorrange[i][0] + ")");
        // Create the stops of the main gradient. Each stop will be assigned a class to style the stop using CSS.
        mainGradient.append('stop')
            .attr('stop-color', colorrange[i][1])
            .attr('offset', '5%');
        mainGradient.append('stop')
            .attr('stop-color', colorrange[i][2])
            .attr('offset', '95%');
    }

    var plotGraph = function(response) {
        var data = response.rows;

        console.log(data);

        data.forEach(function(d) {
            d.date = format.parse(d.date);
            d.metric = +d.metric;
        });

        var layers = stack(nest.entries(data));

        x.domain(d3v3.extent(data, function(d) {
            return d.date;
        }));
        y.domain([0, d3v3.max(data, function(d) {
            return d.y0 + d.y;
        })]);

        var vertical = d3v3.select(".chart")
            .append("div")
            .attr("class", "vertical1")
            .style("position", "absolute")
            .style("z-index", "0")
            .style("opacity", "0.2")
            .style("width", "1px")
            .style("height", parseInt(0.33 * docWidth) + "px")
            .style("top", "280px")
            .style("left", "0px")
            .style("background", "#383f49");

        svg.selectAll(".layer")
            .data(layers)
            .enter().append("path")
            .attr("class", "layer")
            .attr("d", function(d) {
                return area(d.values);
            })
            .style("fill", function(d, i) {
                return "url(#mainGradient" + (i + 1) + ")";
            });
        //      .classed(function(d, i) { return "url(#mainGradient"+i+")"; }, true);
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
                        return j != i ? 0.4 : 1;
                    })
            })

            .on("mousemove", function(d, i) {
                // mousex = d3v3.mouse(this);
                // mousex = mousex[0];
                // selectedDate = x.invert(mousex);
                // var invertedx = x.invert(mousex);
                // console.log("invertedx", invertedx);
                // invertedx = invertedx.getMonth() + invertedx.getDate();

                // console.log("invertedx", invertedx);
                // var selected = (d.values);

                // console.log("selected", selected);

                // for (var k = 0; k < selected.length; k++) {
                //     console.log
                //     datearray[k] = selected[k].date
                //     datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
                //     console.log("date aarray k", datearray[k]);
                // }

                // mousedate = datearray.indexOf(invertedx);
                // console.log("sab", d, d.values, mousedate);
                // pro = d.values[mousedate].metric;

                d3v3.select(this)
                    .classed("hover", true)
                    .attr("stroke", strokecolor)
                    .attr("stroke-width", "0.5px"),
                    // tooltip.html("<p>" + d.product + "<br>" + pro + "</p>").style("visibility", "visible");

                // console.log('hi', d);
                $('#productName').html(d.key);

            })
            .on("mouseout", function(d, i) {
                svg.selectAll(".layer")
                    .transition()
                    .duration(250)
                    .attr("opacity", "1");

                $('#productName').html("All Products");

                d3v3.select(this)
                    .classed("hover", false)
                    .attr("stroke-width", "0px");

                // tooltip.html("<p>" + d.product + "<br>" + pro + "</p>").style("visibility", "hidden");
            })

        function getMod(a) {
            if (a > 0)
                return a;
            else
                return -1 * a;
        }

        var divs = d3v3.selectAll('.x-axis .tick')[0];
        var xPos = divs.map(function(a) {
            return a.getBoundingClientRect().left;
        });

        var numHeadings = divs.length;
        var selectedIndex = numHeadings / 2;
        updateHeadings(docWidth / 2);

        function updateHeadings(mousex) {
            var disX = xPos.map(function(a) {
                return getMod(a - mousex)
            });
            var newX = disX.indexOf(Math.min.apply(Math, disX));

            if (newX !== selectedIndex) {
                $(".x-axis text").eq(selectedIndex).removeClass("selectedTime");
                selectedIndex = newX;
                $(".x-axis text").eq(selectedIndex).addClass("selectedTime");
            }
        }
        function updateVerticals() {
            var mousex_1 = mousex[0] + 5;
            vertical.style("left", mousex_1 + "px");
            var mousex_2 = mousex[0];
            selectedDate = x.invert(mousex_2);
            updateHeadings(mousex_2);
            if(lx) {
                vertical2.style("left", (299 + (lx(selectedDate) - 244) * (715 - 299) / (601 - 244) ) + "px");
            }
        }

        d3v3.select(".chart")
            .on("mousemove", function() {
                mousex = d3v3.mouse(this);
                updateVerticals(mousex);
            })
            .on("mouseover", function() {
                mousex = d3v3.mouse(this);
                updateVerticals(mousex);
                updateHeadings(mousex);
            });
    };

    $.ajax({
      type: "POST",
      url: baseApiUrl + 'search',
      data: { "search" : "What have been the product trends for ABFL in the last 12 months?" },
      success: plotGraph
    });
}

function plotLineGraph() {
    vertical2 = d3v3.select(".chart")
        .append("div")
        .attr("class", "vertical2")
        .style("position", "absolute")
        .style("z-index", "1")
        .style("opacity", "1")
        .style("width", "1px")
        .style("height", "45px")
        .style("top", "840px")
        .style("left", "300px")
        .style("background", "#383f49");

    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 780 + 70 - margin.left - margin.right,
        height = 100 - margin.top - margin.bottom;

    var parseDate = d3v3.time.format("%d-%b-%y").parse;

    lx = d3v3.time.scale()
        .range([0, width]);

    var y = d3v3.scale.linear()
        .range([height, 0]);

    var xAxis = d3v3.svg.axis()
        .scale(lx)
        .orient("bottom")
        .ticks(5)
        .tickFormat(d3v3.time.format("%b"));

    var yAxis = d3v3.svg.axis()
        .scale(y)
        .orient("left");
        // .ticks(5);

    var valueline = d3v3.svg.line()
        .x(function(d) { return lx(d.date); })
        .y(function(d) { return y(d.inflation); })
        .interpolate("basis");

    var svg = d3v3.select(".chart").append("svg").attr("class", "lineGraph")

        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    d3v3.csv("../data/inflation.csv", function(error, data) {

    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.inflation = +d.inflation;
    });

    data.reverse();
    
    // Scale the range of the data
    lx.domain(d3v3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3v3.max(data, function(d) { return d.inflation; })]);
    

    svg.append("linearGradient")                
        .attr("id", "line-gradient")            
        .attr("gradientUnits", "userSpaceOnUse")    

    .selectAll("stop")                      
        .data([                             
            {offset: "0%", color: "#f5f5fa"},       
            {offset: "28.5%", color: "#f5f5fa"},  
            {offset: "28.5%", color: "#920029"},        
            {offset: "78.5%", color: "#920029"},        
            {offset: "78.5%", color: "#f5f5fa"},    
            {offset: "100%", color: "#f5f5fa"} 
        ])       
    .enter().append("stop")         
        .attr("offset", function(d) { return d.offset; })   
        .attr("stop-color", function(d) { return d.color; });

    // Add the valueline path.
    var maxX = lx(d3v3.extent(data, function(d) { return d.date; })[1]);
    svg.append("path")
        .attr("class", "line").attr("fill","url(#")
        .attr("d", ''+valueline(data)+"L0,"+y(0)+'L'+maxX+","+y(0))
        .on("mousemove", function(d, i) {
                // console.log(selectedDate, x(selectedDate));
                // selectedDate = x.invert(mousex);
                // var invertedx = x.invert(mousex);
                // console.log("invertedx", invertedx);
                // invertedx = invertedx.getMonth() + invertedx.getDate();

                // console.log("invertedx", invertedx);
                // var selected = i;
                // console.log("selected", x());

                // for (var k = 0; k < selected.length; k++) {
                //     console.log
                //     datearray[k] = selected[k].date
                //     datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
                //     console.log("date aarray k", datearray[k]);
                // }

                // mousedate = datearray.indexOf(invertedx);
                // console.log("sab", d, d.values, mousedate);
                // pro = d.values[mousedate].metric;
            })

    // Add the X Axis
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (margin.left/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
        .attr("class", "inflationHeading")
        .attr("y", -40)
        .text("Inflation");

    // Add the Y Axis
    // svg.append("g")
    //     .attr("class", "y axis")
    //     .call(yAxis);

    });
}