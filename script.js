var canvas = document.getElementById("graph");
var chart;

function getGraph() {
  canvas.width  = window.innerWidth/2;
  graphID = null;
  data = null;
  graphFound = false;
  db.collection("graphs").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if(localStorage.getItem(doc.id) == null || localStorage.getItem(doc.id) == false) {
        graphID = doc.id;
        data = doc.data();
        graphFound = true;
        localStorage.setItem("currentGraph", doc.id);
      }
    });

    if(!graphFound) {
      disableReactions();
      alert("No more graphs could be retrieved. Create a new one!");
    } else {
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
            text: data.title,
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
    }
  });
}

function remove() {
  if(chart != null) {
    chart.destroy();
  }
}

function reactToGraph(reactButton) {
  var reaction = reactButton.id;
  var graphID = localStorage.getItem("currentGraph");
  
  var buttons = [document.getElementById("react-happy"), 
                document.getElementById("react-sad"),
                document.getElementById("react-angry"),
                document.getElementById("react-laugh"),
                document.getElementById("react-confused")];

  var countHappy    = document.getElementById("num-react-happy");
  var countSad      = document.getElementById("num-react-sad");
  var countAngry    = document.getElementById("num-react-angry");
  var countLaugh    = document.getElementById("num-react-laugh");
  var countConfused = document.getElementById("num-react-confused");
  
  var data;
  if(graphID == "New Graph") {
    exportGraph(graph.data);
  } else {
    var docRef = db.collection("graphs").doc(graphID).get().then((doc) => {
      if (doc.exists) {
        data = doc.data();
      
        var numReact = [data.reactHappy, data.reactSad, data.reactAngry, data.reactLaugh, data.reactConfused];
        switch(reaction) {
          case "react-happy":
            numReact[0] += 1;
            buttons[0].classList.toggle("selected");
            db.collection("graphs").doc(graphID).set({
              reactHappy : numReact[0]
            }, { merge: true });
            break;
          case "react-sad":
            numReact[1] += 1;
            buttons[1].classList.toggle("selected");
            db.collection("graphs").doc(graphID).set({
              reactSad   : numReact[1]
            }, { merge: true });
            break;
          case "react-angry":
            numReact[2] += 1;
            buttons[2].classList.toggle("selected");
            db.collection("graphs").doc(graphID).set({
              reactAngry : numReact[2]
            }, { merge: true });
            break;
          case "react-laugh":
            numReact[3] += 1;
            buttons[3].classList.toggle("selected");
            db.collection("graphs").doc(graphID).set({
              reactLaugh : numReact[3]
            }, { merge: true });
            break;
          case "react-confused":
            numReact[4] += 1;
            buttons[4].classList.toggle("selected");
            db.collection("graphs").doc(graphID).set({
              reactConfused : numReact[4]
            }, { merge: true });
            break;
        }
        countHappy.innerHTML = numReact[0];
        countSad.innerHTML = numReact[1];
        countAngry.innerHTML = numReact[2];
        countLaugh.innerHTML = numReact[3];
        countConfused.innerHTML = numReact[4];

        disableReactions();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  }
}

function nextGraph() {
  enableReactions();
  var graphID = localStorage.getItem("currentGraph");
  localStorage.setItem(graphID, true);
  remove();
  getGraph();
}

function disableReactions() {
  var buttons = [document.getElementById("react-happy"), document.getElementById("react-sad"), document.getElementById("react-angry"), document.getElementById("react-laugh"), document.getElementById("react-confused")];
  buttons.forEach((element) => {element.disabled = true});
  document.getElementById("nextGraph").disabled = false;
  document.getElementById("createGraph").disabled = false;
}

function enableReactions() {
  var buttons = [document.getElementById("react-happy"), 
                document.getElementById("react-sad"),
                document.getElementById("react-angry"),
                document.getElementById("react-laugh"),
                document.getElementById("react-confused")];

  var countHappy    = document.getElementById("num-react-happy");
  var countSad      = document.getElementById("num-react-sad");
  var countAngry    = document.getElementById("num-react-angry");
  var countLaugh    = document.getElementById("num-react-laugh");
  var countConfused = document.getElementById("num-react-confused");

  countHappy.innerHTML = "";
  countSad.innerHTML = "";
  countAngry.innerHTML = "";
  countLaugh.innerHTML = "";
  countConfused.innerHTML = "";

  buttons.forEach((element) => {
    element.disabled = false;
    element.classList.remove("selected");
  });
  document.getElementById("nextGraph").disabled = true;
  document.getElementById("createGraph").disabled = true;
}