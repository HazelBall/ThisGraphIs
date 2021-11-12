
import { initializeApp } from 'firebase/app';
import { } from "firebase/database";

// Set the configuration for your app
// TODO: Replace with your project's config object
const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "projectId.firebaseapp.com",
  // For databases not in the us-central1 location, databaseURL will be of the
  // form https://[databaseName].[region].firebasedatabase.app.
  // For example, https://your-database-123.europe-west1.firebasedatabase.app
  databaseURL: "https://databaseName.firebaseio.com",
  storageBucket: "bucket.appspot.com"
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

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