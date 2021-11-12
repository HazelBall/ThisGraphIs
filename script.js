var canvas = document.getElementById("graph");
var chart;
function getGraph() {
    canvas.width  = window.innerWidth/2;
    var xyValues = [
        {x:50, y:7},
        {x:60, y:8},
        {x:70, y:8},
        {x:80, y:9},
        {x:90, y:9},
        {x:100, y:9},
        {x:110, y:10},
        {x:120, y:11},
        {x:130, y:14},
        {x:140, y:14},
        {x:150, y:15}
      ];
      
      chart = new Chart("graph", {
        type: "scatter",
        data: {
          datasets: [{
            pointRadius: 4,
            pointBackgroundColor: "rgba(0,0,255,1)",
            data: xyValues
          }]
        },
        options:{
            title: {
                display: true,
                text: "Example Graph"
            }
        }
      });
}

function remove() {
    chart.destroy();
    getGraph();
}