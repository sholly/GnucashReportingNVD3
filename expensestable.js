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

class DataFetcher {
    constructor() {
        this.url = "http://localhost:5000";
    }

    getExpenses(startdate, enddate) {
        this.expensesUrl = this.url + "/expenses";
        if (startdate !== null) {
            this.expensesUrl += `?startdate=${startdate}`;
        }
        if (enddate !== null) {
            this.expensesUrl += `&enddate=${enddate}`;
        }
        this.expensesData = this._fetchData(this.expensesUrl);
    }

    _fetchData(url) {
        let data = [];
        fetch(url)
            .then((response) => {
                console.log(response.status);
                return response.json();
            }).then((json) => {
            data = this.generateexpensestable(json);
            this.generatechart(data);

        }).catch((error) => console.log(error));
        return data;
    }

    generatechart(data) {
        var svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height"),
            radius = Math.min(width, height) / 2,
            g = svg.append("g").attr("transform", "translate(" + width / 2 + ", " +
                height / 2 + ")");

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
    let d = new DataFetcher();
    d.getExpenses(startdate.value, enddate.value);
}

startdate.addEventListener('change', getExpensesByDate);
enddate.addEventListener('change', getExpensesByDate);
let df = new DataFetcher();
df.getExpenses(startdate.value, enddate.value);
