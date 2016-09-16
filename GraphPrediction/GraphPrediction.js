function CreateGraph(){
  // set the dimensions and margins of the graph
var data = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987];
var prediction = Array.apply(null, Array(data.length)).map(Number.prototype.valueOf,0);

var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain(d3.extent(data))
    .range([height, 0]);

var line = d3.line()
    .defined(function(d) { return d; })
    .x(function(d, i) { return x(i); })
    .y(function(d) { return y(d); });

var svg = d3.select("body").append("svg")
    .datum(data)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var valueline = d3.line()
    .x(function(d,i) { return x(i); })
    .y(function(d) { return y(d); });

svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom().scale(x));

svg.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft().scale(y));

svg.append("path")
    .attr("class", "line")
    .attr("d", line);

  svg.append("path")
      .attr("class", "prediction")
      .attr("d", valueline(prediction));

// svg.selectAll(".dot")
//     .data(data.filter(function(d) { return d; }))
//   .enter().append("circle")
//     .attr("class", "dot")
//     .attr("cx", line.x())
//     .attr("cy", line.y())
//     .attr("r", 3.5);
var round = d3.format(",.0f");

var svg = d3.select("svg")
    .call(d3.drag()
        .container(function() { return this; })
        .subject(function() { var p = [d3.event.x, d3.event.y]; return [p, p]; })
        .on("start", dragstarted));

function dragstarted() {
  var d = d3.event.subject,
      x0 = d3.event.x,
      y0 = d3.event.y;

  d3.event.on("drag", function() {
    var x1 = d3.event.x,
        y1 = d3.event.y,
        dx = x1 - x0,
        dy = y1 - y0;
    if (dx * dx + dy * dy > 100) prediction[round(x.invert(x1-margin.left))]=y.invert(y1-margin.top);
    //else data[data.length - 1] = y1;
    console.log(prediction)
    updateData();
  });
}

// ** Update data section (Called from the onclick)
function updateData() {

    // Select the section we want to apply our changes to
    var svg = d3.select("body").transition();

    // Make the changes
        svg.select(".prediction")   // change the line
            .duration(10)
            .attr("d", valueline(prediction));
}

}
CreateGraph();
