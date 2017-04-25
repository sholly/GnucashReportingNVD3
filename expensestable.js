/**
 * Created by sholly on 4/20/17.
 */
let startdate = document.querySelector('input[name=startdate]');
startdate.value = getFirstDateOfThisMonth();
let enddate = document.querySelector('input[name=enddate]');
enddate.value = getToday();
ediv = document.querySelector('.expenses');
console.log(ediv);

let expensedata = [];

class ExpensesMaker {

    constructor() {
        this.url = "http://localhost:5000/expenses";
        this.data = [];
        this.chartmade = false;
    }

    getExpenses(startdate, enddate) {
        let expensesurl = this.url;
        if (startdate !== null) {
            expensesurl += `?startdate=${startdate}`;
        }
        if (enddate !== null) {
            expensesurl += `&enddate=${enddate}`;
        }
        this._fetchData(expensesurl);
    }

    _fetchData(url) {
        fetch(url)
            .then((response) => {
                console.log(response.status);
                return response.json();
            }).then((json) => {
            this.generateexpensestable(json);
            if (this.chartmade) {
                this.updateChart(json);
            } else {
                this.generatechart(json);
                this.chartmade = true;
            }
            this.data = json;

        }).catch((error) => console.log(error));
    }


    generatechart(dataset) {
        let width = 500;
        let height = 500;
        let donutWidth = 75;
        var radius = Math.min(width, height) / 2;
        // var svg = d3.select("svg"),
        //     width = +svg.attr("width"),
        //     height = +svg.attr("height"),
        //     radius = Math.min(width, height) / 2,
        //     g = svg.append("g").attr("transform", "translate(" + width / 2 + ", " +
        //         height / 2 + ")");

        var svg = d3.select('#expenseschart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + (width / 2) +
                ',' + (height / 2) + ')');

        var color = d3.scaleOrdinal(d3.schemeCategory20c);

        var arc = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius - donutWidth);

        var pie = d3.pie()
            .value(function (d) {
                return +d.amount;
            }).sort(null);

        var path = svg.selectAll('path')
            .data(pie(dataset))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function (d) {
                return color(d.data.name);
            });

        this.pie = pie;
        this.path = path;
        this.arc = arc;
    }

    updateChart(data) {
        this.path.data(this.pie(data));
        // this.path.transition()
        //     .duration(750);
            // .attrTween("d", this.arcTween);
    }

    arcTween(a) {
        console.log(this);
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return (t) => {
            return this.arc(i(t));
        }

    }

    generateexpensestable(data) {
        let dataHtml = `<table><thead><tr>
                        <td>Expense Account</td><td>Amount</td>
                        </tr></thead>`;
        data.forEach((d) => {
            dataHtml += `<tr><td>${d.name}</td><td>${d.amount}</td></tr>`;
        });
        dataHtml += `</table>`;
        ediv.innerHTML = dataHtml;
        return data;
    }
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

function getExpensesByDate() {
    let startdate = document.querySelector('input[name=startdate]');
    let enddate = document.querySelector('input[name=enddate]');
    // let d = new ExpensesMaker();
    df.getExpenses(startdate.value, enddate.value);
}

startdate.addEventListener('change', getExpensesByDate);
enddate.addEventListener('change', getExpensesByDate);
let df = new ExpensesMaker();
df.getExpenses(startdate.value, enddate.value);
