import nv from 'nvd3';
import {apiUrl} from './config';

var chart;
var chartData;

function renderChart(data) {
    var chart = nv.addGraph(() => {
        chart = nv.models.multiBarChart()
            .reduceXTicks(true)
            .rotateLabels(0)
            .showControls(false)
            .groupSpacing(0.1);

        chart.multibar.stacked(true);
        chart.xAxis.tickFormat(d => {
            return d3.time.format('%x')(new Date(d));
        });

        let chartThing = d3.select('#debtchart svg')
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
        values.forEach(v => console.log(v['x']) + ":" + v['y']);
    });
    let tableHTML = '<table border="1px solid"></tr>';
    data.forEach(d => {
        tableHTML += `<th>${d['key']}</th>`;
    });
    tableHTML += '</tr>';
    tableHTML += '</table>';
    let ddiv = document.querySelector('#debttable');
    console.log(ddiv);
    ddiv.innerHTML = tableHTML;
}

export function getDebtData() {
    var debtData = [];
    var debtUrl = apiUrl + "/debt";
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