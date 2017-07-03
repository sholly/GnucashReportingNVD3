import nv from 'nvd3';
import {apiUrl} from './config';
var chart;
var chartData;
function sliceData(data, sliceBy) {
    let filtered = data.filter((d) => {
        return +d.amount >= 0;

    });

    let sliceddata = filtered.slice(0, sliceBy);
    let otherData = filtered.slice(sliceBy + 1, data.length);
    let othersum = +0;
    otherData.forEach((d) => {
        console.log(d.amount);
        console.log(othersum);
        othersum += parseFloat(d.amount);
    });
    sliceddata.push({name: "Other", amount: othersum});
    return sliceddata;
}

export function renderchart(data) {
    // console.log("renderchartthis : ", this);
    // console.log("data: ", data);
    let sliceddata = sliceData(data, 14);
    console.log(sliceddata);
    chart = nv.addGraph(function () {
        chart = nv.models.pieChart()
            .x(function (d) {
                return d.name
            })
            .y(function (d) {
                return d.amount
            })
            .showLabels(true)
            .labelThreshold(.04)
            .labelType("key")
            .donut(true)
            .donutRatio(0.45);
        chartData = d3.select("#expenseschart svg")
            .datum(sliceddata);

        chartData.transition().duration(350)
            .call(chart);
        // console.log("in nv addgraph this ", this);
        // console.log(sliceddata);
        return chart;
    });
    // console.log("out of function");
}
export function getExpensesData(startdate, enddate) {
    let expensesUrl = apiUrl + "/expenses";
    if (startdate != null) {
        expensesUrl += `?startdate=${startdate}`;
    }
    if (enddate != null) {
        expensesUrl += `&enddate=${enddate}`;
    }

    fetch(expensesUrl)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json);
            renderchart(json);
        })
        .catch((error) => console.log(error));
}

export function update(startdate, enddate) {
    console.log("in expenses update", startdate, " ", enddate);
    getExpensesData(startdate, enddate);
}
