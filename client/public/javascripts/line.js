
$.get("http://localhost:3001/api/datadate",function(data){
  for(let i=0;i<data.length;i++){
    data[i].letter = new Date(data[i].letter)
  }
  var width = 2500;
  var height = 1000;

  // Create the SVG 'canvas'
  var svg = d3.select("#visualisation")
      .append("svg")
      .attr("viewBox", "0 0 " + width + " " + height)

  // Define the padding around the graph
  var padding = 50;

  // Set the scales
  var minDate = d3.min(data, function(d) { return d.letter; });
  minDate.setDate(minDate.getDate() - 1);

  var maxDate = d3.max(data, function(d) { return d.letter; });

  var xScale = d3.time.scale()
      .domain([minDate, maxDate])
      .range([padding, width - padding]);

  var yScale = d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d.frequency; })])
      .range([height - padding, padding]);

  // x-axis
  var format = d3.time.format("%Y");
  var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")
      .tickFormat(format)
      .ticks(d3.time.years, 1);

  svg.append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(0," + (height - padding) + ")")
      .call(xAxis);

  // y-axis
  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")
      .tickFormat(function (d) { return d; })
      .tickSize(5, 5, 0)
      .ticks(5); // set rough # of ticks

  svg.append("g")
      .attr("class", "axis y-axis")
      .attr("transform", "translate(" + padding + ",0)")
      .attr("fill","#000")
      .call(yAxis);



  // plot circles
  svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "data-point")
      .attr("cx", function(d) {
          return xScale(d.letter);
      })
      .attr("cy", function(d) {
          return yScale(d.frequency);
      })
      .attr("r", 1);



})
