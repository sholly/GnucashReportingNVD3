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
        chart = nv.models.multiBarChart()
            .reduceXTicks(true)
            .rotateLabels(0)
            .showControls(false)
            .groupSpacing(0.1);
        chart.xAxis.tickFormat(function (d) {
            return d3.time.format('%x')(new Date(d));
        });
        chart.multibar.stacked(true);
        chartThing = d3.select('#debtchart svg')
            .datum(data);

        chartThing.transition().duration(150)
            .call(chart);

        nv.utils.windowResize(chart.update);
        return chart;
    })
}

function renderTable(data) {
    data.forEach(d => {
        console.log(d['key']);
        values = d['values'];
        values.forEach(v => console.log(v['x'] + ":" + v['y']));
    });

    let tableHTML = '<table border="1px solid"><tr>';
    data.forEach(d => {
        tableHTML += `<th>${d['key']}</th>`;
    });
    tableHTML += '</tr>';
    tableHTML += '</table>';
    let ddiv = document.querySelector('#debttable');
    console.log(ddiv);
    ddiv.innerHTML = tableHTML;
}

function getDebtData() {
    var debtData = [];
    debtUrl = "http://localhost:5000/debt";

    fetch(debtUrl)
        .then((response) => {
            console.log(response.status);
            return response.json();
        })
        .then((json) => {
            renderChart(json);
            renderTable(json);
        })
        .catch((error) => console.log(error));
    return debtData;
}
function renderFake() {
    renderChart(data);
}

getDebtData();
// renderFake();