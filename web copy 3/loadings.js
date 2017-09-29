//Simple animated example of d3-cloud - https://github.com/jasondavies/d3-cloud
//Based on https://github.com/jasondavies/d3-cloud/blob/master/examples/simple.html

// Encapsulate the word cloud functionality
function wordCloud(selector) {

    var width = 1000
    var height = 1000
    var fill = d3.scale.category20();

    //Construct the word cloud's SVG element
    // d3.select("#svg").remove();
    //
    // var SVG = d3.select("#scatter_plot").append("svg")
    //     .attr("class","svg")
    //     .attr("width", "75.4%")
    //     .attr("height", 400);

    d3.select("#svg").selectAll("*").remove();

    var SVG = d3.select("#svg");

    document.getElementById('svg').removeAttribute("onclick");

    var svg = SVG.append("g")
        .attr("width",980)
        .attr("height",400)
        // .attr("transform", "translate(" + ~~(width / 1.5) + "," + ~~(height / 1.5) + ")");
           .attr("transform", "translate(370,130)");

//        var g = svg.selectAll("g")


    // var SVG = d3.select("#svg");


    SVG.on("click",function() {

        SVG.selectAll("*").remove();


        // var svg = d3.select("#scatter_plot")
        //     .append("svg")
        //     .attr("class", "svg")
        //     .attr("width", "75.4%")
        //     .attr("height", 400);
        //
        // // d3.select("#svg").onload("plot_loadings('player_career_shooter_all_35_val.csv')");
        // d3.select("#svg").on("click", function () {
        //     ("loadWordCloud('ked')");
        // });

        plot_loadings('player_career_shooter_all_35_val.csv');

    });



    //Draw the word cloud
    function draw(words) {
        var cloud = svg.selectAll("g text")
            .data(words, function(d) { return d.text; })

        //Entering words
        cloud.enter()
            .append("text")
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr('font-size', 1)
            .text(function(d) { return d.text; });

        //Entering and existing words
        cloud
            .transition()
            .duration(600)
            .style("font-size", function(d) { return d.size + "px"; })
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("fill-opacity", 1);

        //Exiting words
        cloud.exit()
            .transition()
            .duration(200)
            .style('fill-opacity', 1e-6)
            .attr('font-size', 1)
            .remove();
    }


    //Use the module pattern to encapsulate the visualisation code. We'll
    // expose only the parts that need to be public.
    return {

        //Recompute the word cloud for a new set of words. This method will
        // asycnhronously call draw when the layout has been computed.
        //The outside world will need to call this function, so make it part
        // of the wordCloud return value.
        update: function(words) {
            d3.layout.cloud().size([980, 200])   //500,500
                .words(words)
                .padding(2)
                .rotate(function() { return ~~(Math.random() * 2) * 90; })
                .font("Impact")
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();
        }
    }

}

//Some sample data - http://en.wikiquote.org/wiki/Opening_lines
var words = [
    "You don't know about me without you have read a book called The Adventures of Tom Sawyer but that ain't no matter.",
    "The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.",
    "When Mr. Bilbo Baggins of Bag End announced that he would shortly be celebrating his eleventy-first birthday with a party of special magnificence, there was much talk and excitement in Hobbiton.",
    "It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love."
]
var words1 = []
var val1 = []

//Prepare one of the sample sentences by removing punctuation,
// creating an array of words and computing a random size attribute.
function getWords(i) {
    console.log("i ",i)
    console.log("words[i] ",words1[i])
//        return words[i]
//            .replace(/[!\.,:;\?]/g, '')
//            .split(' ')
//            .map(function(d) {
//                console.log("d ",d)
//                return {text: d, size: 10 + Math.random() * 60};
//            })
    return words1
        .map(function(d,i) {
            console.log("d ",d)
            console.log("val ",val1[i])
            var maxy = d3.max(val1);
            console.log("maxy ",maxy,"   ",4 +  val1[i]/maxy * 28)

            if(i<5)
            {
                return {text: d, size: 5+  val1[i]/maxy * 20};
            }
            return {text: d, size: 2+  val1[i]/maxy * 10};
        })
}

