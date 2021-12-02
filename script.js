var canvas = document.getElementById("graph");
var chart;

function getGraph() {
  canvas.width  = window.innerWidth/2;
  graphID = null;
  data = null;
  db.collection("graphs").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if(localStorage.getItem(doc.id) == null || localStorage.getItem(doc.id) == false) {
        graphID = doc.id;
        data = doc.data();
        localStorage.setItem("currentGraph", doc.id);
        // Uncomment this when the full app is ready/creating graphs is complete
        //localStorage.setItem(graphID, true);
      }
    });
    console.log(data);
    console.log(data.title);
      
    chart = new Chart("graph", {
      type: "line",
      data: {
        labels: data.xData,
        datasets: [{
          label: data.xLabel,
          fill: true,
          lineTension: 0,
          data: data.yData
        }]
      },
      options: {
        plugins: {
          legend: {display: false},
          title: {
            display: true,
            text: data.title
          }
        }
      }
    });
  });
}

function remove() {
    chart.destroy();
    getGraph();
}

