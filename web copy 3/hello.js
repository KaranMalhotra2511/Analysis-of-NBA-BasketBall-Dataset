function test1(){
	console.log('test1')

}

function test2(){
	console.log('test2');

}


function plot_values_stratified(filename) {
    console.log("i am here");
    
    filename = "./data/" + filename;
    svg.selectAll("*").remove();
    
    // Load data
    d3.csv(filename, function(error, data) {
        console.log("data ",data);
        data.forEach(function(d) {
            d.a1 = +d.a1;
            d.a2 = +d.a2;
        });

        var xValueR = function(d) { return d.a1;};
        var yValueR = function(d) { return d.a2;};

        xScale.domain([d3.min(data, xValueR), d3.max(data, xValueR)]);
        yScale.domain([d3.min(data, yValueR), d3.max(data, yValueR)]);


        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0, "+(h-pad-10)+")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate("+(left_pad-pad)+", 0)")
            .call(yAxis);

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", left_pad-80)
            .attr("x",h-600)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Component A");

        svg.append("text")
            .attr("y", h-20)
            .attr("x", h+250)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Component B");


        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", 2.5)
            .attr("cx", function(d){
                return xScale(d.a1);
            })
            .attr("cy", function(d){
                return yScale(d.a2);
            })
            .style("fill", "steelblue");
        var tooltip = d3.select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style("opacity", 0);
        var circle = svg.selectAll("circle")
        circle.on("mouseenter", function(d) {
            d3.select('.tooltip')
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("("+Math.round(d.r1 * 100) / 100+","+Math.round(d.r2 * 100) / 100+")")
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            // console.log("d3.event.pageX + 5 ",d3.event.pageX + 5)
            // console.log("d3.event.pageY - 28 ",d3.event.pageY - 28)

            d3.select(this)
                .attr("r", 4.5)
                .style("fill","red");
        });
        circle.on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
            d3.select(this)
                .attr("r", 2.5)
                .style("fill","steelblue");


        });

     });

}

function plot_values(filename) {
    
    filename = "./data/" + filename;
    svg.selectAll("*").remove();
    
    // Load data
    d3.csv(filename, function(error, data) {
        data.forEach(function(d) {
            d.r1 = +d.r1;
            d.r2 = +d.r2;

        });

        var xValueR = function(d) { return d.r1;};
        var yValueR = function(d) { return d.r2;};

        xScale.domain([d3.min(data, xValueR), d3.max(data, xValueR)]);
        yScale.domain([d3.min(data, yValueR), d3.max(data, yValueR)]);


        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0, "+(h-pad-10)+")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate("+(left_pad-pad)+", 0)")
            .call(yAxis);

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", left_pad-80)
            .attr("x",h-600)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Component A");

        svg.append("text")
            .attr("y", h-20)
            .attr("x", h+250)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Component B");

        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", 2.5)
            .attr("cx", function(d){
                return xScale(d.r1);
            })
            .attr("cy", function(d){
                return yScale(d.r2);
            })
            .style("fill", "steelblue");

        var tooltip = d3.select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style("opacity", 0);

        var circle = svg.selectAll("circle")



            // .on("mouseover", function(d) {
            //     tooltip.transition()
            //         .duration(200)
            //         .style("opacity", .9);
            //     tooltip.html(d["Cereal Name"] + "<br/> (" + xValue(d)
            //         + ", " + yValue(d) + ")")
            //         .style("left", (d3.event.pageX + 5) + "px")
            //         .style("top", (d3.event.pageY - 28) + "px");
            // })
            // .on("mouseout", function(d) {
            //     tooltip.transition()
            //         .duration(500)
            //         .style("opacity", 0);
            // });



        circle.on("mouseenter", function(d) {
            d3.select('.tooltip')
            tooltip.transition()
                .duration(500)
                .style("opacity", .9);

            console.log("("+Math.round(d.r1 * 100) / 100+","+(Math.round(d.r2 * 100) / 100)+")");
            tooltip.html("("+Math.round(d.r1 * 100) / 100+","+(Math.round(d.r2 * 100) / 100)+")")
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            // console.log("d3.event.pageX + 5 ",d3.event.pageX + 5)
            // console.log("d3.event.pageY - 28 ",d3.event.pageY - 28)

            d3.select(this)
                .attr("r", 4.5)
                .style("fill","red");
        });
        circle.on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
            d3.select(this)
                .attr("r", 2.5)
                .style("fill","steelblue");


        });

    });

}




