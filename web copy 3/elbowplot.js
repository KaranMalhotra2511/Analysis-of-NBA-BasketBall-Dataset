function elbow_plot(filename) {

    filename = "./data/" + filename;
    svg.selectAll("*").remove();

    var color = d3.scale.category10();
    
    // Set the dimensions of the canvas / graph
    var margin = {top: 10, right: 20, bottom: 50, left: 50},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // Set the ranges
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
                    .orient("bottom").ticks(18);

    var yAxis = d3.svg.axis().scale(y)
                    .orient("left").ticks(18);

    // Define the line
    var valueline = d3.svg.line()
                    .y(function(d) { return y(d.KMeans_Score/1000); })
                    .x(function(d) { return x(d.Cluster_Count); });

    
    // Get the data
    d3.csv(filename, function(error, data) {
        data.forEach(function(d) {
            d.KMeans_Score = +d.KMeans_Score;
            d.Cluster_Count = +d.Cluster_Count;
        });

        // Scale the range of the data
        y.domain([0,d3.max(data, function(d) { return d.KMeans_Score/1000; }) ]);
        x.domain(d3.extent(data, function(d) { return d.Cluster_Count; }));

        // Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline(data))
            .attr("transform", "translate(120,0)");

        var circle = svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("transform", "translate(120,0)")
            .attr("r", function (d,i) {

                if(filename=='./data/elbow.csv') {
                    console.log("pca")
                    if(i==3)
                    {
                        return 5;
                    }
                    else
                        return 3;
                }
                else
                {
                    if(i==4)
                    {
                        return 5;
                    }
                    else
                        return 3;
                }



            })
            .attr("cx", function(d) { return x(d.Cluster_Count); })
            .attr("cy", function(d) { return y(d.KMeans_Score/1000); })
            .style("fill",function (d,i) {


                if(filename=='./data/elbow.csv') {
                    if (i == 3) {
                        return "green"
                    }
                    else
                        return "brown"
                }
                else
                {
                    if (i == 4) {
                        return "green"
                    }
                    else
                        return "brown"
                }

        });
        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(120," + height+ ")")
            .call(xAxis);

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(120,0)")
            .call(yAxis);

        // Add the text label for the Y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", left_pad-100)
            .attr("x",height-400)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("KMeans Score");

        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom-5) + ")")
            .style("text-anchor", "middle")
            .text("Count");


        var tooltip = d3.select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style("opacity", 0);

        svg.append("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", 2.5)
            .attr("cx", function(d){
                return x(d.Cluster_Count);
            }) 
            .attr("cy", function(d){
                return y(d.KMeans_Score/1000);
            }) 
            .attr("stroke", "black");
        circle.on("mouseout", function(d,i) {

            tooltip.transition()
                .duration(500)
                .style("opacity", 0);

            d3.select(this)
                .style("fill",function () {
                    if(filename=='./data/elbow.csv') {
                        if (i == 3) {
                            return "green"
                        }
                        else
                            return "brown"
                    }
                    else
                    {
                        if (i == 4) {
                            return "green"
                        }
                        else
                            return "brown"
                    }
                })
        });
        circle.on("mouseenter", function(d,i) {

            d3.select('.tooltip')
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("("+Math.round(d.Cluster_Count * 100) / 100+","+Math.round(d.KMeans_Score/1000 * 100) / 100+")")
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");

            d3.select(this)
                .style("fill","blue")
        });

    });

}