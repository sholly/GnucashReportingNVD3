/**
 * Created by sholly on 4/23/17.
 */


function printData(data) {
    let sliceddata = data.slice(0, 10);
    let otherdata = data.slice(11, data.length);
    sliceddata.forEach((d) => {
        console.log(`${d.name}, ${d.amount}`);
    });
    console.log("this inside printdata: ", this);
    otherdata.forEach((d) => {
        console.log(`${d.name}, ${d.amount}`);
    })
}

function sliceData(data, sliceby) {
    let filtered = data.filter((d) => {
        return +d.amount >= 0;
    });
    let sliceddata = filtered.slice(0, sliceby);
    let otherdata = filtered.slice(sliceby + 1, data.length);
    let othersum = 0;
    otherdata.forEach((d) => {
        othersum += +d.amount;
    });
    console.log("othersum: ", othersum);
    sliceddata.push({name: "Other", amount: othersum});
    return sliceddata;
}

var chart;
var chartData;
function renderchart(data) {
    console.log("renderchart this: ", this);
    let sliceddata = this.sliceData(data, 14);
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
        console.log("in nv addgraph this ", this);
        console.log(sliceddata);
        return chart;
    });
    console.log(" out of function ", this);
}


function renderTable(data) {
    let dataHtml = `<table><thead><tr>
                        <td>Expense Account</td><td>Amount</td>
                        </tr></thead>`;
    data.forEach((d) => {
        dataHtml += `<tr><td>${d.name}</td><td>${d.amount}</td></tr>`;
    });
    dataHtml += `</table>`;
    ediv.innerHTML = dataHtml;
}
class TestClass {
    hi() {
        console.log("Im a test class!");
    }
}
function getExpensesData(startdate, enddate) {
    var expensesData = [];
    expensesUrl = "http://localhost:5000/expenses";
    if (startdate !== null) {
        expensesUrl += `?startdate=${startdate}`;
    }
    if (enddate !== null) {
        expensesUrl += `&enddate=${enddate}`;
    }

    fetch(expensesUrl)
        .then((response) => {
            console.log(response.status);
            return response.json();
        })
        .then((json) => {
            renderchart(json);
            renderTable(json);
        })
        .catch((error) => console.log(error));
    return expensesData;
}


function getToday() {
    let today = new Date();
    let fullYear = today.getFullYear();
    let month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : `${today.getMonth()}`;
    let dayOfMonth = today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`;
    todayString = `${fullYear}-${month}-${dayOfMonth}`;
    return todayString;
}

function getFirstDateOfThisMonth() {
    let today = new Date();
    let fullYear = today.getFullYear();
    let month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : `${today.getMonth()}`;
    todayString = `${fullYear}-${month}-01`;
    return todayString;
}

function updatechartandtable() {
    console.log("update chart and table this ", this);
    console.log("startdate ", startdate);
    console.log("enddate ", enddate);
    getExpensesData(startdate.value, enddate.value);
}

let startdate = document.querySelector('input[name=startdate]');
startdate.value = getFirstDateOfThisMonth();
let enddate = document.querySelector('input[name=enddate]');
enddate.value = getToday();
let ediv = document.querySelector('.expenses');
getExpensesData(startdate.value, enddate.value);
startdate.addEventListener('change', updatechartandtable);
enddate.addEventListener('change', updatechartandtable);
// console.log(dl.data);
