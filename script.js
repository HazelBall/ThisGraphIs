import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js'

// Add Firebase products that you want to use
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js"
// Set the configuration for your app
// TODO: Replace with your project's config object
const firebaseConfig = {
  apiKey: "AIzaSyA2zF2IufwdTP59fIV709tzKd0Cx4IGp-E",
  authDomain: "thisgraphis.firebaseapp.com",
  databaseURL: "https://thisgraphis-default-rtdb.firebaseio.com",
  projectId: "thisgraphis",
  storageBucket: "thisgraphis.appspot.com",
  messagingSenderId: "442066372663",
  appId: "1:442066372663:web:aeb3ed81833b0494e897b2",
  measurementId: "G-QKYE2MK2F5"
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

var canvas = document.getElementById("graph");
var chart;
function getGraph() {
    canvas.width  = window.innerWidth/2;
    var xValues = [50,60,70,80,90,100,110,120,130,140,150];
    var yValues = [7,8,8,9,9,9,10,11,14,14,15];
      
    chart = new Chart("graph", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: yValues
          }]
        },
        options: {
          legend: {display: false},
          scales: {
            yAxes: [{ticks: {min: 6, max:16}}],
          }
        }
      });
}

function remove() {
    chart.destroy();
    getGraph();
}

