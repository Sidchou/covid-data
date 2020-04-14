let url = "https://pomber.github.io/covid19/timeseries.json?fbclid=IwAR2f-o30wpA7GJjrQdHlvv-Trveh8Hi4PU20251DU9gIYFvVJJ3l_eRC1so";

let h = 200;
let w = 900;
let margin = {left: 50, right: 50, top: 40, bottom: 0};

let parseDate = d3.timeParse("%Y-%m-%d");

let a ;
let svg = d3.select("body").append("svg").attr("width","100%").attr("height","100%");
let chartGroup = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");


let data = d3.json(url).then((d)=>{
  _data = [].map.call(d.Canada,(d)=>{
     return {
         date: parseDate(d.date),
         recovered: d.recovered,
         deaths: d.deaths,
         confirmed: d.confirmed - d.deaths - d.recovered,

 //
}});
 // console.log(_data);
// let _data = d.Canada
let timeRange = d3.extent(_data,(d)=> d.date);
let dataRange = d3.extent(_data,(d)=> d.confirmed+d.deaths+d.recovered);

let x = d3.scaleTime()
              .domain(timeRange)
              .range([0,w])

let xAxis = d3.axisBottom(x);

let y = d3.scaleLinear()
              .domain(dataRange)
              .range([h,0])

let yAxis = d3.axisLeft(y);




let keys = d3.keys(_data[0]).slice(1);

let stack = d3.stack().keys(keys);

let area = d3.area()
              .x((d)=>{console.log(d);return x(d.data.date)})
              .y0((d)=>y(d[0]))
              .y1((d)=>y(d[1]))


let chartGroup = svg.append("g")
                        .attr("class","chartGroup")
                        .attr("transform","translate("+margin.left+","+margin.top+")");




chartGroup.selectAll("path.area")
          .data(stack(_data))
          .enter().append("path")
                  .attr("class",(d,i)=>"area "+keys[i])
                  .attr("d",d=>area(d))
                  // .attr("stroke", "steelblue")
                  // .attr("stroke-width", 1.5)



chartGroup.append("g").attr("class","x axis")
                          .attr("transform","translate(0,"+h+")").call(xAxis);

chartGroup.append("g").attr("class","y axis").call(yAxis);

// chartGroup.append("path")
//       .datum(_data.filter(line.defined()))
//       .attr("stroke", "#ccc")
//       .attr("d", line);
//


  }).catch((e)=>(console.error(e)))
