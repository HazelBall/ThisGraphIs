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
      
    var ctx = document.getElementById("graph");
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.xData,
        datasets: [{
          label: data.yLabel,
          fill: true,
          lineTension: 0,
          data: data.yData
        }]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        title: {
          display: true,
          text: 'TEST',
          fontSize: 24
        },
        scales : {
          xAxes: [{
            scaleLabel: {
              labelString: data.xLabel,
              display: true
            }
          }],
          yAxes: [{
            scaleLabel: {
              labelString: data.yLabel,
              display: true,
            }
          }]
        }
      }
    });
  });
}

function clearStorage() {
  localStorage.clear();
  remove();
}

function remove() {
    chart.destroy();
    getGraph();
}

function reactToGraph(reaction) {
  react = {
    happy : 0,
    sad : 1,
    angry : 2,
    laugh : 3,
    confused : 4,
    report : -1
  };
  switch(reaction) {
    case react.happy :
      break;
    case react.sad :
      break;
    case react.angry :
      break;
    case react.laugh :
      break;
    case react.confused :
      break;
    case react.report :
      report();
      break;
  }
  // happy: 0, sad: 1
}

function report() {
  id = localStorage.getItem("currentGraph");
  console.log(id);
  // remove();
}