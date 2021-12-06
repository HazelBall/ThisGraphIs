function createGraph() {
    remove();
    enableReactions();
    localStorage.setItem("currentGraph", "New Graph");
    let title = prompt("Type a title for your new graph!", "Number of Monkeys in California.");
    let yLabel = prompt("TYpe what your graph measures:", "Cost, Population, etc.")
    var xLabel;
    var xData = [], yData = [];
    var dataPoints = Math.floor(Math.random() * 100);
    if(Math.floor(Math.random() * 10) <= 5) {
        xLabel = "Number";
        for(var i = 1; i <= dataPoints; i ++) {
            xData.push(i);
        }

    } else {
        xLabel = "Year";
        var year = Math.floor(Math.random()*100) + 1950;
        var n = Math.floor(Math.random() * 5);
        for(var i = 0; i < dataPoints; i ++) {
            xData.push(year);
            year += n;
        }
    }
    var dataLast = Math.floor(Math.random() * 250);
    for(var i = 0; i < dataPoints; i ++) {
        var noiseDif = Math.floor(Math.random() * 30) - 15;
        yData.push(dataLast + noiseDif);
        dataLast += noiseDif;
    }

    var ctx = document.getElementById("graph");
    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: xData,
            datasets: [{
                label: yLabel,
                fill: true,
                lineTension: 0,
                data: yData
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
                text: title,
                fontSize: 24
            },
            scales : {
                xAxes: [{
                    scaleLabel: {
                        labelString: xLabel,
                        display: true
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        labelString: yLabel,
                        display: true,
                    }
                }]
            }
        }
    });
    exportGraph(title, "line", xLabel, yLabel, xData, yData);
}

function exportGraph(title, type, xLabel, yLabel, xData, yData) {
    collection = db.collection("graphs");
    collection.add({
        title: title,
        type: type,
        xLabel: xLabel,
        yLabel: yLabel,
        xData: xData,
        yData: yData,
        reactHappy:0,
        reactSad:0,
        reactAngry:0,
        reactConfused:0,
        reactLaugh:0,
        reports:0
    }).then(function(docRef) {
        localStorage.setItem("currentGraph", docRef.id);
    });
}