//This method tells the word cloud to redraw with a new set of words.
//In reality the new words would probably come from a server request,
// user input or some other source.
function showNewWords(vis, i) {
    i = i || 0;

    vis.update(getWords(i ++ % words.length))
//        setTimeout(function() { showNewWords(vis, i + 1)}, 2000)
}

//Create a new instance of the word cloud visualisation.

function loadWordCloud(filename){
    d3.csv("./data/player_career_shooter_all_50_val.csv", function(error, data) {
        var myWordCloud = wordCloud('body');
        data.forEach(function(d) {
            words1.push(d.firstname+d.lastname)
            var val = +d.val
            val1.push(val)
        });

        //Start cycling through the demo data
        showNewWords(myWordCloud);
    });
}













function plot_loadings(filename,type) {
  filename = "./data/" + filename;
    // svg = d3.select("#svg");
    console.log(" hhh ",typeof svg);
    // if (typeof svg == 'undefined') {
    //     svg = d3.select("#svg");
    // }
  svg.selectAll("*").remove();
    svg.on("click",function() {
        loadWordCloud('ked');

    });

  // document.getElementById('svg').onclick = loadWordCloud('ked');
  var margin = {top: 0, right: 0, bottom: 0, left: 0},//{top: 10, right: 0, bottom: 20, left: 0},
      width = 1300*0.9 - margin.left - margin.right,//1180
      height = 150 - margin.top - margin.bottom;//340 - margin.top - margin.bottom;

  var x = d3.scale.ordinal().rangeRoundBands([0, width], .07);
  console.log("x is : "+x.rangeBand());

  var y = d3.scale.linear().range([height, 0+0]);

  var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

  var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(7);

  d3.csv(filename, function(error, data) {




      // var maxI = -1
      // var secMaxI = -1
      // var thirdMaxI = -1
      //
      // var maxVal = -20000
      // var secMaxVal = -20000
      // var thirdMaxVal = -20000

      var shooterAvg = 0
      var guardAvg = 0
      var bigAvg = 0
      var count = 0

      data.forEach(function(d,i) {
          // d.date = +d.PCA_components;
          // d.value = +d.eigen_value;
          d.date = +(d.firstname+d.lastname);
          d.value = +d.val;
          count+=1;
          shooterAvg = +d.shooterVal;
          guardAvg = +d.guardVal;
          bigAvg = +d.bigManVal;
          // if(d.value>=maxVal)
          // {
          //     maxVal = d.value
          //     maxI = i
          // }
          // else if(d.value < maxVal && d.value >= secMaxVal)
          // {
          //     secMaxVal = d.value
          //     secMaxI = i
          // }
          // else if(d.value < secMaxVal && d.value >=thirdMaxVal)
          // {
          //     thirdMaxVal = d.value
          //     thirdMaxI = i
          // }
      });
      console.log("shooterAvg ",shooterAvg)
      console.log("guardAvg ",guardAvg)
      console.log("bigAvg ",bigAvg)
      // shooterAvg = shooterAvg/count;
      // guardAvg = guardAvg/count;
      // bigAvg = bigAvg/count;
      console.log("cnt ",count)
      // data.sort(function(x, y){
      //     return d3.descending(x.eigen_value, y.eigen_value);
      // })
    // console.log(maxVal ,secMaxVal,thirdMaxVal)
    //   console.log(maxI ,secMaxI,thirdMaxI)
    x.domain(data.map(function(d) { return (d.firstname+d.lastname); }));
    y.domain([0, d3.max(data, function(d) { return d.val; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );

    // svg.append("text")
    //     .attr("transform", "translate(" + ((width/3)+20) + " ," + (height + margin.bottom) + ")")//50
    //     .style("text-anchor", "middle")
    //     .text(" ");

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,0)")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("dy", ".71em")
        .style("text-anchor", "end");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", left_pad-70)
        .attr("x",h-550)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(" ");

    var bar = svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "rect")
        .style("fill", function(d,i){
            console.log("ble "+shooterAvg+" "+d.shooterVal)
            console.log("ble "+guardAvg+" "+d.guardVal)
            console.log("ble "+bigAvg+" "+d.bigManVal)
            if(d.shooterVal>shooterAvg && d.guardVal>guardAvg && d.bigManVal>bigAvg){return "black";}
            else if(d.shooterVal>shooterAvg && d.guardVal>guardAvg){return "cyan"}
            else if(d.bigManVal>bigAvg && d.guardVal>guardAvg){return "yellow"}
            else if(d.shooterVal>shooterAvg && d.bigManVal>bigAvg){return "magenta"}
            else if(d.bigManVal>bigAvg){return "red"}
            else if(d.shooterVal>shooterAvg){return "blue"}
            else {return "green";}
        })//"steelblue")
        .attr("transform", "translate(0,0)")
        .attr("x", function(d,i) { console.log(" xxx "+(x((d.firstname+d.lastname))+(5 * i))) ; return x((d.firstname+d.lastname)); })//6
        .attr("width",x.rangeBand() )//x.rangeBand() 10
        .attr("y", function(d) { return y(d.val); })
        .attr("height", function(d) { return height - y(d.val); });


      var filter = svg.append("filter")
          .attr("id", "drop-shadow")
          .attr("height", "120%");

// SourceAlpha refers to opacity of graphic that this filter will be applied to
// convolve that with a Gaussian with standard deviation 3 and store result
// in blur
      filter.append("feGaussianBlur")
          .attr("in", "SourceAlpha")
          .attr("stdDeviation", 5)
          .attr("result", "blur");

// translate output of Gaussian blur to the right and downwards with 2px
// store result in offsetBlur
      filter.append("feOffset")
          .attr("in", "blur")
          .attr("dx", 5)
          .attr("dy", 5)
          .attr("result", "offsetBlur");

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
      var feMerge = filter.append("feMerge");

      feMerge.append("feMergeNode")
          .attr("in", "offsetBlur")
      feMerge.append("feMergeNode")
          .attr("in", "SourceGraphic");

      svg.on("mouseclick",function(){
          loadWordCloud("");
      });



      bar.append("text")
          .attr("dy", ".75em")
          .attr("y", 6)
          .attr("x", 22.5)//(x(bins[0].x1) - x(bins[0].x0)) / 2
          .attr("text-anchor", "middle")
          .text(function(d) { return d.val; })
          .style("fill","yellow")
          .style("z-index","999");




    bar.on("mouseenter", function(d,i) {

        d3.select(this)
            .transition()
            .duration(400)
            // .attr("height", y(d.val)+5)
            .style("fill","black")
            .style("z-index",20)
            .style("filter", "url(#drop-shadow)");
    });
      bar.on("mouseout", function(d,i) {
          console.log("i before ",i)
          d3.select(this)

              .transition()
              .duration(400)
              .style("fill", function() {
                  console.log("i ", i)
                  if (d.shooterVal > shooterAvg && d.guardVal > guardAvg && d.bigManVal > bigAvg) {
                      return "black";
                  }
                  else if (d.shooterVal > shooterAvg && d.guardVal > guardAvg) {
                      return "cyan"
                  }
                  else if (d.bigManVal > bigAvg && d.guardVal > guardAvg) {
                      return "yellow"
                  }
                  else if (d.shooterVal > shooterAvg && d.bigManVal > bigAvg) {
                      return "magenta"
                  }
                  else if (d.bigManVal > bigAvg) {
                      return "red"
                  }
                  else if (d.shooterVal > shooterAvg) {
                      return "blue"
                  }
                  else {
                      return "green";
                  }
              })
              // .attr("height", y(d.val))
              .style("z-index",0)
              .style("filter", "none");
      });
});
}