/**
 * Created by sholly on 6/25/17.
 */

var chart;
var chartData;
var data = [
    {
        "key": "test1", values: [{'x': 1, 'y': 200}, {'x': 2, 'y': 300}]
    },
    {
        "key": "test2", values: [{'x': 1, 'y': 400}, {'x': 2, 'y': 500}]
    },
    {
        "key": "test3", values: [{'x': 1, 'y': 700}, {'x': 2, 'y': 0}]
    },
    {
        "key": "test4", values: [{'x': 1, 'y': 800}, {'x': 2, 'y': 600}]
    },
]

function renderChart(data) {
    var chart = nv.addGraph(function () {
        console.log(data);
        chart = nv.models.multiBarChart()
            .reduceXTicks(true)
            .rotateLabels(0)
            .showControls(true)
            .groupSpacing(0.1);
        chart.xAxis.tickFormat(function (d) {
            return d3.time.format('%x')(new Date(d));
        });
        // chart.yAxis.tickFormat(d3.format(',f'));
        // chart.yAxis.tickFormat(',f');

        chartThing = d3.select('#debtchart svg')
            .datum(data);

        chartThing.transition().duration(350)
            .call(chart);

        nv.utils.windowResize(chart.update);
        return chart;
    })
}

function getDebtData() {
    var debtData = [];
    debtUrl = "http://localhost:5000/debt"

    fetch(debtUrl)
        .then((response) => {
            console.log(response.status);
            return response.json();
        })
        .then((json) => {
            renderChart(json);
        })
        .catch((error) => console.log(error));
    return debtData;
}
function renderFake() {
    renderChart(data);
}

getDebtData();
// renderFake();